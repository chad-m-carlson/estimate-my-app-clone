import React, { Component } from 'react';
import SummaryTable from './SummaryTable';
import {Image, Segment, Header, Table, Loader, Dimmer} from 'semantic-ui-react';
import Colors from "../../styles/Colors";
import styled from "styled-components";
import axios from 'axios';

// import { FeatureContext} from '../../providers/FeatureProvider';

class SummaryPage extends Component {
  state = {
    loaded: false,
    estimate: {},
  };

  componentDidMount = () => {
    // (this.props.eID)
    axios.get(`/api/estimates/${this.props.eID}`)
    .then(res => 
      this.setState({estimate: res.data}, this.setLoaded()),
    )
    // DEPENDING ON WHERE WE RENDER THIS COMPONENT, WE NEED TO PASS IN ESTIMATE PROPS FROM MAIN DISPLAY
  }

  setLoaded = () => {
    this.setState({loaded: true})
  }

  render () { 
    const {  loaded } = this.state;
    const { estimate, name, email, eID, fromHistory, nonDevTotal, iOSPrice, androidPrice, webPrice} = this.props;

    if (loaded)
      return (
        <Segment.Group Vertical as={NoLine} color="white">
          <InternalPadding>
            <Segment vertical as={NoLine}>
              <Header as="h1" image>
                <Image
                    src={require('../../images/dpl-logo.png')}
                    size="medium"
                />
                <Header.Content>
                  DevPoint Labs Estimate Summary
                  <Header.Subheader> Client:  {name},  {email}</Header.Subheader>
                  {/* <Header.Subheader>ESTIMATE ID - check that its rendering: ID# {eID}</Header.Subheader> */}
                </Header.Content>
              </Header>
            </Segment>
            <SummaryTable platform={'web'} platformByNum={'3'} estimateID={eID} fromHistory={fromHistory}/> 
            <SummaryTable platform={'ios'} platformByNum={'1'} estimateID={eID}  fromHistory={fromHistory}/>
            <SummaryTable platform={'android'} platformByNum={'2'} estimateID={eID}  fromHistory={fromHistory}/>
            <Segment vertical as={NoLine}>
              <Header size="huge" as={Colors} colored="medium-grey" inverted textAlign="center">Estimate Totals</Header>
              <Table singleLine>
                <Table.Row style={{fontWeight: '900', backgroundColor: '#CCCACF'}}> 
                  <Table.Cell>Developer Days</Table.Cell>
                  <Table.Cell textAlign='right'>{(iOSPrice + webPrice + androidPrice).toFixed(1)} Days</Table.Cell>
                </Table.Row>
                <Table.Row> 
                  <Table.Cell>Design</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.design_value.toFixed(1)} Days</Table.Cell>
                </Table.Row>
                <Table.Row> 
                  <Table.Cell>Deployment</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.deployment_value.toFixed(1)} Days</Table.Cell>
                </Table.Row>
                <Table.Row> 
                  <Table.Cell>Quality Assurance Testing</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.qaTesting_value.toFixed(1)} Days</Table.Cell>
                </Table.Row>
                <Table.Row> 
                  <Table.Cell>Post Deployment Development</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.postDeploymentDev_value.toFixed(1)} Days</Table.Cell>
                </Table.Row>
                <Table.Row> 
                  <Table.Cell>Project Management</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.projectManagement_value.toFixed(1)} Days</Table.Cell>
                </Table.Row>
                <Table.Row style={{fontWeight: '900', backgroundColor: '#CCCACF'}}> 
                  <Table.Cell>Non Developer Days</Table.Cell>
                  <Table.Cell textAlign='right'>{nonDevTotal.toFixed(1)} Days</Table.Cell>
                </Table.Row>
                <Table.Row> 
                  <Table.Cell>General Buffer Time</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.generalBuffer_value.toFixed(1)} Days</Table.Cell>
                </Table.Row>
                <Table.Row style={{fontWeight: '900', backgroundColor: '#CCCACF'}}> 
                  <Table.Cell>Total Days</Table.Cell>
                  <Table.Cell textAlign='right'>{estimate.total} Days</Table.Cell>
                </Table.Row>
              </Table>
            </Segment>
          </InternalPadding>
        </Segment.Group>
      )
    else 
      return (
        <Loader>
          Loading estimate Page. Please Wait... 
        </Loader>
      )
  }
}


const NoLine = styled.div`
  border-bottom: 0px !important;
  border-bottom-width: 0px !important;
  border-color: white !important;
  border-top: 0px !important;
  border-top-width: 0px !important;
`

const InternalPadding = styled.div`
  margin: 30px;
  background: white !important;
`
export default SummaryPage

// export default class ConnectedSummaryPage extends React.Component {
//   render() {
//     return(
//       <MathConsumer>
//         {mathObject => 
//           // mathObject.MathProvider.state
//           <SummaryPage {...this.props} math={mathObject} />

//         }
//       </MathConsumer>
//     );
//   };
// };