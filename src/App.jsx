import React,{useState,useEffect} from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
const readPage=()=>['login','teacher','student'].includes(window.location.hash.slice(1))?window.location.hash.slice(1):'landing';
export default function App(){
 const [page,setPage]=useState(readPage);
 useEffect(()=>{const onHash=()=>setPage(readPage());window.addEventListener('hashchange',onHash);return ()=>window.removeEventListener('hashchange',onHash)},[]);
 const navigate=(next)=>{setPage(next);window.location.hash=next==='landing'?'top':next;window.scrollTo({top:0,behavior:'instant'});};
 if(page==='login')return <AuthPage onBack={()=>navigate('landing')} onEnter={role=>navigate(role)}/>;
 if(page==='student')return <StudentDashboard onBack={()=>navigate('landing')}/>;
 if(page==='teacher')return <TeacherDashboard role="teacher" onBack={()=>navigate('landing')}/>;
 return <LandingPage onNavigate={navigate}/>;
}
