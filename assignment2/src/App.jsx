import { useState } from 'react';
import './App.css';

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFFFF', '#000000'];

function App() {
  const [index, setIndex] = useState(0);

  const handleClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  return (
    <div className="container" style={{ backgroundColor: colors[index] }}>
      <button onClick={handleClick}>Change Background</button>
    </div>
  );
}

export default App;