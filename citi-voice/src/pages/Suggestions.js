import React,{useState} from "react";
import '../styles/Suggestions.css';

export default function Suggestions({addSuggestion, suggestions = []}){
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!text) return;
        addSuggestion({text});
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

            <h3>الاقتراحات الحالية:</h3>
            {suggestions.length === 0 ? <p>لا توجد اقتراحات حتى الآن.</p>:
                suggestions.map((s) => <div key={s.id} className="Suggestion-card">{s.text}</div>)}
                





            {/* <div className="row">
                {stories.length === 0 && <p>لا توجد قصص نجاح حتى الآن .</p>}
                {stories.map((story) => (
                    <div className="col" key={story.id}>
                        <div className="story-card">
                            {story.media && <img src={story.media} alt="Story Media" className="story-media"/>}
                            <div className="card-body">
                                <h5 className="story-title">{story.user}</h5>
                                <p><strong>نوع المبادرة :</strong>{story.type}</p>
                                <p className="story-description">{story.description}</p>
                                <small className="story-date">{story.date}</small>
                            </div>
                        </div>
                    </div>  
                ))}
            </div> */}
        </div>
    )
}