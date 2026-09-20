import { useEffect, type RefObject } from 'react'
import { useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
gsap.registerPlugin(ScrollTrigger, useGSAP)
export function usePageMotion(root: RefObject<HTMLElement | null>) {
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({duration:1.05, smoothWheel:true, syncTouch:false, anchors:{offset:-76}})
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time:number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    return () => {gsap.ticker.remove(tick);lenis.destroy()}
  },[reduce])
  useGSAP(() => {
    if(reduce) return
    const selector = gsap.utils.selector(root)
    gsap.from(selector('.hero-enter'), {y:18, opacity:0, duration:1.1, stagger:.14, delay:.3, ease:'power3.out'})
    selector('.light-reveal').forEach((el:HTMLElement) => {
      gsap.from(el, {clipPath:'inset(0 100% 0 0)',filter:'brightness(2)',duration:1.15,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}})
    })
    selector('.portrait').forEach((el:HTMLElement) => {
      gsap.from(el, {filter:'brightness(0.2) grayscale(1) blur(3px)',duration:1.4,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 83%',once:true}})
    })
    selector('.program-item').forEach((el:HTMLElement) => {
      gsap.from(el, {filter:'blur(7px)',opacity:.2,y:20,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 83%',once:true}})
    })
    selector('.manifesto-line').forEach((el:HTMLElement) => {
      gsap.from(el, {color:'#5a5018',scrollTrigger:{trigger:el,start:'top 84%',end:'top 56%',scrub:true}})
    })
    gsap.from(selector('.merch-item'), {y:35,rotation:0,opacity:.2,stagger:.15,duration:.8,scrollTrigger:{trigger:'.merch-stage',start:'top 80%',once:true}})
    const refresh = () => ScrollTrigger.refresh()
    document.fonts.ready.then(refresh)
    const observer = new ResizeObserver(refresh)
    if(root.current) observer.observe(root.current)
    return () => observer.disconnect()
  },{scope:root,dependencies:[reduce],revertOnUpdate:true})
}
