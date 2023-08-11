import { VSCode } from "./VSCode";
import { Finder } from "./Finder";
import { TextEditor } from "./Text Editor";
import { Safari } from "./Safari";
import { Youtube } from "./Youtube";
import { Spotify } from "./Spotify";
import { Settings } from "./Settings";
import { About } from "./About";
import { Sonid } from "./projects/Sonid";
import { Terminal } from "./Terminal";
import { WMS } from "./projects/WMS";
import { WordPress } from "./projects/Wordpress";
import { ECBaseBestelExpo } from "./projects/ECBaseBestelExpo";
import { ECBaseBestelNext } from "./projects/ECBaseBestelNext";

export type App =
  | "Finder"
  | "VSCode"
  | "TextEditor"
  | "Safari"
  | "Youtube"
  | "Spotify"
  | "Settings"
  | "About"
  | "Sonid"
  | "WMS"
  | "WordPress"
  | "ECBaseBestelExpo"
  | "ECBaseBestelNext"
  | "Terminal";

export const Applications: { [x in App]: Apps } = {
  Finder: Finder,
  VSCode: VSCode,
  TextEditor: TextEditor,
  Safari: Safari,
  Youtube: Youtube,
  Spotify: Spotify,
  Settings: Settings,
  About: About,
  Sonid: Sonid,
  WMS: WMS,
  WordPress: WordPress,
  ECBaseBestelExpo: ECBaseBestelExpo,
  ECBaseBestelNext: ECBaseBestelNext,
  Terminal: Terminal,
};
export type Apps =
  | typeof TextEditor
  | typeof VSCode
  | typeof Finder
  | typeof Safari
  | typeof Youtube
  | typeof Spotify
  | typeof Settings
  | typeof About
  | typeof Sonid
  | typeof WMS
  | typeof WordPress
  | typeof ECBaseBestelExpo
  | typeof ECBaseBestelNext
  | typeof Terminal;

export interface NavMenuItem {
  label: string;
  function?: () => void;
}
export interface NavMenu {
  label: string;
  items: NavMenuItem[];
}
