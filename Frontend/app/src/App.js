import { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [specimen, setSpecimen] = useState("")
  useEffect(()=>{

    const fetchData = async ()=>{
      try{
        const response = await fetch('/submit-data');
        if(!response.ok){
          throw Error(response.statusText)
        }
        const result = await response.json();
        setData(result)
        
      } catch(err){
        console.log(err.message)
        setError(err.message)
      }
    }
    
    fetchData();
  }, [])

const postData = async () => {
  try{
    const postResponse = await fetch('/submit-data', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},         
      body: JSON.stringify({ key: specimen }),
    });

    if(!postResponse.ok){
      throw Error(postResponse.statusText)
    }
  }catch (err){
    console.log(err.message)
    setError(err.message)
  }
}

const handleButtonClick = (e) => {
  e.preventDefault(); 
  postData()
}

const handleInputChange = (e) => {
  setSpecimen(e.target.value)
}
  return (
    <div className="App">
    <form onSubmit={handleButtonClick}>
    <label>
      Input:
      <input 
      type="text" 
      value={specimen} 
      onChange={handleInputChange} />
    </label>
    <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default App;
