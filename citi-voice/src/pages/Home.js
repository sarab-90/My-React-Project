import React, { useEffect ,useState } from "react";
import {Link} from 'react-router-dom';
import '../styles/Home.css';
import "bootstrap/dist/css/bootstrap.min.css"


export default function Home({reports}) {
  const images =[
    "https://www.petra.gov.jo/upload/1730884209185.png",
    "https://pbs.twimg.com/media/FLauHCZWQAUCVSY?format=jpg&name=large",
    "https://www.hala.jo/wp-content/uploads/2022/07/%D8%B5%D9%88%D8%B1-%D8%B9%D8%A7%D9%85%D8%A9-%D8%A7%D8%B1%D8%A8%D8%AF-30-1736x1157-1.jpg",
    "https://www.just.edu.jo/assets/JUST2022/admission/images/admission.jpg"
  ];
  const [current,setcurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setcurrent(prev => (prev + 1 ) % images.length);
    },5000);
    return () => clearInterval(timer)
  },[]);

  return (
    <div className="home-container">
      <div className="jor-img" style={{backgroundImage:`url(${images[current]})`,}}>
      </div>
      <section className="home-section">
        <div>
          <h1>صوتي مسموع</h1>
          <p>منصتك لرفع البلاغات والمقترحات</p>
          <div className="home-buttons">
            <Link to='/UserType' className="btn report">قدم بلاغ</Link>
            <Link to='/UserType' className="btn suggestion">قدم اقتراح</Link>
          </div>
        </div>
      </section>

      <section className="about-preview">
        <h2>كيف نعمل</h2>
        <div className="steps">
          <div className="step">
            <h3>بلغ بسهولة</h3>
            <p>قدم بلاغك مع الموقع والصور في دقائق</p>
            <Link to="/ReportsPages">قسم البلاغات</Link>
        </div>
        <div className="step">
          <h3>اقترح لتطوير الخدمات</h3>
          <p>شاركنا أفكارك لتحسين المدينة</p>
          <Link to="/suggestions">قسم الاقتراحات</Link>
        </div>
        <div className="step">
          <h3>صوّت وشارك</h3>
          <p>صوتك يساهم في ترتيب الأولويات وتنمية المجتمع</p>
          <Link to="/voting">قسم التصويت</Link>
        </div>
        </div>
      </section>
    </div>
  );
}