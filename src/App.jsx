import React,{useState,useEffect} from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import {isRole,readRole,resolveRoute,sessionKey} from './lib/session.js';
const initialRole=()=>{try{return readRole(window.sessionStorage)}catch{return null}};
export default function App(){
 const [role,setRole]=useState(initialRole);
 const [hash,setHash]=useState(()=>window.location.hash);
 const page=resolveRoute(hash,role);
 useEffect(()=>{const sync=()=>setHash(window.location.hash);window.addEventListener('hashchange',sync);window.addEventListener('popstate',sync);return ()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('popstate',sync)}},[]);
 useEffect(()=>{const actual=window.location.hash;const target=resolveRoute(actual,role);if(target!=='landing'&&actual!==`#${target}`){window.history.replaceState(null,'',`#${target}`);setHash(`#${target}`)}},[hash,role]);
 const navigate=(next)=>{const target=next==='landing'?'#top':`#${next}`;window.history.replaceState(null,'',target);setHash(target);window.scrollTo({top:0,behavior:'instant'})};
 const enter=(nextRole)=>{if(role||!isRole(nextRole))return;try{window.sessionStorage.setItem(sessionKey,nextRole)}catch{}setRole(nextRole);navigate(nextRole)};
 const logout=()=>{try{window.sessionStorage.removeItem(sessionKey)}catch{}setRole(null);navigate('landing')};
 if(page==='login')return <AuthPage onBack={()=>navigate('landing')} onEnter={enter}/>;
 if(page==='student')return <StudentDashboard onBack={logout}/>;
 if(page==='teacher')return <TeacherDashboard role="teacher" onBack={logout}/>;
 return <LandingPage onNavigate={navigate}/>;
}
