import React from 'react'
import vid1 from '../Assests/panda.mp4.mp4'
import vid2 from '../Assests/panda2.mp4.mp4'
import {useEffect} from 'react'
export default function Ioa() {
    const callback = (entries) => {
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[0]
            console.log(ele)
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause()
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback, {threshold:0.6});
    useEffect(()=>{
        const elements = document.querySelectorAll(".videos")
        elements.forEach((element)=>{
            observer.observe(element)
        })
    },[])
  return (
    <div className="video-conatinerss">
    <div className="videos">
        <video src={vid1} muted="muted" style={{height:'85vh'}}/>
    </div>
    <div className="videos">
        <video src={vid2} muted="muted" style={{height:'85vh'}}/>
    </div>
    <div className="videos">
        <video src={vid1} muted="muted" style={{height:'85vh'}}/>
    </div>
</div>
  )
}

