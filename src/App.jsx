
const App = () => {

const getMessages = async () => {

      const options = {
        method :"POST",
       body : JSON.stringify({
          mmessage:"hello how are you?"
      }),
      headers:{
        "Content-Type":"application/json"
      }
      }

        try{
         const response =  await fetch(`http://localhost:8000/completions`, options)
         const data = await response.json()
         console.log(data)
        } catch(error){
          console.log(error);
        }


}

  return (
    <>
      <div className="app">
        <section className="side-bar">
          <button>+ New Chat</button>
          <ul className="history">
            <li>BLUGH</li>
          </ul>
          <nav>
            <p>Made by OnlyAI</p>
          </nav>
        </section>
        <section className="main">
          <h1>ChatGPT</h1>
          <ul className="feed"></ul>
          <div className="bottom-section">
            <div className="input-container">
              <input type="text" />
              <div className="submit" onClick={getMessages}>➢</div>
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
