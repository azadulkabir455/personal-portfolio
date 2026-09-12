import Container from "@/designUI/elements/Container/Container";
import Text from "@/designUI/elements/Text/Text";
import Icon from "@/designUI/elements/Icon/Icon";
import { folderLabels } from "../types";
import type { StorageFolderCardProps } from "../types";

export default function StorageFolderCard({ folder, onSelect }: StorageFolderCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(folder)}
      className="flex cursor-pointer flex-col items-start gap-3 rounded-[14px] border border-[#E4E4E4] bg-white p-5 text-left transition-colors duration-200 hover:border-[#242423]"
    >
      <Container className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#F7F7F7] text-[#171717]">
        <Icon name="FaFolderOpen" width={20} height={20} />
      </Container>
      <Text className="font-sans text-[14px] font-semibold text-[#171717]">
        {folderLabels[folder]}
      </Text>
    </button>
  );
}
