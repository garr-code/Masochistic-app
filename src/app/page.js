"use client"
import "./page.module.css";
import Popup from "./components/popup";
import "./home.css"
import { useEffect, useState } from "react";
import Adding from "./components/adding";
import Checked from "./components/checked";
import Image from "next/image";

export default function Home() {
  const [adding, setAdding]=useState(false)
  const [tasks, setTasks]=useState([])
  const [loading, setLoading]=useState(false)
  const [checked, setChecked]=useState(false)
  const [checkdata, setCheckdata]=useState({})

  useEffect(()=>{
    setLoading(true)
    const data=localStorage.getItem("tasks")
      if (data) {
      setTasks(JSON.parse(data))
    } else {
      setTasks([])
    }
    setLoading(false)
  }, [adding, checked])

  return (
    <div className="container">
      <Popup/>
      {adding && <Adding setAdding={setAdding} adding={adding}/>}
      {checked && <Checked data={checkdata} setChecked={setChecked}/>}
      <div className="contained">
        <span className="title">What you will fail today?</span>
        <div className="input" onClick={()=>{
          setAdding(true)
        }}>
          <div className="plus">+</div>
          <span>Add a task (you won’t do that)</span>
        </div>
        <div className="tasker" style={loading? {display: 'flex', justifyContent: 'center', alignItems: 'center'} : {}}>
          {loading? <Image src={'/loading.svg'} width={50} height={50} alt='The loading png' className='loading'/> :
            tasks.map((task, key)=>{
              return(
                <div className="task" key={key}><input type="checkbox" checked={checked} onChange={()=>{
                  setChecked(true)
                  setCheckdata({title: task.title, description: task.description})
                  localStorage.setItem("tasks", JSON.stringify([...tasks.slice(0, key), ...tasks.slice(key+1, task.length)]))
                }}/><span>{task.title}</span></div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
