import React from "react";
import {Link} from 'react-router-dom';
import '../styles/Home.css';

export default function Home({reports}) {
  return (
    <div className="home-container">
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