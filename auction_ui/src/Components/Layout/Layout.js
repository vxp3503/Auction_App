import React, { useEffect, useContext } from 'react'
import { Container, Form, Alert, Col, Row, Button } from 'react-bootstrap'
import Logi from '../../images/Login.svg'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Active from '../Active/Active'
import Index from "../index/index";
import Welcome from '../Welcome/Welcome'
import AuctionContext from '../../context/Auction/AuctionContext'
import Create from '../Create/Create'
import Watchlist from '../Watchlist/Watchlist'
import Product_view from '../Product_view/Product_view'
import { useParams } from 'react-router-dom'
const Layout = (props) => {
    const user1 = useContext(AuctionContext)
    const { idea }=useParams()
    return (
        <>
            <Index user={user1.user} />
            {props.product_view ? <Product_view id={idea} /> :
                <>
                    {props.watchlist ? <Watchlist /> :
                        <>
                            {props.create ? <Create /> :
                                <>
                                    {props.welcome ? <Welcome /> :
                                        <>
                                            {
                                                props.active ? <Active List={user1.List} /> :
                                                    <Container className="mt-5">
                                                        <Row>
                                                            {props.isLoggin ? <Login iscreated={props.iscreated} /> : <Register />}
                                                            <Col lg={8} md={6} sm={12}>
                                                                <img className='w-100' src={Logi} alt="" />
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                            }
                                        </>
                                    }
                                </>
                            }
                        </>
                    }
                </>
            }
        </>
    )
}

export default Layout