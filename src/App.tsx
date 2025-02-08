import { useState } from 'react';

const App: React.FC = () => {
      const [count, setCount] = useState(0);

      const incrementCount = () => {
            // bu prevcount nereden geliyor?? reactda kendisinde default olarak bu yerlesmis varmis setcount icine her hangi bir isim bile verirsek bu statenin en son halini alir yani count neye esitse en son onu alir. sistem oyle yapilmis yazilimcilar tarafindan
            setCount((prevCount) => prevCount + 1);
      };
      const decrementCount = () => {
            setCount((count) => count - 1);
      };
      return (
            <div>
                  <p>{count}</p>
                  <button onClick={incrementCount}>increment</button>
                  <button onClick={decrementCount}>decrement</button>
            </div>
      );
};

export default App;
