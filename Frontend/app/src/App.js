import React, { useState, useEffect } from 'react'
import QuestionsChoices from './QuestionsChoices'
import Logger from './Logger'
import check from './check.png'
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
  const [is_allowed_to_continue, setIs_allowed_to_continue] = useState(false)
  const [password, setPassword] = useState("")
  const [time, setTime] = useState("")

  const handleVisibility = () => {
    if (document.visibilityState === 'hidden'){
      console.log('Page is hidden')
      setIs_allowed_to_continue(false)
      console.log("I'm sorry you are not allowed to continue. You have to log in again")
    }else{
      console.log('Page is shown')
    }

    document.addEventListener('visibilitychange' , handleVisibility)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }


  useEffect(()=>{

    const fetchData = async ()=>{
      try{
        const response = await fetch('/questions-choices-loggers');
        const result = await response.json();
        const time = result.time
        setTime(time)
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
    handleVisibility();
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
  // console.log("In handleLogInformation(), This is the student ID: ", logger)
  setPasser(logger)
  console.log(password)
  password === 'd' ? setIs_allowed_to_continue(true) : setIs_allowed_to_continue(false)
  listOfStudents.includes(logger) ? setIsLoggedIn(true) : setIsLoggedIn(!isLoggedIn)
}

const handleRadioChange = (e) => {
  // Nothing here
}

const handleSubmitButton = (e) => {
    e.preventDefault();
    const selectedRadios = document.querySelectorAll('input[type="radio"]:checked');
    const selectedValues = Array.from(selectedRadios).map((radio) => {
     
        return {
          [radio.name]:radio.value
        }
      
    })
    console.log(selectedValues)
    //console.log("In handleSubmitButton(), This is the student ID: ", passer);
    postData(selectedValues, passer);
    setHasSubmitted(!hasSubmitted)
    
    
};
//I will search for visibilityjs first for me to add anti cheating feature

  return (
  <main>
    {!isLoggedIn && <Logger 
                    logger={logger}
                    setLogger={setLogger}
                    handleLogInformation={handleLogInformation}
                    isLoggedIn={isLoggedIn}
                    password={password}
                    setPassword={setPassword}
    />}
    {isLoggedIn && !hasSubmitted &&(
    <>
      {!is_allowed_to_continue && <h1 className="consequence">YOU WILL LOG IN AGAIN BECAUSE YOU HAVE EXITED THE EXAM </h1>}
      {is_allowed_to_continue && 
          <> 
              <QuestionsChoices 
                data={data}
                handleRadioChange={handleRadioChange}
                logger={passer}
              />
              <h3 className='reminder'>You will start from top if you reload this page!</h3>
              <div className="caution">DO NOT PROCEED HERE IF YOU ARE NOT READY TO SUBMIT! !</div>
              
              <div className="submit-button-holder">
                <button className="submit-button" onClick={handleSubmitButton}>Submit Answer</button>
              </div>
              
          </>
       }
      
    </>)}
    
    {hasSubmitted && (
        <div className="submission">
        <p style={{fontFamily: 'cursive'}}>{passer}</p>
        <strong>You have submitted!        </strong>
        <img src={check} alt="checkmark" 
        style={{width: '20px', height: '20px'}}
        />
      
    
      {score==itemNumber && <p>Congratulations you got the perfect score!</p>}
      <>
      <p style={{fontFamily: 'cursive'}}>Score: {score}/{itemNumber}</p>
      <p style={{fontFamily: 'cursive'}}>{time}</p>
      </>
      </div>
  
    )
    }
    
      
  </main>
            
  )
  
}


export default App;