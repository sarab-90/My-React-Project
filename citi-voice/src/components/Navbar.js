import React from 'react';
import {Link ,NavLink} from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  return(
    <nav className='navbar'>
      <div className='navbar-logo'>
        <Link to="/">صوتي مسموع</Link>
        </div>

      <ul className='navbar-links'>
        <li><NavLink to="/" >الرئيسية</NavLink></li>
        <li><NavLink to="/about">من نحن</NavLink></li>
        <li><NavLink to="/contact">تواصل معنا</NavLink></li>
        <li><NavLink to="/UserType"> تسجيل الدخول </NavLink></li>
      </ul>
    </nav>  
  );
};