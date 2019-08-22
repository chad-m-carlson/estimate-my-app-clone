import React, { Component } from 'react';
import axios from 'axios'
import { Loader, Modal, Button } from 'semantic-ui-react'
import Navbar from './Navbar'
import SummaryPage from './summary/SummaryPage';
import styled from "styled-components";
import DataTable from 'react-data-table-component';

class HistoryPaginated extends Component {
  state = {
    loaded: false,
    modalOpen: false,
    estimates: [],
    tableColumns: [
      { name: 'Estimate No.', selector: 'id', sortable: true,  },
      { name: 'Customer Name', selector: 'customer_name', sortable: true,  },
      { name: 'Customer Email', selector: 'customer_email', sortable: true,  },
      { name: 'DPL Sales Agent', selector: 'employee_name', sortable: true, },
      { name: 'Created', selector: 'created_at', sortable: true, right: true,},
    ]
  };

  
  componentDidMount = () => {
    // console.log(this.props.eID)
    axios.get(`/api/estimates/`)
    .then(res => 
      this.setState({estimates: [...res.data]}, this.setLoaded(), this.convertDates() ),
      )
    }
    
  convertDates = () => {
    const { estimates } = this.state

    const date = new Date
    estimates.map( e => 
      date.toLocaleDateString('en-US', e.created_at))
  }

  handleCloseModal = () => {
    this.setState({modalOpen:false})
  }

  handleOpenModal = () => {
    this.setState({modalOpen:true})
  }

  setLoaded = () => {
    this.setState({loaded: true})
  }

  render () { 
    const { estimates, loaded, tableColumns } = this.state;
    const { name, email, eID, modalOpen } = this.props;

    if (loaded)
      return (
        <>
          <Navbar/>
          <DataTable
            title="Estimates History"
            columns={tableColumns}
            data={estimates}
            pagination={true}
            pointerOnHover={true}
            onRowClicked={this.handleOpenModal}
          />
          <Modal  
            open={modalOpen}>
          <SummaryPage as={NoLine} eID={eID} submit={this.handleCloseModal} name={name} email={email} fromHistory={true}/>
          <Modal.Actions as={NoLine}>
            <Button onClick={this.handleCloseModal}>
              Done
            </Button>
          </Modal.Actions>
        </Modal>
        </>
      )
    else 
      return (
        <Loader>
          Loading history Page. Please Wait... 
        </Loader>
      )
  }
}

const NoLine = styled.div`
  border-top: none !important;
  border-top-width: 0px !important;
  background: white !important;
`

export default HistoryPaginated
