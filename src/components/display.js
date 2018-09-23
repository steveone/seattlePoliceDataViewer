import React, { Component } from 'react';
import axios from 'axios';
//import Item from './item';
import Rtable from './rtable';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
class Display extends Component {


  state = {
      posts: [],
      columns: [],
      results: [],
      headers: [],
      startDate: moment(),
      endDate: moment(),
      loading:true
    }



    getData(startDate,endDate) {

      let key = 'NGieDco5mJeD6gAXfLkS5TfXQ';
      console.log(key);

      let url = `https://data.seattle.gov/resource/pdem-r2ku.json`;
      let query = `?$where=original_time_queued > '${startDate}' and original_time_queued < '${endDate}'`;
      let newurl = url + query;
      axios.get(newurl)

        .then(res => {
          const posts = res.data;
          //posts = Object.keys(posts);
          this.setState({ posts });
          const post = posts[0];

          let columns = [];
          for (let key in post) {
            columns.push(key);}
          this.setState({columns});

          let storage = []

          const headers = Object.keys(posts[0]).filter(key => !['raw', 'updated_at'].includes(key));
          this.setState({headers});
          console.log(headers);
          let d = Object.values(posts)

          d = d.map((arr) => Object.values(arr))
          d= d.map((arr) =>
          arr.map((inner,key) => {
            //console.log(typeof inner);
            if (typeof inner !== 'object') {return inner}
            else {
              //console.log('we got a object');
              console.log(arr[key])
              storage[arr[key]] = Object.values(arr[key])
              return '';
            }
          })
        )

          const results = d;
          this.setState({results});
          this.setState({loading:false});
        });
    }

    componentDidUpdate(prevProps,prevState){
      if (this.state.loading === false){
        console.log('state changed after load')
        const oldEndDate = prevState.endDate.format('YYYY-MM-DD')
        const oldStartDate = prevState.startDate.format('YYYY-MM-DD')
        const newEndDate = this.state.endDate.format('YYYY-MM-DD')
        const newStartDate = this.state.startDate.format('YYYY-MM-DD')
        if ((oldEndDate !== newEndDate) && (oldStartDate !== newStartDate)){
          this.getData(newStartDate,newEndDate)
              }
      }

    }

    componentDidMount() {
     const startDate = moment().subtract(7,'d')
     const endDate = moment()


     this.setState({startDate,endDate})
     this.getData(startDate.format('YYYY-MM-DD'),endDate.format('YYYY-MM-DD'));
    }


  render() {

//    const posts = this.state.posts;
//    const columns = this.state.columns;
    const results = this.state.results;
    const headers = this.state.headers;
//    const columns = this.state.columns;

    return (

<div className="Display">
Start Date:<DatePicker
key='start'
selected={this.state.startDate}
onChange={(date) => this.setState({startDate:date})}

/>
End Date: <DatePicker
key='end'
selected={this.state.endDate}
onChange={(date) => this.setState({endDate:date})}

/>
<Rtable data={results} headers={headers} startDate={this.state.startDate} endDate={this.state.endDate}/>
      </div>
    );
  }




}

export default Display;
