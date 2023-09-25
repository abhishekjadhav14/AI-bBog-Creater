import './App.css';
import {  useState } from 'react';

function App() {
  const [userInput, setUserInput] = useState(''); // State variable to track user input
  const [responseContent, setResponseContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading indicator state

  const apiKey = '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';

  const handleSearchClick = () => {
    setIsLoading(true); // Set loading to true when fetching data

    const requestData = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userInput }, // Add user input to messages
      ],
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['\n'],
    };

    const requestDataJSON = JSON.stringify(requestData);

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: requestDataJSON,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setResponseContent(data.choices[0].message.content);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading back to false after data is fetched
      });

    // Clear the user input after making the API request
    setUserInput('');
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Trigger the search button click event when Enter key is pressed
      handleSearchClick();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>AI Blog Creator</h1>
      <input
        placeholder='Enter'
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={handleInputKeyPress}
      />
      <button onClick={handleSearchClick}>Search</button>
      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        responseContent !== null && <p>{responseContent}</p>
      )}
    </div>
  );
}

export default App;
