import React, { Component } from 'react'
import axios from 'axios';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';

export class Table extends Component {
     state = {
          isShow: false,
          data: []
     }

     componentDidMount() {
          const url = 'http://localhost:3005/getData';
          axios.get(url)
               .then(response => {
                    this.setState({ data: response.data })
               }).catch(err => {
                    console.log(err)
               });
     }

     handleShow = () => {
          this.setState({ isShow: true })
     }
     render() {
          return (
               <div style={{ margin: 50 }}>
                    <div style={{ marginBottom: 30 }}>
                         <MDBBtn color="primary" onClick={this.handleShow}>Show</MDBBtn>
                    </div>

                    {this.state.isShow &&
                         <MDBTable hover>
                              <MDBTableHead color="primary-color" textWhite>
                                   <tr>
                                        <th>#</th>
                                        <th>Event name</th>
                                        <th>Categories</th>
                                        <th>Severity</th>
                                        <th>From</th>
                                        <th>To</th>
                                   </tr>
                              </MDBTableHead>
                              <MDBTableBody>
                                   {this.state.data.map((data, index) => {
                                        return (
                                             <tr key={data.id}>
                                                  <td>{index + 1}</td>
                                                  <td>{data.event_name}</td>
                                                  <td>{data.categories}</td>
                                                  <td>{data.severity}</td>
                                                  <td>{data.from_date}</td>
                                                  <td>{data.to_date}</td>
                                             </tr>
                                        )
                                   })}
                              </MDBTableBody>
                         </MDBTable>
                    }
               </div>
          )
     }
}

export default Table
