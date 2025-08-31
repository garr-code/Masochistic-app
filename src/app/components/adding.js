"use client"
import axios from "axios";
import "./adding.css"
import { useRef, useEffect, useState } from "react";

export default function Adding({setAdding, adding}){
    const divRef = useRef()
    const [inp1, setInp1]=useState("")
    const [inp2, setInp2]=useState("")
    const [completed, setCompleted]=useState(false)
    const [loading, setLoading]=useState(false)
    const [message, setMessage]=useState("")
    const [error, setError]=useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target) && !loading) {
            setAdding(false)
        }
        }
        document.addEventListener("click", handleClickOutside)
        return () => {
        document.removeEventListener("click", handleClickOutside)
        }
    }, [completed])

    const [stored, setStored]=useState([])

    useEffect(()=>{
        const data = localStorage.getItem("tasks")
        if (data) {
            setStored(JSON.parse(data))
        }
    }, [adding])

    return(
        <div className="adding">
            <div className="what" ref={divRef}>
                { completed ? 
                <div className="completed">
                    {error ?
                        <span style={{color: 'red'}}>
                            C'è stato un errore!<br/> Riprova.
                        </span>
                        :
                        <>
                            <div>🤣</div>
                            <span>
                                {message}
                            </span>
                        </>
                    }
                </div> : 
                <>
                    <input placeholder="Cosa fallire..." className="inp one" maxLength={30} onChange={(e)=>{
                        setInp1(e.target.value)
                    }}/>
                    <textarea placeholder="Una breve descrizione del tuo futuro fallimento..." className="inp two" maxLength={200} onChange={(e)=>{
                        setInp2(e.target.value)
                    }}/>
                    <button onClick={async ()=>{
                        if(inp1 && inp2 && !loading){
                            setLoading(true)
                            const response= await axios.post(`/api/creation`, {title: inp1, description: inp1})
                            const data=response.data
                            if(data && data.success){
                                setMessage(data.reply)
                                localStorage.setItem("tasks", JSON.stringify([...stored, {title: inp1, description: inp2}]))
                                setCompleted(true)
                                setLoading(false)
                            }
                            else{
                                setError(true)
                            }
                        }
                    }}>{loading? "Caricando..." : "Aggiungi"}</button>
                </>
                }
            </div>
        </div>
    )
}