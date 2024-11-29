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

const ApplicationLists = () => {
    const [loanData, setLoanData] = useState()
    const [status, setStatus] = useState(pageStatus.initial)
    

    useEffect(() => {
        const getUserData = async () => {
            setStatus(pageStatus.progress)
            const url = 'https://checklist-backend-4z2b.onrender.com/applications'
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


    return (
        <div>
            <header className="header">
                <h1>View All Applications</h1>
            </header>
            {
                status === pageStatus.progress && <div className="center-position">
                     <div className="products-loader-container">
                        <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
                        </div>
                    </div>
            }
            {
                status === pageStatus.done && <div className="list-container">
                {
                    loanData.map(each => (
                        <Link to={`/application/${each.applicationId}`} key={each.applicationId} className='link'>
                            <div className="application-card">
                                <h2>Name: {each.solicitorName}</h2>
                                <p>Email: {each.solicitorEmail}</p>
                                <p>Loan: {each.loanAmount}</p>
                                <p>Purchase Price: {each.purchasePrice}</p>
                            </div>
                        </Link>
                    ))
                }
                
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

export default ApplicationLists