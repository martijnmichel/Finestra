import { VSCode } from "./VSCode";
import { Finder } from "./Finder";
import { TextEditor } from "./Text Editor";
import { Safari } from "./Safari";
import { Youtube } from "./Youtube";
import { Spotify } from "./Spotify";
import { Settings } from "./Settings";
import { About } from "./About";
import { Sonid } from "./projects/Sonid";

export const Applications: Apps[] = [
  Finder,
  VSCode,
  TextEditor,
  Safari,
  Youtube,
  Spotify,
  Settings,
  About,
  Sonid,
];
export type Apps =
  | typeof TextEditor
  | typeof VSCode
  | typeof Finder
  | typeof Safari
  | typeof Youtube
  | typeof Spotify
  | typeof Settings
  | typeof About
  | typeof Sonid;

export interface NavMenuItem {
  label: string;
  function: () => void;
}
export interface NavMenu {
  label: string;
  items: NavMenuItem[];
}
