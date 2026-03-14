import activityLogsData from "~/data/activity-logs.json";

export interface ActivityLog {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  details: string;
  type: string;
  entity: string;
}

export const useActivityLogsData = () => {
  const logs = useState<ActivityLog[]>("activityLogs", () => activityLogsData as ActivityLog[]);
  return { logs };
};
