

```markdown
# React `useState` ve `setCount` ile State Yönetimi

Harika bir soru! Sorunuz, **React'ın `useState` hook'u** ve **`setCount`**'ın nasıl çalıştığını daha derinlemesine anlamanıza yardımcı olacak. Burada **`prevCount`** ismi, **`setCount`** fonksiyonunun bir parametresi ve aslında **React tarafından sağlanan bir otomatik parametre adıdır**. React, bu parametreyi, state güncellenirken önceki (eski) state değerini alıp, onu kullanmanızı sağlar.

## `prevCount` Nedir?

`prevCount` aslında **state'in önceki değerini** temsil eder. React, state güncellenirken, önceki state değerine dayanarak yeni bir değer oluşturabilmeniz için callback fonksiyonunu kullanır.

React, state'in önceki değerini otomatik olarak sağlamak için `setState`'i (veya `setCount` gibi `useState` ile kullanılan fonksiyonları) kullandığınızda, callback fonksiyonuna şu şekilde parametre olarak aktarır:

- `prevCount` (veya siz hangi ismi verirseniz verin) **önceki state'in değerini** tutar.
- Bu şekilde, state'in önceki değerine dayalı olarak yeni bir değer oluşturabilirsiniz.

Yani, aslında **React'ın kendi iç mekanizması** bize bu `prevCount` değerini sağlamaktadır.

## Örnek Açıklama:

```tsx
const [count, setCount] = useState(0);

const incrementCount = () => {
  setCount((prevCount) => prevCount + 1);
};
```

### Adım Adım Açıklama:

1. **Başlangıç Değeri**: 
   - `useState(0)` ile başlangıçta `count` değeri 0'dır.

2. **`setCount` Kullanımı**:
   - `setCount((prevCount) => prevCount + 1)` fonksiyonu, `count`'ı 1 artırmak için **önceki değeri** kullanarak çalışır.
   - **`prevCount`**, **React tarafından otomatik olarak sağlanan önceki state'i** temsil eder. Buradaki `prevCount`, React'in `setState`'i çalıştırırken bizim yazmamız gereken parametreyi belirtir.

3. **React'ın Rolü**:
   - **React**, `setCount` fonksiyonunu çağırdığınızda, önceki `count` değerini (mesela 0) alır ve sonra callback fonksiyonu (`(prevCount) => prevCount + 1`) çalıştırır.
   - Bu sayede, **`setCount` her çalıştığında önceki değeri alır ve ona göre yeni değeri belirler**. Bu, asenkron işlemlerde çok önemlidir çünkü birden fazla güncelleme sırasıyla gerçekleşebilir.

## Neden `prevCount` Kullanılır?

React'ta state güncellemeleri **asenkron çalışır**, yani `setState` (veya `setCount` gibi) çağrıldığında, yeni state değeri hemen güncellenmeyebilir. Bu durum, React'in state'i güncellemeden önceki değerle yeni değeri doğru şekilde hesaplayabilmesi için **`prevCount`** kullanmasını gerektirir.

Örneğin, aşağıdaki gibi bir durumda:

```tsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

Burada her `setCount` çağrısı, aynı `count` değerini kullanacak ve aynı anda `count`'ı 1 artıracak gibi gözükebilir, ancak aslında **React bu güncellemeleri asenkron bir şekilde yapar** ve her `setCount` çağrısı, **önceki state değerini referans almazsa**, hepsi aynı değeri (`count`) kullanarak işlem yapar. Sonuçta, **state'in doğru şekilde artması garanti edilmez**.

Oysa `setCount((prevCount) => prevCount + 1)` kullanarak, her bir güncelleme, **önceki güncel state değerine dayanır**, bu da **güncellemelerin doğru bir şekilde sıralanmasını sağlar**.

## Bir Örnekle Durumu Gösterelim:

```tsx
import React, { useState } from 'react';

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
};

export default App;
```

### Adımlar:
1. **Başlangıçta** `count = 0`.
2. **Butona tıkladığınızda** `incrementCount` fonksiyonu çağrılır.
3. `setCount((prevCount) => prevCount + 1)` çalışır ve React:
   - **İlk tıklama**: `prevCount = 0`, yeni `count = 1`.
   - **İkinci tıklama**: `prevCount = 1`, yeni `count = 2`.
   - **Üçüncü tıklama**: `prevCount = 2`, yeni `count = 3`.

