export interface NavMenuItem {
  label: string;
  function?: () => void;
  shortcut?: string;
  disabled?: boolean;
  type?: "checkbox";
  checked?: boolean;
  submenu?: NavMenuItem[];
}

export interface NavMenu {
  label: string;
  items: NavMenuItem[];
}
