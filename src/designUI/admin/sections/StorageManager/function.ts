"use client";

import { useEffect, useState } from "react";
import { deleteFile, listFiles } from "@/lib/uploadClient";
import { UPLOAD_FOLDERS, type RemoteFile, type UploadFolder } from "@/lib/uploadFolders";

export function useStorageManager() {
  const [selectedFolder, setSelectedFolder] = useState<UploadFolder | null>(null);
  const [files, setFiles] = useState<RemoteFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewFile, setViewFile] = useState<RemoteFile | null>(null);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFolder) return;

    setIsLoading(true);
    listFiles(selectedFolder)
      .then(setFiles)
      .catch(() => setFiles([]))
      .finally(() => setIsLoading(false));
  }, [selectedFolder]);

  const openFolder = (folder: UploadFolder) => setSelectedFolder(folder);
  const closeFolder = () => {
    setSelectedFolder(null);
    setFiles([]);
  };

  const removeFile = async (file: RemoteFile) => {
    setDeletingUrl(file.url);
    await deleteFile(file.url);
    setFiles((current) => current.filter((item) => item.url !== file.url));
    setViewFile((current) => (current?.url === file.url ? null : current));
    setDeletingUrl(null);
  };

  return {
    folders: UPLOAD_FOLDERS,
    selectedFolder,
    openFolder,
    closeFolder,
    files,
    isLoading,
    viewFile,
    setViewFile,
    deletingUrl,
    removeFile,
  };
}
