import Chats from "../../components/chats/Chats";
import "./home.css"
import Cookies from 'universal-cookie';
import jwt from "jwt-decode";
const cookies = new Cookies()

export default function Home() {
	const userDec = jwt(cookies.get("jwt_authorization"))

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
								<Chats user={userDec.user_id}/>
							</li>
						</ul>
					</div>
					<div className="card-footer">
						<div className="input-group">
							<input type="text" placeholder="Search..." name="" className="form-control search"/>
							<div className="input-group-prepend">
								<span className="input-group-text search_btn"><i className="bi bi-search"></i></span>
							</div>
					</div>
          </div>
				</div></div>
				<div className="col-md-8 col-xl-6 chat">
					<div className="card">
						<div className="card-header msg_head">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img"/>
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>Chat with Khalid</span>
									<p>1767 Messages</p>
								</div>
								<div className="video_cam">
									<span><i className="bi bi-video"></i></span>
									<span><i className="fa fa-phone"></i></span>
								</div>
							</div>
							<span id="action_menu_btn"><i className="bi bi-three-dots-vertical"></i></span>
							<div className="action_menu">
								<ul>
									<li><i className="bi bi-person-circle"></i> View profile</li>
									<li><i className="fa fa-users"></i> Add to close friends</li>
									<li><i className="fa fa-plus"></i> Add to group</li>
									<li><i className="fa fa-ban"></i> Block</li>
								</ul>
							</div>
						</div>
						<div className="card-body msg_card_body">
							<div className="d-flex justify-content-start mb-4">
								<div className="img_cont_msg">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg"/>
								</div>
								<div className="msg_cotainer">
									Hi, how are you samim?
									<span className="msg_time">8:40 AM, Today</span>
								</div>
							</div>
							<div className="d-flex justify-content-end mb-4">
								<div className="msg_cotainer_send">
									Hi Khalid i am good tnx how about you?
									<span className="msg_time_send">8:55 AM, Today</span>
								</div>
								<div className="img_cont_msg">
								</div>
							</div>
						</div>
						<div className="card-footer">
							<div className="input-group">
								<div className="input-group-append">
									<span className="input-group-text attach_btn"><i className="bi bi-paperclip"></i></span>
								</div>
								<textarea name="" className="form-control type_msg" placeholder="Type your message..."></textarea>
								<div className="input-group-append">
									<span className="input-group-text send_btn"><i className="bi bi-send-fill"></i></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
  );
}
