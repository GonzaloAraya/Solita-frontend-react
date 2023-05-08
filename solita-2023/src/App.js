import './App.css';
import { Route, Routes } from 'react-router';
import ResponsiveAppBar from './components/Nav';
import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import SingleStation from './components/SingleStation'
import JourneyList from './components/JourneyList'


function App() {
  return (
    <div className="App">
      <ResponsiveAppBar/>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/Main' element={<Main/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Logout' element={<Logout/>} />
        <Route path='/JourneyList' element={<JourneyList/>} />
        <Route path='/SingleStation' element={<SingleStation/>} />
      </Routes>
    </div>
  );
}

export default App;
