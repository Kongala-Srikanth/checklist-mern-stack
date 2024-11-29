import { useState, useEffect } from "react";
import './index.css'

const ApplyApplication = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loanAmount, setLoanAmount] = useState(0)
    const [purchasePrice, setPurchasePrice] = useState(0)
    const [valuationFreePrice, setValuationFreePrice] = useState()
    const [ukCitizen, setUkCitizen] = useState()
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')


    const onSubmitForm = async (event) => {
        event.preventDefault()

        if (loanAmount === 0 || purchasePrice === 0){
            setErrorMsg('Please Enter Amount')
            setSuccessMsg('')
            return
        }

        const loanDetails =  {
            solicitorName : name,
            solicitorEmail: email,
            loanAmount : loanAmount,
            purchasePrice: purchasePrice,
            isValuationFeePaid : valuationFreePrice,
            isUkResident: ukCitizen
        }
        
        const url = 'https://checklist-backend-4z2b.onrender.com/applications'
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loanDetails)
        })
        
        const data = await response.json()
        

        if (response.ok){
            setSuccessMsg(data.message)
            setEmail('')
            setErrorMsg('')
            setName('')
            setLoanAmount(0)
            setPurchasePrice(0)
            setUkCitizen()
            setValuationFreePrice()
        }else{
            setErrorMsg(data.message)
            setSuccessMsg('')
        }

        console.log(response)
        console.log(data.message)
    }


    return (
        <div>
            <header className="header">
                <h1>Application Form</h1>
            </header>
            <div className="form-container">
                <form className="application-form" onSubmit={onSubmitForm}>
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} id="name" onChange={e => setName(e.target.value)} name="name" required />
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} id="email" onChange={e => setEmail(e.target.value)} name="email" required />
                    <label htmlFor="loan">Loan Amount</label>
                    <input type="number" value={loanAmount} id="loan" onChange={e => setLoanAmount(e.target.value)} name="loan" required />
                    <label htmlFor="price">Purchase Price</label>
                    <input type="number" value={purchasePrice} id="price" onChange={e => setPurchasePrice(e.target.value)} name="price" required />
                    <label >Valuation Fee Paid</label>
                    <div className="radio-container">
                        <div className="each-radio">
                            <label htmlFor="priceYes">Yes</label>
                            <input type="radio"  className="radio-btn" id="priceYes" onClick={() => setValuationFreePrice(true)} name='freePaid' required />
                        </div>
                        <div className="each-radio">
                            <label htmlFor="priceNo">No</label>
                            <input type="radio"  className="radio-btn" id="priceNo" onClick={() => setValuationFreePrice(false)} name='freePaid' required />
                        </div>
                    </div>
                    <br/>
                    <label >Are you UK citizen?</label>
                    <div className="radio-container">
                        <div className="each-radio">
                            <label htmlFor="ukCitizenYes">Yes</label>
                            <input type="radio"  className="radio-btn" id="ukCitizenYes" onClick={() => setUkCitizen(true)} name='ukCitizen' required />
                        </div>
                        <div className="each-radio">
                            <label htmlFor="ukCitizenNo">No</label>
                            <input type="radio"  className="radio-btn" id="ukCitizenNo" onClick={() => setUkCitizen(false)} name='ukCitizen' required />
                        </div>
                    </div>
                    <br/>
                    <button type="submit" class="btn-submit">Submit</button>
                    
                    {
                        successMsg && <p className="success-msg">{successMsg}</p>
                    }
                    {
                        errorMsg && <p className="error-msg">{errorMsg}</p>
                    }
                    
                </form>
            </div>
        </div>
    )

}

export default ApplyApplication