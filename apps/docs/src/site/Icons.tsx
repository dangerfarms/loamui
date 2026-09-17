import {
  IconSun,
  IconMoon,
  IconBrandGithubFilled,
  IconSearch,
  IconMenu2,
  IconCheck,
  IconCopy,
  IconTerminal2,
  IconMessage,
  type IconProps,
} from "@tabler/icons-react";

export function SunIcon(props: IconProps) {
  return <IconSun size={18} aria-hidden="true" {...props} />;
}

export function MoonIcon(props: IconProps) {
  return <IconMoon size={18} aria-hidden="true" {...props} />;
}

export function GitHubIcon(props: IconProps) {
  return <IconBrandGithubFilled size={18} aria-hidden="true" {...props} />;
}

export function SearchIcon(props: IconProps) {
  return <IconSearch size={18} aria-hidden="true" {...props} />;
}

export function MenuIcon(props: IconProps) {
  return <IconMenu2 size={18} aria-hidden="true" {...props} />;
}

export function CheckIcon(props: IconProps) {
  return <IconCheck size={18} aria-hidden="true" {...props} />;
}

export function CopyIcon(props: IconProps) {
  return <IconCopy size={18} aria-hidden="true" {...props} />;
}

export function TerminalIcon(props: IconProps) {
  return <IconTerminal2 size={18} aria-hidden="true" {...props} />;
}

export function MessageIcon(props: IconProps) {
  return <IconMessage size={18} aria-hidden="true" {...props} />;
}
