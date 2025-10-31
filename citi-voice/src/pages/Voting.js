import React,{useState} from "react"
import '../styles/Voting.css'


// مكون فرعي لبطاقة التصويت 
function VotingCard ({item, onVote}){
    return(
        <div className="report-card">
            {item.media ? (
                <img src={item.media} alt="media" className="report=media"/>
            ):(
                <div className="no-media">لا توجد صورة</div>
            )}
            <div className="card-body">
                <h5 className="report-title">{item.title}</h5>
                <p className="report-description">{item.description}</p>
                <p><strong>الأصوات :</strong>{item.votes}</p>
                <button onClick={() => onVote(item.id)}>صوّت</button>           
            </div>
        </div>
    )}

export default function Voting({reports =[], Suggestions=[]}){
    const [allItems , setallItems] =useState([
        ...reports.map(r => ({...r, type: "report"})),
        ...Suggestions.map(s => ({...s, type:"suggestion"}))
    ]);
    
    const handleVote = (id) => {
        setallItems(prevItems =>
            prevItems.map(item => 
                item.id === id ? {...item, votes:item.votes +1}: item
            )
        );
    };


    return(
        <div className="Voting">
            <h2>التصويت على البلاغات والاقتراحات</h2>
            <div className="row">
                {allItems.length === 0 && <p>لا توجد عناصر للتصويت عليها .</p>}
                {allItems.map(item => (
                    <div className="col" key={item.id}>
                        <VotingCard item={item} onVote={handleVote}/>
                            </div>
                ))}
            </div>
        </div>
    )
}