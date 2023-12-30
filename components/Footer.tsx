import { footerLinks } from "@/constants/footer-links";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="border-zinc-100 border-t-2 min-h-[400px] flex w-full p-16 mt-16 flex-col sm:flex-row selection:text-white selection:bg-[#f1656a]">
        <div className="w-full xs:mb-12 flex flex-col items-center xs:justify-center">
          <h1 className="font-extrabold text-3xl w-full flex justify-center">
            FUT24
          </h1>
          <p className="text-gray-700 mt-2">FUT 24 - Projeto pessoal</p>
          <p className="text-gray-700">
            Todos direitos reservados Vitor Gabriel Silva
          </p>
        </div>
        <div className="w-full flex gap-6 flex-wrap sm:flex-nowrap mt-16 sm:mt-0">
          {footerLinks.map((link, index) => (
            <div
              key={index}
              className="w-full flex flex-col gap-6 text-base min-w-[170px] justify-center items-center sm:justify-normal sm:items-start"
            >
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="text-gray-500"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
