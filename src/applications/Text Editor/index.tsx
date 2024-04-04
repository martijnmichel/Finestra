import React, { useEffect, useRef, useState } from "react";
import { Application } from "../application";
import Icon from "../../icons/text-editor.png";

import { Editor } from "@tinymce/tinymce-react";
import { useAppContext } from "../../store";
import { startApp } from "../../store/actions/startApp";
import { closeApp } from "../../store/actions/closeApp";
import { AppNavigation } from "../../components/application/AppNavigation";

export class TextEditor extends Application {
  public name = "TextEditor";

  static icon = () => <img src={Icon} alt="Logo" />;

  public category = "default";

  component = () => TextEditorApp(this.id);

  constructor() {
    super();
  }
}

export const TextEditorApp = (id: string) => {
  const [text, setText] = useState("");

  const { dispatch } = useAppContext();

  const navigation = [
    {
      label: "File",
      items: [
        {
          label: "New File",
          function: () => {
            startApp("Text Editor")(dispatch);
          },
        },
        {
          label: "New Window",
          function: () => {
            startApp("Text Editor")(dispatch);
          },
        },
        {
          label: "separator",
        },
        {
          label: "Close",
          function: () => {
            closeApp(id)(dispatch);
          },
        },
      ],
    },
    {
      label: "Window",
      items: [
        {
          label: "New File",
          function: () => {
            startApp("Text Editor")(dispatch);
          },
        },
        {
          label: "New Window",
          function: () => {
            startApp("Text Editor")(dispatch);
          },
        },
        {
          label: "separator",
        },
        {
          label: "Close",
          function: () => {
            closeApp(id)(dispatch);
          },
        },
      ],
    },
  ];

  return (
    <>
    {/** @ts-ignore */}
      <Editor
        initialValue="<p>Start typing a story...</p>"
        apiKey="r6ay9fo6y8tbazrg719vx6sbn40bjzlyi0agfpbo65evbpqn"
        init={{
          height: "100%",
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <AppNavigation items={navigation} id={id} />
    </>
  );
};
