import { FC } from "react";
import { Link } from "react-router-dom";

import { defaultStyles } from "../../../utils/default-styles";

const Footer: FC = () => {
  const year = new Date().getFullYear();
  const { bgColor, textSize, textColor } = defaultStyles;

  return (
    <footer
      className={`footer flex justify-start ${bgColor.white} px-[45px] ${textSize.default} ${textColor.grey} pt-[20px] xs:flex-col md:flex-row`}
    >
      <div className={`authorship`}>
        {year} ©
        <Link className={`ml-[5px] ${textColor.primary}`} to="https://ekomobile.ru/">
          EkoMobile
        </Link>
      </div>
      <div className={`contact-info md:pl-[20vw]`}>
        <span className="contact-title">E-mail:</span>
        <a className={`contact-email ml-[5px] ${textColor.primary}`} href="mailto=info@ekomobile.ru ">
          info@ekomobile.ru
        </a>
      </div>
      <div className={`contact-numbers sm:pl-[10vw] md:pl-[20vw]`}>
        <a className={`${textColor.primary}`} href="tel:+74950110522">
          +7 (495) 011-05-22
        </a>
        <span className="">&nbsp;или&nbsp;</span>
        <a className={`${textColor.primary}`} href="tel:0522">
          0522
        </a>
        <span className="px-[5px]">(с мобильного)</span>
        <a className={`mt-[5px] block`} href="tel:+78007770522">
          +7 (800) 777-05-22
        </a>
      </div>
    </footer>
  );
};

export default Footer;
