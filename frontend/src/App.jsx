import React, { useContext } from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Applications from './pages/Applications'
import ApplyJob from './pages/ApplyJob'
import Recruiterlogin from './components/Recruiterlogin'
import { AppContext } from './context/AppContext'
import Dasboard from './pages/Dasboard'
import AddJobs from './pages/AddJobs'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'

const App = () => {
  const {showRecruiterLogin}= useContext(AppContext)
  return (
    <div>

       { showRecruiterLogin  && <Recruiterlogin />}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/apply-job/:_id' element={<ApplyJob/>} />
        <Route path='/applications' element={<Applications/>} />
        <Route path='/dashboard' element={<Dasboard />} >
        <Route path='add-job' element={<AddJobs/>} />
        <Route path='manage-jobs' element={<ManageJobs/>} />
        <Route path='view-applications' element={<ViewApplications/>} />


        

        </Route>

         

      </Routes>
      
    </div>
  )
}

export default App