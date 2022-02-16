import { signOut } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';

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
    getDocs(usersCollectionRef).then((querySnapshot) => {
      // querySnapshot.docs.forEach((doc) =>
      //   console.log("###HOME###", doc.data())
      // );
      setUsers(querySnapshot.docs.map((doc) => doc.data()))
    });
  }, []);

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
          {users.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      </div>
    );
  };
  }

export default Home;