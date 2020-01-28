import React, { Component } from 'react'
import axios from 'axios';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import data from './data.json'

export class Table extends Component {
     state = {
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

     render() {
          return (
               <div style={{ margin: 50 }}>
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
                                        <th>TOPO_COR_ID</th>
                                        <th>TIME_CREATED</th>
                                        <th>TITLE</th>
                                        <th>RELATED_CI_NAME</th>
                                        <th>SEVERITY</th>
                                        <th>CATEGORY</th>
                                        <th>RELATED_CI_TYPE</th>
                                        <th>NODE_CI_NAME</th>
                                        <th>NODE_CI_TYPE</th>
                                        <th>APPLICATION</th>
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
                                        <td rowspan="3">{data[0].TOPO_COR_ID}</td>
                                        <td>{data[0].TIME_CREATED}</td>
                                        <td>${data[0].TITLE}</td>
                                        <td>${data[0].RELATED_CI_NAME}</td>
                                        <td>${data[0].SEVERITY}</td>
                                        <td>${data[0].CATEGORY}</td>
                                        <td>${data[0].RELATED_CI_TYPE}</td>
                                        <td>${data[0].NODE_CI_NAME}</td>
                                        <td>${data[0].NODE_CI_TYPE}</td>
                                        <td>${data[0].APPLICATION}</td>
                                   </tr>
                                   <tr>
                                        <td>{data[1].TIME_CREATED}</td>
                                        <td>${data[1].TITLE}</td>
                                        <td>${data[1].RELATED_CI_NAME}</td>
                                        <td>${data[1].SEVERITY}</td>
                                        <td>${data[1].CATEGORY}</td>
                                        <td>${data[1].RELATED_CI_TYPE}</td>
                                        <td>${data[1].NODE_CI_NAME}</td>
                                        <td>${data[1].NODE_CI_TYPE}</td>
                                        <td>${data[1].APPLICATION}</td>
                                   </tr>
                                   <tr>
                                        <td>{data[2].TIME_CREATED}</td>
                                        <td>${data[2].TITLE}</td>
                                        <td>${data[2].RELATED_CI_NAME}</td>
                                        <td>${data[2].SEVERITY}</td>
                                        <td>${data[2].CATEGORY}</td>
                                        <td>${data[2].RELATED_CI_TYPE}</td>
                                        <td>${data[2].NODE_CI_NAME}</td>
                                        <td>${data[2].NODE_CI_TYPE}</td>
                                        <td>${data[2].APPLICATION}</td>
                                   </tr>
                                   <tr>
                                        <td>{data[3].TOPO_COR_ID}</td>
                                        <td>{data[3].TIME_CREATED}</td>
                                        <td>${data[3].TITLE}</td>
                                        <td>${data[3].RELATED_CI_NAME}</td>
                                        <td>${data[3].SEVERITY}</td>
                                        <td>${data[3].CATEGORY}</td>
                                        <td>${data[3].RELATED_CI_TYPE}</td>
                                        <td>${data[3].NODE_CI_NAME}</td>
                                        <td>${data[3].NODE_CI_TYPE}</td>
                                        <td>${data[3].APPLICATION}</td>
                                   </tr>
                              </MDBTableBody>
                         </MDBTable>
                    </>
               </div>
          )
     }
}

export default Table