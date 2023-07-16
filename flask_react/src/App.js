import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import axios from "axios";
import './App.css';
import { auth } from './firebase.config'
import handleSubmit from './handles/handlesubmit';
import { useRef } from 'react';
import PreLoader from "./components/PreLoader";
import firebase from 'firebase/compat/app'

function App() {
  const [loading, setLoading] = useState(true);
  const dataRef = useRef()

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);

  // })

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [])


  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user)
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user)
    } catch (error) {
      console.log(error.message);
    }
  }

  const logout = async () => {
    await signOut(auth);
  }

  const submithandler = (e) => {
    e.preventDefault()
    handleSubmit(dataRef.current.value)
    dataRef.current.value = ""
  }

  const [profileData, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url: "http://localhost:5000/profile",
    })
      .then((response) => {
        const res = response.data
        setProfileData(({
          profile_name: res.name,
          about_me: res.about
        }))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }
  //end of new line 

  return (
    <div className="App">
      <header className="App-header">
        <PreLoader />
      </header>

      <div className="item">
        <form onSubmit={submithandler}>
          <input type="text" ref={dataRef} />
          <button type="submit">Save</button>
        </form>
        <div>
          <h3>Register User</h3>
          <input
            placeholder="Email..."
            onChange={(event) => {
              console.log("hello");
              console.log(event.target.value);
              setRegisterEmail(event.target.value);
            }}
          />
          <input
            placeholder="Password..."
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />

          <button onClick={register}>Create User</button>
        </div>
        <div>
          <h3>Login</h3>
          <input
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            placeholder="Password..."
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}

          />

          <button onClick={login}> Login</button>
        </div>

        <h4> User Logged In: </h4>
        {user ? user.email : "Not Logged In"}
        <button onClick={logout}> Sign Out</button>

        <p>To get your profile details: </p>
        <button onClick={getData}>Click me</button>
        {profileData && <div>
          <p>Profile name: {profileData.profile_name}</p>
          <p>About me: {profileData.about_me}</p>
        </div>
        }

      </div>

    </div>
  );
}

export default App;


