import React, {useContext, useEffect} from 'react';
import axios from 'axios';
import Features from './Features';
import {Container, Segment, } from 'semantic-ui-react';
import styled from "styled-components";
import { FeatureContext} from '../providers/FeatureProvider';

const WebDisplay = (props) => {
  const {webLoaded, webCategories, webFeatures, handleWebCategories, handleWebFeatures} = useContext(FeatureContext);
  
  useEffect( () => {
    originalAxios()
  },[]);

  const originalAxios = () => {
    if (webLoaded === false) {
      axios.get(`/api/active_web_categories`)
      .then( res  => {
        handleWebCategories(res.data)});
    
      axios.get(`/api/active_web_features`)
        .then(res => handleWebFeatures(res.data))
    }
  }
  
  return (
    <>
    <Segment as={NoLine}>
      <Container as={FeaturesContainer }>
        <Features
          osFeatures={webFeatures}
          osCategories={webCategories}
          OS='web'
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
  border: none !important;
  border-top-width: 0px !important;
  background-color: rgb(129, 104, 177) !important;

  /* @media (max-width: 500px){

  } */
`

export default WebDisplay;