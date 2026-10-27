export const KEY='orfira-v08-data';
export function readShared(){try{return JSON.parse(localStorage.getItem(KEY))||{lessons:[],tasks:[],submissions:[]}}catch{return {lessons:[],tasks:[],submissions:[]}}}
export function writeShared(data){localStorage.setItem(KEY,JSON.stringify(data));window.dispatchEvent(new Event('orfira-data-changed'))}
export function upsert(kind,item){const data=readShared();data[kind]=[item,...(data[kind]||[]).filter(x=>String(x.id)!==String(item.id))];writeShared(data)}
export function submitWork(taskId,answers,filename){const data=readShared();data.submissions=[{id:Date.now(),taskId:String(taskId),student:'Анна Волкова',group:'ЮД-421',answers,filename,status:'На проверке',createdAt:new Date().toISOString()},...(data.submissions||[])];writeShared(data)}
export function reviewWork(id,status,comment){const data=readShared();data.submissions=(data.submissions||[]).map(x=>x.id===id?{...x,status,comment}:x);writeShared(data)}
