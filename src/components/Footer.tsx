import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-background-mid text-foreground text-center font-mono-regular flex flex-col">
      <span>
        &copy; {new Date().getFullYear()} Maxime Downe. All rights reserved.
      </span>
      <Link
        className="hover:text-blue-600 hover:underline"
        href={"mailto:maxime.downe@gmail.com"}
      >
        maxime.downe@gmail.com
      </Link>
    </footer>
  );
};

export default Footer;
