import React from 'react'

const QuestionsChoices = ({ question, choice, handleSubmitButton}) => {
  return (
    <div className="App">

      {question.map((q, index) => (
       
          <div key={`question-${index}`} style={{ marginBottom: '10px' }}> 
              <h3 style={{ marginLeft: 80 }}>{q}</h3>
              <ul style={{ marginTop: '1px' }}> 
                {choice.slice(index * 5, (index + 1) * 5).map((c, choiceIndex) => (
                  <ul key={choiceIndex}>
                    <label>
                      <input type="radio" name={`question-${index}`} value={c} />
                      {c}
                    </label>
                  </ul>
                ))}
              </ul>
          </div>
        
          
        ))
      }
    <button onClick={handleSubmitButton}>Submit Answers</button>
    </div>
  )
}

export default QuestionsChoices
