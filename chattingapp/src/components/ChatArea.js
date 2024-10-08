import '../App.css';
import { Auth } from './Auth'
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from 'firebase/firestore'
import { db, auth } from '../firebase-auth'



const cookie = new Cookies()
const ChatArea = (props) => {
  const { room } = props
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])
  const msgRef = collection(db, "messages")
  const [typing, settyping] = useState(false)
  useEffect(() => {
    const querymessages = query(msgRef, where("room", "==", room), orderBy("sentTime"))
    const unsubscribe = onSnapshot(querymessages, (snapshot) => {
      //console.log("New")
      let messages = []
      snapshot.forEach((doc) => {
        // console.log(doc.data())
        messages.push({ ...doc.data(), id: doc.id })

      });
      setMessages(messages)
    })

    return () => unsubscribe();
  }, [])

  const handleEvent = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(msgRef, {
      text: newMessage,
      sentTime: serverTimestamp(),
      name: auth.currentUser.displayName,
      room: room
    })
    setNewMessage("")

  }



  return <>
    <div className="acnt-data">

      <h1>Hello, {cookie.get("auth-name")}</h1>
      <p>Your room name is : {room}</p>
      {/* {typing && <p className='typing'>{cookie.get("auth-name")} is typing...</p>} */}
    </div>
    <div>
      {/* <div className='msg-div hellooo'>

        <div className='inner--msg-div'>
          <h6>Ashish bsdk</h6>

          <h4>Hello, Milind how are you</h4>
        </div>

      </div>
      <div className='msg-div1 hellooo'>

        <div className='inner--msg-div'>
          <h6>Ashish bsdk</h6>
          <h4>Yes I am fine what about you</h4>
        </div>

      </div>
      <div className='msg-div hellooo'>

        <div className='inner--msg-div'>
          <h6>Ashish bsdk</h6>

          <h4>Hello, Milind how are you</h4>
        </div>

      </div>
      <div className='msg-div1 hellooo'>

        <div className='inner--msg-div'>
          <h6>Ashish bsdk</h6>
          <h4>Yes I am fine what about you</h4>
        </div>

      </div>
      <div className='msg-div hellooo'>

        <div className='inner--msg-div'>
          <h6>Ashish bsdk</h6>

          <h4>Hello, Milind how are you</h4>
        </div>

      </div>
      <div className='msg-div1 hellooo'>

        <div className='inner--msg-div'>
          <h6>Ashish bsdk</h6>
          <h4>Yes I am fine what about you</h4>
        </div>

      </div> */}

      {messages.map((msg) => (
        <>

          <div className={cookie.get("auth-name") === msg.name ? 'msg-div hellooo' : 'msg-div1 hellooo'}>
            {/* {cookie.get("auth-name") === msg.name ?
              (

                <div className='inner--msg-div'>
                <h6>{msg.name}</h6>

                  <h4>{msg.text}</h4>
             

              </div>) :
              (
               

                  <div className='inner--msg-div'>
                    <h6>{msg.name}</h6>
                    <h4>{msg.text}</h4>
                  </div>

               )} */}
               <div className='inner--msg-div'>
                    <h6>{msg.name}</h6>
                    <h4>{msg.text}</h4>
                  </div>

          </div>
        </>
      ))}

    </div>
    <div className="input-feild">

      <center><form onSubmit={handleEvent} >
        <div className="send">
          <input type="text" placeholder='Enter your message here....'
            onChange={(e) => { setNewMessage(e.target.value) }}
            value={newMessage}
            id="input-msg"
          />
          <button type='submit' id={"msg-sub-btn"} ><span class="material-symbols-outlined">
            send
          </span></button></div>
      </form>
      </center>

    </div>
  </>
}


export default ChatArea;