import React from 'react'
import { useContext } from 'react'
import AuctionContext from '../../context/Auction/AuctionContext'
import Product from '../Product/Product'
const Watchlist = () => {
    const user1=useContext(AuctionContext)
    const watchlist=user1.user.user.watchlist
    let present=0;
    if(user1.user.sets==false)
    {
         present=0;
    }
    else
    {
        present=1;
    }
    const w1={
        "present":present,
        "List":watchlist
    }
  return (
    <Product List={w1}/>
  )
}

export default Watchlist