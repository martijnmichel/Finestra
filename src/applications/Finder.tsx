import React from "react";
import { Application } from "../store/atoms/applications";
import FinderIcon from "../icons/finder.png";
import { AppActions } from "../components/application/AppActions";
import { Icon } from "@iconify/react";

export class Finder extends Application {
  public name = "Finder";
  static icon = () => <img src={FinderIcon} alt="Logo" />;

  titleBar = true;

  component = () => FinderApp(this.id);

  constructor() {
    super();
  }
}

export const FinderApp = (id: string) => {
  return (
    <div className="flex h-full">
      <div
        className="h-full py-2 w-1/3 bg-gray-200/90 border-r border-neutral-200 rounded-l-lg"
        data-handle={id}
      >
        <AppActions id={id} />
      </div>

      <div className="flex flex-col w-2/3">
        <div className="flex justify-between items-center bg-gray-100 border-b p-2 w-full rounded-tr-lg">
          <div className="flex">
            <Icon className="icon" icon="ic:baseline-arrow-back-ios" />

            <Icon className="icon" icon="ic:baseline-arrow-forward-ios" />

            <span className="text-md font-semibold ml-2">Downloads</span>
          </div>

          <div className="flex">
            <Icon className="icon" icon="bx:bx-list-ul"></Icon>
            <Icon className="icon" icon="majesticons:selector-line" />

            <Icon className="icon" icon="entypo:share-alternitive" />

            <Icon className="icon" icon="fluent:tag-16-regular" />

            <Icon className="icon" icon="fluent:more-circle-32-regular" />
          </div>
        </div>
      </div>
    </div>
  );
};
