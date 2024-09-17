import { FC } from 'react';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer flex h-full w-full justify-start bg-[#fff] px-[45px] text-[12px] text-[#78829D]">
      <div className="authorship">
        {year} ©{' '}
        <Link className="text-[#005DA6]" to="https://ekomobile.ru/">
          EkoMobile
        </Link>
      </div>
      <div className="contact-info pl-[20vw]">
        <span className="contact-title">E-mail:</span>{' '}
        <a
          className="contact-email text-[#005DA6]"
          href="mailto=info@ekomobile.ru"
        >
          info@ekomobile.ru
        </a>
      </div>
      <div className="contact-numbers pl-[20vw]">
        <a className="text-[#005DA6]" href="tel:+74950110522">
          +7 (495) 011-05-22
        </a>
        <span className="px-[5px]">или</span>
        <a className="text-[#005DA6]" href="tel:0522">
          0522
        </a>
        <span className="px-[5px]">(с мобильного)</span>
        <a className="mt-[5px] block text-[#005DA6]" href="tel:+78007770522">
          +7 (800) 777-05-22
        </a>
      </div>
    </footer>
  );
};

export default Footer;
