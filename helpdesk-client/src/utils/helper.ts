export const getPriorityColor = (priority: string | number) => {
  switch (priority) {
    case "High":
      return "#dc2626";
    case "Medium":
      return "#f59e0b";
    case "Low":
      return "#10b981";
    default:
      return "#6c757d";
  }
};
export const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "#0c4edbff";
    case "In Progress":
      return "#06c6d4ff";
    case "Closed":
      return "#10b981";
    default:
      return "#6c757d";
  }
};
