import {format} from 'timeago.js'
import "./message.css"
export default function Message({mess, user}) {

    return (
    <>
    { user._id === mess.sender ? 
    
    <div className="d-flex justify-content-start mb-4">
        <div className="msg_container">
            {mess.text}
            <span className="msg_time">{format(mess.createdAt)}</span>
        </div>
    </div>
     : 
    <div className="d-flex justify-content-end mb-4">
        <div className="msg_cotainer_send">
            {mess.text}
            <span className="msg_time_send">{format(mess.createdAt)}</span>
        </div>
        <div className="img_cont_msg">
        </div>
    </div>
    }        
   
    </>
    )
}