import type { OsFormFactor } from "@/hooks/useOsFormFactor";
import type { WidgetSize } from "@/components/widgets/WidgetShell";

/** One CSS-grid cell footprint on the Home Screen. */
export type HomeGridSpan = {
  cols: number;
  rows: number;
};

export type HomeWidgetId = "clock" | "about" | "projects" | "contact";

export type HomeWidgetLayout = Exclude<WidgetSize, "fill">;

export type HomeGridItem =
  | {
      kind: "widget";
      id: HomeWidgetId;
      span: HomeGridSpan;
      size: HomeWidgetLayout;
    }
  | {
      kind: "app";
      appName: string;
      span: HomeGridSpan;
    };

export type HomeGridConfig = {
  cols: number;
  /** Max icon-rows per page before overflow starts a new page. */
  rowsPerPage: number;
  iconSize: string;
  gapClass: string;
  colsClass: string;
};

/** Apple-like Home grids: widgets and icons share the same columns. */
export const HOME_GRID: Record<"ios" | "ipados", HomeGridConfig> = {
  ios: {
    cols: 4,
    rowsPerPage: 7,
    iconSize: "62px",
    gapClass: "gap-x-4 gap-y-3",
    colsClass: "grid-cols-4",
  },
  ipados: {
    cols: 6,
    /** Tight enough that Contact + leftover apps spill to page 2. */
    rowsPerPage: 5,
    iconSize: "64px",
    gapClass: "gap-x-4 gap-y-4",
    colsClass: "grid-cols-6",
  },
};

export function homeGridFor(formFactor: OsFormFactor): HomeGridConfig {
  return formFactor === "ios" ? HOME_GRID.ios : HOME_GRID.ipados;
}

const APP = { cols: 1, rows: 1 } as const;

/** Widget footprints in grid cells (not fixed px — cells size them). */
const WIDGET_SPAN = {
  /** Small square — 2×2 */
  sm: { cols: 2, rows: 2 },
  /** Medium — 4×2 (never full 6-wide on iPad) */
  md: { cols: 4, rows: 2 },
  /** Large — 4×4 */
  lg: { cols: 4, rows: 4 },
} as const satisfies Record<HomeWidgetLayout, HomeGridSpan>;

function widget(
  id: HomeWidgetId,
  size: HomeWidgetLayout,
  span: HomeGridSpan = WIDGET_SPAN[size]
): HomeGridItem {
  return { kind: "widget", id, size, span };
}

function app(appName: string): HomeGridItem {
  return { kind: "app", appName, span: APP };
}

/**
 * Default Home composition.
 * iPhone Home (page after Today): clock + about + apps.
 * iPad: clock + about + projects on row 1; contact (4-wide) + apps fill beside/below.
 */
export function buildHomeItems(
  formFactor: OsFormFactor,
  appNames: readonly string[]
): HomeGridItem[] {
  const apps = appNames.map(app);

  if (formFactor === "ios") {
    return [widget("clock", "sm"), widget("about", "sm"), ...apps];
  }

  // iPad: Contact is medium (4 cols), not screen-wide.
  return [
    widget("clock", "sm"),
    widget("about", "sm"),
    widget("projects", "md"),
    widget("contact", "md"),
    ...apps,
  ];
}

/** Today / Widgets page (iPhone swipe-right). */
export function buildTodayItems(): HomeGridItem[] {
  return [
    widget("clock", "sm"),
    widget("about", "sm"),
    widget("projects", "md"),
    widget("contact", "md"),
  ];
}

export type PlacedHomeItem = HomeGridItem & { col: number; row: number };

function fits(
  occupied: boolean[][],
  cols: number,
  rows: number,
  col: number,
  row: number,
  span: HomeGridSpan
) {
  if (col + span.cols > cols || row + span.rows > rows) return false;
  for (let r = row; r < row + span.rows; r++) {
    for (let c = col; c < col + span.cols; c++) {
      if (occupied[r]?.[c]) return false;
    }
  }
  return true;
}

function mark(
  occupied: boolean[][],
  col: number,
  row: number,
  span: HomeGridSpan
) {
  for (let r = row; r < row + span.rows; r++) {
    if (!occupied[r]) occupied[r] = [];
    for (let c = col; c < col + span.cols; c++) {
      occupied[r][c] = true;
    }
  }
}

function placeOnPage(
  items: HomeGridItem[],
  cols: number,
  maxRows: number
): { placed: PlacedHomeItem[]; rest: HomeGridItem[] } {
  const occupied: boolean[][] = [];
  const placed: PlacedHomeItem[] = [];
  const rest: HomeGridItem[] = [];

  for (const item of items) {
    let placedItem = false;
    outer: for (let row = 0; row < maxRows; row++) {
      for (let col = 0; col < cols; col++) {
        if (fits(occupied, cols, maxRows, col, row, item.span)) {
          mark(occupied, col, row, item.span);
          placed.push({ ...item, col, row });
          placedItem = true;
          break outer;
        }
      }
    }
    if (!placedItem) rest.push(item);
  }

  return { placed, rest };
}

/** Pack items into pages; each page uses the same column count. */
export function paginateHomeItems(
  items: HomeGridItem[],
  cols: number,
  rowsPerPage: number
): PlacedHomeItem[][] {
  const pages: PlacedHomeItem[][] = [];
  let queue = [...items];
  let guard = 0;

  while (queue.length && guard < 20) {
    guard += 1;
    const { placed, rest } = placeOnPage(queue, cols, rowsPerPage);
    if (!placed.length) {
      // Item larger than a page — force it alone so we don't loop forever.
      const [head, ...tail] = queue;
      pages.push([{ ...head, col: 0, row: 0 }]);
      queue = tail;
      continue;
    }
    pages.push(placed);
    queue = rest;
  }

  return pages.length ? pages : [[]];
}
