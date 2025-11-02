import React from 'react';
import '../styles/footer.css';
import { Link } from 'react-router-dom';
import {FaFacebook, FaLinkedinIn, FaYoutube, FaInstagram} from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className='footer-top'></div>
            <div className='footer-logo'>
                <h2>صوتي مسموع</h2>
                <p>منصتك لتوصيل البلاغات والمقترحات للبلدية بكل سهولة وشفافية</p>
            </div>

            <div className='footer-social'>
                <h3>تابعنا على</h3>
                <div className='social-icons'>
                    <a href='#' ><FaFacebook/></a>
                    <a href='#' ><FaLinkedinIn/></a>
                    <a href='#' ><FaYoutube/></a>
                    <a href='#' ><FaInstagram/></a>
                </div>
            </div>

            <div className='footer-bottom'>
                <p>©️{new Date().getFullYear()} -
                    صوتي مسموع - جميع الحقوق محفوظة</p>
            </div>
        </footer>
    );
};