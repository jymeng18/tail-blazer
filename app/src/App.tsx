import './App.css'
import ReportPage from './pages/ReportPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ReportPage />}/>          
      </Routes>
    </BrowserRouter>
  )
}

export default App
