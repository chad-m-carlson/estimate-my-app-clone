import React, {useState,} from 'react';
import {Table, Icon, Button,Form, Container} from 'semantic-ui-react'
import axios from 'axios'

const Feature = (props) => {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(props.name)
  const [description, setDescription] = useState(props.description)
  const [base_days, setBase_Days] = useState(props.base_days)
  const [multiplier, setMultiplier] = useState(props.multiplier)

  const handleSubmit=()=>{
    axios.put(`/api/features/${props.id}`,{feature:{name, description, base_days, multiplier}})
    setEditing(false)
  }

  const toggleEdit=()=>{
    setEditing(!editing)

    // if the user cancels editing set the state back to the default
    if (!editing){
      setName(props.name)
      setDescription(props.description)
      setBase_Days(props.base_days)
      setMultiplier(props.multiplier)
    }
  }

    const Feature=(
      <Form>
        <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>
              {editing?
                <Button size='tiny' icon color="grey" onClick={toggleEdit}><Icon name="cancel"/></Button>
                :
                <Button size='tiny' icon color="blue" onClick={toggleEdit}><Icon name="pencil"/></Button>
              }
            </Table.Cell>
            <Table.Cell collapsing>
              {editing? 
                <Form.Input label='Name' value={name} name="name" onChange={(e)=> setName((e.target.value))} required/> 
                :
                props.name
              }        
            </Table.Cell>
            <Table.Cell>
              {editing?
                <Form.Input label='Description' placeholder={description} value={description} name="description" onChange={(e)=> setDescription((e.target.value))} required/>
                :
                props.description
              }
            </Table.Cell>
            {/* <Table.Cell collapsing textAlign='right'>
              {editing?
                <Form.Input label='Multiplier' value={multiplier} name="multiplier" onChange={(e)=> setMultiplier((e.target.value))} required/> 
                :
                props.multiplier
              }
            </Table.Cell> */}
            <Table.Cell collapsing textAlign='right'>
              {editing?
                <Form.Input label='Developer Days' value={base_days} name="base_days" onChange={(e)=> setBase_Days((e.target.value))} required/> 
                :
                props.base_days
              }
            </Table.Cell>
            <Table.Cell collapsing textAlign='right'>
              {editing?
                <Button size='tiny' icon color="green" onClick={handleSubmit}><Icon name="save"/></Button>
                :
                <Button size='tiny' icon color="red" onClick={()=>props.delete(props.id)}><Icon name="trash"/></Button>
              }
            </Table.Cell>
            </Table.Row>
            </Table.Body>
        </Table>
      </Form>
    )

  return(
    <Container>
      {Feature}
    </Container>
  )
}

export default Feature;