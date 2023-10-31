import React, { useReducer, useState } from "react";
import "./Add.scss";
import upload from "../../utils/upload.js"
import {gigReducer,INITIAL_STATE} from "../../reducers/gigReducer.js"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const Add = () => {
  const [cover,setCover]=useState(undefined)
  const [images,setImages]=useState([])
  const [uploading,setUploading]=useState(false)

  const [state,dispatch]=useReducer(gigReducer,INITIAL_STATE);

  const handleChange=e=>{
    dispatch({type:"CHANGE_INPUT",payload:{name:e.target.name,value:e.target.value}})
  }

  console.log(state?.features)

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
      },
    })

  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    mutation.mutate(state)
    navigate("/myGigs")

  }
  
  const handleUpload=async()=>{
    setUploading(true);
    try{
      const coverr= await upload(cover);
      const imagess= await Promise.all(
        [...images].map(async(i)=>{
          const url= await upload(i)
          return url;
        })
      )
      setUploading(false);
      dispatch({type:"ADD_IMAGES",payload:{cover:coverr,images:imagess}})
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
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="images">
              <div className="imagesInputs">

                <label htmlFor="">Cover Image</label>
                <input type="file" onChange={(e)=>setCover(e.target.files[0])}/>
                <label htmlFor="" onChange={(e)=>setImages(e.target.files)}>Upload Images</label>
                <input type="file" multiple />
              </div>
              <button onClick={handleUpload}>{uploading?"uploading..":"Upload"}</button>
            </div>
            <label htmlFor="">Description</label>
            <textarea name="desc" id="" placeholder="Brief descriptions to introduce your service to customers" cols="0" rows="16" onChange={handleChange}></textarea>
            <button onClick={handleSubmit}>Create</button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;