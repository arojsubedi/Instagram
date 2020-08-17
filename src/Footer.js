import React from 'react';
import './Footer.css';

const FooterPage = () => {
  return (
    <div className="footer__body">
          &copy; {new Date().getFullYear()} Copyright<a href="https://www.instagram.com"> Instagram </a>
    </div>
  );
}

export default FooterPage;