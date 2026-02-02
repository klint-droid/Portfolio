import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 text-center">
      <p className="text-sm text-gray-500 font-medium">
        &copy; {new Date().getFullYear()} Klint M. Ruales. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;