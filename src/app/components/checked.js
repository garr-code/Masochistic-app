import { useEffect, useRef, useState } from 'react'
import './checked.css'
import Image from 'next/image'
import axios from 'axios'

export default function Checked({data, setChecked}){
    const divRef = useRef()
    const [loading, setLoading]=useState(true)
    const [message, setMessage]=useState("")
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setChecked(false)
        }
        }
        document.addEventListener("click", handleClickOutside)
        return () => {
        document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    useEffect(()=>{
        setLoading(true)
        async function sendReply() {
            const response=await axios.post('/api/deleting', {title: data.title, description: data.description})
            const datas=response.data
            if(datas && datas.success){
                setMessage(datas.reply)
            }
            setLoading(false)
        }
        sendReply()
        
    }, [])
    
    return(
        <div className="checker">
            <div className='inner' ref={divRef}>
                {
                    loading? 
                    <div><Image src={'/loading.svg'} width={112} height={112} alt='The loading png' className='loading'/></div>
                    :
                    <>
                        <div>
                            🤨
                        </div>
                        <span>{message}</span>
                    </>}
            </div>
        </div>
    )
}