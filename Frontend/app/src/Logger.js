import React from 'react'

const Logger = ({ logger, setLogger, handleLogInformation, password, setPassword }) => {
  return (
    <div className="Login">
        <h1 style={{ textAlign: 'center' }}>Please Enter your Student ID number</h1>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="logForm" onSubmit={handleLogInformation}>
            <label htmlFor='logger'>ID Number: </label>
            <input
                id='logger'
                placeholder='Please enter your student ID'
                value={logger}
                onChange={(e) => setLogger(e.target.value)}
            />
            </form>

            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="logForm" onSubmit={handleLogInformation}>
            <label htmlFor='logger'>ID pass: </label>

            <input
                id='logger'
                placeholder='Ask your instructor for this'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogInformation}
            id='login-button'
            >Start Exam?</button>
            </form>

            
        
        <p className="reminder">Kung mka Start na ka sa exam dili na ka pwde mu exit sa browser kai gi monitor ni imo screen activity</p>
    </div>
    )
}

export default Logger