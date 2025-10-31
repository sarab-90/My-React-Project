//صفحة البلاغات
import React from "react"   
import "../styles/ReportsPages.css"
import { Link } from "react-router-dom"

export default function ReportsPages({reports = []}){
    return(
        <div className="ReportsPages">
            <h2>البلاغات</h2>
            {reports.length === 0 ? (
                <p className="no-reports">لا توجد بلاغات حتى الآن .</p>
            ) : (
                <div className="reports-grid">
                    {reports.map((r)=>(
                        <div className="report-card" key={r.id}>
                            {r.media &&(
                                <img 
                                src={r.media} 
                                alt="Report Media" 
                                className="report-media"/>
                                )}
                            <div className="card-body">
                                <h5 className="report-title">{r.title}</h5>
                                <p className="report-description">{r.description}</p>
                                <p className="report-status">
                                    <strong>الحالة:</strong>{r.status}
                                </p>
                                <Link to={`/reports/${r.id}`} className="view-report-link"> عرض التفاصيل</Link>
                            </div>
                            </div>
            ))}
            </div>
            )}
        </div>
    );
}