import { useEffect, useState } from "react"
import axios from "axios"
import Conversation from '../conversation/Conversation'

export default function Chats({ conversation, user, setCurrentChat, getCurrUser}) {

    return (
        <>
        {conversation.map((c, index) => 
                <Conversation conversation={c} currUser={user} setCurrentChat={setCurrentChat} getCurrUser={getCurrUser} key={index} />
        )}
        </>
    )
}