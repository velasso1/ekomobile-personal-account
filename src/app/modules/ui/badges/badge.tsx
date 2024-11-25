import { FC } from "react";

interface IBadgeProps {
  type?: "primary" | "info" | "success" | "warning" | "danger";
}

const Badge: FC<IBadgeProps> = ({ type }) => {
  const statusTitle = {
    primary: "Принята",
    info: "В работе",
    success: "Выполнена",
    warning: "Ошибка",
    danger: "Отклонена",
  };
  return (
    <span className={`badge badge-outline ${type ? `badge-${type}` : null}`}>
      {type ? statusTitle[`${type}`] : "Отмена"}
    </span>
  );
};

export default Badge;
