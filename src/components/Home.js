import { signOut } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { collection,
  doc,
  getDoc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
  where,
  query,
  updateDoc,
  getDocs } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth);
    navigate('/login');
  };
  const { user } = useAuthContext();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    // getDocs(usersCollectionRef).then((querySnapshot) => {
    //   setUsers(querySnapshot.docs.map((doc) => doc.data()))
    // });
    const unsub = onSnapshot(usersCollectionRef, (querySnap) => {
      setUsers(querySnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);
  const dbTest = () => {
    const userDocumentRef = doc(db, 'users', 'itDuvhuU57bOygiQK90m');
    getDoc(userDocumentRef).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Doc:", docSnap.data());
      } else {
        console.log("No such documents");
      }
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = event.target.elements;
    console.log(name.value, email.value);
    //登録処理
    const usersCollectionRef = collection(db, 'users');
    const documentRef = await addDoc(usersCollectionRef, {
      name: name.value,
      email: email.value,
      timpstamp: serverTimestamp(),
    });
    getDoc(documentRef).then((docSnap) =>
    console.log(documentRef.id, docSnap.data())
    );
  };
  const deleteUser = async (id) => {
    const userDocumentRef = doc(db, 'users', id);
    await deleteDoc(userDocumentRef);
  };
  const deleteUserByName = async (name) => {
    const userCollectionRef = collection(db, 'users');
    const q = query(userCollectionRef, where('name', '==', name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
    const userDocumentRef = doc(db, 'users', document.id);
    await deleteDoc(userDocumentRef);
    });
  };
  const changeAdmin = async (id, checked) => {
    const userDocumentRef = doc(db, 'users', id);
    await updateDoc(userDocumentRef, {
      admin: checked,
    });
  };

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        <h1>ホームページ</h1>
        <div>
        <button onClick={handleLogout}>ログアウト</button>
        </div>
        <div>
          <button onClick={dbTest}>TEST</button>
          {users.map((user) => (
            <div key={user.id}>
              <span>{user.name}</span>
              <button onClick={() => deleteUser(user.id)}>削除</button>
              <button onClick={() => deleteUserByName(user.name)}
              style={{ color: 'red' }}>削除</button>

              <input
                type="checkbox"
                name="admin"
                onChange={(event) => changeAdmin(user.id, event.target.checked)}
                checked={user.admin} />
            </div>
          ))}
          <hr />
          <form onSubmit={handleSubmit}>
            <div>
              <label>名前</label>
              <input type="text" name="name" placeholder="名前" />
            </div>
            <div>
              <label>メールアドレス</label>
              <input type="email" name="email" placeholder="メールアドレス" />
            </div>
            <div>
              <button>登録</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  }

export default Home;