## Özet:

- **`prevCount`** aslında **React tarafından sağlanan, önceki state'in değerini temsil eden bir parametredir**.
- **React**, state güncellenirken önceki state değerini, callback fonksiyonuna **otomatik olarak parametre olarak gönderir**.
- Callback fonksiyonu, önceki state'e dayanarak yeni state'i hesaplamanıza olanak sağlar.
- Bu sayede React, her tıklamada doğru şekilde state değerini günceller ve her seferinde **önceki değeri baz alarak çalışır**.
```

---------------------------------------------------------------------------------------------------------------------------------------------


---------------------------------------------------------------------------------------------------------------------------------------------

```markdown
# React State Güncellemeleri ve Asenkron Davranış

Bu davranış, **React'ın state güncellemelerinin asenkron (zamanla gerçekleşen) olduğunu** anlamanızla ilgilidir.

### **Neden `console.log(myArr)` İlk Değerle Değil, İkinci Değerle Görünüyor?**

React, `setState` (veya burada `setMyArr`) fonksiyonunu çağırdığınızda **değişiklik hemen yansımaz**. Bunun yerine, React'in render döngüsüne bağlı olarak yeni değerler en son **render** sırasında görünür. Yani, `setMyArr` fonksiyonu çağrıldığında, bu state değişikliği **beklenmedik bir şekilde hemen React'in render döngüsüne uygulanmaz**.

Özetle, `setMyArr` hemen devreye girmez, bunun yerine bir sonraki render döngüsünde **state değişikliği yansır**. Bu nedenle, `console.log(myArr)` çıktısı, **state değişikliği henüz gerçekleşmediği için önceki değeri gösterir**. State'in son halini görmek için, state güncellendikten sonra yapılacak bir render döngüsünü beklemek gerekir.

### **Sorunun Çözümü:**

React state'ini güncelledikten hemen sonra, yeni state'i görmek için şu iki seçeneği kullanabilirsiniz:

1. **`useEffect` Kullanarak State Güncellemesini İzlemek:**
   React `useEffect` hook'u, bir component render edildikten sonra bir işlem yapmamıza olanak tanır. Bu durumda, `myArr`'ın güncellenmesinin ardından `console.log` yazdırabilirsiniz.

   ```tsx
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

      // useEffect ile myArr'ı izliyoruz
      useEffect(() => {
         console.log(myArr); // State güncellendikten sonra myArr'ı görmek için
      }, [myArr]); // myArr değiştiğinde tetiklenecek

      return (
            <div>
                  <p>{count}</p>
                  <button onClick={incrementCount}>Increment</button>
                  <button onClick={decrementCount}>Decrement</button>

                  <div>
                        <button onClick={setArr}>Add to Array</button>
                  </div>
            </div>
      );
   };

   export default App;
   ```

   - Bu örnekte, `myArr`'ın her değişiminde `console.log(myArr)` çıktısı alınacaktır.
   - **`useEffect`**: `myArr` state'i değiştiğinde tetiklenecek ve her yeni render sonrası doğru şekilde güncellenmiş `myArr` değerini görebileceksiniz.

2. **Yeni State'i Derhal Görmek İçin `useRef` Kullanmak:**
   Eğer `console.log`'ın hemen çalışmasını istiyorsanız ve aynı anda state'in değişmesini izlemek istiyorsanız, `useRef` kullanabilirsiniz. `useRef` ile state'in eski ve yeni değerlerini hemen izleyebilirsiniz.

   Ancak, **en doğru çözüm React'ın `useEffect` kullanılmasıdır**, çünkü React'in render döngüsüne uygun şekilde işlemler yapar.

### **Özet:**

- React, state güncellemeleri asenkron çalıştığı için, `console.log(myArr)` hemen güncellenmiş `myArr`'ı göstermez. Bunun yerine, **bir sonraki render döngüsünde** yeni `myArr` değerini görürsünüz.
- **`useEffect`** hook'unu kullanarak state güncellenmeden sonra işlemi tetikleyebilir ve doğru değeri görebilirsiniz.
```

Bu şekilde, yazdığınız sorunun çözümü Markdown formatında düzenlenmiş oldu.


