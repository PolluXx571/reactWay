import { useState, useEffect } from 'react';

const App: React.FC = () => {
      const [count, setCount] = useState(0);
      const [multiple, setMultiple] = useState(0);
      const [myArr, setMyArr] = useState<number[]>([]);

      const takeLastValueCount = () => {
            setMultiple((prevMultiple) => count * 2);
      };
      const incrementCount = () => {
            setCount((prevCount) => prevCount + 1);
      };
      const decrementCount = () => {
            setCount((count) => count - 1);
      };
      const setArr = () => {
            setMyArr((prevArr) => [...prevArr, count]);
      };

      useEffect(() => {
            // reverse işlemi yapılmadan önce yeni diziyi alıyoruz
            const reversedArr = [...myArr].reverse();
            console.log(reversedArr);
      }, [myArr]);

      return (
            <div>
                  <p>{count}</p>
                  <button onClick={incrementCount}>increment</button>
                  <button onClick={decrementCount}>decrement</button>
                  <div>
                        <button onClick={takeLastValueCount}> Take value and multiple = {multiple}</button>
                        <button onClick={setArr}> Take array = {myArr}</button>
                  </div>
            </div>
      );
};

export default App;
