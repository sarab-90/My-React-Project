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
import { Phone } from '@mui/icons-material';


function App() {
  //حالة المستخدم التجريبية
  const[user, setUser] = React.useState({name:"sarab", type:"مبلغ", Phone:"077xxxxxxx"});
  //حالة البلاغات التجريبية
  const [reports, setReports] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState([]);

  //دالة لإضافة بلاغ جديد
  const addReport = (Report) => {
    setReports ([...reports,{...Report,id: Data.now(), status: 'قيد الالانتظار'}]);
  };
    //اضافة اقتراح جديد
    const addSuggestion = (suggestion) => {
      setSuggestions ([...suggestions,{...suggestion, id: Data.now() }]);
    };

    //دالة لتحديث حالة البلاغ
    const updateStatus = (id, status) => {
      setReports(
        reports.map((r) => r.id === id ? {...r, status} : r));
    };

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home reports={reports}/>}></Route>
          <Route path='/SubmitReport' element={<SubmitReport addReport={addReport} user={user}/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/suggestions' element={<Suggestions addSuggestion={addSuggestion} suggestions={suggestions} />}></Route>
          <Route path='/ReportDetails' element={<ReportDetails reports={reports} updateStatus={updateStatus}/>}></Route>
          <Route path='/ReportsPages' element={<ReportsPages reports={reports}/>}></Route>
          {/* <Route path='/ReportsPages' Component={<ReportsPages reports={reports}/> }></Route> */}
          <Route path='/voting' element={<Voting reports={reports} suggestions={Suggestions}/>}></Route>
          {/* <Route path='/report/:id' Component={ReportDetails}></Route> */}
          <Route path='/contact' element={<Contact user={user}/>}></Route>
          <Route path='/UserType' element={<UserType user={user}/>}></Route>
        </Routes>
      
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
