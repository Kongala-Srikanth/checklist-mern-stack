import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {ThreeDots} from 'react-loader-spinner'
import './index.css'

const pageStatus = {
    initial: 'INITIAL',
    progress: 'PROGRESS',
    done: 'DONE',
    failed: 'FAILED'
}

const ApplicationDetails = (props) => {

    const [loanData, setLoanData] = useState()
    const [status, setStatus] = useState(pageStatus.initial)
    

    useEffect(() => {
        const getUserData = async () => {
            const { id } = props.match.params;
            setStatus(pageStatus.progress)
            const url = `https://checklist-backend-4z2b.onrender.com/applications/${id}`
            const response = await fetch(url)
            const data = await response.json()

            if (response.ok){
                setStatus(pageStatus.done)
                setLoanData(data)
            }else{
                setStatus(pageStatus.failed)
            }
        }

        getUserData()
    }, [])
    return(
        <div>
             <header className="header">
                <h1>Application Details</h1>
            </header>
            {
                status === pageStatus.done && <div className="details-container">
                <div className="application-card">
                    <h2 className="application-id">Application ID: {loanData.applicationId}</h2>
                    <p><strong>Name:</strong> {loanData.solicitorName}</p>
                    <p><strong>Email:</strong> {loanData.solicitorEmail}</p>
                    <p><strong>Application No: :</strong> {loanData.applicationNum}</p>
                    <p><strong>Loan Amount:</strong> {`$${loanData.loanAmount}`}</p>
                    <p><strong>Purchase Price:</strong> {`$${loanData.purchasePrice}`}</p>
                    <p><strong>Valuation Fee Paid:</strong> {loanData.isValuationFeePaid ? 'Yes' : 'No'}</p>
                    <p><strong>UK Resident:</strong> {loanData.isUkResident ? 'Yes' : 'No'}</p>
                    <p><strong>Risk Rating:</strong> {loanData.riskRating}</p>
                    <p><strong>LTV (Loan to Value):</strong> {loanData.ltv}</p>
                    <p><strong>LTV Status:</strong> {loanData.ltvStatus}</p>
                    <p><strong>Valuation Fee Status:</strong> {loanData.isValuationFeePaidStatus}</p>
                    <p><strong>UK Resident Status:</strong> {loanData.isUkResidentStatus}</p>
                    <p><strong>Status:</strong> {loanData.status}</p>
                    <p><strong>Created At:</strong> {loanData.createdAt}</p>
                </div>
            </div>
            }

            {
                status === pageStatus.progress && <div className="center-position">
                <div className="products-loader-container">
                   <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
                   </div>
               </div>
            }

            {
                status === pageStatus.failed && <div className="center-position">
                    <div className="error-container">
                        <h1 className="error-title">Oops! Something Went Wrong</h1>
                        <p className="error-message">We encountered an unexpected error. Please try again later.</p>
                        <Link to='/'>
                            <button className="back-home">Go Back to Homepage</button>
                        </Link>
                    </div>            
                </div> 
            }
        </div>
    )
}

export default ApplicationDetails