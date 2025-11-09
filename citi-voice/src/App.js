import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/footer';

import Home from './pages/Home';
import About from './pages/About';
import ReportsPages from './pages/ReportsPages';
import ReportDetails from './pages/ReportDetails';
import SubmitReport from './pages/SubmitReport';
// import addReport from './pages/SubmitReport';
import Suggestions from './pages/Suggestions';
import Voting from './pages/Voting';
import Contact from './pages/contact';  
import UserType from './pages/UserType';


const defaultReport = [
  {id:0, title: "شكوى إنارة الشارع", description: "لمبة إنارة في شارع 5 مكسورة منذ أسبوع", status: "قيد الانتظار",votesUp:0, votesDown:0 },
  {id:1, title:"تراكم نفايات", description:"تراكم نفايات في زاوية شارع ___ ولا توجد حاوية مناسبة، ما يؤثر على نظافة الحي", status: "قيد المراجعة" ,votesUp:0, votesDown:0}
]

const defaultSuggestions = [
  {id:1, text:"إطلاق تطبيق بلدية يتيح تتبع البلاغات واقتراحات التحسين في الحيّ مباشرة",user:"سراب",votesUp:0,votesDown:0,date:new Date().toLocaleDateString() },
  {id:2, text:"إنشاء مسارات مخصصة للدراجات والمشاة تفصلها عن حركة السيارات",user:"ليث",votesUp:0,votesDown:0,date:new Date().toLocaleDateString() }
]

function App() {
  // Admin 
  const [currentUser, setCurrentUser] = React.useState({name:"Admin", type:"admin"});
  //حالة المستخدم التجريبية
  const[user, setUser] = React.useState({name:"سراب", type:"مبلغ", phone:"077xxxxxxx"});
  //حالة البلاغات التجريبية
  const [reports, setReports] = React.useState(defaultReport);
  const [suggestions, setSuggestions] = React.useState(defaultSuggestions);
  const [userVotes, setuserVotes] = React.useState([]);

  // لإضافة بلاغ جديد
  const addReport = (Report) => {
    setReports ([...reports,{...Report,id: Date.now(), status: 'قيد الالانتظار',votesUp:0, votesDown:0}]);
  };
    //اضافة اقتراح جديد
    const addSuggestion = (suggestion) => {
      setSuggestions (prev => [...prev,{...suggestion, id: Date.now(), rating:0,votesUp:0,votesDown:0,date: new Date().toLocaleDateString() }]);
      console.log("تمت إضافة اقتراح :",suggestions);
    };

    // لتحديث حالة البلاغ
    const updateStatus = (id, status) => {
      setReports(
        reports.map((r) => r.id === id ? {...r, status} : r));
    };
    // تحديث تقييم  اقتراح
    const updateRating = (id) => {
      if (userVotes.includes(id)) 
        return;

      setSuggestions(prev =>
        prev.map(s => s.id === id ? {...s,votes:(s.votes || 0) + 1} : s)
      );
      setuserVotes(prev => [...prev, id]);
    };
    // حذف بلاغ
    const deleteReport = (id) => {
      setReports(prev => prev.filter(r => r.id !== id));
    };

// تعديل بلاغ
    const editReport = (id) => {
      alert(`سيتم تعديل البلاغ رقم ${id}`)
    };
    // تحديث عدد الاصوات للبلاغ او الاصوات
    const handleVote = (id, voteType,type) =>{
      if (type === "report"){
        setReports(prev => prev.map(r => r.id === id ? {...r, votesUp: voteType === "up" ? (r.votesUp || 0) + 1 : r.votesUp,
          votesDown:voteType === "down" ? (r.votesDown || 0) + 1 : r.votesDown} : r));
      }
      else if (type ==="suggestion"){
        setSuggestions(prev => prev.map(s => s.id === id ? {...s, votesUp: voteType === "up" ? (s.votesUp || 0) + 1 : s.votesUp,
          votesDown:voteType === "down" ? (s.votesDown || 0) + 1 : s.votesDown} : s));
      }
    }

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes> 
          <Route path='/' element={<Home reports={reports}/>}></Route>
          <Route path='/SubmitReport' element={<SubmitReport addReport={addReport} user={user}/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/suggestions' element={<Suggestions addSuggestion={addSuggestion} suggestions={suggestions} updateRating={updateRating} />}></Route>
          <Route path='/report/:id' element={<ReportDetails reports={reports} updateStatus={updateStatus} deleteReport={deleteReport} editReport={editReport} currentUser={currentUser}/>}></Route>
          <Route path='/ReportsPages' element={<ReportsPages reports={reports} deleteReport={deleteReport}/>}></Route>
          <Route path='/voting' element={<Voting reports={reports} suggestions={suggestions} handleVote={handleVote}/>}></Route>
          <Route path='/contact' element={<Contact user={user}/>}></Route>
          <Route path='/UserType' element={<UserType user={user} setUser={setUser}/>}></Route>
        </Routes>
      
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
