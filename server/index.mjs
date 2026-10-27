import http from 'node:http';import {readFile,writeFile,mkdir} from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';import {randomUUID} from 'node:crypto';
const root=path.dirname(fileURLToPath(import.meta.url));const db=path.join(root,'data','leads.json');
const send=(res,code,data)=>{res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'http://localhost:5173'});res.end(JSON.stringify(data))};
http.createServer(async(req,res)=>{if(req.method==='GET'&&req.url==='/api/health')return send(res,200,{ok:true});
if(req.method==='POST'&&req.url==='/api/leads'){
 let raw='';try{for await(const chunk of req){raw+=chunk;if(raw.length>16000)throw Error('Too large')}const d=JSON.parse(raw);const clean=v=>typeof v==='string'?v.trim().slice(0,1000):'';const lead={organization:clean(d.organization),name:clean(d.name),email:clean(d.email),phone:clean(d.phone),comment:clean(d.comment)};
 if(!lead.organization||!lead.name||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)||d.consent!==true)return send(res,400,{error:'Заполните обязательные поля и согласие'});
 await mkdir(path.dirname(db),{recursive:true});let all=[];try{all=JSON.parse(await readFile(db,'utf8'))}catch(e){if(e.code!=='ENOENT')throw e}all.push({...lead,id:randomUUID(),createdAt:new Date().toISOString()});await writeFile(db,JSON.stringify(all,null,2));return send(res,201,{ok:true,message:'Заявка сохранена локально'});
 }catch(e){return send(res,400,{error:'Не удалось обработать заявку'})}}
 send(res,404,{error:'Не найдено'});
}).listen(3001,'127.0.0.1',()=>console.log('API: http://127.0.0.1:3001'));
