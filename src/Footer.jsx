import React from "react";

const Footer = () => {
  return (
    // make footer item centered and horizontal on small screens
    // and vertical on larger screens

    <footer className="footer footer-center bg-base-300 text-base-content p-4 fixed bottom-0 left-0 w-full z-50">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
