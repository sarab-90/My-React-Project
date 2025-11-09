import '../styles/contact.css'

export default function Contact(){
    return(
        <div className="Contact">
            <h2>للتواصل</h2>
            <div className="Contact-info">
                <p><strong>البريد الإلكتروني: sarabakash.12345@gmail.com</strong></p>
                <p><strong>الهاتف: 0776080903</strong></p>
                <p><strong>العنوان: الأردن- اربد</strong></p>
            </div>

            <form className="Contact-form" >
                <input type="text" name='name' placeholder="اسمك/ي" required/>
                <input type="email" name='email' placeholder="بريدك الإلكتروني" required/>
                <textarea name='message' placeholder="رسالتك" required></textarea>
                <button type="submit">إرسال</button>
            </form>

        </div>
    )
}