import React from "react";
import {Link} from 'react-router-dom';
import '../styles/Home.css';
import "bootstrap/dist/css/bootstrap.min.css"


export default function Home({reports}) {
  const images =[
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsdnnuIVV_zUY4yOTHKWoH3fyCd8xbVmxVImsMOa8853FNmo6aMAiHu-a0KeV3DHWV0C0&usqp=CAU",
    "https://www.just.edu.jo/Units_and_offices/Offices/IRO/PublishingImages/Pages/6b737254f37de82f9ee30fa9782a22cf.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRITebd_cW8oMhDne5R5LdjITX6EhFZFw_DmQiBILle_eubSi9rytuagyglXhCje_4Wzwk&usqp=CAU",
    "https://www.altar7al.com/wp-content/uploads/2023/07/4-4-750x430.jpg",
  ]
  return (
    <div className="home-container">
      <div className="jor-img">
        {images.map((img, i) => (
          <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
            <img src={img} className="block" alt={`slide ${i + 1}`} style={{maxHeight:"500px", objectFit:"cover"}}/>

          </div>
        ))}
      </div>
      <section className="home-section">
        <div>
          <h1>صوتي مسموع</h1>
          <p>منصتك لرفع البلاغات والمقترحات لتحسين الخدمات العامة بكل سهولة وشفافية.</p>
          <div className="home-buttons">
            <Link to='/SubmitReport' className="btn report">قدم شكوى</Link>
            <Link to='/suggestion' className="btn suggestion">قدم اقتراح</Link>
          </div>
        </div>
      </section>

      <section className="about-preview">
        <h2>كيف نعمل</h2>
        <div className="steps">
          <div className="step">
            <h3>بلغ بسهولة</h3>
            <p>قدم بلاغك مع الموقع والصور في دقائق.</p>
        </div>
        <div className="step">
          <h3>اقترح لتطوير الخدمات</h3>
          <p>شاركنا أفكارك لتحسين المدينة.</p>
        </div>
        <div className="step">
          <h3>صوّت وشارك</h3>
          <p>صوتك يساهم في ترتيب الأولويات وتنمية المجتمع</p>
        </div>
        </div>
      </section>

      <p>عدد البلاغات الحالية : {reports.length}</p>
    </div>
  );
}