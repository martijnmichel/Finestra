import { VSCode } from "./VSCode";
import { Finder } from "./Finder";
import { TextEditor } from "./Text Editor";
import { Safari } from "./Safari";
import { Youtube } from "./Youtube";
import { Spotify } from "./Spotify";
import { Settings } from "./Settings";
import { About } from "./About";

export const Applications = [
  Finder,
  VSCode,
  TextEditor,
  Safari,
  Youtube,
  Spotify,
  Settings,
  About,
];
export type Apps =
  | TextEditor
  | VSCode
  | Finder
  | Safari
  | Youtube
  | Spotify
  | Settings
  | About;

export interface NavMenuItem {
  label: string;
  function: () => void;
}
export interface NavMenu {
  label: string;
  items: NavMenuItem[];
}
