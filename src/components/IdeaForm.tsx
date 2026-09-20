import { useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formConnected, submitIdea, validateIdea } from '@/lib/submitIdea'
export function IdeaForm() {
  const [idea,setIdea]=useState(''),[name,setName]=useState(''),[className,setClassName]=useState('')
  const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle')
  const [errors,setErrors]=useState<Record<string,string>>({})
  const [message,setMessage]=useState('')
  const submissionId=useRef(crypto.randomUUID())
  const inputRef=useRef<HTMLTextAreaElement>(null)
  const inFlight=useRef(false)
  async function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault()
    if(inFlight.current)return
    const form=new FormData(event.currentTarget)
    const data={idea,name,className,website:String(form.get('website')||''),submissionId:submissionId.current}
    const validation=validateIdea(data);setErrors(validation)
    if(Object.keys(validation).length){inputRef.current?.focus();return}
    inFlight.current=true;setStatus('sending');setMessage('')
    try{await submitIdea(data);setStatus('success')}
    catch(error){setStatus('error');setMessage(error instanceof Error?error.message:'Connessione interrotta. Riprova: il testo è ancora qui.')}
    finally{inFlight.current=false}
  }
  return <section id="idea" className="idea-section section-pad" aria-labelledby="idea-title">
    <div className="section-top"><span>IL PROSSIMO PASSO È TUO</span><ArrowUpRight size={19}/></div>
    <h2 id="idea-title">ORA METTI<br/>IN LUCE<br/><span className="highlight-mark">LA TUA IDEA.</span></h2>
    <p className="section-copy">Cosa vorresti aggiungere, cambiare o migliorare nella tua scuola?</p>
    {!formConnected&&<p className="form-availability"><span/>Anteprima del modulo · raccolta non ancora attiva.</p>}
    <AnimatePresence mode="wait">
      {status==='success'?<motion.div key="success" className="form-success" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} role="status"><Check size={32}/><h3>IDEA RICEVUTA.</h3><p>La tua voce è arrivata. Grazie per aver acceso una nuova possibilità.</p><Button variant="outline" onClick={()=>{setIdea('');setName('');setClassName('');setStatus('idle');submissionId.current=crypto.randomUUID()}}><RotateCcw size={16}/> Scrivi un’altra idea</Button></motion.div>:
      <motion.form key="form" initial={false} exit={{opacity:0}} onSubmit={handleSubmit} noValidate className="idea-form">
        <div><div className="field-header"><label htmlFor="idea-text">La tua idea <span>*</span></label><span>{idea.length}/2000</span></div><Textarea id="idea-text" ref={inputRef} name="idea" value={idea} onChange={e=>{setIdea(e.target.value);submissionId.current=crypto.randomUUID()}} disabled={status==='sending'} placeholder="Anche una piccola idea può fare luce." required minLength={10} maxLength={2000} aria-invalid={!!errors.idea} aria-describedby={errors.idea?'idea-error':undefined}/>{errors.idea&&<p className="field-error" id="idea-error">{errors.idea}</p>}</div>
        <div className="form-row"><div><label htmlFor="idea-name">Nome <span>(facoltativo)</span></label><Input id="idea-name" name="name" value={name} onChange={e=>{setName(e.target.value);submissionId.current=crypto.randomUUID()}} disabled={status==='sending'} maxLength={80} placeholder="Come ti chiami?" autoComplete="given-name"/></div><div><label htmlFor="idea-class">Classe <span>(facoltativa)</span></label><Input id="idea-class" name="className" value={className} onChange={e=>{setClassName(e.target.value);submissionId.current=crypto.randomUUID()}} disabled={status==='sending'} maxLength={20} placeholder="Es. 4A" autoComplete="off"/></div></div>
        <div className="honeypot" aria-hidden="true"><label htmlFor="website">Sito web</label><input id="website" name="website" tabIndex={-1} autoComplete="off"/></div>
        <p className="privacy-note">Puoi partecipare senza indicare il nome. Leggi come saranno trattati i dati nell’<Link to="/privacy">informativa privacy</Link>.</p>
        <Button className="submit-button" type="submit" disabled={status==='sending'}>{status==='sending'?'INVIO IN CORSO…':'INVIA LA TUA IDEA'}<ArrowUpRight size={24}/></Button>
        <div aria-live="polite">{status==='error'&&<p className="field-error submission-error">{message}</p>}</div>
      </motion.form>}
    </AnimatePresence>
    <p className="form-end">LE IDEE FANNO LUCE. INSIEME, DI PIÙ.</p>
  </section>
}
