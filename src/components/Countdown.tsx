import { useEffect, useState } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { siteConfig } from '@/data/site'
export function getCountdown(target:string,now:number) {
 const targetMs=Date.parse(target)
 if(!Number.isFinite(targetMs))return null
 const seconds=Math.max(0,Math.floor((targetMs-now)/1000))
 return [Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60]
}
export function Countdown(){
 const [now,setNow]=useState(Date.now())
 useEffect(()=>{const timer=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(timer)},[])
 const time=getCountdown(siteConfig.electionDate,now)
 const ended=time?.every(n=>n===0)
 return <section className="countdown section-pad" aria-labelledby="countdown-title"><div className="section-top"><span>IL FUTURO HA UN APPUNTAMENTO</span><ArrowDownRight size={21}/></div><h2 id="countdown-title">OGNI VOCE<br/>CONTA.</h2><div className="countdown-grid" aria-label={time?`${time[0]} giorni, ${time[1]} ore e ${time[2]} minuti alle elezioni`:'Data da annunciare'}>{['GIORNI','ORE','MIN','SEC'].map((label,i)=><div key={label}><span className="count-number" aria-hidden="true">{time?String(time[i]).padStart(2,'0'):'—'}</span><span className="count-label" aria-hidden="true">{label}</span></div>)}</div><div className="election-date"><span>{ended?'IL CONTO ALLA ROVESCIA È TERMINATO':new Intl.DateTimeFormat('it-IT',{day:'numeric',month:'long',year:'numeric',timeZone:'Europe/Rome'}).format(new Date(siteConfig.electionDate)).toUpperCase()}</span><span>LISTA 01</span></div><p className="demo-note">Data dimostrativa. Le elezioni ufficiali saranno annunciate qui.</p></section>
}
