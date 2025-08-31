"use client"
import "./popup.css"
import Image from "next/image"
import { useState } from "react"

export default function Popup(){
    const [trigger, setTrigger]=useState(false)
    const [display, setDisplay]=useState(false)
    return(
        <div className={display? "popup display" : "popup"}>
            <Image src={'/angry.png'} width={100} height={100} alt="an image of an angry face"/>
            <div>
                <span>Sei pronto a fallire di nuovo?</span>
                <p className="boh">La to-do list che ti ricorda quanto sei inutile</p>
                <div>
                    <div>
                        <button className="yes" onClick={()=>{
                            setDisplay(true)
                        }}>SI</button>
                        <button className="no" onClick={()=>{
                            setTrigger(true)
                        }}>NO</button>
                    </div>
                    {trigger && <p className="failure">Sei un fallito</p>}
                </div>
            </div>
        </div>
    )
}