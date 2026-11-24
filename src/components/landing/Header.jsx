import BrandLogo from '../common/BrandLogo';
import React,{useState} from 'react';
import {Menu,X,ArrowUpRight} from 'lucide-react';
import {nav} from '../../config/site';
export default function Header({onNavigate}){
const [mobile,setMobile]=useState(false);
return (<header className="header"><BrandLogo/><nav className={mobile?'nav open':'nav'}>{nav.map(([t,h])=><a key={h} href={h} onClick={()=>setMobile(false)}>{t}</a>)}<button type="button" className="login mobileLogin" onClick={()=>{setMobile(false);onNavigate('login')}}>Войти</button></nav><div className="headActions"><button className="login" onClick={()=>onNavigate('login')}>Войти</button><a className="btn dark headBtn" href="#contact">Оставить заявку <ArrowUpRight size={16}/></a></div><button className="mobileToggle" aria-label={mobile?"Закрыть меню":"Открыть меню"} aria-expanded={mobile} onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button></header>);
}
