"use client"
import "./popup.css"
import Image from "next/image"
import { useState } from "react"

export default function Popup(){
    const [trigger, setTrigger]=useState(false)
    const [display, setDisplay]=useState(false)
    return(
        <div className={display? "popup display" : "popup"}>
            <Image src={'/angry.png'} width={200} height={200} alt="an image of an angry face"/>
            <div>
                <span>Ready to be insulted?</span>
                <div>
                    <div>
                        <button className="yes" onClick={()=>{
                            setDisplay(true)
                        }}>YES</button>
                        <button className="no" onClick={()=>{
                            setTrigger(true)
                        }}>NO</button>
                    </div>
                    {trigger && <p className="failure">You are a failure anyway</p>}
                </div>
            </div>
        </div>
    )
}