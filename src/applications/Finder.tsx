import React, { useEffect, useState } from "react";
import { Application } from "../store/atoms/applications";
import FinderIcon from "../icons/finder.png";
import { AppActions } from "../components/application/AppActions";
import { Icon } from "@iconify/react";

export class Finder extends Application {
  public name = "Finder";
  static icon = () => <img src={FinderIcon} alt="Logo" />;

  titleBar = true;

  public category = "default";

  component = () => FinderApp(this.id);

  constructor() {
    super();
  }
}

export const FinderApp = (id: string) => {
  const [items, setItems] = useState<
    { id: number; filename: string; date: string }[]
  >([]);

  const [active, setActive] = useState("Recents");

  const getFiles = () => {
    fetch("https://my.api.mockaroo.com/files.json?key=25574bd0")
      .then((response) => response.json())
      .then((json) => setItems(json));
  };
  const favs = [
    {
      label: "Recents",
      icon: <Icon icon="bi:clock" />,
    },
    { label: "Applications", icon: <Icon icon="simple-icons:appstore" /> },
    { label: "Desktop", icon: <Icon icon="akar-icons:desktop-device" /> },
    { label: "Documents", icon: <Icon icon="carbon:document-blank" /> },
    {
      label: "Downloads",
      icon: <Icon icon="iconoir:download-circled-outline" />,
    },
  ];

  useEffect(() => {
    getFiles();
  }, []);
  return (
    <div className="flex h-full">
      <div
        className="h-full py-2 w-1/3 bg-gray-200/90 border-r border-neutral-200 rounded-l-lg"
        data-handle={id}
      >
        <AppActions id={id} />

        <div className=" px-2 py-5">
          <h6 className="text-xs font-bold text-gray-400 mb-1">Favorites</h6>
          {favs.map((fav) => {
            return (
              <div
                className={`flex gap-2 align-center mb-1 p-1 rounded-md cursor-pointer ${
                  active === fav.label ? "bg-blue-500 text-white" : ""
                }`}
                key={fav.label}
                onClick={() => {
                  getFiles();
                  setActive(fav.label);
                }}
              >
                <span
                  className={`${
                    active === fav.label ? "" : "text-blue-500"
                  } text-sm`}
                >
                  {fav.icon}
                </span>{" "}
                <span className="text-xs">{fav.label}</span>
              </div>
            );
          })}
        </div>
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

            <Icon className="icon" icon="fluent:share-ios-24-regular" />

            <Icon className="icon" icon="fluent:tag-16-regular" />

            <Icon className="icon" icon="fluent:more-circle-32-regular" />
          </div>
        </div>

        <div className="h-full overflow-y-auto px-3 py-1">
          <div>
            {items.map((item, i) => {
              return (
                i < 20 && (
                  <div
                    className={`${
                      i % 2 === 1 ? "bg-gray-100" : ""
                    } text-sm w-full px-3 flex justify-between cursor-pointer`}
                    key={`itemkey-${item.id}`}
                  >
                    <span>{item.filename}</span>
                    <span>{item.date}</span>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
