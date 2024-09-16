import '../css/Form.css'

function Form({ children, handleNext, handleBack, heading }) {
    return (
        <div>
            <form className='form' onSubmit={handleNext}>
                <div className='form-header'>{heading}</div>
                <div className='form-fields'>
                    {children}
                </div>
                <div className='button-container'>
                    {/* <Button value="Back" onClick={handleBack} />
                    <Button value="Next" onSubmit={handleSubmit} /> */}
                    <div>
                        {handleBack &&
                            <input className='button' type='button' value="Previous" onClick={handleBack} />
                        }
                    </div>
                    <div>
                        <input className='button' type='submit' value="Next" onSubmit={handleNext} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form
