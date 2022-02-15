import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)

  };
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value)
  };
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value)
  };

  return (
    <div>
    <h1>ログイン画面</h1>
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