import './styles/HomePage.css'
import React from 'react'
import io from "socket.io-client"

//import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';


const socket = io.connect("http://localhost:3001", { transports: ["websocket", "polling", "flashsocket"] });


const HomePage = () => {
    const navigate = useNavigate();

    const routeChange = () =>{ 
        navigate('/languages');
    }
    
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const loginAttempt = () => {
        socket.emit("signIn", { username, password });
    }

    const signUpAttempt = () => {
        socket.emit("signUp", { username, password });
    }

    React.useEffect(() => {
        socket.on('signInResponse', function(data) {
            if(data.success) {
                // Move pages
                routeChange();
                alert("Sign in successful")
            } 
            else {
                alert("Sign in unsuccessful");
            }
        });
    }, [socket]);

    React.useEffect(() => {
        socket.on('signUpResponse', function(data) {
            if(data.success) {
                alert("Sign up successful")
            } 
            else
                alert("Sign up unsuccessful");
        });
    }, [socket]);


    return (
        <div lang="en">
        <div>
        <meta charSet="UTF-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" type="text/css"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        <title>Home Page</title>
        </div>
        <div>
            <main>
                <div className="container">
                    {/* <div className="img_container">
                        img
                    </div> */}
                    <div className="info_container">
                        <h1>Learn Spanish in just 5 minutes a day. For free.</h1>
                        <div className="btn_group" id="signDiv"> 
                            <input onChange={(Event) => {
                                setUsername(Event.target.value);
                            }} className="login input" placeholder="    Username" type="text"></input>
                            <input onChange={(Event) => {
                                setPassword(Event.target.value);
                            }}    className="login input" placeholder="    Password" type="text"></input>
                        </div>
                        <div className="btn_group">
                            <button onClick={loginAttempt} className="btn primary" id="signDiv-signIn">Sign In</button>
                            <button onClick={signUpAttempt} className="btn primary" id="signDiv-signUp">Sign Up</button>
                            <button className="btn secondary">Quick Review Quiz</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        </div>
    );
}

//HomePage.propTypes = {}

export default HomePage