import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import AuthPage from './pages/auth'
import NewOrderPage from './pages/new_order'
import OrderHistoryPage from './pages/order_history'
import { Routes, Route } from 'react-router-dom'



function App() {
  const [user, setUser] = useState(null)
  return (
    <div className="App">
      {
        user?
        
        <Routes>
            <Route path= "/order" element= {<OrderHistoryPage />} /> 
          <Route path= "/order/new" element= {<NewOrderPage />} /> 
        </Routes>
        :
        <AuthPage />
    
      }

     
    
    </div>
  );
}

export default App;
