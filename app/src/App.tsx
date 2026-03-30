import './App.css'
import { Navbar } from './components'
import HomePage from './pages/HomePage'
import ReportPage from './pages/ReportPage'
import ReportDetailsPage from './pages/ReportDetailsPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/report' element={<ReportPage />}/>
        <Route path='/report/:id' element={<ReportDetailsPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
