import { useEffect, useState } from "react"
import axios from "axios"
import Conversation from '../conversation/Conversation'

export default function Chats({ conversation, user, setCurrentChat, getCurrUser, handleDelUser}) {

    return (
        <>
        {conversation.map((c, index) => 
                <Conversation conversation={c} currUser={user} setCurrentChat={setCurrentChat} getCurrUser={getCurrUser} handleDelUser={handleDelUser} key={index} />
        )}
        </>
    )
}