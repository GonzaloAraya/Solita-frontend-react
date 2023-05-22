import './App.css';
import { Route, Routes } from 'react-router';
import ResponsiveAppBar from './components/Nav';
import { makeStyles } from '@material-ui/core/styles';
import Main from './components/Main';
import Login from './components/Login';
import Logout from './components/Logout';
import SingleStation from './components/SingleStation'
import JourneyList from './components/JourneyList'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#F8F6F4',
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
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
