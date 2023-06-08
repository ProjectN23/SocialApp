import Conversations from "../../components/conversations/Conversations";
import Messages from "../../components/messages/Messages";
import "./home.css"
import Cookies from 'universal-cookie';
import jwt from "jwt-decode";
const cookies = new Cookies()
import { useNavigate } from 'react-router-dom';
import { useState , useEffect, useRef} from 'react'
import axios from 'axios'

export default function Home() {
	const navigate = useNavigate();

	//li utilizziamo per fare vedere a video le conversazioni
	const userDec = jwt(cookies.get("jwt_authorization"))
	const [conversation, setConversations] = useState([])
	const [currUser, setCurrUser] = useState('')



	const [currConv, setCurrConv] = useState([])
	const [messages, setMessages] = useState([])

	const [newMess, setNewMess] = useState('')


	const logout = () => {
		cookies.set("jwt_authorization", null)
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
		try {
			const res =  await axios.post('http://localhost:8800/api/messages/', {
			  conversationId: currConv,
			  sender: userDec.user_id,
			  text: newMess,
			});
			setMessages([...messages, res.data])
			alert("Messaggio inviato con successo");
			setNewMess('')
		  } catch (err) {
			alert(err.response);
		  }
	}

  return (
	<>
    <div className='container-fluid justify-content-center align-items-center 100-w vh-100 bg-primary'>
      <div className="row justify-content-center align-items-center h-100">
				<div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
					<div className="card-header">
						<div className="input-group">
							<input type="text" placeholder="Search..." name="" className="form-control search"/>
							<div className="input-group-prepend">
								<span className="input-group-text search_btn"><i className="bi bi-search"></i></span>
							</div>
						</div>
					</div>
					<div className="card-body contacts_body">
						<ul className="contacts">
						{/*<li className="active">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img"/>
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span></span>
									<p>Kalid is online</p>
								</div>
							</div>
						</li>*/}
							<li>
								<Conversations conversation={conversation} user={userDec.user_id} setCurrentChat={setCurrentChat} getCurrUser={getCurrUser} />								
							</li>
						</ul>
					</div>

					<div className="card-footer">
						<button type="button" className="btn btn-primary" onClick={logout}>Logout</button>
					</div>
				</div></div>
				<div className="col-md-8 col-xl-6 chat">
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
