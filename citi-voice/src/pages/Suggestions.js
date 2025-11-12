import React,{useState} from "react";
import '../styles/Suggestions.css';

export default function Suggestions({addSuggestion, suggestions = [], updateRating}){
    const [text, setText] = useState("");
    const [user, setuser] = useState("sarab")

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!text) return;
        addSuggestion({text,user});
        setText("");
        alert("تم إرسال الاقتراح بنجاح!");
    };

    return(
        <div className="Suggestions">
            <h2>تقديم اقتراحات</h2>
            <form onSubmit={handleSubmit} className="suggestion-form">
                <textarea 
                placeholder="أدخل اقتراحك هنا..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                ></textarea>
                <button type="submit">إرسال الاقتراح</button>
            </form>
        
        <div className="current-Suggestions">
            <h3 className="Suggestions-h">الاقتراحات الحالية:</h3>
            {suggestions.length === 0 ? (
                <p>لا توجد اقتراحات حتى الآن.</p>
            ):(suggestions.map((s) => (
                 <div key={s.id} className="Suggestion-card">
                    <div className="Suggestion-header">
                        <p>الاسم: {s.user}</p>
                        <p>تاريخ الارسال: {s.date}</p>
                    </div>
                    <div className="Suggestion-text">{s.text}</div>
                    <div className="Suggestion-rating">
                        <p>متوسط التقييم: <strong>{((s.rating || 0).toFixed(1))}</strong></p>
                        
                        <div className="Suggestion-rating">
                            <p>عدد الأصوات: {s.votes || 0}</p>
                            <span className="like-button" onClick={() => updateRating(s.id)}>
                                👍🏻  
                            </span>
                            
                        </div>
                    </div>
                 </div>
            ))
            )}
        </div>
        </div>
    ) 
}