import Message from '../message/Message'
import {useState, useEffect} from 'react'
import axios from 'axios'
export default function Messages({currUser, messages}) {
    return (
    <>
        <div className="card-header msg_head">
            <div className="d-flex bd-highlight">
                <div className="img_cont">
                    <img src={currUser.profilePic} className="rounded-circle user_img"/>
                    <span className="online_icon"></span>
                </div>
                <div className="user_info">
                    <span>{currUser.username}</span>
                    <p>1767 Messages</p>
                </div>
                <div className="video_cam">
                    <span><i className="bi bi-video"></i></span>
                    <span><i className="fa fa-phone"></i></span>
                </div>
            </div>
            <span id="action_menu_btn"><i className="bi bi-three-dots-vertical"></i></span>
            <div className="action_menu">
                <ul>
                    <li><i className="bi bi-person-circle"></i> View profile</li>
                    <li><i className="fa fa-users"></i> Add to close friends</li>
                    <li><i className="fa fa-plus"></i> Add to group</li>
                    <li><i className="fa fa-ban"></i> Block</li>
                </ul>
            </div>
		</div>
        <div className="card-body msg_card_body">
        { messages.map((c, index) => 
            <Message mess={c} key={index} />
        )}
        </div>
    </>

)
}
    
