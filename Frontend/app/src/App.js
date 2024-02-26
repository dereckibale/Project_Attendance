import { useState, useEffect } from 'react'
import QuestionsChoices from './QuestionsChoices'

function App() {

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [specimen, setSpecimen] = useState(null)
  const [response, setResponse] = useState("")
  const [question, setQuestions] = useState([])
  const [choice, setChoices] = useState([])
  useEffect(()=>{

    const fetchData = async ()=>{
      try{
        const response = await fetch('/questions-and-choices');
        if(!response.ok){
          throw Error(response.statusText)
        }
        const result = await response.json();
        let questions = result.elements
        questions.map((element)=>{ 
          question.push(element.question);
          choice.push(...element.choices) });
        console.log(choice)
        setData(choice)
        
      } catch(err){
        console.log(err.message)
        setError(err.message)
      }
    }
    
    fetchData();
  }, [])

const postData = async (selectedValues) => {
  try{
    
    const postResponse = await fetch('/submit-data', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},         
      body: JSON.stringify({ key: selectedValues }),
    });
    if(!postResponse.ok){
      throw Error(postResponse.statusText)
    }
    // let result = await postResponse.text()
    // if(result){
    //   setResponse(result)
    //   console.log(result.elements)
    // }
  }catch (err){
    console.log(err.message)
    setError(err.message)
  }
}

const handleSubmitButton = (e) => {
    e.preventDefault();
    const selectedValues = [];
    const radioButtons = document.querySelectorAll('input[type=radio]:checked');// Retrieve the selected radio button values
    radioButtons.forEach((radio) => {
    selectedValues.push(radio.value);
  });
  console.log(selectedValues);
  //setSpecimen(selectedValues);
  postData(selectedValues);
};
const handleInputChange = (e) => {
  setSpecimen(e.target.value)
}
  return (
    <QuestionsChoices question={question} choice={choice} handleSubmitButton={handleSubmitButton}/>
  );
}

export default App;