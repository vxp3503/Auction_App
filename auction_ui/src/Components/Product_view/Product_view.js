import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import AuctionContext from '../../context/Auction/AuctionContext'
import { useContext } from 'react'
import { Form, Button,Alert } from 'react-bootstrap'
import './Product_view.css'
import { useNavigate } from 'react-router-dom'


const Product_view = (props) => {
  const navigate = useNavigate()
  const id = props.id
  const user1 = useContext(AuctionContext)
  useEffect(() => {
    console.log("jdkjkjdkj")
    user1.Product_view(id)
  }, [])
  console.log("2");
  const item1 = user1.item
  const item = item1.data
  const [comment, setComment] = useState()
  const [bid, setBid] = useState(item1.amount)
  console.log(item1.amount)
  const [current_value, setCurrent] = useState();
  const CommentChangeHandler = (event) => {
    setComment(event.target.value)
  }


  const BidChangeHandler = (event) => {
    setCurrent(event.target.value)
    setBid(event.target.value)
  }


  const Bidsubmit = () => {
    var bodyFormData = new FormData();
    if (bid == "") {
      setBid("")
      return;
    }
    bodyFormData.append('bid_price', bid)
    axios({
      method: "post",
      url: "http://54.91.139.171:8000/add_bid/" + id,
      withCredentials: "true",
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      console.log(response.data);
      user1.Product_view(id)
      setBid("")
      navigate('/' + id)
    })
      .catch(function (error) {
        console.log(error);
      });
  }


  const AddWatchlistHandler = () => {
    axios({
      method: "get",
      url: "http://54.91.139.171:8000/update_watchlist/" + id,
      withCredentials: "true",
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      console.log(response.data);
      user1.Product_view(id)
      user1.current()
      navigate('/' + id)
    })
      .catch(function (error) {
        console.log(error);
      });
    console.log("add to watchlist clicked")
  }




  const CloseAuctionHandler = () => {
    axios({
      method: "get",
      url: "http://54.91.139.171:8000/close_auction/" + id,
      withCredentials: "true",
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      console.log(response.data);
      user1.Product_view(id)
      user1.active()
      user1.current()
      navigate('/' + id)
    })
      .catch(function (error) {
        console.log(error);
      });
  }




  const submit = () => {
    var bodyFormData = new FormData();
    if (comment == "") {
      setComment("")
      return;
    }
    bodyFormData.append('content', comment)
    axios({
      method: "post",
      url: "http://54.91.139.171:8000/add_comment/" + id,
      withCredentials: "true",
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      console.log(response.data);
      user1.Product_view(id)
      setComment("")
      navigate('/' + id)
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  let i = 0;
  if (item1.present == 0) {
    return (
      <h1>Server Error</h1>
    )
  }
  else {
    return (
      <>
        <div className='product'>
          <div className='product_preview'>
            <img src={item.listing.image} alt="" />
          </div>
          <div className="product_data">
            <h1 className='product_title'>{item.listing.title}</h1>
            <p className="product_description">{item.listing.description}</p>
            <p className="product_owner">Owner:  {item.listing.Owner}</p>
            <p className="product_amount">Current Price:  {item.amount} $</p>
            <p className="msg1">No of bids: {item.no_of_bids}</p>
            <div>
              {(user1.user.sets == false) ? <p className="msg1">Login to Place Bid</p> :
                <>
                  {(item.listing.closed) ? <>
                    <Alert key="success" variant="success">
                    {(item.listing.winner==user1.user.user.username)?"You are":<>{item.listing.winner} is</>}  a winner
                    </Alert>
                  </> :
                    <>
                      <Form>
                        <Form.Group className='mb-3'>
                          <Form.Label className='msg'>Enter Amount</Form.Label>
                          <Form.Control type="number" placeholder='Enter bid' value={bid ?? ""} onChange={BidChangeHandler} rows={3} />
                          {current_value < item.amount ?
                            <div className='invalid-feedback d-block'>
                              Enter amount large than current amount
                            </div> : ""}
                        </Form.Group>
                        <Form.Group className='product_form'>
                          <Button variant="primary" disabled={current_value < item.amount} onClick={Bidsubmit}>Place Bid</Button>
                          {item.in_watchlist ? <Button variant="secondary" onClick={AddWatchlistHandler}>Remove from watchlist</Button> :
                            <Button variant="primary" onClick={AddWatchlistHandler}>Add to watchlist</Button>
                          }
                        </Form.Group>
                        <Form.Group>
                          <>
                            {
                              user1.user.user.username === item.listing.Owner ?
                                <>
                                  <div className='close'>
                                    <Button variant='danger' onClick={CloseAuctionHandler}>Close</Button>
                                  </div>
                                </>
                                : ""}
                          </>
                        </Form.Group>
                      </Form>
                    </>
                  }
                </>
              }
            </div>
          </div>
        </div>
        <div className="product_comments">
          <p className='Comment_description'>Comments</p>
          <div className="add_comment">
            {(user1.user.sets == false) ? <p className="msg1">Login to add Comment</p> :
              <>
                <Form>
                  <Form.Group className='mb-3'>
                    <Form.Label>Add Comment</Form.Label>
                    <Form.Control as="textarea" value={comment} onChange={CommentChangeHandler} rows={3} />
                  </Form.Group>
                  <Button variant="primary" onClick={submit}>Post</Button>
                </Form>
              </>
            }
          </div>
          <div className="comments">
            {(item.comments.length == 0) ? <p className="msg">No Comments yet</p> :
              <>
                <p className="msg">No of Comments: {item.comments.length}</p>
                {item.comments.map((value) => {
                  i++;
                  return (
                    <p key={i}>{value}</p>
                  )
                })}
              </>
            }
          </div>
        </div>
      </>
    )
  }
}

export default Product_view