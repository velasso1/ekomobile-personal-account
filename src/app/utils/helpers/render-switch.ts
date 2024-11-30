type RenderSwitchType = "primary" | "info" | "success" | "warning" | "danger";

export const renderSwitch = (status: string): RenderSwitchType => {
  switch (status) {
    case "OK":
      return "success";

    case "accepted":
      return "primary";

    case "in progress":
      return "info";

    case "ERROR":
      return "warning";

    case "declined":
      return "danger";

    case "canceled":
      return;

    default:
      return;
  }
};
