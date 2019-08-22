import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Form, Grid, Container, Header,} from 'semantic-ui-react';
import { MathContext} from '../providers/MathProvider';
import { FeatureContext} from '../providers/FeatureProvider';
import FeatureCard from './FeatureCard';
import DarkText from "../styles/DarkText";
import styled from "styled-components"

const Features = (props) => {
  const { handleSetDays, handleExclusiveDaysByFeature} = useContext(MathContext);
  
  const handleCheckbox = (catID, value) => {
    // debugger
    // const value = e.currentTarget.attributes.value.nodeValue;
    const {selectedFeatures, OS, setSelectedFeatures } = props;
    if (selectedFeatures.includes(value) === false) {setSelectedFeatures([...selectedFeatures, value])
    }else {setSelectedFeatures(selectedFeatures.filter(f => f !== value));
    };
    handleSetDays(OS, ...props.osFeatures.filter( f => {if (f.id === parseInt(value)) return f; else return null}), false);
    
  };
  
  const handleRadio = (catID, fID) => {
    const { OS, radioButtons, setRadioButtons} = props;
    if(radioButtons.map( rb => (rb.category)).includes(catID) === false) {setRadioButtons([...radioButtons, {category: catID, feature: fID}]);
    }else {setRadioButtons([...radioButtons.filter( rb => rb.category !== catID ),{category: catID, feature: fID}]);
    };
    handleSetDays(OS, ...props.osFeatures.filter( f => {if (f.id === parseInt(fID)) return f; else return null}),true);

    if(radioButtons.map( rb => (rb.feature)).includes(fID) === true) {
      setRadioButtons([...radioButtons.filter( rb => rb.feature !== fID)])
      handleExclusiveDaysByFeature(OS, fID)
    }
  };

  const isSelected = (id) => {
    let selected = [];
    props.radioButtons.map( rb => selected.push(rb.feature));
    props.selectedFeatures.map( sf => selected.push(sf))
    return selected.includes(id);
  };

  // const getCorrectFeatures = (catID) => {
  //   return new Promise((resolve, ) => {
  //     console.log(catID)
  //     resolve([correctF])
  //     const correctF = props.osFeatures.filter( f => catID === f.category_id);
  //   })
  // }
  
  const exclusiveRendering =  (catID, is_exclusive) => {
    const correctF = props.osFeatures.filter( f => catID === f.category_id);
    // const correctF = await getCorrectFeatures(catID)

    if (is_exclusive === true) {
      return (
        // <Spacing>
          <Grid columns={3} centered stackable>
            <Grid.Row columns={3} textAlign="center">
              {correctF.map( f => (
                <>
                <RowSpacing>
                  <Grid.Column centered as={RowCentered}>
                    <FeatureCard 
                      onClickFunction={handleRadio} 
                      isSelected={isSelected} 
                      f={f}
                      />
                  </Grid.Column>
                </RowSpacing>
              </>
              ))}
            </Grid.Row>
          </Grid>
        // </Spacing>
      );
      }else {
        return (
          // <Spacing>
            <Grid columns={3} centered stackable >
              <Grid.Row columns={3} textAlign="center">
                {correctF.map( f => (
                  <>
                    <RowSpacing>
                      <Grid.Column centered as={RowCentered}>
                        <FeatureCard 
                          onClickFunction={handleCheckbox} 
                          isSelected={isSelected} 
                          f={f}
                        />
                      </Grid.Column>
                    </RowSpacing>
                  </>
                ))}
              </Grid.Row>
            </Grid>
          // </Spacing>
        );
      };
    };

  return (
    <Container textAlign="center">
        <br/>
        <br/>
        <Form>
          {props.osCategories.map(c => 
          <>
            <Container textAlign="center" key={c.id} id={c.id}>
              <CategoryContainer>
              <Header as={DarkText} fSize="medium">{c.name}</Header>
              {exclusiveRendering(c.id, c.is_exclusive)}
              </CategoryContainer>
            </Container>
            <Spacing/>
          </>
          )}
        </Form >
    </Container>
  )
};

const CategoryContainer = styled.div`
  padding: 4.167em 1.25em 4.167em 1.25em;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  margin-bottom: 1.25em;
  margin-top: .625em;
  border-radius: 4px;
  background: white;
`;

const Spacing = styled.div`
  padding: 5px 2.5em 2.5em 2.5em !important;
`;

const RowCentered = styled.div`
  padding: .625em !important;
`;

const RowSpacing = styled.div`
  padding: .625em !important;
`;

export default Features;