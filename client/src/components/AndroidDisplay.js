import React, {useContext, useEffect } from 'react';
import axios from 'axios';
import Features from './Features';
import {Container, Segment } from 'semantic-ui-react';
import styled from "styled-components";
import { FeatureContext} from '../providers/FeatureProvider';

const AndroidDisplay = (props) => {
  const {androidLoaded, androidCategories, androidFeatures, handleAndroidCategories, handleAndroidFeatures } = useContext(FeatureContext);

  useEffect( () => {
    originalAxios()
  },[]);

  const originalAxios = () => {
    if (androidLoaded === false) {
      axios.get(`/api/active_android_categories`)
      .then( res  => {
        handleAndroidCategories(res.data)});
    
      axios.get(`/api/active_android_features`)
        .then(res => handleAndroidFeatures(res.data))
    }
  }

  return(
    <>
      <Segment as={NoLine}>
        <Container as={FeaturesContainer}>
          <Features 
            osFeatures={androidFeatures}
            osCategories={androidCategories}
            OS='android'
            setSelectedFeatures={props.setSelectedFeatures}
            selectedFeatures={props.selectedFeatures}
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
  background-color: rgb(63, 39, 115) !important;
`


export default AndroidDisplay;