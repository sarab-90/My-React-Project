//صفحة البلاغات
import React from "react"   
import "../styles/ReportsPages.css"
import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";



export default function ReportsPages({reports = [], deleteReport}){
  const navigate = useNavigate();
    const totalReports = reports.length;
    const newReports = reports.filter((r) => r.status === "جديد").length;
    const inReviewReports = reports.filter((r) => r.status === "قيد المراجعة").length;
    const completedReports = reports.filter((r) => r.status === "منفذ").length;

    const handleCreateReport = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || storedUser.type !== "مبلغ") {
        alert("يجب تسجيل الدخول كمبلغ أولاً!");
        navigate("/UserType");
      } else {
        navigate("/SubmitReport");
        }
    };
    return(
        <div className="container">
        <div className="row text-center mb-4">
            <div className="col-md-3 mb-2">
                <div className="card bg-light">
                    <div className="card-body">
                    <h5 className="card-title">إجمالي البلاغات</h5>
                    <p className="card-text">{totalReports}</p>
                    </div>
                </div>
            </div>

        <div className="col-md-3 mb-2">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">جديد</h5>
              <p className="card-text">{newReports}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">قيد المراجعة</h5>
              <p className="card-text">{inReviewReports}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-2">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">منفذ</h5>
              <p className="card-text">{completedReports}</p>
            </div>
          </div>
        </div>
    </div>

    <div className="mb-4 text-center">
      <button className="btn btn-primary" onClick={handleCreateReport}>إنشاء بلاغ جديد</button>
    </div>
    <div className="ReportsPages">
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
                        <h5 className="card-title">{r.title}</h5>
                        <p className="card-text">{r.description}</p>
                        <p>
                            <strong>الحالة:</strong>{r.status}
                        </p>
                        <button onClick={() => navigate (`/report/${r.id}`)} className="view-report-link"> عرض التفاصيل</button>
                        <button className="btn-delete"onClick={() => deleteReport(r.id)}>حذف</button>
                    </div>
                    </div>
    ))}
    </div>
        )}
    </div>
    </div>
    );
}