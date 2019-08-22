import React, {useContext, useEffect} from 'react';
import axios from 'axios';
import Features from './Features';
import {Container, Segment } from 'semantic-ui-react';
import styled from "styled-components";
import { FeatureContext} from '../providers/FeatureProvider';
const IOSDisplay = (props) => {
  const {iosLoaded, iosCategories, iosFeatures, handleIosCategories, handleIosFeatures } = useContext(FeatureContext);
  useEffect( () => {
    originalAxios()
  },[]);
  
  const originalAxios = () => {
    if (iosLoaded === false) {
      axios.get(`/api/active_ios_categories`)
      .then( res  => {
        handleIosCategories(res.data)});
    
      axios.get(`/api/active_ios_features`)
        .then(res => handleIosFeatures(res.data))
    }
  }
  return (
  <>
    <Segment as={NoLine}>
      <Container as={FeaturesContainer}>
        <Features
          osFeatures={iosFeatures}
          osCategories={iosCategories}
          OS='ios'
          selectedFeatures={props.selectedFeatures}
          setSelectedFeatures={props.setSelectedFeatures}
          setRadioButtons={props.setRadioButtons}
          radioButtons={props.radioButtons}
        />
      </Container>
    </Segment>
  </>
  );
};

const FeaturesContainer = styled.div`
  padding: 20px;
  @media (max-width: 500px){
    padding: 2px !important;;
    margin-left: .1em !important;
    margin-right: .1em !important;
  }
`;

const NoLine = styled.div`
  border-top: none !important;
  border-top-width: 0px !important;
  background-color: rgb(94, 66, 150) !important;
`
export default IOSDisplay;