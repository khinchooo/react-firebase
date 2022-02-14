const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    console.log(email.value, password.value);
  };

  return (
    <div>
      <h1>ユーザ登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input type="email" name="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input type="password" name="password" />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  );
};
export default SignUp;