import React,{useState, useEffect} from 'react';
import '../styles/Voting.css';

export default function Voting({ reports = [], suggestions = [], handleVote }) {
  const [votedItems, setvotedItems] = useState({});

  //تحميل الاصوات
  useEffect (() => {
    const saved = JSON.parse(localStorage.getItem("votedItems")) || {};
    setvotedItems(saved);
  },[]);

  //تحديث   
  useEffect(() => {
    localStorage.setItem("votedItems", JSON.stringify(votedItems));
  }, [votedItems]);

  const handleUserVoted = (id ,direction, type) => {
    const key = `${type}_${id}`;
    if (votedItems[key]){
      alert("لقد صوتت بالفعل على هذا العنصر");
      return;
    }
    handleVote(id, direction, type);
    //تحديث حالة تصويت مباشرة
    setvotedItems(prev => ({...prev, [key]: true}));
  };

  
  return (
    <div className="Voting">
      <h3>البلاغات</h3>
        {reports.length === 0 ? (
          <p>لا توجد بلاغات</p>
        ) : (
          reports.map((r) => {
            const voted = votedItems[`report_${r.id}`];
            return(
              <div key={r.id} className="voting-card">
              <h4>{r.title}</h4>
              {r.description && <p>{r.description}</p>}
              <div className="vote-buttons">
                <button onClick={() => handleUserVoted(r.id, 'up', 'report')}
                disabled={voted}
                >
                  👍🏻 {r.votesUp || 0}
                </button>
                <button onClick={() => handleUserVoted(r.id, 'down', 'report')}
                disabled ={voted}
                >
                  👎🏻 {r.votesDown || 0}
                </button>
              </div>
              <span className="badge">بلاغ</span>
            </div>
            );
          })
        )}

      <div className="voting-section">
        <h3>الاقتراحات</h3>
        {suggestions.length === 0 ? (
          <p>لا توجد اقتراحات</p>
        ) : (
          suggestions.map((s) => {
            const voted = votedItems[`suggestion_${s.id}`];
            return(
              <div key={s.id} className="voting-card">
                <h4>{s.text}</h4>
                <div className="vote-buttons">
                  <button onClick={() => handleUserVoted(s.id, 'up', 'suggestion')}
                    disabled ={voted}
                    >
                    👍🏻 {s.votesUp || 0}
                  </button>
                  <button onClick={() => handleUserVoted(s.id, 'down', 'suggestion')}
                    disabled = {voted}
                    >
                    👎🏻 {s.votesDown || 0}
                  </button>
                </div>
                <span className="badge">اقتراح</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
