import Message from '../message/Message'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
export default function Messages({currUser, messages}) {
    return (
        <>
        { 
        currUser ?
        <>
       <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
            <div className="img_cont">
                <img src={currUser.profilePic} className="rounded-circle user_img"/>
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
    
