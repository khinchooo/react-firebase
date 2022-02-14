import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);

    //ユーザー登録処理
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value)
  };
  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value)
  }

  return (
    <div>
      <h1>ユーザ登録</h1>
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
          <button>登録</button>
        </div>
      </form>
    </div>
  );
};
export default SignUp;