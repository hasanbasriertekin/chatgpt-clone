const App = () => {
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
              <div className="submit">➢</div>
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
