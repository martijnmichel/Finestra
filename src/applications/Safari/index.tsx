import React, { useState } from "react";
import { Application } from "../../store/atoms/applications";
import SafariIcon from "../../icons/safari.png";
import { AppActions } from "../../components/application/AppActions";
import { Icon } from "@iconify/react";

export class Safari extends Application {
  public name = "Safari";
  static icon = () => <img src={SafariIcon} alt="Logo" />;
  public category = "default";
  titleBar = true;

  width = 1280;

  component = () => SafariApp(this.id);

  constructor() {
    super();
  }
}

export const SafariApp = (id: string) => {
  const [address, setAddress] = useState("https://tocadovision.nl");
  const [url, setUrl] = useState("https://tocadovision.nl");
  const [history, setHistory] = useState(["https://tocadovision.nl"]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setUrl(address);
    setHistory([...history, address]);
  };

  return (
    <>
      <div
        className="px-2 py-[10px] flex items-center justify-between"
        data-handle={id}
      >
        <div className="icon-container">
          <AppActions id={id} />

          <Icon className="icon" icon="bi:window-sidebar" />

          <Icon className="icon" icon="ic:baseline-arrow-back-ios" />

          <Icon className="icon" icon="ic:baseline-arrow-forward-ios" />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <Icon className="icon" icon="bi:shield-shaded" />

          <input
            value={address}
            className="bg-neutral-100 text-neutral-500 text-[12px] border-[1px] shadow-sm rounded-md px-20 py-[3px]"
            onChange={(val) => setAddress(val.target.value)}
          />
        </form>

        <div className="flex gap-4">
          <Icon className="icon" icon="entypo:share-alternitive" />

          <Icon className="icon" icon="akar-icons:plus" />

          <Icon className="icon" icon="uil:apps" />
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-200"></div>

      <iframe
        src={url}
        width="100%"
        height="100%"
        className="rounded-b-lg bg-white"
      />
    </>
  );
};
