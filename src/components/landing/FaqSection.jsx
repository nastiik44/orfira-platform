import React,{useState} from 'react';
import {faqs} from '../../config/site';
import {Plus,Minus} from 'lucide-react';
export default function FaqSection(){const [faq,setFaq]=useState(0); return (<section className="section faqSection" id="faq"><div className="wrap faqLayout"><div><div className="sectionLabel">06 / FAQ</div><h2>Часто задаваемые<br/><em>вопросы.</em></h2></div><div>{faqs.map(([q,a],i)=><div className="faqItem" key={q}><button aria-expanded={faq===i} onClick={()=>setFaq(faq===i?-1:i)}><span>{q}</span>{faq===i?<Minus size={19}/>:<Plus size={19}/>}</button>{faq===i&&<p>{a}</p>}</div>)}</div></div></section>);}
