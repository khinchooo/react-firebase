import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((error) => setError(error.message));
  };
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value)
  };
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value)
  };

  return (
    <div>
    <h1>ログイン</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <form onSubmit={handleSubmit}>
      <div>
          <label>メールアドレス</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            onChange={(event) => handleChangeEmail(event)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            name="password"
            onChange={(event) => handleChangePassword(event)}
          />
        </div>
        <div>
          <button>ログイン</button>
        </div>
        <div>
        ユーザ登録は
          <Link to={'/signup'}>こちら</Link>から
        </div>
    </form>
    </div>
  );
};

export default Login;