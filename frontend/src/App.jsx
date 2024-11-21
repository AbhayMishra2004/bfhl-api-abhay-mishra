import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      const response = await fetch(`${API_URL}/bfhl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonInput
      });
      const data = await response.json();
      if (data.is_success) {
        setResponse(data);
        setError('');
      } else {
        setError('API Error: ' + data.error);
      }
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="notice">
        Note: The backend is hosted on Render free tier and may take up to 120 seconds to start up on first request.
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder='Enter JSON (e.g., { "data": ["A","C","z"] })'
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
      
      {error && <div className="error">{error}</div>}
      
      {response && (
        <div className="mt-4">
          <select
            multiple
            value={selectedOptions}
            onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(opt => opt.value))}
            className="w-full p-2 border rounded"
          >
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
          
          <div className="mt-4">
            {selectedOptions.map(option => (
              <div key={option} className="result-item">
                <h3>{option}:</h3>
                <p>{JSON.stringify(response[option])}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;