import {BrowserRouter , Routes , Route} from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
// import NoPage from './pages/noPage';
import NavbarC from './components/navv';
import './App.css';
import HomePage from "./components/homePage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AboutPage from "./components/AboutPage";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import bot from './assets/img/bot.png';

function App() {
  const chatBotSteps = [
    {
        id: '0',
        message: 'Hey Geek!',
        trigger: '1',
    }, {
        id: '1',
 
    
        message: 'Please write your username',
        trigger: '2'
    }, {
        id: '2',
        user: true,
        trigger: '3',
    }, {
        id: '3',
        message: " hi {previousValue}, how can I help you?",
        trigger: 4
    }, {
        id: '4',
        options: [
            { value: 1, label: 'View Courses' },
            { value: 2, label: 'Read Articles' },
 
        ],
        end: true
    }
];
 
const chatBotTheme = {
    background: '#C9FF8F',
    headerBgColor: '#197B22',
    headerFontSize: '20px',
    botBubbleColor: '#0F3789',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
};
 

const chatBotConfig = {
    botAvatar: bot,
    floating: true,
};
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
      <ThemeProvider theme={chatBotTheme}>
          <ChatBot
            headerTitle="ResearchBot"
            steps={chatBotSteps}
            {...chatBotConfig}
          />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;