export type TRedirectTo =
  | "main"
  | "numbers"
  | "services"
  | "expenses"
  | "details"
  | "remainder"
  | "balance"
  | "applications"
  | "profile";

export interface ISideBarProps {
  title: string;
  icon: string;
  redirectTo: TRedirectTo;
}
