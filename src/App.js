import './App.css';
import ListGift from './components/ListGifts';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'


function App() {
  return (
    <div>
      <Router>
  
          <HeaderComponent/>
          <div className="container">
            <Routes>
              <Route path="/" element={<ListGift/>}></Route>
              <Route path="/gifts" element={<ListGift/>}></Route>
            </Routes>
          </div>
          <FooterComponent/>
      
      </Router>
    </div>

    
    
  );
}

export default App;
