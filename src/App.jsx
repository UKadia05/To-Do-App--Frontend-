import {Route, Routes} from 'react-router-dom'
import ShowAll from './components/ShowAll'
import AddBook from './components/AddTask'
import NavBar from './components/NavBar'
import NotFound from './components/NotFound'
import UpdateTask from './components/UpdateTask'
import LogIn from './components/LogIn'
import RemoveTask from './components/RemoveTask'

function App() {

  return (
    <div>
      <NavBar/>
    
      <Routes>
        <Route path='/' element={<LogIn/>} />

        <Route path='/view'>
          <Route path='tasks' element={<ShowAll/>} />
        </Route>

        <Route path='add' element={<AddBook/>} />

        <Route path='update'>
          <Route path=':id' element={<UpdateTask/>} />
        </Route>

        <Route path='remove'>
          <Route path=':id' element={<RemoveTask/>} />
        </Route>

        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App