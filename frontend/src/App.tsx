import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Room from './Pages/Room'
import { Register } from './Components/Register'
import { Login } from './Components/Login'
import { Navbar } from './Components/Navbar'

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/room/:id' element={<Room />} />
      </Routes>
    </>
  )
}

export default App
