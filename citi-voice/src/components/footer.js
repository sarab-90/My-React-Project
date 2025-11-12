import React from 'react';
import '../styles/footer.css';
import { FaLinkedinIn} from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className='footer-top'></div>
            <div className='footer-logo'>
                <h2>صوتي مسموع</h2>
                <p>وصل بلاغك – أُرسم مدينتك – بشفافية مطلقة</p>
            </div>

            <div className='footer-social'>
                <div className='social-icons'>
                    <h3>تابعنا على</h3>
                    <a href='https://www.linkedin.com/feed/'target='_blank' ><FaLinkedinIn/></a>
                </div>
            </div>

            <div className='footer-bottom'>
                <p>©️{new Date().getFullYear()} -
                    صوتي مسموع - جميع الحقوق محفوظة</p>
            </div>
        </footer>
    );
};