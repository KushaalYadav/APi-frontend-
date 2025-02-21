import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      const apiResponse = await fetch('https://bfhl-api-kushaal.netlify.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });
      const data = await apiResponse.json();
      setResponse(data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input');
      setResponse(null);
    }
  };

  const handleFilterChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedFilters(selectedOptions);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (selectedFilters.includes('numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedFilters.includes('alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedFilters.includes('highest_alphabet')) {
      filteredResponse.highest_alphabet = response.highest_alphabet;
    }

    return (
      <div className="filtered-response">
        <h3>Filtered Response</h3>
        {filteredResponse.numbers && <p>Numbers: {filteredResponse.numbers.join(', ')}</p>}
        {filteredResponse.alphabets && <p>Alphabets: {filteredResponse.alphabets.join(', ')}</p>}
        {filteredResponse.highest_alphabet && <p>Highest Alphabet: {filteredResponse.highest_alphabet.join(', ')}</p>}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>22BIA50033</h1>
      <div className="input-section">
        <textarea
          placeholder='Enter JSON input, e.g., {"data": ["A", "1", "334", "4", "B"]}'
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {error && <p className="error">{error}</p>}
      {response && (
        <div className="filters-section">
          <h3>Multi Filter</h3>
          <select multiple onChange={handleFilterChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;