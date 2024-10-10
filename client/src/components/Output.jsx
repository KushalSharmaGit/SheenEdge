import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { executeCode } from "../api";
import { CloseIcon } from "@chakra-ui/icons"; // Import CloseIcon for remove button

const Output = ({ editorRef, language, id }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emails, setEmails] = useState([]); // Initial email list
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [isRemoving, setIsRemoving] = useState(false); // State to toggle remove mode
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  // Fetch emails on component mount
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(`http://localhost:5800/api/codes/access/${id}`, {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEmails(data.emails || []); // Assuming the response has an 'emails' field
        } else {
          throw new Error('Failed to fetch emails');
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
        toast({
          title: "Error",
          description: "Unable to fetch email list.",
          status: "error",
          duration: 6000,
        });
      }
    };

    fetchEmails();
  }, [id]); // Depend on `id` to fetch emails for the correct code

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveCode = async () => {
    const content = editorRef.current.getValue();
    if (!content) return;

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5800/api/codes/save/${id}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Content saved successfully!",
          status: "success",
          duration: 6000,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to save content.",
          status: "error",
          duration: 6000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (newEmail) {
      try {
        const response = await fetch(`http://localhost:5800/api/codes/${id}`, {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: newEmail }),
        });

        if (response.ok) {
          setEmails([...emails, newEmail]);
          setNewEmail('');
          setIsModalOpen(false);
          toast({
            title: "Access Granted",
            description: `Access granted to ${newEmail}`,
            status: "success",
            duration: 6000,
          });
        } else {
          const errorData = await response.json();
          toast({
            title: "Error",
            description: errorData.message || "Failed to add email.",
            status: "error",
            duration: 6000,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          status: "error",
          duration: 6000,
        });
      }
    }
  };

  const toggleRemoveMode = () => {
    setIsRemoving(prev => !prev);
  };

  const removeEmail = async (emailToRemove) => {
    try {
      const response = await fetch(`http://localhost:5800/api/codes/take/${id}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailToRemove }),
      });

      if (response.ok) {
        setEmails(emails.filter(email => email !== emailToRemove));
        toast({
          title: "Access Revoked",
          description: `Access revoked for ${emailToRemove}`,
          status: "success",
          duration: 6000,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to remove email.",
          status: "error",
          duration: 6000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 6000,
      });
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">Output</Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        ml={2}
        isLoading={isLoading}
        onClick={saveCode}
      >
        Save Code
      </Button>

      <Menu isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)}>
        <MenuButton 
          as={Button} 
          variant="outline"
          colorScheme="green"
          mb={4}
          ml={2}
          onClick={() => setIsDropdownOpen(prev => !prev)}
        >
          Give Access
        </MenuButton>
        <MenuList>
          {emails.map((email, index) => (
            <MenuItem key={index} display="flex" alignItems="center">
              {email}
              {isRemoving && (
                <IconButton
                  aria-label="Remove email"
                  icon={<CloseIcon />}
                  onClick={() => removeEmail(email)}
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                  ml={2}
                />
              )}
            </MenuItem>
          ))}
          <MenuItem onClick={toggleRemoveMode}>
            {isRemoving ? "Done Removing" : "Remove Email"}
          </MenuItem>
          <MenuItem onClick={() => setIsModalOpen(true)}>Enter New Email</MenuItem>
        </MenuList>
      </Menu>

      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Give Access</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="email">Enter Email to Give Access:</FormLabel>
              <Input
                id="email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter email"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleEmailSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Output;
