import { FC } from "react";

import { TailSpin } from "react-loader-spinner";

const Loader: FC = () => {
  return (
    <div className="absolute left-[47vw] top-[50vh]">
      <TailSpin
        visible={true}
        height="120"
        width="120"
        color="#000"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperClass="loader"
      />
    </div>
  );
};

export default Loader;
