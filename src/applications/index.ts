import { DefaultApp } from "./App";
import { Finder} from "./Finder";
import { TextEditor } from "./Text Editor";

export const Applications = [Finder, DefaultApp, TextEditor]
export type Apps = TextEditor | DefaultApp | Finder