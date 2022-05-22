import Layout from "./Components/Layout/Layout";
import Index from "./Components/index";
import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Routes, Route, useParams } from 'react-router-dom'
import AuctionState from "./context/Auction/AuctionState";
import AuctionContext from "./context/Auction/AuctionContext";

function App() {


  const user1=useContext(AuctionContext)
  useEffect(() => {
    console.log(user1)
    user1.current()
    user1.active()
  }, []);

  
  return (
    <div>

      <Routes> 
        <Route path="/home" element={<Layout  iscreated={false} active={false}  welcome={false} />} />
        <Route path="/" element={<Layout iscreated={false}  isLoggin={true} active={true} />} />
        <Route path="/create" element={<Layout create={true}/>}/>
        <Route path="/watchlist" element={<Layout watchlist={true}/>}/>
        <Route path="/:idea" element={<Layout product_view={true}/>}/>
        <Route path="/active" element={<Layout iscreated={false}  isLoggin={true} active={true} />} />
        <Route path="/login" element={<Layout iscreated={false} isLoggin={true} />} />
        <Route path="/register" element={<Layout iscreated={false}  isLoggin={false} />} />
        <Route path="/login1" element={<Layout iscreated={true}  isLoggin={true} />} />
      </Routes>
    </div>
  );
}

export default App
