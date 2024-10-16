type RenderSwitchType = "primary" | "info" | "success" | "warning" | "danger";

export const renderSwitch = (status: string): RenderSwitchType => {
  switch (status) {
    case "completed":
      return "success";

    case "accepted":
      return "primary";

    case "in progress":
      return "info";

    case "error":
      return "warning";

    case "declined":
      return "danger";

    case "canceled":
      return;

    default:
      return;
  }
};
