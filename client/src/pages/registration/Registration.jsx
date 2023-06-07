import axios from "axios";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Registration() {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const rePass = useRef();

  async function registration(event) {
    event.preventDefault();
    if (rePass.current.value !== password.current.value) {
      rePass.current.setCustomValidity("Le password non coincidono!");
    } else {
    try {
      await axios.post("http://localhost:8800/api/users/addUser", {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      alert("Registrazione andata a buon fine");
      navigate("/");
    } catch (err) {
      alert(err.response.data);
    }
  }
}

  return (
    <div className='signup template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
        <div className="form_container p-5 rounded bg-white">
          <form>
            <h3 className="text-center">Registrati</h3>
            <div className="mb-2">
              <label htmlFor="username">Username</label>
              <input type="username" placeholder="Inserisci l'username" className="form-control" required
                  ref={username}
                  //onChange={(event) => {setName(event.target.value);}}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Inserisci l'Email" className="form-control" required
                  ref={email}
                  //onChange={(event) => {setEmail(event.target.value)}}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Inserisci la Password" className="form-control" required
                  ref={password}
                  //onChange={(event) => {setPassword(event.target.value)}}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="repass">Ripeti password</label>
              <input type="password" placeholder="Reinserisci la Password" className="form-control" required
                  ref={rePass}
                  //onChange={(event) => {setrepPass(event.target.value)}}
              />
            </div>
            <div className="d-grid">
              <button className="btn btn-primary" onClick={registration}>Registrati</button>
            </div>
            <p className="text-end mt-2">
              <Link to="/" className="ms-2">Fai il login</Link>
            </p>
          </form>
        </div>
      </div>
  );
}
