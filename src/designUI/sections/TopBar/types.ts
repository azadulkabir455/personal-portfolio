export type TopBarMode = "transparent" | "sticky" | "hidden" | "menu";

export interface TopBarActionButtonsProps {
  talkLabel: string;
  talkHref: string;
  resumeLabel: string;
  resumeHref: string;
}

export interface TopBarMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}
