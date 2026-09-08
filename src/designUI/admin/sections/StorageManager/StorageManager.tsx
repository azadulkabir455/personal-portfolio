"use client";

import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import { ArrowLeftIcon } from "@/designUI/utilities/icons";
import StorageFolderCard from "./comp/StorageFolderCard";
import StorageFileCard from "./comp/StorageFileCard";
import StorageFileModal from "./comp/StorageFileModal";
import { useStorageManager } from "./function";
import { FOLDER_LABELS } from "./types";

export default function StorageManager() {
  const {
    folders,
    selectedFolder,
    openFolder,
    closeFolder,
    files,
    isLoading,
    viewFile,
    setViewFile,
    deletingUrl,
    removeFile,
  } = useStorageManager();

  return (
    <Container className="flex w-full flex-col gap-6 rounded-[16px] border border-[#E4E4E4] bg-white p-4 lg:gap-8 lg:p-10">
      <Container className="flex items-start gap-3 border-b border-[#E4E4E4] pb-4 lg:gap-4 lg:pb-6">
        {selectedFolder && (
          <button
            type="button"
            onClick={closeFolder}
            aria-label="Back to folders"
            className="mt-0.5 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[8px] border border-[#E4E4E4] text-[#171717] transition-colors duration-150 hover:bg-[#F7F7F7] lg:mt-1"
          >
            <ArrowLeftIcon width={11} height={11} />
          </button>
        )}
        <Container className="flex flex-col gap-1.5 lg:gap-2">
          <Text variant="h2" className="font-sans text-[18px] font-semibold text-[#171717] lg:text-[24px]">
            {selectedFolder ? FOLDER_LABELS[selectedFolder] : "Storage"}
          </Text>
          <Text className="font-sans text-[12px] text-[#8A8A86] lg:text-[14px]">
            {selectedFolder
              ? "All uploaded files in this folder. Remove anything you no longer need."
              : "Browse uploaded files by section and clean up unused ones."}
          </Text>
        </Container>
      </Container>

      {!selectedFolder && (
        <Container className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {folders.map((folder) => (
            <StorageFolderCard key={folder} folder={folder} onSelect={openFolder} />
          ))}
        </Container>
      )}

      {selectedFolder && isLoading && (
        <Container className="flex items-center justify-center py-16">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#E4E4E4] border-t-[#171717]" />
        </Container>
      )}

      {selectedFolder && !isLoading && files.length === 0 && (
        <Text className="py-10 text-center font-sans text-[13px] text-[#8A8A86]">
          No files uploaded here yet.
        </Text>
      )}

      {selectedFolder && !isLoading && files.length > 0 && (
        <Container className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {files.map((file) => (
            <StorageFileCard
              key={file.url}
              file={file}
              onView={() => setViewFile(file)}
              onDelete={() => void removeFile(file)}
              isDeleting={deletingUrl === file.url}
            />
          ))}
        </Container>
      )}

      <StorageFileModal
        file={viewFile}
        onClose={() => setViewFile(null)}
        onDelete={(file) => void removeFile(file)}
        isDeleting={deletingUrl === viewFile?.url}
      />
    </Container>
  );
}
