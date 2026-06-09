import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Exhibition from './pages/Exhibition'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exhibition" element={<Exhibition />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App