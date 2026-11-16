const DB='orfira-media-v1';
function db(){return new Promise((resolve,reject)=>{const req=indexedDB.open(DB,1);req.onupgradeneeded=()=>req.result.createObjectStore('assets');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
export async function putMedia(key,file){const d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction('assets','readwrite');tx.objectStore('assets').put(file,key);tx.oncomplete=()=>{d.close();resolve()};tx.onerror=()=>reject(tx.error)})}
export async function getMedia(key){const d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction('assets','readonly');const r=tx.objectStore('assets').get(key);r.onsuccess=()=>{d.close();resolve(r.result||null)};r.onerror=()=>reject(r.error)})}
