/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import { useEffect } from "react";
import  { useState }  from "react"; 


const App = () => {

const getMessages = async () => {

      // eslint-disable-next-line no-unused-vars
      const [value, setValue] = useState(null)
      // eslint-disable-next-line no-unused-vars
      const [message, setMessage] = useState(null)
      const [previousChats, setPreviousChats] = useState([])
      const [currentTitle, setCurrentTitle] = useState(null)

      // eslint-disable-next-line no-unused-vars
      const createNewChat= () => {
          setMessage(null)
          setValue("")
          setCurrentTitle(null)
      }

      const options = {
        method :"POST",
       body : JSON.stringify({
          message: value
      }),
      headers:{
        "Content-Type":"application/json"
      }
      }

        try{
         const response =  await fetch(`http://localhost:8000/completions`, options)
         const data = await response.json()
         setMessage(data.choices[0].message)
        } catch(error){
          console.log(error);
        }
}
    useEffect(() => {

      if(!currentTitle && value && message){
          setCurrentTitle(value)
      }
      if(currentTitle && value && message){

        setPreviousChat(PrevChats => (
          [...PrevChats, {
            title: currentTitle,
            role: "user",
            content: value,
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          }
        ]
        ))

    } [message, currentTitle]});

        const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
        const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
        console.log(uniqueTitles)

  return (
    <>
      <div className="app">
        <section className="side-bar">
          <button onClick={createNewChat()}>+ New Chat</button>
          <ul className="history">
           {uniqueTitles?.map((uniqueTitle, index) => <li key={index}>{uniqueTitle}</li>)}
          </ul>
          <nav>
            <p>Made by OnlyAI</p>
          </nav>
        </section>
        <section className="main">
         {!currentTitle && <h1>ChatGPT</h1>}
          <ul className="feed">
            {currentChat?.map((chatMessage, index) => <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.message}</p>
            </li>)}
          </ul>
          <div className="bottom-section">
            <div className="input-container">
              <input type="text"  value={value} onChange={(e) => setValue(e.target.value)}/>
              <div className="submit" onClick={getMessages()}>➢</div>
            </div>
            <p className="info">
              ChatGPT is a language model developed by OpenAI. It can assist you
              in conversations, answer your questions, and provide suggestions
              based on your interests.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
