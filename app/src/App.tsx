import './App.css'
import { Footer, Navbar } from './components'
import HomePage from './pages/HomePage'
import ReportPage from './pages/ReportPage'
import ReportDetailsPage from './pages/ReportDetailsPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <div className='main'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/report' element={<ReportPage />}/>
        <Route path='/report/:id' element={<ReportDetailsPage />}/>
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  )
}

export default App
