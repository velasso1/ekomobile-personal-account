import { FC } from "react";
import QrCodeGen from "react-qr-code";

interface ICodeProps {
  url: string;
}

const QrCode: FC<ICodeProps> = ({ url }) => {
  return <QrCodeGen value={url} size={200} />;
};

export default QrCode;
