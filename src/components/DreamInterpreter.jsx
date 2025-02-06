import  { useState } from 'react';
import BibleVerse from './Bibleverse';

const DreamInterpreter = () => {
  const [dreamInput, setDreamInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [reminder, setReminder] = useState('');
  const [poweredBy, setPoweredBy] = useState('');

  // Handle the dream input change
  const handleInputChange = (e) => {
    setDreamInput(e.target.value);
  };

  // Handle the form submission and make the API call
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!dreamInput.includes("dream")) {
      alert("Please include the word 'dream' in your input.");
      return;
    }

    setLoading(true); // Set loading state to true
    setError(''); // Clear any previous errors
    setInterpretation(''); // Clear previous interpretation
    setReminder(''); // Clear previous reminder 
    setPoweredBy(''); // Clear previous powered by

    try {
      const response = await fetch('https://dream-interpreter-ai.onrender.com/api/interpret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: dreamInput }), // Update field name to 'message'
      });

      console.log('Request payload:', { message: dreamInput });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const responseBody = await response.text();
        console.log('Response body:', responseBody);
        throw new Error('Failed to fetch interpretation.');
      }

      const data = await response.json();
      setInterpretation(data.interpretation);
      setReminder(data.reminder);
      setPoweredBy(data.Powered_by);
    } catch (error) {
      console.error('Error:', error);
      setError('Error: Failed to fetch interpretation.');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col gap-5 items-center justify-center">
        
      <div className="w-[800px] max-w-full mx-auto bg-white p-4 md:p-12 rounded-lg shadow-lg border-2 border-purple-800 flex flex-col gap-5 i">
      <BibleVerse />
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-4">Dream Oracle AI</h1>
        

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="dreamInput" className="block text-sm font-medium text-gray-700">
              Enter your dream
            </label>
            <textarea
              type="text"
              id="dreamInput"
              value={dreamInput}
              onChange={handleInputChange}
              placeholder="Describe your dream..."
              rows="5"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-800 text-white font-semibold rounded-md shadow-md hover:bg-purple-700"
            disabled={loading}
          >
            {loading ? 'Interpreting...' : 'Interpret Dream'}
          </button>
        </form>

        {/* Display the interpretation or error */}
        {error && <div className="mt-4 text-red-600">{error}</div>}
        {interpretation && (
          <div className=" flex flex-col gap-5 mt-6 text-md text-gray-800">
            <p><strong>Interpretation:</strong> {interpretation}</p>
            <p ><strong className='text-red-500'>Note:</strong> {reminder}</p>
            <p className='text-purple-800'><strong>PoweredBy:</strong> {poweredBy}</p>
          </div>
        )}
      </div>
      <footer>Made with Love : Rev Nathan Yennupiak ❤️🕎</footer>
    </div>
    
  );
};

export default DreamInterpreter;
