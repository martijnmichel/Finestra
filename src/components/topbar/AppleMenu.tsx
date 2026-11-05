import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { startApp } from "@/store/actions/startApp";
import { useAppContext } from "@/store";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const AppleMenu = () => {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "topnav-button focus:outline-none",
            open && "bg-[var(--macos-accent)] text-white"
          )}
          aria-label={t("common:menuBar.appleMenu")}
        >
          <Icon icon="ant-design:apple-filled" className="!size-[14px]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={4} className="min-w-[220px]">
        <DropdownMenuItem
          onClick={() => startApp("About")(dispatch)}
        >
          {t("common:menuBar.aboutThisMac")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => startApp("Settings")(dispatch)}>
          {t("common:menuBar.systemSettings")}
          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          {t("common:menuBar.appStore")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          {t("common:menuBar.recentItems")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          {t("common:menuBar.forceQuit")}
          <DropdownMenuShortcut>⌥⌘⎋</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>{t("common:menuBar.sleep")}</DropdownMenuItem>
        <DropdownMenuItem disabled>
          {t("common:menuBar.restart")}
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          {t("common:menuBar.shutDown")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          {t("common:menuBar.lockScreen")}
          <DropdownMenuShortcut>⌃⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          {t("common:menuBar.logOut")}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
