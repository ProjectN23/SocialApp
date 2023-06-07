import {useState, useEffect} from 'react'
import axios from 'axios'
import './chat.css'

export default function Chat({ conversation, currUser}) {
    const [user, setUser] = useState(null)

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
        <div className="d-flex bd-highlight">
            <div className="img_cont">
                <img src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg" className="rounded-circle user_img"/>
                <span className="online_icon offline"></span>
            </div>
            <div className="user_info">
                <span>{user}</span>
                <p>Taherah left 7 mins ago</p>
            </div>
        </div>
        </>
    )
}