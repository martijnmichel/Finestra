import { useState, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import {
  CircleX,
  Clock,
  Laptop,
  Lock,
  LogOut,
  Moon,
  Power,
  RotateCcw,
  Settings2,
  ShoppingBag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { startApp } from "@/store/actions/startApp";
import { useAppContext } from "@/store";
import { useWindowManager } from "@/services/WindowManager";
import { cn } from "@/lib/utils";
import { AboutThisMac } from "./AboutThisMac";
import {
  LockScreenOverlay,
  SleepOverlay,
  SystemAlertDialog,
  type SystemAlertKind,
} from "./SystemAlerts";

const USER_NAME = "Martijn van der Eijk";

const MenuIcon = ({ children }: { children: ReactNode }) => (
  <span className="macos-menu-icon" aria-hidden>
    {children}
  </span>
);

export const AppleMenu = () => {
  const { t } = useTranslation();
  const { dispatch } = useAppContext();
  const { activeApp } = useWindowManager();
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [alertKind, setAlertKind] = useState<SystemAlertKind>(null);
  const [sleeping, setSleeping] = useState(false);
  const [locked, setLocked] = useState(false);

  const forceQuitLabel = activeApp?.name
    ? t("common:menuBar.forceQuitApp", { app: activeApp.name })
    : t("common:menuBar.forceQuit");

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
        <DropdownMenuContent align="start" sideOffset={6} className="min-w-[248px]">
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setAboutOpen(true);
            }}
          >
            <MenuIcon>
              <Laptop strokeWidth={1.75} />
            </MenuIcon>
            {t("common:menuBar.aboutThisMac")}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              startApp("Settings")(dispatch);
            }}
          >
            <MenuIcon>
              <Settings2 strokeWidth={1.75} />
            </MenuIcon>
            {t("common:menuBar.systemSettings")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setAlertKind("appStore");
            }}
          >
            <MenuIcon>
              <ShoppingBag strokeWidth={1.75} />
            </MenuIcon>
            {t("common:menuBar.appStore")}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <MenuIcon>
                <Clock strokeWidth={1.75} />
              </MenuIcon>
              {t("common:menuBar.recentItems")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="min-w-[180px]">
              <DropdownMenuItem disabled>
                {t("common:menuBar.recentEmpty")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                {t("common:menuBar.clearRecent")}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setAlertKind("forceQuit");
            }}
          >
            <MenuIcon>
              <CircleX strokeWidth={1.75} />
            </MenuIcon>
            {forceQuitLabel}
            <DropdownMenuShortcut>⌥⌘⎋</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setSleeping(true);
            }}
          >
            <MenuIcon>
              <Moon strokeWidth={1.75} />
            </MenuIcon>
            {t("common:menuBar.sleep")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setAlertKind("restart");
            }}
          >
            <MenuIcon>
              <RotateCcw strokeWidth={1.75} />
            </MenuIcon>
            {t("common:menuBar.restart")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setAlertKind("shutDown");
            }}
          >
            <MenuIcon>
              <Power strokeWidth={1.75} />
            </MenuIcon>
            {t("common:menuBar.shutDown")}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setLocked(true);
            }}
          >
            <MenuIcon>
              <Lock strokeWidth={1.75} />
            </MenuIcon>
            {t("common:menuBar.lockScreen")}
            <DropdownMenuShortcut>⌃⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false);
              setAlertKind("logOut");
            }}
          >
            <MenuIcon>
              <LogOut strokeWidth={1.75} />
            </MenuIcon>
            {t("common:menuBar.logOut", { name: USER_NAME })}
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
