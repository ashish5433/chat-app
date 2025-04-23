import './App.css';
import { Auth } from './components/Auth'
import Cookies from 'universal-cookie';
import { useEffect, useRef, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from 'firebase/firestore'
import { db, auth } from './firebase-auth';
import ChatArea from './components/ChatArea';
import EnterRoom from './components/EnterRoom';


const cookie = new Cookies()
function App() {
  const [isAuth, setIsAuth] = useState(cookie.get("auth-token"));
  const [room, setRoom] = useState(null)

  const roomInputInfo = useRef(null)

  const setRoomNumber = () => {
    setRoom(roomInputInfo.current.value)
  }
  if (!isAuth) {
    return <div className="container-fluid">
      <Auth setIsAuth={setIsAuth} />
    </div>
  }
  return <div>
    {room ? (<ChatArea room={room} />) :
      (  <EnterRoom
        roomInputInfo={roomInputInfo}
        setRoomNumber={setRoomNumber}
        setIsAuth={setIsAuth}
      />)}
  </div>
}







export default App;
