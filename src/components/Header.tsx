import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="p-4 mb-10 bg-blue-600 text-white text-center">
      <Link
        href="/"
        className="text-white font-mono-medium text-xl font-bold hover:text-black"
      >
        {"< MaxitectBlog />"}
      </Link>
    </header>
  );
};

export default Header;
