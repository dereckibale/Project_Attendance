import React from 'react'

const Logger = ({ logger, setLogger, handleLogInformation }) => {
  return (
    <div className="Login">
        <h1 style={{ textAlign: 'center' }}>Please Enter your Student ID number</h1>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="logForm" onSubmit={handleLogInformation}>
        <label htmlFor='logger'>ID Number: </label>
        <input
            id='logger'
            placeholder='Please enter a student ID'
            value={logger}
            onChange={(e) => setLogger(e.target.value)}
        />
        <button onClick={handleLogInformation}
        id='login-button'
        >Start Exam?</button>
        </form>
    </div>
    
  )
}

export default Logger