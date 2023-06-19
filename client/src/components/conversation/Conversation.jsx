import {useState, useEffect} from 'react'
import axios from 'axios'
import './conversation.css'

export default function Conversation({ conversation, currUser, setCurrentChat, getCurrUser, handleDelUser}) {
    const [user, setUser] = useState([])

    useEffect(() => {
        const friendId = conversation.members.find(u => u !== currUser)
        const getUser = async () => {
            try {
                const res = await axios.get('http://localhost:8800/api/users/' + friendId);
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        getUser()
            
    }, [currUser, conversation])

    return (
        <>
        <div onClick={() => { setCurrentChat(conversation); getCurrUser(user)}}>
            <div className="d-flex bd-highlight container">
                <div className="img_cont">
                    <img src={user.profilePic ? user.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="rounded-circle user_img"/>
                    <span className="online_icon offline"></span>
                </div>
                <div className="user_info">
                    <span>{user.username}</span>
                    <p>stato forse se riusciamo</p>
                </div>
                <button className='float-end btn btn-danger' onClick={() => handleDelUser(conversation)}>Elimina</button>	
            </div>
        </div>
        </>
    )
}