import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 text-center">
      <p className="text-sm font-medium opacity-60">
        &copy; {new Date().getFullYear()} Klint M. Ruales. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;