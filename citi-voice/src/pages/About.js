import React from 'react';
import '../styles/About.css';

export default function About(){
  return(
    <div className="About">
        <h2>صوتي مسموع  </h2>
        <p>منصة تتيح لك أن تكون جزءًا من التغيير الإيجابي في مجتمعك</p>
        <div className='about-content'>
          <p>منصة تربط بين المواطنين والجهات المختصة لتبادل الآراء والملاحظات.</p>
          <p>تتيح لك إرسال البلاغات أو الاقتراحات بسهولة وسرعة.</p>
          <p>نسعى لتمكين الجميع من المشاركة في تحسين جودة الخدمات العامة.</p>
        </div>
      </div>
  );
}
