import Conversations from "../../components/conversations/Conversations";
import Messages from "../../components/messages/Messages";
import "./home.css"
import Cookies from 'universal-cookie';
import jwt from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useState , useEffect, useRef} from 'react'
import axios from 'axios'

import { io } from "socket.io-client";


export default function Home() {


	const cookies = new Cookies()
	const navigate = useNavigate();

	//li utilizziamo per fare vedere a video le conversazioni
	const userDec = jwt(cookies.get("jwt_authorization"))
	const [conversation, setConversations] = useState([])
	const [searchUser, setSearchUser] = useState('')
	const [currUser, setCurrUser] = useState('')
	const [flagButton, setButtons] = useState(false)
	const socket = useRef();



	const [currConv, setCurrConv] = useState([])
	const [messages, setMessages] = useState([])
	const [newMess, setNewMess] = useState('')

	const [userSearched, setUserSearched] = useState(null)

	


	const logout = () => {
		cookies.remove("jwt_authorization")
		alert("Logout effettuato con successo");
		navigate('/');
	}


	const setCurrentChat = (currentConv) => {
		setCurrConv(currentConv)
		console.log(currConv)
	}

	const getCurrUser = (currentUser) => {
		setCurrUser(currentUser)
	}


	const [arrivalMessage, setArrivalMessage] = useState(null)
	  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);


  useEffect(() => {
    arrivalMessage &&
      currConv?.members.includes(arrivalMessage.sender) &&
      setMessages();
  }, [arrivalMessage, currConv]);


  useEffect(() => {
    socket.current.emit("addUser", userDec.user_id);
    socket.current.on("getUsers", (users) => {
      console.log(users)
    });
  }, [userDec.user_id]);


    

	useEffect(() => {
		const getConv = async () => {
            try {

                const resConv = await axios.get('http://localhost:8800/api/conversations/' + userDec.user_id);
                setConversations(resConv.data)
            } catch (err) {
                console.log(err)
            }
        };
        getConv()
	}, [userDec.user_id])
        
            

	useEffect(() => {
	const getMessages = async () => {
		try {
			const resMess = await axios.get('http://localhost:8800/api/messages/' + currConv?._id);
			setMessages(resMess.data)
		} catch (err) {
			console.log(err)
		}
	}
	getMessages();
}, [currConv._id]);



	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			conversationId: currConv,
			sender: userDec.user_id,
			text: newMess,
		}

		const receiverId = currConv.members.find(member => member !== userDec._id)
		socket.current.emit("sendMessage", {
			senderId : userDec.user_id,
			receiverId,
			text: newMess,
		})
		
		try {
			const res =  await axios.post('http://localhost:8800/api/messages/', message);
			setMessages((prev) =>[...prev, res.data])
			setNewMess('')
		  } catch (err) {
			alert(err.response);
		  }
	}


	const handleSearch = async (e) => {
		try {
			const res =  await axios.get('http://localhost:8800/api/users/getUserByName/' + searchUser);
			setUserSearched(res.data)
			console.log(userSearched)
		  } catch (err) {
			alert(err.response);
		  }
		}


		const handleAddUser = async (e) => {
			e.preventDefault()
			setButtons(true)
		}
	
		const handleChat = async (e) => {
			e.preventDefault()
			setButtons(false)
		}

		const handleAddUserToChat = async (e) => {
			e.preventDefault()
			const data = {
				senderId: userDec.user_id,
				receiverId: userSearched._id,
			}
			
			try {
				const res =  await axios.post('http://localhost:8800/api/conversations/', data);
				setConversations((prev) =>[...prev, res.data])
				setButtons(false)
			  } catch (err) {
				alert(err.response);
			  }
		}


		const handleDelUser = async (conv) => {

			try {
				await axios.delete('http://localhost:8800/api/conversations/deleteConv', conv);
				setConversations(conversation => {
					return conversation.filter(e => e._id !== conv._id)
				})
			  } catch (err) {
				alert(err.response);
			  }
			
		}
	
  return (
	<>
    <div className='container-fluid 100-w vh-100'>
    	<div className="row">
			<div className="col-sm-3 col-md-5 col-xl-4 chat">
				<div className="card">
					<div className="card-header">
						<div className="card-icons">
							<button className="btn btn-light" onClick={logout}>Logout</button>
							<button className="btn btn-light" onClick={handleAddUser}><i className="bi bi-3x bi-person-add icons"></i></button>
							<button className="btn btn-light rounded-5" onClick={handleChat}><i class="bi bi-chat-dots icons"></i></button>
						</div>		
					</div>
					<div className="card-body contacts_body">
						{ flagButton ?
							<>
							<div className="input-group">
								<input type="text" placeholder="Search..." className="form-control search"
								value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
								<div className="input-group-prepend">
									<span className="input-group-text search_btn" onClick={handleSearch}><i className="bi bi-search"></i></span>
								</div>
							</div>
							<ul className="contacts">
								{ userSearched === null ?
									<span>Nessun utente con quel nome</span> 
								:
								<>
								<div className="d-flex bd-highlight container">
									<div className="img_cont">
										<img src={userSearched.profilePic ? user.profilePic : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="rounded-circle user_img"/>
										<span className="online_icon offline"></span>
									</div>
									<div className="user_info">
										<span>{userSearched.username}</span>
										<p>stato forse se riusciamo</p>
									</div>
									<div float-right>
										<i class="bi bi-plus-circle" onClick={handleAddUserToChat}></i>
									</div>
								</div>	
								</>
								} 		
							</ul>
							</> : 
							<ul className="contacts">
								<li>
									<Conversations conversation={conversation} user={userDec.user_id} setCurrentChat={setCurrentChat} getCurrUser={getCurrUser} handleDelUser={handleDelUser} />							
								</li>
							</ul>
						}
					</div>
				</div>
			</div>
			<div className="col-md-7 col-xl-8 chat">
				<div className="card">
					{ 
					currUser ? 
					<>
					<Messages currUser={currUser} messages={messages}/> 
					
					<div className="card-footer">
						<div className="input-group">
							<div className="input-group-append">
								<span className="input-group-text attach_btn"><i className="bi bi-paperclip"></i></span>
							</div>
							<textarea name="" className="form-control type_msg" placeholder="Type your message..." 
							onChange={(e) => setNewMess(e.target.value)}
							value={newMess}
							></textarea>
							<div className="input-group-append">
								<button className="input-group-text send_btn"><i className="bi bi-send-fill" onClick={handleSubmit}></i></button>
							</div>
						</div>
					</div>
					</> : 
					<div className="card-header msg_head">
						<div className="d-flex bd-highlight">
							<span id="action_menu_btn"><i className="bi bi-person-circle"></i></span>	
						</div>
					</div>
					
					}									
				</div>
			</div>
		</div>
	</div>
	</>
  );
}


