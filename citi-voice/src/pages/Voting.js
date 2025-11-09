import React from 'react';
import '../styles/Voting.css';

export default function Voting({ reports = [], suggestions = [], handleVote }) {
  return (
    <div className="Voting">
      <h3>البلاغات</h3>
        {reports.length === 0 ? (
          <p>لا توجد بلاغات</p>
        ) : (
          reports.map((r) => (
            <div key={r.id} className="voting-card">
              <h4>{r.title}</h4>
              {r.description && <p>{r.description}</p>}
              <div className="vote-buttons">
                <button onClick={() => handleVote(r.id, 'up', 'report')}>
                  👍🏻 {r.votesUp || 0}
                </button>
                <button onClick={() => handleVote(r.id, 'down', 'report')}>
                  👎🏻 {r.votesDown || 0}
                </button>
              </div>
              <span className="badge">بلاغ</span>
            </div>
          ))
        )}

      <div className="voting-section">
        <h3>الاقتراحات</h3>
        {suggestions.length === 0 ? (
          <p>لا توجد اقتراحات</p>
        ) : (
          suggestions.map((s) => (
            <div key={s.id} className="voting-card">
              <h4>{s.text}</h4>
              <div className="vote-buttons">
                <button onClick={() => handleVote(s.id, 'up', 'suggestion')}>
                  👍🏻 {s.votesUp || 0}
                </button>
                <button onClick={() => handleVote(s.id, 'down', 'suggestion')}>
                  👎🏻 {s.votesDown || 0}
                </button>
              </div>
              <span className="badge">اقتراح</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
