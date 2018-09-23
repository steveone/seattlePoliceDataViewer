import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Rtable extends Component {

  state = {
      data:[]
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
    const { data } = this.props
    console.log("rendering");
    console.log(data);

    return (


      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: ":@computed_region_kuhn_3gp2",
                  id: "computed region",
                  accessor: d=>d[0]
                },
                {
                  Header: "Last Name",
                  id: "lastName",
                  accessor: d => d[1]
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  id: "age",
                  accessor: d=>d[2]
                },
                {
                  Header: "Status",
                  id: "status",
                  accessor : d=>d[3]
                }
              ]
            },
            {
              Header: 'item4',
              columns: [
                {
                  Header: "Visits1",
                  id: "visits1",
                  accessor: d=>d[4]
                }
              ]
            },
            {
              Header: 'item15',
              columns: [
                {
                  Header: "Visits2",
                  id: "visits2",
                  accessor: d=>d[5]
                }
              ]
            },
            {
              Header: 'item16',
              columns: [
                {
                  Header: "Visits3",
                  id: "item16",
                  accessor: d=>d[6]
                }
              ]
            },
            {
              Header: 'item17',
              columns: [
                {
                  Header: "Visits7",
                  id: "item17",
                  accessor: d=>d[7]
                }
              ]
            },
            {
              Header: 'item18',
              columns: [
                {
                  Header: "Visits18",
                  id: "item18",
                  accessor: d=>d[8]
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
