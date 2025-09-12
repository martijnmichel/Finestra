import React, { useEffect, useRef, useState } from "react";
import { Application } from "./application";
import Icon from "../icons/Terminal.png";
import { Terminal as XTerm } from "@xterm/xterm";
import { AppActions } from "../components/application/AppActions";
import "../../node_modules/xterm/css/xterm.css";
import { FitAddon } from "xterm-addon-fit";
export class Terminal extends Application {
  public name = "Terminal";
  component = () => TerminalApp(this.id);
  static icon = () => <img src={Icon} alt="Logo" />;
  public category = "default";
  width = 800;
  height = 600;
  titleBar = true;
  multiple = true;
}

export const TerminalApp = (id: string) => {
  var term = new XTerm({ cursorBlink: true, convertEol: true });
  useEffect(() => {
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    const el = document.getElementById(`xterm-${id}`);
    if (el) term.open(el);
    fitAddon.fit();

    term.write("Welcome to xterm\nStart typing...\n\n$ ");

    term.focus();

    term.onKey((event) => {
      console.log(event);
      if (event.key === "\r") {
        term.writeln(event.key);
        term.write("Thanks for showing interest in my work! \n");
        term.write("You can find me on GitHub at https://github.com/martijnmichel\n");
        term.write("And on LinkedIn at https://www.linkedin.com/in/martijn-ensing-159582207/\n");
        term.write("$ ");
      } else term.write(event.key);
    });
  }, []);
  return (
    <div
      className="h-full rounded-lg overflow-hidden dark"
    >
      <div className="icon-container px-2 py-3 dark:bg-black" data-handle={id}>
        <AppActions id={id} />
      </div>
      <div className="h-full overflow-hidden  dark:bg-black" id={`xterm-${id}`} />
    </div>
  );
};
