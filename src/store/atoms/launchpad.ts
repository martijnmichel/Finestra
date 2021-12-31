import { atom } from "recoil";

export const launchpad = atom<boolean>({
    key: "launchpadState", // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });