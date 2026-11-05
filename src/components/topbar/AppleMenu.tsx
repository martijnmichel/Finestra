import { useState } from "react";
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
import { AboutThisMac } from "./AboutThisMac";
import {
  LockScreenOverlay,
  SleepOverlay,
  SystemAlertDialog,
  type SystemAlertKind,
} from "./SystemAlerts";
import { OS_NAME } from "@/lib/os";

export const AppleMenu = () => {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [alertKind, setAlertKind] = useState<SystemAlertKind>(null);
  const [sleeping, setSleeping] = useState(false);
  const [locked, setLocked] = useState(false);

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "topnav-button focus:outline-none",
              menuOpen && "bg-[var(--macos-accent)] text-white"
            )}
            aria-label={t("common:menuBar.appleMenu")}
          >
            <Icon icon="ant-design:apple-filled" className="!size-[14px]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={4} className="min-w-[220px]">
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setAboutOpen(true);
            }}
          >
            {t("common:menuBar.aboutThisMac")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              startApp("Settings")(dispatch);
            }}
          >
            {t("common:menuBar.systemSettings")}
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setAlertKind("appStore");
            }}
          >
            {t("common:menuBar.appStore")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            {t("common:menuBar.recentItems")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setAlertKind("forceQuit");
            }}
          >
            {t("common:menuBar.forceQuit")}
            <DropdownMenuShortcut>⌥⌘⎋</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setSleeping(true);
            }}
          >
            {t("common:menuBar.sleep")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setAlertKind("restart");
            }}
          >
            {t("common:menuBar.restart")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setAlertKind("shutDown");
            }}
          >
            {t("common:menuBar.shutDown")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setLocked(true);
            }}
          >
            {t("common:menuBar.lockScreen")}
            <DropdownMenuShortcut>⌃⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setAlertKind("logOut");
            }}
          >
            {t("common:menuBar.logOut", { os: OS_NAME })}
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AboutThisMac open={aboutOpen} onOpenChange={setAboutOpen} />
      <SystemAlertDialog kind={alertKind} onClose={() => setAlertKind(null)} />
      <SleepOverlay active={sleeping} onWake={() => setSleeping(false)} />
      <LockScreenOverlay active={locked} onUnlock={() => setLocked(false)} />
    </>
  );
};
