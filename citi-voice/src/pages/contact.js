import '../styles/contact.css'
import { useState } from 'react'

export default function Contact(){
    const [send, setSend] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSend(true);
        setTimeout(()=> setSend(false),3000);
    }
    return(
        <div className="Contact">
            <h2>للتواصل معنا</h2>
            <form className="Contact-form" onSubmit={handleSubmit} >
                <input type="text" name='name' placeholder="اسمك/ي" required/>
                <input type="email" name='email' placeholder="بريدك الإلكتروني" required/>
                <textarea name='message' placeholder="رسالتك" required></textarea>
                <button type="submit">إرسال</button>
            </form>
            {send && <p className='message'>تم إرسال الرسالة بنجاح</p>}
        </div>
    )
}