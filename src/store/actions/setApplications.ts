import { Application } from "@/applications/application";
import { ActionType } from ".";

export type ActionSetApplications = {
  type: ActionType.SET_APPLICATIONS;
  applications: Application[];
};

export const setApplications = (applications: Application[]): ActionSetApplications => ({
  type: ActionType.SET_APPLICATIONS,
  applications,
});