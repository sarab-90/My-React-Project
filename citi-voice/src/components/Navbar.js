import React from 'react';
import {Link ,NavLink} from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  return(
    <nav className='navbar'>
      <div className='navbar-logo'><Link to="/">صوتي مسموع</Link></div>

      <ul className='navbar-links'>
        <li><NavLink to="/">الرئيسية</NavLink></li>
        <li><NavLink to="/ReportsPages">البلاغات</NavLink></li>
        <li><NavLink to="/suggestions">الاقتراحات</NavLink></li>
        {/* <li><NavLink to="/ReportDetails">تفاصيل</NavLink></li> */}
        <li><NavLink to="/voting">التصويت</NavLink></li>
        {/* <li><Link to="/SubmitReport"></Link></li> */}
        <li><NavLink to="/about">من نحن</NavLink></li>
        <li><NavLink to="/contact">تواصل معنا</NavLink></li>
        <li><NavLink to="/UserType">المستخدم</NavLink></li>
      </ul>

      {/* <div className='navbar-buttons'>
        <Link to="/login" className='btn-login'>تسجيل الدخول</Link>
        <Link to="/register" className="btn-register">إنشاء حساب</Link>
      </div> */}
    </nav>  
  );
};