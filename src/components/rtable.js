import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Rtable extends Component {

  state = {
      data:[],
      headers:[],
      i:0
    }



    componentDidMount() {
      const data = this.props.data;
      const {startDate,endDate} = {...this.props};
      console.log(startDate.format('YYYY-MM-YY'));
      console.log(endDate);
      console.log("in componentdidmoount");
      console.log(data);
      this.setState({data});
}

  render() {
  //  const headers = this.state.headers;
    const data  = this.props.data;
    console.log(data);
    console.log("rendering " + this.state.i);

//    console.log(data);
    return (


      <div>
        <ReactTable
          data={data}
          columns={[
            {
              //Header: "Name",
              columns: [
                {
                  Header: 'Final Call Type',
                  id: "finalCallType",
                  accessor: d=>d[0]
                },
                {
                  Header: "Precint",
                  id: "precint",
                  accessor: d => d[1]
                }
              ]
            },
            {
              //Header: "Precinct",
              columns: [
                {
                  Header: "Cad Event Number",
                  id: "cadEventNumber",
                  accessor: d=>d[2]
                },
                {
                  Header: "Event Clearance Desc",
                  id: "eventClearanceDescription",
                  accessor : d=>d[3]
                }
              ]
            },
            {
              //Header: 'item4',
              columns: [
                {
                  Header: "Original Time Queued",
                  id: "original_time_queued",
                  accessor: d=>d[4]
                }
              ]
            },
            {
              //Header: 'item15',
              columns: [
                {
                  Header: "Initial Call Type",
                  id: "initialCallTime",
                  accessor: d=>d[5]
                }
              ]
            },
            {
              //Header: 'item16',
              columns: [
                {
                  Header: "Beat",
                  id: "beat",
                  accessor: d=>d[6]
                }
              ]
            },
            {
              //Header: 'item17',
              columns: [
                {
                  Header: "Priority",
                  id: "priority",
                  accessor: d=>d[7]
                }
              ]
            },
            {
              //Header: 'item18',
              columns: [
                {
                  Header: "Call Type",
                  id: "callType",
                  accessor: d=>d[8]
                }
              ]
            },
            {
              //Header: 'item18',
              columns: [
                {
                  Header: "Arrived Time",
                  id: "arrivedTime",
                  accessor: d=>d[9]
                }
              ]
            },
            {
              //Header: 'item18',
              columns: [
                {
                  Header: "Sector",
                  id: "sector",
                  accessor: d=>d[10]
                }
              ]
            }

          ]}
          filterable
          defaultPageSize={25}
          className="-striped -highlight"
        />
        <br />

      </div>
    )
  }
  }


export default Rtable;
