import { useState } from 'react'
import axios from "axios";
import './App.css';
import handleSubmit from './handles/handlesubmit';
import { useRef } from 'react';
import PreLoader from "./components/PreLoader";


function App() {
  const [loading, setLoading] = useState(true);
  const dataRef = useRef()

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


