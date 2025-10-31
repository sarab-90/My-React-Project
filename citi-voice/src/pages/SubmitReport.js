//صفحة انشاء بلاغ 
import { useState } from "react";
import "../styles/SubmitReport.css";
import {  useNavigate } from "react-router-dom";

export default  function SubmitReport({addReport, user}){
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [media, setMedia] = useState(null);
    const [nationalID, setnationalID] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || !type || !description || !location){
            alert("الرجاء إدخال جميع البيانات المطلوبة");
            return;
        }   
        // تحقق من رقم وطني او هاتف حسب نوع مستخدم
        if (user?.type === "مبلغ" && !nationalID){
            alert("يرجى إدخال الرقم الوطني.");
            return;
        }
        if (user?.type === "مقترح" && !phone){
            alert("يرجى إدخال رقم الهاتف");
            return;
        }

        const newReport = {
            //إضافة معرف فريد لكل بلاغ
            id: Date.now(), 
            title,
            type,
            description,
            location,
            media,
            user,
            nationalID: user?.type === "مبلغ" ? nationalID: "",
            phone:user?.type === "مقترح" ? phone: user?.phone || "",
            status: "جديد",
            data: newData().toLocaleString(),
        };
        addReport(newReport);
        alert("تم إرسال البلاغ/الاقتراح بنجاح!");
        // العودة الى صفحة البلاغات 
        navigate("/ReportsPages");
    };
    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) {
            alert("حجم الملف يجب أن لا يتجاوز 10 ميجابايت");
            return;
        }
        setMedia(URL.createObjectURL(file));
    };

    return(
        <div className="SubmitReport">
            <h2>إرسال بلاغ أو الاقتراح</h2>
            <form onSubmit={handleSubmit} className="submit-report-form">
                <input
                    type="text"
                    placeholder="عنوان البلاغ أو الاقتراح"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <select
                    value={type} onChange={(e) => setType(e.target.value)} required>
                    <option value="">اختر نوع البلاغ</option>
                    <option value="خدمة عامة">خدمة عامة</option>
                    <option value="بنية تحتية">بنية تحتية</option>
                    <option value="نظافة">نظافة</option>
                    <option value="أخرى">أخرى</option>
                </select>

                <textarea
                placeholder="وصف بلاغ أو الاقتراح"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
                <input
                    type="text"
                    placeholder="الموقع"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                {user?.type === "مبلغ" && (
                    <input
                        type="text"
                        placeholder="الرقم الوطني"
                        value={nationalID}
                        onChange={(e) => setnationalID(e.target.value)}
                        required
                    />
                )}
                {user?.type === "مقترح" && (
                    <input
                        type="text"
                        placeholder="رقم الهاتف"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                )}

                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleMediaChange}  
                />
                {media && <img src={media} alt="معاينة" style={{width:"200px", marginTop:"10px"}} />}
                <button type="submit">إرسال </button>
            </form>
        </div>
    )
}

