import React, { Component } from 'react'
import axios from 'axios';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export class Table extends Component {
     state = {
          isShow: false,
          data: []
     }

     componentDidMount() {
          const url = 'http://localhost:3005/getData';
          axios.get(url)
               .then(response => {
                    const filteredData = [];
                    const tableData = response.data.recordset;
                    tableData.forEach(data => {
                         let obj = {};
                         obj['severity'] = data.severity;
                         let secondData = Object.values(data);
                         obj['count'] = secondData[1][0];
                         obj['date'] = secondData[1][1];
                         filteredData.push(obj)
                    });
                    this.setState({ data: filteredData });
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
                         <>
                              <ReactHTMLTableToExcel
                                   id="test-table-xls-button"
                                   className="download-table-xls-button"
                                   table="table-to-xls"
                                   filename="tablexls"
                                   sheet="tablexls"
                                   buttonText="Download as XLS" />
                              <MDBTable hover id="table-to-xls">
                                   <MDBTableHead color="primary-color" textWhite>
                                        <tr>
                                             <th>#</th>
                                             <th>Title</th>
                                             <th>Category</th>
                                             <th>Date</th>
                                        </tr>
                                   </MDBTableHead>
                                   <MDBTableBody>
                                        {/* {this.state.data.map((data, index) => {
                                             return (
                                                  <tr key={index + 1}>
                                                       <td>{index + 1}</td>
                                                       <td>{data.severity}</td>
                                                       <td>data.count</td>
                                                       <td>{data.date}</td>
                                                  </tr>
                                             )
                                        })} */}

                                        <tr>
                                             <td rowspan="4">1</td>
                                             <td>Jan</td>
                                             <td>$50</td>
                                             <td>$50</td>
                                        </tr>
                                        <tr>
                                             <td>Feb</td>
                                             <td>$80</td>
                                             <td>$50</td>
                                        </tr>
                                        <tr>
                                             <td>Mar</td>
                                             <td>$80</td>
                                             <td>$50</td>
                                        </tr>
                                        <tr>
                                             <td>Apr</td>
                                             <td>$80</td>
                                             <td>$50</td>
                                        </tr>
                                        <tr>
                                             <td rowspan="4">2</td>
                                             <td>Jan</td>
                                             <td>$50</td>
                                             <td>$50</td>
                                        </tr>
                                        <tr>
                                             <td>Feb</td>
                                             <td>$80</td>
                                             <td>$50</td>
                                        </tr>
                                        <tr>
                                             <td>Mar</td>
                                             <td>$80</td>
                                             <td>$50</td>
                                        </tr>
                                        <tr>
                                             <td>Apr</td>
                                             <td>$80</td>
                                             <td>$50</td>
                                        </tr>

                                   </MDBTableBody>
                              </MDBTable>
                         </>
                    }
               </div>
          )
     }
}

export default Table