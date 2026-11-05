import React, { useEffect, useMemo, useRef, useState } from "react";
import { AppButton } from "./application/AppButton";
import { Applications } from "../applications";
import { useAppContext } from "../store";
import { startApp } from "../store/actions/startApp";
import { toggleApp } from "@/store/actions/toggleApp";
import { cn } from "@/lib/utils";
import { useOsFormFactor } from "@/hooks/useOsFormFactor";
import {
  AboutWidget,
  ClockWidget,
  ContactWidget,
  ProjectsWidget,
} from "./widgets";
import {
  buildHomeItems,
  buildTodayItems,
  homeGridFor,
  paginateHomeItems,
  type HomeWidgetId,
  type HomeWidgetLayout,
  type PlacedHomeItem,
} from "./home/homeGrid";

const homeApps = [
  Applications.About,
  Applications.Siri,
  Applications.Request,
  Applications.Finder,
  Applications.Safari,
  Applications.Settings,
  Applications.Terminal,
  Applications.Sonid,
  Applications.DirectusMobile,
] as const;

const homeAppNames = homeApps.map((A) => A.appName);

const FILL =
  "!h-full !w-full !max-w-none min-h-0 min-w-0 justify-self-stretch self-stretch";

function renderWidget(id: HomeWidgetId, size: HomeWidgetLayout) {
  switch (id) {
    case "clock":
      return <ClockWidget size={size === "lg" ? "md" : size} className={FILL} />;
    case "about":
      return <AboutWidget size={size === "lg" ? "md" : size} className={FILL} />;
    case "projects":
      return <ProjectsWidget size={size} className={FILL} />;
    case "contact":
      return <ContactWidget size={size} className={FILL} />;
  }
}

function HomeGridPage({
  items,
  colsClass,
  gapClass,
  iconSize,
  rowHeight,
}: {
  items: PlacedHomeItem[];
  colsClass: string;
  gapClass: string;
  iconSize: string;
  rowHeight: number;
}) {
  const { state, dispatch } = useAppContext();
  const maxRow = items.reduce(
    (m, item) => Math.max(m, item.row + item.span.rows),
    1
  );

  return (
    <div
      className={cn("mx-auto grid w-full content-start", colsClass, gapClass)}
      style={{
        gridTemplateRows: `repeat(${Math.max(maxRow, 1)}, minmax(${rowHeight}px, auto))`,
      }}
    >
      {items.map((item) => {
        const style: React.CSSProperties = {
          gridColumn: `${item.col + 1} / span ${item.span.cols}`,
          gridRow: `${item.row + 1} / span ${item.span.rows}`,
        };

        if (item.kind === "widget") {
          return (
            <div key={`w-${item.id}-${item.col}-${item.row}`} style={style} className="min-h-0 min-w-0">
              {renderWidget(item.id, item.size)}
            </div>
          );
        }

        const AppClass = homeApps.find((A) => A.appName === item.appName);
        if (!AppClass) return null;

        return (
          <div
            key={`a-${item.appName}`}
            style={style}
            className="flex min-h-0 min-w-0 items-center justify-center"
          >
            <AppButton
              size={iconSize}
              appIcon={AppClass.icon()}
              appName={AppClass.appName}
              onClick={() => {
                const app = state.applications.find(
                  (a) => a.name === AppClass.appName
                );
                if (app) {
                  toggleApp(app.id)(dispatch);
                } else {
                  startApp(AppClass.appName)(dispatch);
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function PageDots({
  count,
  page,
  onSelect,
}: {
  count: number;
  page: number;
  onSelect: (index: number) => void;
}) {
  if (count <= 1) return null;
  return (
    <div
      className="flex shrink-0 items-center justify-center gap-1.5 pb-1 pt-2"
      role="tablist"
      aria-label="Home pages"
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={page === i}
          aria-label={`Page ${i + 1}`}
          onClick={() => onSelect(i)}
          className={cn(
            "size-1.5 rounded-full transition-opacity",
            page === i ? "bg-white opacity-90" : "bg-white/45 hover:bg-white/70"
          )}
        />
      ))}
    </div>
  );
}

/** Horizontal snap pages — Today (iPhone) + Home grid page(s). */
function PagedHome({
  pages,
  initialPage,
  colsClass,
  gapClass,
  iconSize,
  rowHeight,
}: {
  pages: PlacedHomeItem[][];
  initialPage: number;
  colsClass: string;
  gapClass: string;
  iconSize: string;
  rowHeight: number;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = el.clientWidth * initialPage;
  }, [initialPage]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const sync = () => {
      const w = el.clientWidth || 1;
      setPage(Math.round(el.scrollLeft / w));
    };

    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const goTo = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * index, behavior: "smooth" });
    setPage(index);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        ref={scrollerRef}
        className={cn(
          "flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden",
          "overscroll-x-contain touch-pan-x",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {pages.map((items, i) => (
          <section
            key={i}
            className="h-full w-full min-w-full shrink-0 basis-full snap-center overflow-y-auto overscroll-contain px-0.5"
          >
            <HomeGridPage
              items={items}
              colsClass={colsClass}
              gapClass={gapClass}
              iconSize={iconSize}
              rowHeight={rowHeight}
            />
          </section>
        ))}
      </div>
      <PageDots count={pages.length} page={page} onSelect={goTo} />
    </div>
  );
}

/** Plain Home Screen — no Motion (keeps window dragging snappy on iPad). */
export const HomeScreen = () => {
  const { state } = useAppContext();
  const { isIos, formFactor } = useOsFormFactor();
  const hasForegroundApp = state.applications.some((a) => !a.minimized);

  const grid = homeGridFor(isIos ? "ios" : "ipados");
  const rowHeight = isIos ? 92 : 96;

  const pages = useMemo(() => {
    const home = paginateHomeItems(
      buildHomeItems(isIos ? "ios" : "ipados", homeAppNames),
      grid.cols,
      grid.rowsPerPage
    );

    if (isIos) {
      const today = paginateHomeItems(
        buildTodayItems(),
        grid.cols,
        grid.rowsPerPage
      );
      return [...today, ...home];
    }

    return home;
  }, [isIos, grid.cols, grid.rowsPerPage]);

  // iPhone: Today is page 0; land on first Home page.
  const initialPage = isIos ? 1 : 0;

  return (
    <div
      className={cn(
        "absolute inset-0 z-[5] overflow-hidden",
        hasForegroundApp && "pointer-events-none"
      )}
      style={{
        paddingTop: "calc(var(--status-strip-height) + 16px)",
        paddingBottom:
          "calc(var(--home-dock-offset, var(--mobile-dock-offset)) + 16px)",
        paddingLeft: "max(16px, env(safe-area-inset-left, 0px))",
        paddingRight: "max(16px, env(safe-area-inset-right, 0px))",
      }}
      aria-hidden={hasForegroundApp}
      data-os-form-factor={formFactor}
    >
      <div className="mx-auto h-full w-full max-w-3xl">
        <PagedHome
          pages={pages}
          initialPage={Math.min(initialPage, pages.length - 1)}
          colsClass={grid.colsClass}
          gapClass={grid.gapClass}
          iconSize={grid.iconSize}
          rowHeight={rowHeight}
        />
      </div>
    </div>
  );
};
