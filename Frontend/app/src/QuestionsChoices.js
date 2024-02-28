import React from 'react'

const QuestionsChoices = ({ data, handleRadioChange }) => {
  return (
    <div className='App'>
        {data.map((d, index) => (
          <ul key={`question-${index}`}>
            <strong>{d.question}</strong>
            <div className='set' key={`question-${index}`}>
                
                {d.choices.map((choice, idx) => (
                    <ul key={`choice-${idx}`}>
                      <label key={`choice-${idx}`}>
                        <input 
                            type="radio" 
                            name={`question-${index}`} 
                            value={choice} 
                            onChange={(e) => handleRadioChange(e)}
                        />
                        {choice}
                    </label>
                    </ul>
                ))}

            </div>
          </ul>
            
          ))}
      </div>
  )
}

export default QuestionsChoices
