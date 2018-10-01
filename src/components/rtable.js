import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Rtable extends Component {

  state = {
      data:[],
      headers:[],
      i:0,
      filtered:[{'id':'initialCallTime','value':'SHOTS'}]
    }



    componentDidMount() {
      const data = this.props.data;
      const {startDate,endDate} = {...this.props};
//      console.log(startDate.format('YYYY-MM-YY'));
//      console.log(endDate);
//      console.log("in componentdidmoount");
//      console.log(data);
      this.setState({data});
}

  render() {


let filters = this.state.filtered;
const filteredOn = filters.map((val,index) => {
    return val.value
})

let data = [];
    if (this.props.loading === false) {
      data  = this.props.data;
//      console.log("rendering " + this.state.i);
//      console.log("loading");
}
//    console.log(data);
    return (
      <div>
      {/*Display the current filters in one line*/}

      {(filteredOn.length > 0) ? `Filters: ` : ''}
      {filteredOn.map((val) => val + ' ')}

      {/*Show loading until data is fully downloaded*/}
      {(this.props.loading === true) && ( <div> loading </div> )}

        <ReactTable
          data={data}
          filtered={this.state.filtered}
          onFilteredChange={filtered=>this.setState({filtered})}
          columns={[
            {
              //Header: "Name",
              columns: [
                {
                  Header: 'Final Call Type',
                  id: "finalCallType",
                  accessor: d=>d['final_call_type']
                },
                {
                  Header: "Precint",
                  id: "precint",
                  accessor: d => d['precinct']
                }
              ]
            },
            {
              //Header: "Precinct",
              columns: [
                {
                  Header: "Cad Event Number",
                  id: "cadEventNumber",
                  accessor: d=>d['cad_event_number']
                },
                {
                  Header: "Event Clearance Desc",
                  id: "eventClearanceDescription",
                  accessor : d=>d['event_clearance_description']
                }
              ]
            },
            {
              //Header: 'item4',
              columns: [
                {
                  Header: "Original Time Queued",
                  id: "original_time_queued",
                  accessor: d=>d['original_time_queued']
                }
              ]
            },
            {
              //Header: 'item15',
              columns: [
                {
                  Header: "Initial Call Type",
                  id: "initialCallTime",
                  accessor: d=>d['initial_call_type']
                }
              ]
            },
            {
              //Header: 'item16',
              columns: [
                {
                  Header: "Beat",
                  id: "beat",
                  accessor: d=>d['beat']
                }
              ]
            },
            {
              //Header: 'item17',
              columns: [
                {
                  Header: "Priority",
                  id: "priority",
                  accessor: d=>d['priority']
                }
              ]
            },
            {
              //Header: 'item18',
              columns: [
                {
                  Header: "Call Type",
                  id: "callType",
                  accessor: d=>d['call_type']
                }
              ]
            },
            {
              //Header: 'item18',
              columns: [
                {
                  Header: "Arrived Time",
                  id: "arrivedTime",
                  accessor: d=>d['arrived_time']
                }
              ]
            },
            {
              //Header: 'item18',
              columns: [
                {
                  Header: "Sector",
                  id: "sector",
                  accessor: d=>d['sector']
                }
              ]
            }

          ]}
          filterable
          defaultPageSize={25}
          style={{
            height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight"
        />

        <br />

      </div>
)
  }
}


export default Rtable;
