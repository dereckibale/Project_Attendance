import { useState, useEffect } from 'react'
import QuestionsChoices from './QuestionsChoices'
import Logger from './Logger'

function App() {

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [logger, setLogger] = useState("")
  const [listOfStudents, setListOfStudents] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [itemNumber, setItemNumber] = useState(0)
  const [passer, setPasser] = useState('')
  useEffect(()=>{

    const fetchData = async ()=>{
      try{
        const response = await fetch('/questions-choices-loggers');
        const result = await response.json();
        let questions_choices = result.elements
        setData(questions_choices)
        let no_of_items = questions_choices.length
        setItemNumber(no_of_items)
        let students = result.studyante
        setListOfStudents(students)
        //console.log("This is the list of students: ", students)
        
      } catch(err){
        console.log(err.message)
        setError(err.message)
      }
    }
    
    fetchData();
  }, [])

const postData = async (selectedValues, logger) => {
  try{
    
    const postResponse = await fetch('/submit-data', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},         
      body: JSON.stringify({ key: selectedValues, student: logger }),
    });
    if(!postResponse.ok){
      throw Error(postResponse.statusText)
    }
     let result = await postResponse.text()
     console.log("No. of items: ", itemNumber)
     setScore(result)
    
  }catch (err){
    console.log(err.message)
    setError(err.message)
  }
}

const handleLogInformation = (e) => {
  let value = e.target.value
  e.preventDefault();
  postData(value, value)
  setLogger(value)
  console.log("In handleLogInformation(), This is the student ID: ", logger)
  setPasser(logger)
  listOfStudents.includes(logger) ? setIsLoggedIn(true) : setIsLoggedIn(!isLoggedIn)
}

const handleRadioChange = (e) => {
  // Nothing here
}


const handleSubmitButton = (e) => {
    e.preventDefault();
    const selectedValues = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map((radio) => radio.value);
    console.log("In handleSubmitButton(), This is the student ID: ", passer);
    postData(selectedValues, passer);
    setHasSubmitted(!hasSubmitted)
};


  return (
  <main>
    {!isLoggedIn && <Logger 
                    logger={logger}
                    setLogger={setLogger}
                    handleLogInformation={handleLogInformation}
                    isLoggedIn={isLoggedIn}
    />}
    {isLoggedIn && !hasSubmitted &&(
    <>
      <QuestionsChoices 
          data={data}
          handleRadioChange={handleRadioChange}
          logger={passer}
        />
        <h3 className='reminder'>You will start from top if you reload this page!</h3>
        <div className="caution">DO NOT PROCEED HERE IF YOU ARE NOT READY TO SUBMIT! !</div>
        <button className="submit-button" onClick={handleSubmitButton}>Submit Answer</button>
       
    </>)}
    
    {hasSubmitted && (
    <div className="submission">
      <strong>You have submitted!</strong>
      {score==itemNumber && <p>Congratulations you got the perfect score!</p>}
      <p>Score: {score}</p>
    </div>
    )
    }
    
      
  </main>
            
  )
  
}


export default App;