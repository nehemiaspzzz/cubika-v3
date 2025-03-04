import { useState } from 'react';

const Counter: React.FC = () => {
  // Estado para el contador
  const [count, setCount] = useState<number>(0);

  // Funciones para incrementar y decrementar
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold">Contador: {count}</h2>
      <div className="flex space-x-4 mt-4">
        <button 
          onClick={increment} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Incrementar
        </button>
        <button 
          onClick={decrement} 
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Decrementar
        </button>
      </div>
    </div>
  );
};

export default Counter;
