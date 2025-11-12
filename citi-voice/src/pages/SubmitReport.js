//صفحة انشاء بلاغ 
import { useState, useEffect } from "react";
import "../styles/SubmitReport.css";
import {  useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default  function SubmitReport({addReport, user}){
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [media, setMedia] = useState(null);

    //احداثيات الموقع
    const [latitude,setlatitude] = useState(null);
    const [longitude, setlongitude] = useState(null);

    //اظهار الاخطاء
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.type !== "مبلغ"){
            alert("يجب تسجيل الدخول كمبلغ أولاً!");
            navigate("/UserType");
        } 
    },[ user, navigate]);
    
    // زر تحديد الموقع
    const handelGetlocation = () =>{
        if (!navigator.geolocation){
            alert("ميزة تحديد الموقع غير مدعومة.")
            return;
        }
        navigator.geolocation.getCurrentPosition(
            position => {
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

    const  validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "العنوان مطلوب";
        if (!type) newErrors.type = "نوع البلاغ مطلوب";
        if (!description.trim()) newErrors.description = "الوصف مطلوب";
        if (!location.trim()) newErrors.location = "الموقع مطلوب";
        if (user?.type === "مبلغ" && !user.nationalID) {
            newErrors.nationalID = "الرقم الوطني مطلوب";
        }
        return newErrors; 
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
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
            user: {
                name:user.name,
                nationalID:user.nationalID,
                type:user.type
            },
            status: "جديد",
            date: new Date().toLocaleString(),
            votesup: 0,
            votesDown:0
        };
        if (typeof addReport === "function") addReport(newReport);
        alert("تم إرسال البلاغ بنجاح!");
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
            {user && (
                <p>المبلغ : {user.name}</p>
            )}
            <form onSubmit={handleSubmit} className="submit-report-form">
                <div>
                    <label>عنوان البلاغ  </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="عنوان البلاغ ... "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <span className="error">{errors.title}</span>}
                </div>
                <div>
                    <label>نوع البلاغ</label>
                    <select
                        value={type} onChange={(e) => setType(e.target.value)} className="form-control">
                        <option value="">اختر نوع البلاغ</option>
                        <option value="بنية تحتية">بنية تحتية</option>
                        <option value="نظافة">نظافة </option>
                        <option value="الصحة العامة">الصحة العامة</option>
                        <option value="الصيانة والإنشاءات "> الصيانة والإنشاءات</option>
                        <option value="التراخيص التجارية">التراخيص التجارية</option>
                        <option value="خدمات أخرى">خدمات أخرى</option>
                    </select>
                    {errors.type && <span className="error">{errors.type}</span>}
                </div>

                <div>
                    <label>وصف البلاغ</label>
                    <textarea
                    placeholder="وصف بلاغ .... "
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <span className="error">{errors.description}</span>}
                </div>

                <div>
                    <label>الموقع</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="اكتب الموقع يدوياً أو استخدم زر تحديد الموقع"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    {errors.location && <span className="error">{errors.location}</span>}
                   
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


