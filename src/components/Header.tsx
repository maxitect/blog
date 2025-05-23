"use client";

import Link from "next/link";
import React, { useState } from "react";

const Header: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header
      className="p-4 mb-10 bg-blue-600 text-gray-100 text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href="/"
        className="font-mono-medium text-xl font-bold hover:text-background"
      >
        {isHovered ? "< ~ />" : "< MaxitectBlog />"}
      </Link>
    </header>
  );
};

export default Header;
