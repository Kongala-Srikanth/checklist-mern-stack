import {Link} from 'react-router-dom'
import './index.css'

const Home = () => {
    return (
        <div className='center-position'>
        <div class="home-container">
            <h1 class="home-title">Welcome to the Application Portal</h1>
            <div class="button-container">
                <Link to='/application'>
                    <button class="btn">Application Form</button>
                </Link>
                <Link to='/applications/list'>
                    <button class="btn">View All Applications</button>
                </Link>
            </div>
        </div>
        </div>

    )
}

export default Home