import React from 'react';
import Cookies from 'universal-cookie';
import "./EnterRoom.css"

const cookie = new Cookies();

function EnterRoom({ roomInputInfo, setRoomNumber, setIsAuth }) {
    return (
        <div className="room">
            <div className='main--div'>

                <div className='name--div'>
                    <p className="name-heading">Hello, {cookie.get("auth-name")}</p>
                </div>
                <div className="room-input-feild">
                    <input placeholder='Enter room number...' ref={roomInputInfo} id="input-room" />
                    <div className="btn-1">
                        <button onClick={setRoomNumber} className="enter-chat-btn">Enter Chat</button>
                        <button
                            className="enter-chat-btn"
                            onClick={() => {
                                cookie.remove("auth-token");
                                setIsAuth(cookie.get("auth-token"));
                            }}
                        >Sign-out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EnterRoom;