import React,{useState} from 'react';
import {Eye,EyeOff,ArrowLeft} from 'lucide-react';

export default function AuthPage({onBack,onEnter}){
 const[role,setRole]=useState('teacher');const[show,setShow]=useState(false);
 const[email,setEmail]=useState('');const[password,setPassword]=useState('');
 const[message,setMessage]=useState('');
 function submit(e){e.preventDefault();setMessage('');if(!email.trim()||!password.trim()){setMessage('Введите почту и пароль.');return;}onEnter(role)}
 return <main className="authScreen">
  <button className="authBack" onClick={onBack}><ArrowLeft size={17}/> На главную</button>
  <div className="authCenter">
   <div className="authLogo" aria-label="Orfira">Orfira</div>
   <form className="authForm" onSubmit={submit}>
    <div className="roleSwitch" role="group" aria-label="Тип пользователя">
     <button type="button" className={role==='teacher'?'chosen':''} onClick={()=>{setRole('teacher');setMessage('')}}>Преподаватель</button>
     <button type="button" className={role==='student'?'chosen':''} onClick={()=>{setRole('student');setMessage('')}}>Ученик</button>
    </div>
    <label className="authInput"><span className="srOnly">Email</span><input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
    <label className="authInput passwordInput"><span className="srOnly">Пароль</span><input type={show?'text':'password'} placeholder="Пароль" value={password} onChange={e=>setPassword(e.target.value)} required/><button type="button" aria-label={show?'Скрыть пароль':'Показать пароль'} onClick={()=>setShow(!show)}>{show?<EyeOff size={23}/>:<Eye size={23}/>}</button></label>
    <button className="authSubmit" type="submit">Войти</button>
    <p className="authFoot">{role==='teacher'?'Нет доступа к аккаунту? Получите приглашение':'Нет аккаунта? '} {role==='student'&&<button type="button" onClick={()=>setMessage('Регистрация будет доступна после подключения авторизации.')}>Зарегистрироваться</button>}</p>
    {message&&<p className="authMessage" role="status">{message}</p>}
    <p className="authDemoNote">Демо-режим: вход открывает кабинет выбранной роли. Проверка пароля пока не подключена.</p>
   </form>
  </div>
 </main>
}
