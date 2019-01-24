import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="flex-container">
        <section>
          <p>&copy; 2019 A/a FullStack</p>
          <p><Link to="https://github.com/johnnyhperkins">Github</Link>&nbsp;&bull;&nbsp;
          <Link to="https://honestwebsitedesign.com">Portfolio</Link>&nbsp;&bull;&nbsp;
          <Link to="https://www.linkedin.com/in/john-h-perkins/">LinkedIn</Link></p>
        </section>
        <section>
          <p>Johnny Perkins</p>
          <p><a href="mailto:johnnyhperkins@gmail.com">Email</a></p>
        </section>
        <section></section>
    </footer>
);

export default Footer;