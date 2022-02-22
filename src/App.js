import './App.css';
import ListGift from './components/ListGifts';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import ErrorComponent from './components/ErrorComponent';
import AddGiftComponent from './components/AddGiftComponent';


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
              <Route path="*" element={<ErrorComponent/>}></Route>
            </Routes>
          </div>
          
          <FooterComponent/>
      
      </Router>
    </div>

    
    
  );
}

export default App;
