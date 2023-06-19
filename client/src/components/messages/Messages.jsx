import Message from '../message/Message'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import "./messages.css"
export default function Messages({currUser, messages}) {
    return (
        <>
        { 
        currUser ?
        <>
       <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
            <div className="img_cont">
                <img src={currUser.profilePic ? currUser.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="rounded-circle user_img"/>
                <span className="online_icon"></span>
            </div>
            <div className="user_info">
                <span>{currUser.username}</span>
                <p>STATO: DA FARE</p>
            </div>
        </div>
    </div>
        
        </> : 
        <>
        
        </>
        
        }
        <div className="card-body msg_card_body">
        { messages.length > 0 ?  messages.map((c, index) => <Message mess={c} user={currUser} key={index} /> ) : "Ancora nessun messaggio..."}
        </div>
        </>
)
}
    
