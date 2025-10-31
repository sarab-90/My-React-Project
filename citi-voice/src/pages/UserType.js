
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        if (!userType === "مبلغ" && !nationalID){
            alert("الرجاء إدخال الرقم الوطني للمبلغ.")
            return;
        };
        if (!email && !phone){
            alert("يجب إدخال البريد الإلكتروني أو رقم الهاتف على الأقل.")
            return;
        };

        const setUser = {
            type: userType,
            name,
            nationalID,
            email,
            phone
        };

        // لربطه بالبلاغ لاحقا يحفظ في 
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        if(userType ==="مبلغ") navigate("/submit");
        else if ( userType ==="مقترح") navigate("/suggestion");
        else navigate("/home");
    };

    return(
        <div className="UserType">
            <h2>حدد دورك وسجل بياناتك</h2>
            <form onSubmit={handleSubmit} className="user-type-form">
                <input
                    type="text"
                    placeholder="الاسم الكامل"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {userType === "مبلغ" && (
                    <input
                        type="text"
                        placeholder="الرقم الوطني"
                        value={nationalID}
                        onChange={(e) => setnationalID(e.target.value)}
                        required
                    />
                )};

                <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={email}   
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="رقم الهاتف"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

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
                <button type="submit">متابعة</button>
            </form>
        </div>
    )
}



