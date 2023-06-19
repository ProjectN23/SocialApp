import axios from "axios";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  
  const cookies = new Cookies()

  async function login(event) {
    console.log(cookies)
    event.preventDefault();
    try {
     const res =  await axios.post("http://localhost:8800/api/users/checkUser", {
        email: email.current.value,
        password: password.current.value,
      });
      cookies.set("jwt_authorization", res.data.token, {secure: true, sameSite: 'strict', maxAge: 5000})
      alert("Login effettuato con successo");
      navigate("/home");
    } catch (err) {
      alert(err.response.data);
    }
}
      

    return (
      <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
        <div className="form_container p-5 rounded bg-white">
          <form>
            <h3 className="text-center">Login</h3>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Inserisci Email" className="form-control" required 
                ref={email}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Inserisci la Password" className="form-control" required
                  ref={password}
              />
            </div>
            <div className="d-grid">
              <button className="btn btn-primary" onClick={login}>Login</button>
            </div>
            <p className="text-end mt-2">
              <Link to="">Password dimenticata?</Link><Link to="/registration" className="ms-2">Registrati</Link>
            </p>
          </form>
        </div>
      </div>
      
    )

  }
  
  export default Login;