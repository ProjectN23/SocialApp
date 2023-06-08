import { useEffect, useState } from "react"
import axios from "axios"
import Friend from '../friend/Friend'

export default function Chats({ conversation, user, getMessages, getUserConv}) {

    return (
        <>
        {conversation.map((c, index) => 
            <Friend conversation={c} currUser={user} getMessages={getMessages} getUserConv={getUserConv} key={index} />
        )}
        </>
    )
}