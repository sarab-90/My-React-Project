
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/UserType.css'
 

export default function UserType({user,setUser}) {
    const [formData, setFormData] = useState({
        userType:"",
        name:"",
        nationalID:"",
        contactInfo:"",
        email:"",
        phone:""
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleChange =({target:{name, value}}) => {
        setFormData(prev => ({...prev,[name]: value}));
        // تنظيف الاخطاء 
        setErrors(prev => ({...prev, [name]: undefined}))
    };

    const validate =() => {
        const newErrors = {};
        if (!formData.userType) {
            newErrors.userType = "حدد دورك";
        }
        if (!formData.name.trim()) {
            newErrors.name = "الاسم الكامل مطلوب";
        }else if(formData.name.trim().length < 2){
            newErrors.name = "الاسم يجب أن يكون على الأقل حرفين"
        }
        if (formData.userType === "مبلغ"){
            if(!formData.nationalID.trim()){
                newErrors.nationalID = "الرقم الوطني مطلوب للمبلغ";
            } else if(!/^[0-9]+$/.test(formData.nationalID.trim())){
                newErrors.nationalID = "الرقم الوطني يجب أن يكون 10 أرقام";
            }
            if (!formData.contactInfo.trim()) {
                newErrors.contactInfo = "أدخل رقم الهاتف أو البريد الإلكتروني";
            } else {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const phoneRegex = /^07[0-9]{8}$/;
                if (!emailRegex.test(formData.contactInfo.trim()) && !phoneRegex.test(formData.contactInfo.trim())) {
                newErrors.contactInfo = "أدخل رقم هاتف يبدأ بـ 07 أو بريد إلكتروني صالح";
                }
            }
        }
        if (formData.userType === "مقترح") { 
            if (!formData.email.trim() && !formData.phone.trim()){
                newErrors.email = "أدخل البريد أو رقم الهاتف";
            }
            if (formData.email.trim()){
                const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(formData.email.trim())){
                    newErrors.email = "صيغة البريد الإلكتروني غير صحيحية";
                }
            }
            if (formData.phone.trim()){
                const phoneRegex = /^07[0-9]{8}$/;
                if(!phoneRegex.test(formData.phone.trim())){
                    newErrors.phone = "رقم الهاتف يجب أن يبدأ ب07 ويتكون من 10 أرقام"
                }
            }
        }
        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0 ){
            setErrors(validationErrors);
            return;
        }
        
        const UserData = {
            type: formData.userType,
            name:formData.name.trim(),
            nationalID:formData.userType ==="مبلغ" ? formData.nationalID : "" ,
            contactInfo: formData.userType === "مبلغ" ? formData.contactInfo.trim() : "",
            email:formData.userType === "مقترح" ? formData.email.trim() : "",
            phone:formData.userType ==="مقترح" ? formData.phone.trim() : ""
        };

        localStorage.setItem("user", JSON.stringify(UserData));
        setUser(UserData);

        const routeMap = {
            "مبلغ": "/SubmitReport",
            "مقترح": "/suggestions",
            "زائر": "/voting"
        };
        const nextRoute = routeMap[UserData.type] || "/Home";
        navigate(nextRoute);
    };

    return(
        <div className="UserType">
            <h2>حدد دورك وسجل بياناتك</h2>

            <form onSubmit={handleSubmit} className="user-type-form">
                <div>
                    <label htmlFor="UserType">الدور</label>
                    <select
                        id="userType"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                    >
                        <option value="">اختر دورك</option>
                        <option value="مبلغ">مبلغ</option>
                        <option value="مقترح">مقترح</option>
                        <option value="زائر">زائر</option>
                    </select>
                    {errors.userType && <span className="error">{errors.userType}</span>}
                </div>

                <div>
                    <label htmlFor="name">الاسم الكامل</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="الاسم الكامل"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                {formData.userType === "مبلغ" && (
                    <>
                    <div>
                        <label htmlFor="nationalID">الرقم الوطني</label>
                        <input
                            id="nationalID"
                            name="nationalID"
                            type="text"
                            placeholder=" أدخل الرقم الوطني"
                            value={formData.nationalID}
                            onChange={handleChange}
                            
                        />
                        {errors.nationalID && <span className="error">{errors.nationalID}</span>}              
                    </div>
                    <div>
                        <label htmlFor="contactInfo"> رقم الهاتف / البريد الإلكتروني</label>
                        <input
                            id="contactInfo"
                            name="contactInfo"
                            type="text"
                            placeholder=" أدخل رقم الهاتف / البريد الإلكتروني "
                            value={formData.contactInfo}
                            onChange={handleChange}
                        />
                        {errors.contactInfo && <span className="error">{errors.contactInfo}</span>}
                    </div>
                    </>
                )}
                {formData.userType === "مقترح" && (
                    <>
                    <div>
                        <label htmlFor="email">البريد الإلكتروني</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@email.com"
                            value={formData.email}   
                            onChange={handleChange}
                        />
                        <small className="hint">اختياري، يمكنك إدخاله لتلقي التحديثات</small>
                        {errors.email && <span className="error">{errors.email}</span>}

                    </div>

                    <div>
                        <label htmlFor="phone">رقم الهاتف</label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="07xxxxxxxx"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <small className="hint">اختياري، أو يمكنك إدخال بريد إلكتروني</small>                    
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    </>
                )}
                <button type='submit'>متابعة</button>
            </form>
        </div>
    );
}



