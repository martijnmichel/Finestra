import { DefaultApp } from "./App";
import { Finder} from "./Finder";
import { TextEditor } from "./TextEditor";

export const Applications = [Finder, DefaultApp, TextEditor]
export type Apps = TextEditor | DefaultApp | Finder