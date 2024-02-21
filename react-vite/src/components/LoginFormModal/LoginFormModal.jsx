import { useState } from "react";
import { thunkLogin, thunkLogout } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Link, Navigate } from 'react-router-dom';
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      Navigate("/home");
    }
  };

  const logInDemo = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogout());
    closeModal()
    const email = "demo@aa.io";
    const password ="password";
    setEmail(email);
    setPassword(password);
    return await dispatch(
    thunkLogin({
      email,
      password,
    }));
  };

  return (
    <>
    <div id="loginmodal">
      <h1>Log In</h1>
      <form id="loginform" onSubmit={handleSubmit}>
        <label>
          Email <br></br>
          <input
            className="loginput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            minLength={4}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        {(email.length<4) &&
          <p>Email has at least 4 characters</p>}
        <label>
          Password <br></br>
          <input
            className="loginput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        {(password.length<6) &&
          <p>Password has at least 6 characters</p>}
        {(email.length<4 || password.length<6) &&
        <button id="disabledlogin" disabled={true}>Log In</button>}
        {email.length>=4 && password.length>=6 &&
        <button id="loginsubmitbutton" type="submit">Log In</button>}
        <button id="logindemobutton" onClick={logInDemo}>
            <Link className="logindemobutton" to="/home" >Log in as Demo User</Link>
        </button>
      </form>
    </div>
    </>
  );
}

export default LoginFormModal;
