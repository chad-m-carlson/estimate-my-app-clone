import React from 'react';
import {Grid, Header} from 'semantic-ui-react';
import DarkText from '../../styles/DarkText';
import SliderBar from './SliderBar';
import styled from 'styled-components';
import GeneralBufferSlider from './GeneralBufferSlider';
import { MathConsumer } from "../../providers/MathProvider";


class NonDevAssumptions extends React.Component {
  state = {
    design: {multiplier: .10, value: Math.round((this.props.coreDevTime * .1) * 1e1) / 1e1},
    qaTesting: {multiplier: .10, value: Math.round((this.props.coreDevTime * .1) * 1e1) / 1e1},
    deployment: {multiplier: .03, value: Math.round((this.props.coreDevTime * .03) * 1e1) / 1e1},
    postDeploymentDev: {multiplier: .15, value: Math.round((this.props.coreDevTime * .15) * 1e1) / 1e1},
    projectManagement: {multiplier: .10, value: Math.round((this.props.coreDevTime * .1) * 1e1) / 1e1},
    generalBuffer: {multiplier: .05, value: null},
    nonDevTotal: 0,
    total: 0,
    coreDevTime: this.props.coreDevTime,
  };
  
  
  handleChange = (nonDevTime, multiplier, name) => {
    const {design, qaTesting, deployment, postDeploymentDev, projectManagement} = this.state   
    this.setState({[name]: {multiplier: (multiplier / 100), value: nonDevTime}})
    this.setState({nonDevTotal: Math.round((design.value + qaTesting.value + deployment.value + postDeploymentDev.value + projectManagement.value)* 1e1) / 1e1})
  };
  
  componentDidMount() {
    const {design, qaTesting, deployment, postDeploymentDev,projectManagement} = this.state;
    this.setState({nonDevTotal: Math.round((design.value + qaTesting.value + deployment.value + postDeploymentDev.value + projectManagement.value) * 1e1) / 1e1});
  };
  
  componentDidUpdate(prevProps, prevState) {
    const {design, qaTesting, deployment, postDeploymentDev, projectManagement} = prevState;
    const {coreDevTime, getNonDevAssumptionsData} = this.props;
    let dt = this.props.coreDevTime;
    if (this.state.coreDevTime !== dt ) {
      this.setState({
        design: {multiplier: design.multiplier, value: coreDevTime * design.multiplier},
        qaTesting: {multiplier: qaTesting.multiplier, value: coreDevTime * qaTesting.multiplier},
        deployment: {multiplier: deployment.multiplier, value: coreDevTime * deployment.multiplier},
        postDeploymentDev: {multiplier: postDeploymentDev.multiplier, value: coreDevTime* postDeploymentDev.multiplier},
        projectManagement: {multiplier: projectManagement.multiplier, value: coreDevTime* projectManagement.multiplier},
        coreDevTime: dt,
      });
      let ndt = (coreDevTime * design.multiplier) + (coreDevTime * qaTesting.multiplier) + (coreDevTime * deployment.multiplier) + (coreDevTime* postDeploymentDev.multiplier) + (coreDevTime* projectManagement.multiplier)
      this.props.math.setNonDevTotal(ndt)
    };
    if (this.state.nonDevTotal !== prevState.nonDevTotal || this.state.generalBuffer !== prevState.generalBuffer){
      const {design, qaTesting, deployment, postDeploymentDev, projectManagement, generalBuffer, nonDevTotal, total} = this.state;
      const dataToSendToMainDisplay = {design, qaTesting, deployment, postDeploymentDev, projectManagement, generalBuffer, nonDevTotal, total}
      getNonDevAssumptionsData(dataToSendToMainDisplay);
      let ndt = (coreDevTime * design.multiplier) + (coreDevTime * qaTesting.multiplier) + (coreDevTime * deployment.multiplier) + (coreDevTime* postDeploymentDev.multiplier) + (coreDevTime* projectManagement.multiplier)
      this.props.math.setNonDevTotal(ndt)
    }
  };
  
  updateNonDevTotal = () => {
    const {design, qaTesting, deployment, postDeploymentDev,projectManagement} = this.state;
    return (Math.round((design.value + qaTesting.value + deployment.value + postDeploymentDev.value + projectManagement.value) * 1e1) / 1e1)
  };

  getGeneralBufferData = (total, data) => {
    const {generalBuffer} = data
    this.setState({generalBuffer: generalBuffer,total })
  }
  
  render() {
    return(
      <div>
        <Grid columns='one' stackable relaxed style={{padding: '20px 50px 20px 50px'}}>
        <Grid.Row>
          <Grid.Column centered>
            <SliderInfo>
              <Header as={DarkText} fSize='ndv'>Design</Header>
              <Header as={DarkText} fSize='ndv'>Days: {this.state.design.value.toFixed(1)}</Header>
            </SliderInfo>
            <SliderBar 
              name='design'
              defaultValue={this.state.design.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
              />
            <br />
            <SliderInfo>
              <Header as={DarkText} fSize='ndv'>Quality Assurance Testing</Header>
              <Header as={DarkText} fSize='ndv'>Days: {this.state.qaTesting.value.toFixed(1)}</Header>
            </SliderInfo>
            <SliderBar 
              name='qaTesting'
              defaultValue={this.state.qaTesting.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
              />
            <br />
            <SliderInfo>
              <Header as={DarkText} fSize='ndv'>Deployment</Header>
              <Header as={DarkText} fSize='ndv'>Days: {this.state.deployment.value.toFixed(1)}</Header>
            </SliderInfo>
            <SliderBar 
              name='deployment'
              defaultValue={this.state.deployment.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
              />
            <br />
            <SliderInfo>
              <Header as={DarkText} fSize='ndv'>Post Deployment Development</Header>
              <Header as={DarkText} fSize='ndv'>Days: {this.state.postDeploymentDev.value.toFixed(1)}</Header>
            </SliderInfo>
            <SliderBar 
              name='postDeploymentDev'
              defaultValue={this.state.postDeploymentDev.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
              />
          </Grid.Column>
            <br />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <SliderInfo>
              <Header as={DarkText} fSize='ndv'>Project Management</Header>
              <Header as={DarkText} fSize='ndv'>Days: {this.state.projectManagement.value.toFixed(1)}</Header>
            </SliderInfo>
            <SliderBar 
              name='projectManagement'
              defaultValue={this.state.projectManagement.multiplier}
              coreDevTime={this.props.coreDevTime}
              handleChange={this.handleChange}
              />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {(this.state.nonDevTotal > 0) && 
      <GeneralBufferSlider 
        nonDevTotal={this.updateNonDevTotal}
        coreDevTime={this.props.coreDevTime}
        getGeneralBufferData={this.getGeneralBufferData}
      />
      }
    </div>
    );
  };
};

const SliderInfo = styled.div`


  display: flex !important;
  align-items: baseline !important;
  justify-content: space-between !important;
  margin-top: -1vh !important;
`

export default class ConnectedNonDevAssumptions extends React.Component {
  render() {
    return(
      <MathConsumer>
        {mathObject => 
          // mathObject.MathProvider.state
          <NonDevAssumptions {...this.props} math={mathObject} />

        }
      </MathConsumer>
    );
  };
};

