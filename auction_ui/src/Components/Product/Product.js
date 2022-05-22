import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Product.css"
import AuctionContext from '../../context/Auction/AuctionContext'
import { useContext } from 'react'


const Product = (props) => {

    const user1=useContext(AuctionContext)
    const navigate=useNavigate()
    const ProductInsideHandler=(id)=>{
      console.log(id)
      navigate('/'+id)
    }
    let List=props.List.List
    if(props.List.present==0)
    {
        return (
            <>
            <h2>Nothing Present</h2>
            </>
        )
    }
    return (
        <>
        <div className="container">
        <div className="main">
          {
            List.map((list) => {
              return (
                  <div key={list[0].id}className="card1">
                    <img className='product_img' src={list[0].image} alt="..." />
                    <div className='card-content'>
                      <h5>{list[0].title}</h5>
                      <a value={list[0].id} onClick={()=>{ProductInsideHandler(list[0].id)}} className="btn btn-primary">View</a>
                      {(list[0].closed)?<div className='product_close'>Closed</div>:""}
                    </div>
                  </div>
              );
            })
          }
        </div>
      </div>
      </>
    )
}

export default Product