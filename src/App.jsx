/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`http://localhost:8000/completions`, options);
      const data = await response.json();
      setMessage(data?.choices?.length > 0 ? data.choices[0].message : null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((PrevChats) => [
        ...PrevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  const currentChat = previousChats.filter((previousChat) => previousChat.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map((previousChat) => previousChat.title)));

  return (
    <>
      <div className="app">
        <section className="side-bar">
          <button onClick={createNewChat}>+ New Chat</button>
          <ul className="history">
            {uniqueTitles?.map((uniqueTitle, index) => (
              <li key={index} onClick={() => handleClick(uniqueTitle)}>
                {uniqueTitle}
              </li>
            ))}
          </ul>
          <nav>
            <p>Made by OnlyAI</p>
          </nav>
        </section>
        <section className="main">
          {!currentTitle && <h1>ChatGPT</h1>}
          <ul className="feed">
            {currentChat?.map((chatMessage, index) => (
              <li key={index}>
                <p className="role">{chatMessage.role}</p>
                <p>{chatMessage.content}</p>
              </li>
            ))}
          </ul>
          <div className="bottom-section">
            <div className="input-container">
              <input type="text" name="name" value={value} onChange={(e) => setValue(e.target.value)} />
              <div className="submit" onClick={getMessages}>
                ➢
              </div>
            </div>
            <p className="info">
              ChatGPT is a language model developed by OpenAI. It can assist you in conversations, answer your questions,
              and provide suggestions based on your interests.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
