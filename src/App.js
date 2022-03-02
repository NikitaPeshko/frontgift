import './App.css';
import ListGift from './components/ListGifts';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import ErrorComponent from './components/ErrorComponent';
import AddGiftComponent from './components/AddGiftComponent';
import Tempcomponent from './components/TempComponent';
import ShowGift from './components/ShowGiftComponent';
import LoginComponent from './components/LoginComponent';
import ListUsers from './components/ListUsers';
import CartComponent from './components/Cart';
import NoAcces from './components/NoAcces';
import OrdersComponent from './components/OrdersComponent';
import GiftsInOrderComponent from './components/GiftsInOrderComponent';
import AddUsersComponent from './components/AddUsersComponent';


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
              <Route path="/add-user" element={<AddUsersComponent/>}></Route>
              <Route path="/registration" element={<AddUsersComponent/>}></Route>
              <Route path='/gifts/:id' element={<ShowGift/>} ></Route>  
              <Route path='/cart' element={<CartComponent/>} ></Route>  
              

              <Route path="/update-gift/:id" element={<Tempcomponent/>}></Route>
              <Route path="/users/:id/orders" element={<OrdersComponent/>}></Route>
              <Route path="/users/:id/orders/:orderId" element={<GiftsInOrderComponent/>}></Route>
              <Route path="/login" element={<LoginComponent/>}></Route>
              <Route path="/noacces" element={<NoAcces/>}></Route>
              
              <Route path="*" element={<ErrorComponent/>}></Route>
            </Routes>
          </div>
          
          <FooterComponent/>
      
      </Router>
    </div>

    
    
  );
}

export default App;
