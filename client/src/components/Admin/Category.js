import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Button, Icon, Form, Table, Container, } from 'semantic-ui-react'
import Feature from './Feature'
import FeatureForm from './FeatureForm'

const Category = (props) => {
  const [features, setFeatures] = useState([])
  const [editing, setEditing] = useState(false)
  const [newFeature, setNewFeature] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)

  const [name, setName] = useState(props.name)
  const [isExclusive, setIsExclusive] = useState(props.exclusive)

  useEffect(()=>{  
    axios.get(`/api/categories/${props.id}/features`)
    .then(res=>{setFeatures(res.data)})}
  ,[])

  const addFeature = (feature) => {
    setFeatures([...features, feature])
  }

  const deleteFeature =(f_id)=>{
    axios.put(`/api/update_active_feature/${f_id}`)
    setFeatures(features.filter(f => f.id !== f_id))
  }

  const toggleEdit=()=>{
    setEditing(!editing)
    if(!editing){setName(props.name)}
  }

  const handleSubmit=()=>{
    axios.put(`/api/categories/${props.id}`,{category: {name, is_exclusive:isExclusive}})
    setEditing(false)
  }

  const toggleNewFeature=()=>{
    setNewFeature(!newFeature)
  }

  const editForm =(
    <>
      <Form.Input 
        value={name}
        name="name"
        onChange={(e)=> setName((e.target.value))}
        required
      />
      <Form.Checkbox
        label="Single selection?"
        name="isExclusive"
        checked={isExclusive}
        onChange={()=>setIsExclusive(!isExclusive)}
      />
    </>
  )

  const categoryDisplay = (
    <Form>
      <Table>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell collapsing>
              <Button size='small' icon color='purple' onClick={()=>setShowFeatures(!showFeatures)}>
                {
                  showFeatures ?
                  <Icon name="chevron up"></Icon>
                    :
                  <Icon name="chevron down"></Icon>
                }
              </Button>
              {
                <Button size='small' icon color={editing?"grey":"blue"} onClick={toggleEdit}>
                  <Icon name={editing?"cancel":"pencil"}/>
                </Button>
              }
              {
                // only show the new feature button if the category is expanded
                (showFeatures && !editing) &&
                <Button size='small' icon color={newFeature? "grey":"green"} onClick={toggleNewFeature}>
                  <Icon name={newFeature? "cancel":"plus"}/>
                </Button>
              }
            </Table.HeaderCell>
            
            <Table.HeaderCell textAlign={editing?'left':'center'}>
              {
                editing?
                editForm
                :
                <h3>
                  {name}
                  {isExclusive&& <Icon size='tiny' color ='grey' name='exclamation'/>}
                </h3>
              }
            </Table.HeaderCell>
            <Table.HeaderCell collapsing textAlign='right'>
              {
                editing?
                <Button size='small' icon color="green" onClick={handleSubmit}>
                  <Icon name="save"/>
                </Button>
                :
                <Button size='small' icon color="red" onClick={()=>props.delete(props.id)}>
                  <Icon name="trash"/>
                </Button>
              }
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
      {newFeature? <FeatureForm c_id={props.id} addFeature={addFeature} toggleForm={setNewFeature}/> : null}
    </Form>
  )

  return(
    <Container>
      {categoryDisplay}
      {
        showFeatures 
        &&
        features.map((feature)=> 
          <Feature 
            key={feature.id}
            id={feature.id}
            name={feature.name}
            description={feature.description}
            base_days={feature.base_days}
            multiplier={feature.multiplier}
            category={feature.category_id}
            delete={deleteFeature}
          />)
        }
        <p>{editing}</p>
    </Container>
  )
}

export default Category;