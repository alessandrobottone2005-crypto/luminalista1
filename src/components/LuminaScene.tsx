import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ExtrudeGeometry, Shape, Path, Group, PointLight, MathUtils } from 'three'
import { useReducedMotion } from 'motion/react'
function starPath<T extends Path>(p:T,size:number):T {
  p.moveTo(0,size)
  p.bezierCurveTo(size*.035,size*.4,size*.4,size*.035,size,0)
  p.bezierCurveTo(size*.4,-size*.035,size*.035,-size*.4,0,-size)
  p.bezierCurveTo(-size*.035,-size*.4,-size*.4,-size*.035,-size,0)
  p.bezierCurveTo(-size*.4,size*.035,-size*.035,size*.4,0,size)
  return p
}
function Sculpture({reduce}:{reduce:boolean}) {
  const group=useRef<Group>(null)
  const lamp=useRef<PointLight>(null)
  const geometries=useMemo(()=>{
    const outer=starPath(new Shape(),2.1)
    outer.holes.push(starPath(new Path(),1.94))
    return [new ExtrudeGeometry(outer,{depth:.14,bevelEnabled:true,bevelThickness:.035,bevelSize:.025,bevelSegments:3,curveSegments:32}),new ExtrudeGeometry(starPath(new Shape(),.9),{depth:.24,bevelEnabled:true,bevelThickness:.08,bevelSize:.04,bevelSegments:4,curveSegments:32})]
  },[])
  useEffect(()=>()=>geometries.forEach(g=>g.dispose()),[geometries])
  useFrame(({clock,pointer},delta)=>{
    if(reduce) return
    if(group.current) {
      group.current.rotation.y=MathUtils.damp(group.current.rotation.y,pointer.x*.18+Math.sin(clock.elapsedTime*.35)*.08,3,delta)
      group.current.rotation.x=MathUtils.damp(group.current.rotation.x,-pointer.y*.12+Math.sin(clock.elapsedTime*.25)*.03,3,delta)
    }
    if(lamp.current) {lamp.current.position.x=Math.sin(clock.elapsedTime*.55)*3+pointer.x*2;lamp.current.intensity=Math.min(clock.elapsedTime/1.6,1)*36}
  })
  return <group ref={group} rotation={[.06,-.12,-.05]}>
    <ambientLight intensity={.3}/><directionalLight position={[-2,3,4]} intensity={3} color="#fff3bf"/>
    <pointLight ref={lamp} position={[2,0,3]} intensity={36} color="#ffcf02" distance={12}/>
    <pointLight position={[-2,-2,2]} intensity={14} color="#e6efff"/>
    <mesh geometry={geometries[0]}><meshStandardMaterial color="#d5ba60" metalness={.8} roughness={.25}/></mesh>
    <mesh geometry={geometries[1]} position={[0,0,.04]}><meshStandardMaterial color="#c3c1aa" metalness={.84} roughness={.2}/></mesh>
  </group>
}
export default function LuminaScene() {
  const ref=useRef<HTMLDivElement>(null)
  const reduce=useReducedMotion()
  const [active,setActive]=useState(true)
  const [supported]=useState(()=>{try{return !!document.createElement('canvas').getContext('webgl2')}catch{return false}})
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>setActive(entry.isIntersecting),{threshold:.05})
    if(ref.current)observer.observe(ref.current)
    const visibility=()=>setActive(!document.hidden && !!ref.current && ref.current.getBoundingClientRect().bottom>0)
    document.addEventListener('visibilitychange',visibility)
    return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility)}
  },[])
  return <div ref={ref} className="sculpture" aria-hidden="true">
    {supported?<Canvas camera={{position:[0,0,6.5],fov:43}} dpr={[1,1.5]} gl={{alpha:true,antialias:true,powerPreference:'low-power'}} frameloop={active&&!reduce?'always':'demand'}><Sculpture reduce={!!reduce}/></Canvas>:<svg viewBox="0 0 100 100"><path d="M50 5Q50 50 95 50Q50 50 50 95Q50 50 5 50Q50 50 50 5Z" fill="none" stroke="#ffcf02"/><path d="M50 30Q50 50 70 50Q50 50 50 70Q50 50 30 50Q50 50 50 30Z" fill="#ffcf02"/></svg>}
  </div>
}
