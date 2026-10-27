import React,{Suspense,useMemo,useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {Environment,OrbitControls,useGLTF,Html} from '@react-three/drei';
import * as THREE from 'three';

const RINGS={
 diamond:{src:'/models/diamond-ring.glb',name:'Кольцо с камнями',spots:[['Закрепка камней','Рассмотрите расположение камней и посадочные места.'],['Геометрия оправы','Поверните модель и изучите конструкцию оправы.']]},
 floral:{src:'/models/floral-ring.glb',name:'Фактурное кольцо',spots:[['Рельеф поверхности','Изучите рисунок и глубину декоративного рельефа.'],['Внутренняя поверхность','Посмотрите на форму внутренней части кольца.']]}
};
function RingMesh({kind,activeSpot,setActiveSpot}){
 const {scene}=useGLTF(RINGS[kind].src);
 const {center,scale,spots}=useMemo(()=>{
  const bounds=new THREE.Box3().setFromObject(scene);
  const center=bounds.getCenter(new THREE.Vector3());
  const size=bounds.getSize(new THREE.Vector3());
  const max=Math.max(size.x,size.y,size.z,0.001);
  // Normalise every GLB to the same world-space size. Camera limits now work consistently.
  const scale=2.65/max;
  const spots=[
   [size.x*.28,size.y*.26,size.z*.36],
   [-size.x*.27,-size.y*.23,size.z*.34]
  ];
  return {center,scale,spots};
 },[scene]);
 return <group scale={scale}>
  <primitive object={scene} position={[-center.x,-center.y,-center.z]}/>
  {RINGS[kind].spots.map(([title],i)=><Html key={i} position={spots[i]} center transform={false} zIndexRange={[20,0]}>
   <button type="button" className={'heroHotspot '+(activeSpot===i?'isActive':'')} aria-label={'Подробнее: '+title} onPointerDown={e=>e.stopPropagation()} onClick={e=>{e.stopPropagation();setActiveSpot(activeSpot===i?null:i)}}><span className="hotspotCore"/></button>
  </Html>)}
 </group>;
}
function RingScene({kind,activeSpot,setActiveSpot}){
 const [interacting,setInteracting]=useState(false);
 return <Canvas camera={{position:[0,0.5,5.3],fov:40,near:0.05,far:100}} dpr={[1,1.75]} gl={{antialias:true,alpha:true}}>
  <ambientLight intensity={1.45}/><directionalLight position={[4,6,5]} intensity={2.6}/>
  <Suspense fallback={<Html center><span className="ringLoading">Загрузка 3D…</span></Html>}>
   <RingMesh kind={kind} activeSpot={activeSpot} setActiveSpot={setActiveSpot}/>
   <Environment preset="studio"/>
  </Suspense>
  <OrbitControls makeDefault target={[0,0,0]} autoRotate={!interacting&&activeSpot===null} autoRotateSpeed={1.15} enableDamping enablePan={false} minDistance={3.2} maxDistance={6.1} minPolarAngle={0.2} maxPolarAngle={Math.PI-0.2} onStart={()=>setInteracting(true)} onEnd={()=>setInteracting(false)}/>
 </Canvas>;
}
export default function RingViewer({initial='diamond',hero=false,locked=false}){
 const [kind,setKind]=useState(initial),[activeSpot,setActiveSpot]=useState(null);
 const spot=activeSpot===null?null:RINGS[kind].spots[activeSpot];
 return <div className={'ringViewer '+(hero?'ringViewerHero':'')}>
  <div className="ringViewerCanvas"><RingScene kind={kind} activeSpot={activeSpot} setActiveSpot={setActiveSpot}/></div>
  {spot&&<div className="ringInfoOverlay" role="status"><button type="button" className="ringInfoClose" aria-label="Закрыть пояснение" onClick={()=>setActiveSpot(null)}>×</button><strong>{spot[0]}</strong><p>{spot[1]}</p></div>}
  {!hero&&!locked&&<div className="ringViewerControls"><div className="ringSwitch" role="group" aria-label="Выбор кольца">{Object.keys(RINGS).map(k=><button key={k} className={kind===k?'selected':''} onClick={()=>{setKind(k);setActiveSpot(null)}}>{RINGS[k].name}</button>)}</div></div>}
 </div>;
}
