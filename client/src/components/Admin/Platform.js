import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Category from './Category'
import {Form, Button, Icon, Table, Segment} from 'semantic-ui-react'
import CategoryForm from './CategoryForm'

const Platform = (props) => {
const [editing, setEditing] = useState(false)
const [categories, setCategories] = useState([])
const [newCategory, setNewCategory] = useState(false)
const [showCategories, setShowCategories] = useState(false)

const [tempName, setTempName] = useState('')

  useEffect(()=>{
    axios.get(`/api/platforms/${props.id}/categories`)
    .then(res=>{setCategories(res.data)})
  },[])

  // passed to the category form so it can update state
  const addCategory = (category) => {
    setCategories([...categories, category])
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.put(`/api/platforms/${props.id}`,{platform:{name:tempName}})
  }


  const deleteCategory =(c_id)=>{
    axios.put(`/api/update_active_category/${c_id}`)
    setCategories(categories.filter(c => c.id !== c_id))
  }
  
  const categoryDisplay=(
    <>
      {categories.map((category)=> <Category key={category.id} name={category.name} id={category.id} delete={deleteCategory} exclusive={category.is_exclusive}/>)}
    </>
  )

  const editForm =(
    <>
    <Form>
      <Form.Input 
        label='Platform Name'
        value={tempName}
        name="name"
        onChange={(e)=> setTempName((e.target.value))}
        required
      />
    </Form>
        <Button icon color="grey" onClick={()=>setEditing(false)}>
        <Icon name="cancel"/>
      </Button>
      <Button icon color="green" onClick={handleSubmit}>
        <Icon name="save"/>
      </Button>
      </>
  )

  return(
    <Segment vertical>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing>
              <Button size='massive' icon color='purple' onClick={()=>setShowCategories(!showCategories)}>
              {showCategories?
                <Icon name="chevron up"></Icon>
                :
                <Icon name="chevron down"></Icon>
              }
              </Button>
              {
                showCategories&&
                <Button size='massive' icon color={newCategory?"grey":"green"} onClick={()=>setNewCategory(!newCategory)}>
                  <Icon name={newCategory?"cancel":"plus"}/>
                </Button>
              }
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
              <h1>{props.name}</h1>
            </Table.HeaderCell>
            <Table.HeaderCell collapsing textAlign='right'>
              <Button size='massive' icon color="blue" onClick={()=>setEditing(true)}>
                <Icon name="pencil"/>
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
      
      {editing && editForm}
      {newCategory? <CategoryForm  addCategory={addCategory} toggleForm={setNewCategory} p_id={props.id}/> : null}
        {showCategories && 
          <Segment>
            {categoryDisplay}
          </Segment>
        }
    </Segment>
  )
}

export default Platform;