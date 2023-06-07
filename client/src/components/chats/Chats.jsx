import { useEffect, useState } from "react"
import axios from "axios"
import Chat from '../chat/Chat'

export default function Chats({user}) {
    const [conversation, setConversations] = useState([])

    useEffect(() => {
        const getConv = async () => {
            try {
                const resConv = await axios.get('http://localhost:8800/api/conversations/' + user);
                setConversations(resConv.data)
            } catch (err) {
                console.log(err)
            }
        };
        getConv()
            
    }, [user]);

    return (
        <>
        {conversation.map((c, index) => 
            <Chat conversation={c} currUser={user} key={index} />
        )}
        </>
    )
}