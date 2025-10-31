//صفحة تفاصيل البلاغ
// حصول على رقم البلاغ من عنوان  صفحة )(URL)
import { useParams } from "react-router-dom";

export default function ReportDetails({reports , updateStatus}) {
    const {id} = useParams();
    const report = reports.find((r) => r.id === Number(id));

    if (!report) return <p>البلاغ غير موجود.</p>;

    return (
        <div className="ReportDetails">
            <h2>{report.title}</h2>
            <p><strong>المبلغ : </strong>{report.user.name}</p>
            <p><strong>الوصف: </strong>{report.description}</p>
            <p><strong>الموقع :</strong>{report.location}</p>
            {report.media && <img src={report.media} alt="Report Media" className="report-media-details"/>}
            <p><strong>الحالة: </strong>{report.status}</p>
            <div className="ReportDetails-btn">
                <button onClick={() => updateStatus(report.id, "قيد المراجعة")}>قيد المراجعة</button>
                <button onClick={() => updateStatus(report.id, "تم الحل")}>تم الحل</button>
            </div>
        </div>
    )
}