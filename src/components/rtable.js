import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Rtable extends Component {

  state = {
      data:[],
      headers:[],
      i:0,
      filtered:[] //[{'id':'initialCallTime','value':'SHOTS'}]
    }



    componentDidMount() {
      const data = this.props.data;
//      const {startDate,endDate} = {...this.props};
//      console.log(startDate.format('YYYY-MM-YY'));
//      console.log(endDate);
//      console.log("in componentdidmoount");
//      console.log(data);
      this.setState({data});
}


getColumns() {
  const headers = this.props.headers;
  console.log("data from get columns is")
console.log(headers);
  if ((headers.length > 0) && (this.props.loading === false)) {
  return headers.map((key,i) => {
    console.log(key + ' ' + i);
    return {
      Header: key,
      accessor: key
    };
  })
}
return  []
}

  render() {


let filters = this.state.filtered;
const filteredOn = filters.map((val,index) => {
    return val.value
})

let data = [];
let columns = [{Header:null,accessor:null}];
    if (this.props.loading === false) {
      data  = this.props.data;
//      console.log("rendering " + this.state.i);
//      console.log("loading");
      columns = this.getColumns();
console.log("columns next")
      console.log(columns);
}

//    console.log(data);
    return (
      <div>
      {/*Display the current filters in one line*/}

      {(filteredOn.length > 0) ? `Filters: ` : ''}
      {filteredOn.map((val) => val + ' ')}

      {/*Show loading until data is fully downloaded*/}
      {(this.props.loading === true) && ( <div> loading </div> )}
      {console.log("should render reactable here " + columns[0].length)}

{
  (columns.length > 0) && (
        <ReactTable
          data={data}
          filtered={this.state.filtered}
          onFilteredChange={filtered=>this.setState({filtered})}
          columns={columns}
          filterable
          defaultPageSize={25}
          style={{
            height: "500px" // This will force the table body to overflow and scroll, since there is not enough room
          }}
          className="-striped -highlight"
        />
      )}
        <br />

      </div>
)
  }
}


export default Rtable;
