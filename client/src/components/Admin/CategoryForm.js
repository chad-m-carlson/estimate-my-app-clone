import React,{useState, } from 'react';
import axios from 'axios'
import {Form} from 'semantic-ui-react'

const CategoryForm = (props) => {
  const [name, setName] = useState('')
  const [isExclusive, setIsExclusive] = useState(false)

  const handleSubmit=(e)=>{
    axios.post(`/api/platforms/${props.p_id}/categories`,{name, is_exclusive:isExclusive})
    .then( res => {
      props.addCategory(res.data)
      props.toggleForm(false)
    })
  }

  return(
    <>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
      <Form.Input
        label="Category Name"
        placeholder="Category Name..."
        value={name}
        name="name"
        onChange={(e)=> setName((e.target.value))}
        required
      />
      <Form.Checkbox
        label="Single Selection?"
        name="isExclusive"
        onChange={()=>setIsExclusive(!isExclusive)}
      />
      </Form.Group>
      <Form.Button>Submit</Form.Button>
    </Form>
    <br/>
    </>
  )
}

export default CategoryForm;
