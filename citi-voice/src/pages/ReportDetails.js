//صفحة تفاصيل البلاغ
// حصول على رقم البلاغ من عنوان  صفحة )(URL)
import { useParams, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/ReportDetails.css'

export default function ReportDetails({reports , updateStatus, deleteReport, editReport, currentUser}) {
    const {id} = useParams();
    const navigate = useNavigate();

    // العثور على البلاغ المطلوب من خلال id
    const report = reports.find((r) => r.id === Number(id));

    if (!report) return <p>البلاغ غير موجود.</p>;

    const isAdmin = currentUser?.type === "admin";

    const shareText = encodeURIComponent(`${report.title} - ${report.description}\n${window.location.href}`)

    return (
        
        <div className="ReportDetails">
            <h2>{report.title}</h2>
            <p><strong>المبلغ : </strong>{report.user?.name || report.user?.type ||"غير معروف"}
              {report.user?.phone && `|الهاتف: ${report.user.phone}`}</p>
            <p><strong>الوصف: </strong>{report.description}</p>
            <p><strong>الموقع :</strong>{report.location}</p>
            {report.media && <img src={report.media} alt="Report Media" className="report-media-details" style={{maxHeight:"300px"}}/>}
            <p><strong>الحالة: </strong>{report.status}</p>

            {isAdmin && (
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
            )}
            
            <div className="share-buttons">
                <p>شارك هذا البلاغ:</p>
                <a href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noopener noreferrer" className="share-icon whatsapp">
                 <FaWhatsapp size={25} />
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-icon facebook">
                 <FaFacebook size={25} />
                </a>
                <a href={`https://twitter.com/intent/tweet?text=${shareText}`} target="_blank" rel="noopener noreferrer" className="share-icon twitter">
                 <FaTwitter size={25} />
                </a>
            </div>
        </div>
    )
}