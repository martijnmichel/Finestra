export type FinderFile = {
  id: string;
  name: string;
  kind: string;
  date: string;
  size: string;
};

export type FinderSidebarItem = {
  id: string;
  /** Lucide icon key */
  icon:
    | "clock"
    | "app-window"
    | "monitor"
    | "file-text"
    | "download"
    | "image"
    | "music"
    | "film"
    | "cloud"
    | "users"
    | "hard-drive"
    | "laptop"
    | "network"
    | "home";
  section: "favorites" | "icloud" | "locations" | "tags";
  /** Tag colour when section === tags */
  tagColor?: string;
};

export const FINDER_SIDEBAR: FinderSidebarItem[] = [
  { id: "recents", icon: "clock", section: "favorites" },
  { id: "applications", icon: "app-window", section: "favorites" },
  { id: "desktop", icon: "monitor", section: "favorites" },
  { id: "documents", icon: "file-text", section: "favorites" },
  { id: "downloads", icon: "download", section: "favorites" },
  { id: "pictures", icon: "image", section: "favorites" },
  { id: "music", icon: "music", section: "favorites" },
  { id: "movies", icon: "film", section: "favorites" },
  { id: "icloud-drive", icon: "cloud", section: "icloud" },
  { id: "shared", icon: "users", section: "icloud" },
  { id: "martijn-mac", icon: "laptop", section: "locations" },
  { id: "macintosh-hd", icon: "hard-drive", section: "locations" },
  { id: "network", icon: "network", section: "locations" },
  { id: "tag-red", icon: "home", section: "tags", tagColor: "#ff3b30" },
  { id: "tag-orange", icon: "home", section: "tags", tagColor: "#ff9500" },
  { id: "tag-yellow", icon: "home", section: "tags", tagColor: "#ffcc00" },
  { id: "tag-green", icon: "home", section: "tags", tagColor: "#34c759" },
  { id: "tag-blue", icon: "home", section: "tags", tagColor: "#007aff" },
  { id: "tag-purple", icon: "home", section: "tags", tagColor: "#af52de" },
  { id: "tag-grey", icon: "home", section: "tags", tagColor: "#8e8e93" },
];

const FILE_POOL: Omit<FinderFile, "id">[] = [
  { name: "Quarterly Report.pdf", kind: "PDF Document", date: "Today, 09:14", size: "2.4 MB" },
  { name: "Product Roadmap.key", kind: "Keynote", date: "Yesterday, 18:02", size: "8.1 MB" },
  { name: "Invoice-2026-04.pdf", kind: "PDF Document", date: "4 Apr 2026", size: "186 KB" },
  { name: "Design System.fig", kind: "Figma Document", date: "2 Apr 2026", size: "14.2 MB" },
  { name: "Hero Shot.png", kind: "PNG Image", date: "1 Apr 2026", size: "3.8 MB" },
  { name: "Team Photo.heic", kind: "HEIC Image", date: "28 Mar 2026", size: "5.1 MB" },
  { name: "Demo Reel.mov", kind: "QuickTime Movie", date: "22 Mar 2026", size: "420 MB" },
  { name: "Podcast Episode 12.m4a", kind: "Apple MPEG-4 Audio", date: "18 Mar 2026", size: "48 MB" },
  { name: "Notes from Call.txt", kind: "Plain Text", date: "15 Mar 2026", size: "4 KB" },
  { name: "Budget.xlsx", kind: "Excel Spreadsheet", date: "12 Mar 2026", size: "912 KB" },
  { name: "Contract Draft.docx", kind: "Word Document", date: "10 Mar 2026", size: "640 KB" },
  { name: "Archive.zip", kind: "ZIP Archive", date: "8 Mar 2026", size: "112 MB" },
  { name: "Wallpaper Candidates", kind: "Folder", date: "5 Mar 2026", size: "--" },
  { name: "Client Assets", kind: "Folder", date: "1 Mar 2026", size: "--" },
  { name: "README.md", kind: "Markdown Text", date: "27 Feb 2026", size: "3 KB" },
  { name: "package.json", kind: "JSON Text", date: "27 Feb 2026", size: "2 KB" },
  { name: "Screenshot 2026-02-20.png", kind: "PNG Image", date: "20 Feb 2026", size: "1.2 MB" },
  { name: "Meeting Recording.wav", kind: "WAVE Audio", date: "14 Feb 2026", size: "88 MB" },
  { name: "Presentation Backup.key", kind: "Keynote", date: "9 Feb 2026", size: "22 MB" },
  { name: "Travel Itinerary.pdf", kind: "PDF Document", date: "2 Feb 2026", size: "540 KB" },
  { name: "Logo Final.svg", kind: "SVG Document", date: "28 Jan 2026", size: "48 KB" },
  { name: "Fonts", kind: "Folder", date: "20 Jan 2026", size: "--" },
  { name: "Resume.pdf", kind: "PDF Document", date: "12 Jan 2026", size: "290 KB" },
  { name: "Holiday Photos", kind: "Folder", date: "2 Jan 2026", size: "--" },
];

const byFolder: Record<string, number[]> = {
  recents: [0, 1, 4, 6, 8, 11, 16, 3, 9, 12],
  applications: [1, 3, 15, 14],
  desktop: [4, 16, 8, 12, 0],
  documents: [0, 1, 2, 9, 10, 14, 19, 22],
  downloads: [11, 6, 7, 16, 17, 2],
  pictures: [4, 5, 16, 20, 23],
  music: [7, 17],
  movies: [6],
  "icloud-drive": [0, 3, 12, 13, 14],
  shared: [10, 0, 8],
  "martijn-mac": [12, 13, 15, 21],
  "macintosh-hd": [12, 13, 21, 15],
  network: [13, 11],
  "tag-red": [2, 10],
  "tag-orange": [9, 1],
  "tag-yellow": [8, 14],
  "tag-green": [0, 19],
  "tag-blue": [3, 4, 20],
  "tag-purple": [1, 6],
  "tag-grey": [11, 15],
};

export const filesForFolder = (folderId: string): FinderFile[] => {
  const indexes = byFolder[folderId] ?? byFolder.recents;
  return indexes.map((i, n) => ({
    id: `${folderId}-${n}`,
    ...FILE_POOL[i % FILE_POOL.length],
  }));
};
