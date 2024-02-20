import { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [specimen, setSpecimen] = useState("")
  const [response, setResponse] = useState("")
  useEffect(()=>{

    const fetchData = async ()=>{
      try{
        const response = await fetch('/questions-and-choices');
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
    let result = await postResponse.text()
    if(result){
      setResponse(result)
    }
  }catch (err){
    console.log(err.message)
    setError(err.message)
  }
}

// Prevent the default form submit action to avoid page reload
const handleButtonClick = (e) => {
  e.preventDefault(); 

  // Call postData to send the form data to the server
  postData();
}

const handleInputChange = (e) => {
  setSpecimen(e.target.value)
}
  return (
    <div className="App">

      {/* {(!response) && (<form onSubmit={handleButtonClick}>
        <label>
            Input:
            <input 
            type="text" 
            value={specimen} 
            onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
    </form>)}
      {response && <p> {response} You are present in this class</p>} */}
    {data.elements}
    </div>
  );
}

export default App;
