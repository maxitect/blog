import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center">
      <p>&copy; {new Date().getFullYear()} Maxitect Blog. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
