import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { File, Plus } from "lucide-react";

type FileType = {
  id: string;
  name: string;
  language: string;
  createdAt: string;
};

export default function Component() {
  const [files, setFiles] = useState<FileType[]>([]);
  const [newFileName, setNewFileName] = useState("");
  const [newFileLanguage, setNewFileLanguage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to fetch files
  const fetchFiles = async () => {
    try {
      const response = await fetch("http://localhost:5800/api/codes", {
        method: "GET",
        credentials: "include", // Make sure cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const processedFiles = data.map((file: any) => ({
          id: file._id,
          name: file.FileName,
          language: file.language,
          createdAt: new Date(file.createdAt).toLocaleDateString(), // Format the date
        }));
        setFiles(processedFiles);
      } else {
        if (response.status === 401) {
          console.error("Unauthorized: Please log in.");
          navigate("/login");
        } else {
          console.error("Failed to fetch files.");
        }
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // Fetch files when component mounts
  useEffect(() => {
    fetchFiles();
    console.log("called");
  }, []);

  // Create new file handler
  const handleCreateFile = async () => {
    if (newFileName && newFileLanguage) {
      try {
        const response = await fetch(`http://localhost:5800/api/codes/create`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FileName: newFileName,
            language: newFileLanguage,
          }),
        });

        if (response.ok) {
          await response.json(); // You may not need to store the result if not used
          // Refetch the files
          fetchFiles();
          // Clear the input fields and close the modal
          setNewFileName("");
          setNewFileLanguage("");
          setIsModalOpen(false);z
        } else {
          const errorData = await response.json();
          console.error("Failed to create file:", errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Input Error: Please provide all fields.");
    }
  };

  // Fetch file content when clicked
  const handleFileClick = async (file: FileType) => {
    try {
      const response = await fetch(`http://localhost:5800/api/codes/${file.id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Use data.content if needed
        navigate(`/codo/${file.id}`); // Navigate to file view
      } else {
        console.error("Failed to fetch file content");
      }
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-900 text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Your Files</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {files.map((file) => (
          <Card
            key={file.id}
            className="bg-gray-800 text-gray-100 cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => handleFileClick(file)}
          >
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <File className="h-8 w-8 text-blue-400" />
              <div>
                <CardTitle>{file.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  {file.language} - {file.createdAt}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New File
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="col-span-3 bg-gray-700 text-gray-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="language" className="text-right">
                Language
              </Label>
              <Select
                value={newFileLanguage}
                onValueChange={setNewFileLanguage}
              >
                <SelectTrigger className="col-span-3 bg-gray-700 text-gray-100">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-gray-100">
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={handleCreateFile}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            Create File
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
