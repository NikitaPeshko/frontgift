import './App.css';
import ListGift from './components/ListGifts';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import ErrorComponent from './components/ErrorComponent';
import AddGiftComponent from './components/AddGiftComponent';
import UpdateComponent from './components/UpdateComponent';
import Tempcomponent from './components/TempComponent';


function App() {
  return (
    <div>
      <Router>
  
          <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route  path="/"  element={<ListGift/>}></Route>
              <Route path="/gifts" element={<ListGift/>}></Route>
              <Route path="/add-gift" element={<AddGiftComponent/>}></Route>
              <Route path='/gift/:id' element={<Tempcomponent/>} ></Route>            
              <Route path="/update-gift/:id" element={<UpdateComponent/>}></Route>
              <Route path="*" element={<ErrorComponent/>}></Route>
            </Routes>
          </div>
          
          <FooterComponent/>
      
      </Router>
    </div>

    
    
  );
}

export default App;
