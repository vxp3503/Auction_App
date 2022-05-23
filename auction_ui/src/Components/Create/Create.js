import React, { useState } from 'react'
import "./Create.css"
import { Container, Form, Col, Row, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useContext } from 'react'
import AuctionContext from '../../context/Auction/AuctionContext'
import { useNavigate } from 'react-router-dom'
const Create = () => {

    const navigate=useNavigate()
    const [userInput,setInput]=useState({
        title:"",
        description:"",
        start_bid:"",
        image_url:"",
        category:""
    })


    function TitleChangeHandler(event){
        setInput({
            ...userInput,
            title:event.target.value
        })
    }
    function DescriptionChangeHandler(event){
        setInput({
            ...userInput,
            description:event.target.value
        })
    }

    function StartBidChangeHnadler(event){
        setInput({
            ...userInput,
            start_bid:event.target.value
        })
    }


    function ImageUrlChangeHandler(event){
        setInput({
            ...userInput,
            image_url:event.target.value
        })
    }

    function CategoryChangeHandler(event){
        setInput({
            ...userInput,
            category:event.target.value
        })
    }
    const user1 = useContext(AuctionContext)


    function Submit(){
        var bodyFormData=new FormData();
        bodyFormData.append('title',userInput.title)
        bodyFormData.append('description',userInput.description)
        bodyFormData.append('startbid',userInput.start_bid)
        bodyFormData.append('image',userInput.image_url)
        bodyFormData.append('category',userInput.category)
        axios({
            method: "post",
            url: "http://54.91.139.171:8000/create",
            data: bodyFormData,
            withCredentials:true,
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then(function(response){
                console.log(response.data)
                user1.active()
                navigate('/active')
            })
            .catch(function(error){
                console.log(error)
            })
        console.log(userInput)
    }
    return (
        <>
            <Form className='form1'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control onChange={TitleChangeHandler} type="text" placeholder="Title" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={DescriptionChangeHandler} as="textarea" rows={5} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Starting Bid</Form.Label>
                    <Form.Control onChange={StartBidChangeHnadler}  type="number" placeholder="Bid Amount" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>image url</Form.Label>
                    <Form.Control onChange={ImageUrlChangeHandler} type="url" placeholder="Url" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Category</Form.Label>
                <Form.Select onChange={CategoryChangeHandler}>
                    <option>...........</option>
                    <option value="BOOKS">Books</option>
                    <option value="MUSIC">Music</option>
                    <option value="MOVIES">Movies</option>
                    <option value="GAMES">Games</option>
                    <option value="COMPUTERS">Computers</option>
                    <option value="ELECTRONICS">Electronics</option>
                    <option value="KITCHEN">Kitchen</option>
                    <option value="HOME">Home</option>
                    <option value="HEALTH">Health</option>
                    <option value="PETS">Pets</option>
                    <option value="TOYS">Toys</option>
                    <option value="FASHION">Fashion</option>
                    <option value="SHOES">Shoes</option>
                    <option value="SPORTS">Sports</option>
                    <option value="BABY">Baby</option>
                    <option value="TRAVEL">Travel</option>
                </Form.Select>
                </Form.Group>
                <Button variant="primary"  onClick={Submit}>Submit</Button>
            </Form>
        </>
    )
}

export default Create