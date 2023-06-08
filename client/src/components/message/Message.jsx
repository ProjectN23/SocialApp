export default function Message({mess, user}) {
    console.log(mess)
    return (
    <>
    { user === mess.sender ? 
    
    <div className="d-flex justify-content-start mb-4">
        <div className="msg_cotainer">
            {mess.text}
            <span className="msg_time">{mess.createdAt}</span>
        </div>
    </div>
     : 
    <div className="d-flex justify-content-end mb-4">
        <div className="msg_cotainer_send">
            {mess.text}
            <span className="msg_time_send">{mess.createdAt}</span>
        </div>
        <div className="img_cont_msg">
        </div>
    </div>
    } 
        
            
   
    </>
    )
}