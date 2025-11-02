import '../styles/contact.css'

export default function Contact(){
    return(
        <div className="Contact">
            <h2>للتواصل</h2>
            <div className="Contact-info">
                <p><strong>البريد الإلكتروني: </strong></p>
                <p><strong>الهاتف: </strong></p>
                <p><strong>العنوان: </strong></p>
            </div>

            <form className="Contact-form" >
                <input type="text" placeholder="اسمك/ي" required/>
                <input type="email" placeholder="بريدك الإلكتروني" required/>
                <textarea placeholder="رسالتك" required></textarea>
                <button type="submit">إرسال</button>
            </form>

        </div>
    )
}