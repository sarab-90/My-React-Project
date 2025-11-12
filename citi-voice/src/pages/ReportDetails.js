//صفحة تفاصيل البلاغ
// حصول على رقم البلاغ من عنوان  صفحة )(URL)
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaFacebook, FaTwitter } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/ReportDetails.css'

export default function ReportDetails({reports , updateStatus, deleteReport, editReport, currentUser, user}) {
    const {id} = useParams();
    const navigate = useNavigate();
     // العثور على البلاغ المطلوب من خلال id
    const report = reports.find((r) => r.id === Number(id));

    const isAdmin = currentUser?.type === "admin";
    const isOwner = report.user?.name === user?.name;

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(report.title);
    const [editDescription, setEditDescription] = useState(report.description);
    const [editLocation, setEditLocation] = useState(report.location || "");

   
    if (!report) return <p className="not-found">البلاغ غير موجود.</p>;

    const shareText = encodeURIComponent(`${report.title} - ${report.description}\n${window.location.href}`)

    const handleEditSave = () => {
        editReport(report.id, { title: editTitle, description: editDescription, location: editLocation });
        setIsEditing(false);
    };

    return (
        
        <div className="ReportDetails">
            {!isEditing ? (
                <>
                <h2 className="report-title">{report.title}</h2>
                <p><strong>المبلغ : </strong>{report.user?.name || "غير معروف"} {report.user?.phone && `| الهاتف : ${report.user.phone}`}</p>
                <p><strong>الوصف: </strong>{report.description}</p>
                {report.location && <p><strong>الموقع :</strong>{report.location}</p>}
                {report.media && <img src={report.media} alt="وسائط البلاغ" className="report-media-details"/>}
                <p className={`report-status ${report.status.replace(/\s/g,'-').toLowerCase()}`}>
                    <strong>الحالة: </strong>{report.status}
                </p>
                </>
            ) : (
                <div className="edit-form">
                    <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="عنوان البلاغ" />
                    <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="وصف البلاغ"></textarea>
                    <input type="text" value={editLocation} onChange={(e) => setEditLocation(e.target.value)} placeholder="الموقع (اختياري)" />
                    <button onClick={handleEditSave}>حفظ التعديلات</button>
                    <button onClick={() => setIsEditing(false)}>إلغاء</button>
                </div>
            )}
            {(isAdmin || isOwner) && !isEditing && (
                <div className="ReportDetails-btn">
                    {isAdmin && <>
                        <button type="button" onClick={() => updateStatus(report.id, "قيد المراجعة")}>قيد المراجعة</button>
                        <button type="button" onClick={() => updateStatus(report.id, "تم الحل")}>تم الحل</button>
                    </>}
                    <button type="button" onClick={() => setIsEditing(true)}>تعديل البلاغ</button>

                    <button type="button" onClick={() => {
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