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
  getDocs, 
  orderBy} from 'firebase/firestore';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Checkbox,
  styled,
  tableCellClasses} from "@mui/material";
import { AdminPanelSettings, AdminPanelSettingsOutlined } from "@mui/icons-material";

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
    const q = query(
      usersCollectionRef,
      where("admin", "==", true),
      orderBy('name', 'desc'),
      // limit(3)
    );
    // getDocs(usersCollectionRef).then((querySnapshot) => {
    //   setUsers(querySnapshot.docs.map((doc) => doc.data()))
    // });
    const unsub = onSnapshot(q, (querySnap) => {
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
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&:${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    }
  }));
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

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Delete(id)</StyledTableCell>
                  <StyledTableCell>Delete(Name)</StyledTableCell>
                  <StyledTableCell>Admin?</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell>{user.name}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="outlined"
                        onClick={() => deleteUser(user.id)}
                        >
                          削除
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => deleteUserByName(user.name)}
                        style={{ color: 'red' }}
                      >
                        削除
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                    <Checkbox
                        name="admin"
                        onChange={(event) =>
                          changeAdmin(user.id, event.target.checked)}
                        checked={user.admin}
                        icon={<AdminPanelSettingsOutlined/>}
                        checkedIcon={<AdminPanelSettings />}
                        />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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