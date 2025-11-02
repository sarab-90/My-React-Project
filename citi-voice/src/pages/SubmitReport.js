//صفحة انشاء بلاغ 
import { useState } from "react";
import "../styles/SubmitReport.css";
import {  useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default  function SubmitReport({addReport, user}){
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [media, setMedia] = useState(null);
    const [nationalID, setnationalID] = useState("");
    const [phone, setPhone] = useState("");
    //احداثيات الموقع
    const [latitude,setlatitude] = useState(null);
    const [longitude, setlongitude] = useState(null);

    const navigate = useNavigate();

    // زر تحديد الموقع
    const handelGetlocation = () =>{
        if (!navigator.geolocation){
            alert("ميزة تحديد الموقع غير مدعومة.")
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude

                setlatitude(lat);
                setlongitude(lon);
                setLocation(` الموقع المحدد: ${lat.toFixed(6)}, ${lon.toFixed(6)}`);               
            },
            (error) => {
                alert("تعذر تحديد الموقع.");
                console.error(error);
            },
            {enableHighAccuracy: true, timeout:10000}
            )
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title || !type || !description || !location){
            alert("الرجاء إدخال جميع البيانات المطلوبة");
            return;
        }   
        // تحقق من رقم وطني او هاتف حسب نوع مستخدم
        // if (user?.type === "مبلغ" && !nationalID){
        //     alert("يرجى إدخال الرقم الوطني.");
        //     return;
        // }
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
            date: new Date().toLocaleString(),
            votes: 0,
        };
        if (typeof addReport === "function") addReport(newReport);
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
            <h2>إرسال بلاغ  </h2>
            <form onSubmit={handleSubmit} className="submit-report-form">
                {user?.type === "مبلغ" && (
                    <div>
                        {/* <label>الرقم الوطني</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="الرقم الوطني"
                            value={nationalID}
                            onChange={(e) => setnationalID(e.target.value)}
                            required
                        /> */}
                    </div>
                )}
                {user?.type === "مقترح" && (
                    <div>
                        <label>رقم الهاتف</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="رقم الهاتف"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div>
                    <label>عنوان البلاغ  </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="عنوان البلاغ ... "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>نوع البلاغ</label>
                    <select
                        value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="">اختر نوع البلاغ</option>
                        <option value="خدمة عامة">خدمة عامة</option>
                        <option value="بنية تحتية">بنية تحتية</option>
                        <option value="نظافة">نظافة</option>
                        <option value="أخرى">أخرى</option>
                    </select>
                </div>

                <div>
                    <label>وصف البلاغ</label>
                    <textarea
                    placeholder="وصف بلاغ .... "
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    />
                </div>

                <div>
                    <label>الموقع</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="اكتب الموقع يدوياً أو استخدم زر تحديد الموقع"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>

                <button type="button" className="btn-location" onClick={handelGetlocation}>
                    تحديد موقعي تلقائياً
                </button>

                {latitude !== null && longitude !== null &&(
                    <div>
                        الموقع الحالي — خط العرض: {latitude.toFixed(6)}, خط الطول: {longitude.toFixed(6)}
                    </div>
                )}

                
                <div>
                    <label className="label=img">إرفاق صورة أو فيديو</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*,video/*"
                        onChange={handleMediaChange}  
                    />
                    {media && <img src={media} alt="معاينة" style={{width:"200px", marginTop:"10px"}} />}
                </div>
                <button type="submit">إرسال </button>
                
            </form>
        </div>
    )
}

