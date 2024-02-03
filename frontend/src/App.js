import {BrowserRouter , Routes , Route} from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
// import NoPage from './pages/noPage';
import NavbarC from './components/navv';
import './App.css';
import HomePage from "./components/homePage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AboutPage from "./components/AboutPage";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <NavbarC/>
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      {/* <Route path='login' element={<Loginpage/>}/>
      
      <Route path="admin" element={<AdminPage />} />
      <Route path='signup' element={<SignupPage/>}/>
      <Route path='*' element={<NoPage/>}/> */}
       <Route path='/about' element={<AboutPage/>}/>
      </Routes>
      {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;