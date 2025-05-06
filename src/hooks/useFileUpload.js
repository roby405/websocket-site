import { useState, useCallback } from "react";
import { useAuth } from "../components/sections/AuthContext";

const ServerLocation = import.meta.env.VITE_API_BASE_URL;

export default function useFileUpload(allowedFormats=["image/*"], maxSize=1024) {
  const [fileUploadState, setFileUploadState] = useState({
    loading: false,
    error: "",
    uploadedFile: {
      url: "",
      size: 0,
    }
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { token } = useAuth();

  const validateFile = useCallback((file) => {
    if (!allowedFormats.includes(file.type)) {
      return `file has type ${file.type} when all accepted file types are ${allowedFormats.join(", ")}`
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `file has size ${file.size/1024/1024} which is bigger than the max size ${maxSize}`;
    }
    return null;
  }, [allowedFormats, maxSize]);

  const handleFileSelect = useCallback((file) => {
    console.log(file);
    if (!file)
        return;

    const validateError = validateFile(file);
    if (validateError) {
      setFileUploadState((f) => ({...f, error: validateError}));
      return;
    }
    setSelectedFile(file);
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreview(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  }, [validateFile]);

  const handleFileUpload = useCallback(async (url) => {
    if (!selectedFile) {
      setFileUploadState((f) => ({...f, error: "No file selected"}));
      return;
    }

    setFileUploadState((f) => ({...f, loading: true}));

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch(ServerLocation + url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("File could not be uploaded");
      }

      const data = await res.json();

      setFileUploadState({
        loading: false,
        error: "",
        uploadedFile: data
      });

      return data;
    } catch (error) {
      setFileUploadState((f) => ({...f, error: error}));
    } finally {
      setFileUploadState((f) => ({...f, loading: false}));
    }

    
  }, [selectedFile, token]);
  
  const resetUploadState = () => setFileUploadState({
    loading: false,
    error: "",
    uploadedFile: {
      url: "",
      size: 0,
    }
  });
  return {
    handleFileSelect,
    handleFileUpload,
    selectedFile,
    preview,
    loading: fileUploadState.loading,
    error: fileUploadState.error,
    uploadedFile: fileUploadState.uploadedFile,
    resetUploadState
  };
}