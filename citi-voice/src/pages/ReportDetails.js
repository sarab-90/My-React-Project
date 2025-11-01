//صفحة تفاصيل البلاغ
// حصول على رقم البلاغ من عنوان  صفحة )(URL)
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


export default function ReportDetails({reports , updateStatus, deleteReport, editReport}) {
    const {id} = useParams();
    const navigate = useNavigate();

    // العثور على البلاغ المطلوب من خلال id
    const report = reports.find((r) => r.id === Number(id));

    if (!report) return <p>البلاغ غير موجود.</p>;

    return (
        
        <div className="ReportDetails">
            <h2>{report.title}</h2>
            <p><strong>المبلغ : </strong>{report.user?.name || "غير معروف"}</p>
            <p><strong>الوصف: </strong>{report.description}</p>
            <p><strong>الموقع :</strong>{report.location}</p>
            {report.media && <img src={report.media} alt="Report Media" className="report-media-details" style={{maxHeight:"300px"}}/>}
            <p><strong>الحالة: </strong>{report.status}</p>
            <div className="ReportDetails-btn">
                <button onClick={() => updateStatus(report.id, "قيد المراجعة")}>قيد المراجعة</button>
                <button onClick={() => updateStatus(report.id, "تم الحل")}>تم الحل</button>
                <button onClick={() => editReport(report.id)}>تعديل البلاغ</button>

                <button onClick={() => {
                    if (window.confirm("هل أنت متأكد من حذف البلاغ؟")){
                        deleteReport(report.id);
                        navigate("/")
                    }
                }}> حذف البلاغ</button>
            </div>
        </div>
    )
}