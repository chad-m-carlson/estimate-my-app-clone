import React,{ useState, useContext, useEffect } from 'react';
import { Segment, Header, Table} from 'semantic-ui-react';
import Colors from "../../styles/Colors";
import styled from "styled-components";
import { FeatureContext,} from '../../providers/FeatureProvider';
import { HistoryContext,} from '../../providers/HistoryProvider';

const SummaryTable = ({ platform, platformByNum, estimateID, features, catagories, fromHistory}) => {
  const [catagoriesEstimates, setCatagoriesEstimates] = useState([]);
  const [featuresEstimates, setFeaturesEstimates] = useState([]);
  const { categoriesFromEstimate, featuresFromEstimate } = useContext(FeatureContext);
  const { categoriesFromHistory, featuresFromHistory } = useContext(HistoryContext);


  useEffect( () => {
    if (fromHistory === true) {
      setCatagoriesEstimates(categoriesFromHistory)
      setFeaturesEstimates(featuresFromHistory)
    }
    if (fromHistory === false) {
      setCatagoriesEstimates(categoriesFromEstimate)
      setFeaturesEstimates(featuresFromEstimate)
    }}, [])
  

  const platformRendering = (platformByNum) => {
    if ((catagoriesEstimates.filter( f => platformByNum == f.platform_id)) != 0) {
      return (
        <>
          <Header size="huge" as={Colors} colored="light" inverted textAlign="center"> {platform} features</Header>
          {exclusiveRendering(platformByNum)}
        </>
      )
    }
  }

  const exclusiveRendering = (platformByNum) => {
    const pCatagories = [ ...new Set(catagoriesEstimates.filter( f => platformByNum == f.platform_id)) ]

      return (
        <>
            <Segment vertical as={NoLine}>
            <Table singleLine fixed stackable>
              <Table.Header>
                  {/* <Table.Row style={{fontWeight: '900', backgroundColor: '#e5e1eb'}}>
                    <Table.Cell colSpan='4' textAlign="center"> {c.name}</Table.Cell>
                  </Table.Row> */}
                <Table.Row style={{fontWeight: '900', backgroundColor: '#e5e1eb'}}>
                  <Table.Cell colSpan='2'> Category Name </Table.Cell>
                  <Table.Cell textAlign='center' colSpan='2' style={{fontWeight: '900', backgroundColor: '#e5e1eb'}}> Feature Name</Table.Cell>
                  <Table.Cell textAlign='right' colSpan='2' style={{fontWeight: '900', backgroundColor: '#e5e1eb'}}> Developer Days </Table.Cell>
                  {/* <Table.HeaderCell textAlign='right'> Multiplier</Table.HeaderCell> */}
                </Table.Row>
              </Table.Header>
              { pCatagories.map( c => {
            return (
              featuresEstimates.map( f => {
                if (f.category_id === c.id) {
                  return (
                    <>
                    <Table.Row>
                      <Table.Cell colSpan='2'> {c.name} </Table.Cell>
                      <Table.Cell colSpan='2'>{f.name}</Table.Cell>
                      <Table.Cell textAlign='right' colSpan='2'>{f.base_days}</Table.Cell>
                      {/* <Table.Cell textAlign='right'>{f.multiplier}</Table.Cell> */}
                    </Table.Row>
                    <Table.Row style={{fontWeight: '900', backgroundColor: '#e5e1eb'}}> </Table.Row>
                  </>
                  )
                }
              }))})}
            </Table>
          </Segment>
        </>
      )
    }

  return (
    <Segment vertical as={NoLine}>
      {platformRendering(platformByNum)}
    </Segment>
  );;

};

const NoLine = styled.div`
  border-bottom: 0px !important;
  border-bottom-width: 0px !important;
  border-color: white !important;
`



export default SummaryTable;
