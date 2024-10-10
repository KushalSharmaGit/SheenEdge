import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { File, Plus, X } from "lucide-react"

type FileType = {
  id: string
  name: string
  language: string
  content: string
}

export default function Component() {
  const [files, setFiles] = useState<FileType[]>([
    { id: "1", name: "example.js", language: "javascript", content: "console.log('Hello, World!');" },
    { id: "2", name: "main.py", language: "python", content: "print('Hello, World!')" },
  ])
  const [newFileName, setNewFileName] = useState("")
  const [newFileLanguage, setNewFileLanguage] = useState("")
  const [newFileContent, setNewFileContent] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null)

  const handleCreateFile = async () => {
    if (newFileName && newFileLanguage) {
      try {
        const response = await fetch(`http://localhost:5800/api/codes/create`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ FileName: newFileName, language: newFileLanguage}),
        })

        if (response.ok) {
          const result = await response.json()
          console.log(result);
          const newFile: FileType = {
            id: result.id, // Store the ID returned from the API
            name: newFileName,
            language: newFileLanguage,
            content: newFileContent,
          }
          setFiles([...files, newFile])
          setNewFileName("")
          setNewFileLanguage("")
          setNewFileContent("")
          setIsModalOpen(false)
        } else {
          const errorData = await response.json()
          console.error("Failed to create file:", errorData.message)
        }
      } catch (error) {
        console.error("Error:", error)
      }
    } else {
      console.error("Input Error: Please provide all fields.")
    }
  }

  const handleFileClick = (file: FileType) => {
    setSelectedFile(file)
  }

  const closeFileContent = () => {
    setSelectedFile(null)
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-900 text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Your Files</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {files.map((file) => (
          <Card key={file.id} className="bg-gray-800 text-gray-100 cursor-pointer hover:bg-gray-700 transition-colors" onClick={() => handleFileClick(file)}>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <File className="h-8 w-8 text-blue-400" />
              <div>
                <CardTitle>{file.name}</CardTitle>
                <CardDescription className="text-gray-400">{file.language}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <textarea
                id="content"
                value={newFileContent}
                onChange={(e) => setNewFileContent(e.target.value)}
                className="col-span-3 bg-gray-700 text-gray-100 rounded-md p-2"
                rows={4}
              />
            </div>
          </div>
          <Button onClick={handleCreateFile} className="bg-blue-600 text-white hover:bg-blue-700">Create File</Button>
        </DialogContent>
      </Dialog>
      {selectedFile && (
        <Card className="mt-4 bg-gray-800 text-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>{selectedFile.name}</CardTitle>
            <Button variant="ghost" size="icon" onClick={closeFileContent}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-gray-700">
              <pre className="text-sm">
                <code>{selectedFile.content}</code>
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
