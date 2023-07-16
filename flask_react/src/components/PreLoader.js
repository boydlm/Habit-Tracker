import React, { useState, useEffect } from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { LandingScreen } from './screens/landing';

function PreLoader() {

    const [data, setData] = useState([]);
    const [done, setDone] = useState(undefined);

    useEffect(() => {
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then((response) => response.json())
                .then((json) => {
                    setData(json);
                    setDone(true);


                });
        }, 1800);
    }, []);
    return (
        <>
            {
                !done ? (
                    <ClimbingBoxLoader color="#97F81A" align="center" size={25} />
                ) : (
                    <>
                        <h1>Build habits. Build a better you.</h1>
                        <div>
                            <button>Login</button>
                        </div>
                        <div>
                            <button>Sign-up</button>
                        </div>
                    
                        <h6 style={{ position: "Absolute", right: "5rem", bottom: "0" }}>
                        </h6>
                    </>

                )}

        </>
    );
}

export default PreLoader