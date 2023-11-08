import React, { useReducer, useState } from "react";
import "./Add.scss";
import upload from "../../utils/upload.js"
import {gigReducer,INITIAL_STATE} from "../../reducers/gigReducer.js"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest.js"



const Add = () => {
  const [coverUpload,setCoverUpload]=useState(undefined)
  const [imagesUpload,setImagesUpload]=useState([])
  const [uploading,setUploading]=useState(false)
  const [error, setError] = useState(null);

  const [state,dispatch]=useReducer(gigReducer,INITIAL_STATE);

  const handleChange=e=>{
    dispatch({type:"CHANGE_INPUT",payload:{name:e.target.name,value:e.target.value}})
    console.log(e)
  }


  const handleFeature=e=>{
    e.preventDefault()
    if(state?.features?.includes(e.target[0].value)){
      e.target.value[0]=""
    }
    else{
      dispatch({type:"ADD_FEATURE",payload:e.target[0].value})
      e.target.value[0]=""
    }
  }

    const queryClient=useQueryClient();
    const navigate=useNavigate("/")

    const mutation=useMutation({
      mutationFn:(gig)=>{
        return newRequest.post('/gigs',gig)
      },
      onSuccess:()=>{
        queryClient.invalidateQueries(['myGigs'])
        navigate("/myGigs")
      },
      onError:(err)=>{
        setError(err.response.data);
      }
    })

  
  const handleSubmit=async(e)=>{
    
      e.preventDefault()
      mutation.mutate(state)

  }


  
  const handleUpload=async()=>{
    setUploading(true);
    try{
      const cover= await upload(coverUpload);
      const images= await Promise.all(
        [...imagesUpload].map(async(i)=>{
          const url= await upload(i)
          return url;
        })
      )
      setUploading(false);
      dispatch({type:"ADD_IMAGES",payload:{cover,images}})
    }catch(err){
      console.log(err)
    }

  }

 

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              name="title"
              type="text"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="category" id="cats" onChange={handleChange}>
              <option value="design">Graphics & Design</option>
              <option value="video">Video & Animation</option>
              <option value="writing">Writing & Translation</option>
              <option value="AI">AI Services</option>
              <option value="marketing">Digtial Marketing</option>
              <option value="music">Music & Audio</option>
              <option value="programming">Programming & Tech</option>
              <option value="business">Business</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
            <div className="images">
              <div className="imagesInputs">

                <label htmlFor="">Cover Image</label>
                <input type="file" onChange={(e)=>setCoverUpload(e.target.files[0])}/>
                <label htmlFor="">Upload Images</label>
                <input type="file" multiple onChange={(e)=>setImagesUpload(e.target.files)}/>
              </div>
              <button onClick={handleUpload}>{uploading?"uploading..":"Upload"}</button>
            </div>
            <label htmlFor="">Description</label>
            <textarea name="desc" id="" placeholder="Brief descriptions to introduce your service to customers" cols="0" rows="16" onChange={handleChange}></textarea>
           
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input type="text" name="shortTitle" onChange={handleChange} placeholder="e.g. One-page web design" />
            <label htmlFor="" >Short Description</label>
            <textarea onChange={handleChange} name="shortDesc"id="" placeholder="Short description of your service" cols="30" rows="10"></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" onChange={handleChange} name="deliveryTime"/>
            <label htmlFor="">Revision Number</label>
            <input type="number" onChange={handleChange} name="revisionNumber"/>
            <label htmlFor="">Add Features</label>
            <form className="add" action="" onSubmit={handleFeature}>
              <input type="text"  placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {
                state?.features?.map((f)=>(

                <div className="item "key={f}>
                <button onClick={()=>dispatch({type:"REMOVE_FEATURE",payload:f})}>{f} <span>X</span></button>
                </div>
                ))
              }
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price"/>
            <button onClick={handleSubmit}>Create</button>
            {error && <span className="error">{error}</span>}
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default Add;