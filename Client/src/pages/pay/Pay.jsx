import React, { useEffect,useState } from 'react'
import "./Pay.scss"
import {loadStripe} from "@stripe/stripe-js"
import CheckoutForm from "../../components/checkout-form/CheckoutForm"
import newRequest from "../../utils/newRequest.js"
import {useParams} from "react-router-dom"
import { Elements } from '@stripe/react-stripe-js'
const stripePromise= loadStripe("pk_test_51O7GqFAcC7KzxxaecALGAG6SRw8xe4Dh1UO3hyJy3bEAfirBKH2OfruTRFoPdzJFHI6YQItvIXPxTO7lkK5YD6xV00SbrbZ3i7")

function Pay() {
  const[clientSecret,setClientSecret]=useState("")

  const {id}=useParams();
  
  useEffect(()=>{
    const makeRequest= async ()=>{
      try{
        const res=await newRequest.post(`/orders/create-payment/${id}`)
        setClientSecret(res.data.clientSecret)
      }catch(err){
        console.log(err)
      }
    };

    makeRequest()
  },[])

  const appearance={
    theme:'stripe'
  }
  const options={
    clientSecret,
    appearance
  }

  return (
    <div className="pay">
      {clientSecret&&(
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm/>
        </Elements>
      )}
    </div>
  )
}

export default Pay