import './styles/HomePage.css'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import spanishFlag from '../imgs/SPANISH-FLAG.png';
import frenchFlag from '../imgs/french-flag.png';
import chineseFlag from '../imgs/chinese-flag.png';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001", { transports: ["websocket", "polling", "flashsocket"] });

const LanguagesPage = () => {
    return (
        <div style={{display: 'flex', justifyContent:'center',}}>
            <div style={{width: '100%', padding:'50px', display: 'flex', alignItems:'center', flexDirection:'column'}}>
                <h1>Choose a language</h1>
                <ul style={{display: 'grid', gridGap:'24px', textAlign:'center', width: '100%', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))'}}>
                    <div style={{border:'1px solid grey', borderRadius:'2px', padding:'20px'}}>
                        <div style={{height:'50px'}}>
                            <img style={{height:'70px'}} src={spanishFlag} alt="Spanish Flag" />
                        </div>
                        <h2>Spanish</h2>
                        <Link to="/game">
                            <button>Find Match</button>
                        </Link>
                    </div>
                    <div style={{border:'1px solid grey', borderRadius:'2px', padding:'20px'}}>
                        <div style={{height:'50px'}}>
                            <img style={{height:'40px'}} src={frenchFlag} alt="Spanish Flag" />
                        </div>
                        <h2>French</h2>
                        <Link to="/game">
                            <button>Find Match</button>
                        </Link>
                    </div>
                    <div style={{border:'1px solid grey', borderRadius:'2px', padding:'20px'}}>
                        <div style={{height:'50px'}}>
                            <img style={{height:'40px'}} src={chineseFlag} alt="Spanish Flag" />
                        </div>
                        <h2>Chinese</h2>
                        <Link to="/game">
                            <button>Find Match</button>
                        </Link>
                    </div>
                </ul>
            </div>
        </div>
      )
}

export default LanguagesPage