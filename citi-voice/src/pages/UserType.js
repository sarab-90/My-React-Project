
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


export default function UserType({setUser}) {
    const [userType, setUserType] = useState("");
    const [name, setName] = useState("");
    const [nationalID, setnationalID] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!userType || !name){
            alert("الرجاء إدخال الاسم وتحديد الدور");
            return;
        }
        if (userType === "مبلغ" && !nationalID){
            alert("الرجاء إدخال الرقم الوطني للمبلغ.")
            return;
        };
        if (!email && !phone){
            alert("يجب إدخال البريد الإلكتروني أو رقم الهاتف على الأقل.")
            return;
        };

        const UserData = {
            type: userType,
            name,
            nationalID,
            email,
            phone
        };

        // لربطه بالبلاغ لاحقا يحفظ في 
        localStorage.setItem("user", JSON.stringify(UserData));
        setUser(UserData);

        if(userType ==="مبلغ") navigate("/submit");
        else if ( userType ==="مقترح") navigate("/suggestion");
        else navigate("/Home");
    };

    return(
        <div className="UserType">
            <h2>حدد دورك وسجل بياناتك</h2>

            <form onSubmit={handleSubmit} className="user-type-form">
                <div>
                    <label>الاسم الكامل</label>
                    <input
                        type="text"
                        placeholder="الاسم الكامل"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                {userType === "مبلغ" && (
                    <div>
                        <label>الرقم الوطني</label>
                        <input
                            type="text"
                            placeholder=" أدخل الرقم الوطني"
                            value={nationalID}
                            onChange={(e) => setnationalID(e.target.value)}
                            required
                        />
                    </div>
                )};

                <div>
                    <label>البريد الإلكتروني</label>
                    <input
                        type="email"
                        placeholder="example@email.com"
                        value={email}   
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>رقم الهاتف</label>
                    <input
                        type="text"
                        placeholder="07xxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div>
                    <label>الدور</label>
                    <select
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        required
                    >
                        <option value="">اختر دورك</option>
                        <option value="مبلغ">مبلغ</option>
                        <option value="مقترح">مقترح</option>
                        <option value="زائر">زائر</option>
                    </select>
                </div>

                <button type="submit">متابعة</button>
            </form>
        </div>
    )
}



