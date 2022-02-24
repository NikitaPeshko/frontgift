import './App.css';
import ListGift from './components/ListGifts';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import ErrorComponent from './components/ErrorComponent';
import AddGiftComponent from './components/AddGiftComponent';
import UpdateComponent from './components/UpdateComponent';
import Tempcomponent from './components/TempComponent';
import ShowGift from './components/ShowGiftComponent';
import LoginComponent from './components/LoginComponent';
import ListUsers from './components/ListUsers';


function App() {
  return (
    <div>
      <Router>
  
          <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route  path="/"  element={<ListGift/>}></Route>
              <Route path="/users" element={<ListUsers/>}></Route>
              <Route path="/gifts" element={<ListGift/>}></Route>
              <Route path="/add-gift" element={<AddGiftComponent/>}></Route>
              <Route path='/gifts/:id' element={<ShowGift/>} ></Route>  

              <Route path="/update-gift/:id" element={<Tempcomponent/>}></Route>
              <Route path="/login" element={<LoginComponent/>}></Route>
              
              <Route path="*" element={<ErrorComponent/>}></Route>
            </Routes>
          </div>
          
          <FooterComponent/>
      
      </Router>
    </div>

    
    
  );
}

export default App;
