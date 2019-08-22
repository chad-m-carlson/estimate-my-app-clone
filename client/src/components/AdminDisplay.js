import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Navbar from './Navbar';
import Platform from './Admin/Platform'

const AdminDisplay = (props) => {
  const [categories, setCategories] = useState([])
  const [platforms, setPlatforms] = useState([])

  useEffect(()=>{
    axios.get(`/api/all_categories`)
    .then(res=>{setCategories(res.data)})
    
    axios.get(`/api/platforms`)
    .then(res=>{setPlatforms(res.data)})
  },[])

  const testStuff = () => {

    // console.log("These are the props" + platforms.props)
  
  }
  
  return(
    <>
      <Navbar />
      {platforms.map((platform)=> <Platform key={platform.id} name={platform.name} id={platform.id}  history={props.history}/>)}
    </>
  )
};

export default AdminDisplay;