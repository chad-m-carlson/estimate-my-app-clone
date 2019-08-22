import React,{useState, useContext } from 'react';
import Navbar from './Navbar';
import TotalMath from './TotalMath';
import WebDisplay from './WebDisplay';
import IOSDisplay from './iOSDisplay';
import AndroidDisplay from './AndroidDisplay';
import SummaryPage from './summary/SummaryPage';
import PlatformTabs from './PlatformTabs';
import MainTitle from '../styles/MainTitle';
import {Icon, Segment, Header, Form, Modal, Button} from 'semantic-ui-react';
import Colors from "../styles/Colors";
import styled from "styled-components";
import axios from 'axios';
import {MathContext,} from '../providers/MathProvider';
import {AuthContext,} from '../providers/AuthProvider';
import {FeatureContext} from '../providers/FeatureProvider';

const MainDisplay = () => {
  const [focus, setFocus] = useState("web");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [estimate_id, setEstimate_id] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [radioButtons, setRadioButtons] = useState([]);
  const [nonDevAssumptions, setNonDevAssumptions] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [notFirstSubmit, setNotFirstSubmit] = useState(false)
  const [errorPopup, setErrorPopup] = useState(false)
  const [estimate, setEstimate] = useState({})

  const {resetMath, exclusiveWebDays, exclusiveiOSDays, exclusiveAndroidDays, nonDevTotal, total, generalBufferValue, iOSPrice, webPrice, androidPrice} = useContext(MathContext);
  const { featureIDsFromEstimate, handleSelectedIDs, handleResetIDs} = useContext(FeatureContext);
  const {authenticated} = useContext(AuthContext)

  const buildEstimate = () => {
    return new Promise((resolve,) => {

        const {design, qaTesting, deployment, postDeploymentDev, projectManagement, generalBuffer,} = nonDevAssumptions;
        
        let newArray = []
        let coreDevTime = iOSPrice + androidPrice + webPrice
        
        newArray.push(...selectedFeatures,...exclusiveWebDays.map( ewd => ewd.id), ...exclusiveiOSDays.map( eid => eid.id),...exclusiveAndroidDays.map( ead => ead.id), )
        
        featureIDsFromEstimate.push(...newArray)
        
        const estimate = {feature_array: featureIDsFromEstimate, customer_name: name, customer_email: email, design_value: design.value, qaTesting_value: qaTesting.value, deployment_value: deployment.value, postDeploymentDev_value: postDeploymentDev.value, projectManagement_value: projectManagement.value, generalBuffer_value: generalBufferValue,  design_multiplier: design.multiplier, qaTesting_multiplier: qaTesting.multiplier, deployment_multiplier: deployment.multiplier, postDeploymentDev_multiplier: postDeploymentDev.multiplier, projectManagement_multiplier: projectManagement.multiplier, generalBuffer_multiplier: generalBuffer.multiplier, nonDevTotal, total, coreDevTime};
        setEstimate(estimate)
        resolve (estimate)
    });
  };


  const handleSubmit = async () => {
    if (name === '' || email === '') {
      alert('Name and email are required to submit an estimate')
      return
    }
    const estimate = await buildEstimate()
    setNotFirstSubmit(true)
    
    axios.post(`/api/estimates`, estimate)
      .then( res => {
        setEstimate_id(res.data)
        handleSelectedIDs()
        setModalOpen(true)
      })
      .catch(error => console.log(error));
    
  };

  const handleResubmit = () => {
    let newArray = []
    newArray.push(...selectedFeatures,...exclusiveWebDays.map( ewd => ewd.id), ...exclusiveiOSDays.map( eid => eid.id),...exclusiveAndroidDays.map( ead => ead.id), )

    featureIDsFromEstimate.push(...newArray)

    setNotFirstSubmit(true)
    setModalOpen(true)
    handleSelectedIDs()
  };

  const handleSaveModal = async () => {
    setModalOpen(false)
    const estimate = await buildEstimate();
    const distinctFeatureIDsFromEstimate = [...new Set(featureIDsFromEstimate)]
    axios.post(`/api/features_estimates`, {selectedFeatures: distinctFeatureIDsFromEstimate, estimate_id: estimate_id, estimate})
      .then( res => {
        setEmail('')
        setName('')
        setSelectedFeatures([])
        setRadioButtons([])
        resetMath()
        setNotFirstSubmit(false)
        handleResetIDs()
        updateEstimate()
        setFocus('web')
      })
  }

  const errorModalClose = () => {
    setErrorPopup(false)
  }

  const handleFormButton = () => {
    if (selectedFeatures.length > 0 || radioButtons.length > 0) {
      if (notFirstSubmit === false) {
        handleSubmit()
      } 
      if (notFirstSubmit === true) {
        handleResubmit()
        updateEstimate()
        setModalOpen(true)
      }
    } else {
      setErrorPopup(true)
    }
  }


  const updateEstimate = () => {
    const featureIDs = [...new Set(featureIDsFromEstimate)]
    const {design, qaTesting, deployment, postDeploymentDev, projectManagement, generalBuffer,} = nonDevAssumptions;
    const estimate = {feature_array: featureIDs, customer_name: name, customer_email: email, design_value: design.value, qaTesting_value: qaTesting.value, deployment_value: deployment.value, postDeploymentDev_value: postDeploymentDev.value, projectManagement_value: projectManagement.value, generalBuffer_value: generalBufferValue, design_multiplier: design.multiplier, qaTesting_multiplier: qaTesting.multiplier, deployment_multiplier: deployment.multiplier, postDeploymentDev_multiplier: postDeploymentDev.multiplier, projectManagement_multiplier: projectManagement.multiplier, generalBuffer_multiplier: generalBuffer.multiplier, nonDevTotal, total};
    axios.put(`/api/estimates/${estimate_id}`, estimate)
      .then(console.log(estimate))
    setEstimate(estimate)
  }

  const handleCloseModal = () => {
    handleResetIDs()
    setModalOpen(false)
  }
      
  const getNonDevAssumptionsData = (data) => {
    setNonDevAssumptions(data)
  }

  const handleWeb = () => {
    setFocus('web');
  };

  const handleiOS = () => {
    setFocus('ios');
  };

  const handleAndroid = () => {
    setFocus('android');
  };


  const displayForm = () => {
    switch(focus){
      case 'web': return <WebDisplay
                            handleSubmit={handleSubmit} 
                            setSelectedFeatures={setSelectedFeatures}
                            selectedFeatures={selectedFeatures}
                            setRadioButtons={setRadioButtons}
                            radioButtons={radioButtons}/>;
      case 'ios': return <IOSDisplay 
                            handleSubmit={handleSubmit} 
                            setSelectedFeatures={setSelectedFeatures} 
                            selectedFeatures={selectedFeatures}
                            setRadioButtons={setRadioButtons}
                            radioButtons={radioButtons}/>;
      case "android": return <AndroidDisplay 
                                handleSubmit={handleSubmit}
                                setSelectedFeatures={setSelectedFeatures} 
                                selectedFeatures={selectedFeatures}
                                setRadioButtons={setRadioButtons}
                                radioButtons={radioButtons} />;
      default: return <h1>You broke the platform switcher</h1>;
    };
  };


  return(
    <>
    <Segment.Group Vertical as={Colors} colored="white">
      <Navbar />
      <Header align="center" as={MainTitle} colored="dark-grey" fSize="large">
        Estimate Your App
      </Header>
      <Header align="center" as={MainTitle} colored="dark-grey"  fSize="small">
        Select the items below which best describe your app and the features you require.
      </Header>
      <Header align="center" as={MainTitle} colored="light-grey" padding="tiny" fSize="tiny">
        All estimates are approximate but should give you a rough idea of what it will take to build your app.
      </Header>
      <Segment.Group horizontal as={NoLine}>
        <PlatformTabs 
          handleWeb={handleWeb}
          handleiOS={handleiOS}
          handleAndroid={handleAndroid}
          position='top'
        />
      </Segment.Group>
      {displayForm()}
      <Segment.Group horizontal as={NoLine}>
        <PlatformTabs 
            handleWeb={handleWeb}
            handleiOS={handleiOS}
            handleAndroid={handleAndroid}
            position='bottom'
            />
      </Segment.Group>
      <TotalMath 
        getNonDevAssumptionsData={getNonDevAssumptionsData}
      />
      {/* {authenticated && */}
      <Segment as={Colors} colored="light-grey" style={{padding: '20px 70px 20px 70px'}}>
        <Header align="center" as={MainTitle} colored="dark-grey"  fSize="tiny">
          Client's name and email to save estimate
        </Header>
        <FormBorder>
          <Form widths='equal'>
            <Form.Input 
              type='text'
              onChange={(e) => setName(e.target.value)}
              label='Name'
              value={name}
            />
            <Form.Input
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              label='Email'
              value={email}
            />
              <Form.Button onClick={handleFormButton} basic>Submit for Estimate Summary</Form.Button>
          </Form>
        </FormBorder>
        <Modal  
            open={modalOpen}>
          <SummaryPage 
            as={NoLine} 
            eID={estimate_id} 
            submit={handleSaveModal} 
            name={name} 
            email={email} 
            fromHistory={false}
            nonDevTotal={nonDevTotal} //FROM PROVIDER, NOT ESTIMATE
            estimate={estimate}
            iOSPrice={iOSPrice}
            androidPrice={androidPrice}
            webPrice={webPrice}
          />
          <Modal.Actions as={NoLine}>
            <Button onClick={handleCloseModal}>
              <Icon name='remove' /> Go back and edit these choices
            </Button>
            <Button
              onClick={handleSaveModal}
              labelPosition='right'
              icon='checkmark'
              content='Save and close this estimate'
            />
          </Modal.Actions>
        </Modal>
        <Modal
          open={errorPopup}
          basic
          size='small'
        >
          <Modal.Content>
            <h3>You did not select any features...</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={errorModalClose}>
              <Icon name='checkmark' /> Got it
            </Button>
          </Modal.Actions>
        </Modal> 
      </Segment>
      {/* //  }  */}
    </Segment.Group>
    </>
  )
};

const NoLine = styled.div`
  border-top: none !important;
  border-top-width: 0px !important;
  background: white !important;
`

const FormBorder = styled.div`
  padding: 30px !important;
  border-top: 5px !important;
  border-top-width: 5px !important;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  margin-bottom: 20px;
  margin-top:10px;
  border-radius: 4px;
  padding: 20px; 
  background: white !important;
`

export default MainDisplay