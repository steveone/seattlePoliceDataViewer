import React, { Component } from 'react';
import axios from 'axios';
//import Item from './item';
import Rtable from './rtable';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from 'react-loader-spinner'

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



    getData(startDate,endDate,offset=0) {
      let loading = true;
      this.setState({loading});
      let key = 'NGieDco5mJeD6gAXfLkS5TfXQ';
      console.log(key);
      console.log("in get data");
      let url = `https://data.seattle.gov/resource/pdem-r2ku.json`;
      let query = `?$where=original_time_queued > '${startDate}' and original_time_queued < '${endDate}'`;
      //let query2 = ` and initial_call_type='SHOTS - IP/JO - INCLUDES HEARD/NO ASSAULT'`;
      let offsetQuery =`&$offset=${offset}`;
      let newurl = url + query + offsetQuery;// + query2;
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
//          console.log("these is headers display")
//          console.log(headers);
          let d = Object.values(posts)

          d = d.map((arr) => Object.values(arr))
          d= d.map((arr) =>
          arr.map((inner,key) => {
            //console.log(typeof inner);
            if (typeof inner !== 'object') {return inner}
            else {
              //console.log('we got a object');
//              console.log(arr[key])
              storage[arr[key]] = Object.values(arr[key])
              return '';
            }
          })
        )

          let results = d;
          console.log("updating state in display")
          results = results.concat(this.state.results);
          this.setState({results});
          console.log(d.length + "size of returned data");
          if (d.length === 1000) {
            console.log("getting more data");
            this.getData(startDate,endDate,offset+1000);
            this.setState({loading:true});
          }
          else {
          console.log("setting loading to false");
          this.setState({loading:false});
          }
        });
    }

    componentDidUpdate(prevProps,prevState){
      console.log("got into componentdidupdate");
      if (this.state.loading === false){
        console.log('state changed after load')
        const oldEndDate = prevState.endDate.format('YYYY-MM-DD')
        const oldStartDate = prevState.startDate.format('YYYY-MM-DD')
        const newEndDate = this.state.endDate.format('YYYY-MM-DD')
        const newStartDate = this.state.startDate.format('YYYY-MM-DD')
        console.log(oldEndDate + " " + newEndDate)
        console.log(oldStartDate + " " + newStartDate)

        if ((oldEndDate !== newEndDate) || (oldStartDate !== newStartDate)){
          console.log("calling getdata from componentdidupdate");
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
//    console.log("headers in render of display" + headers);
//    const columns = this.state.columns;

    return (
<div className='Display'>
<div className='datePicker'>
<label>Start Date:</label>
<DatePicker
key='start'
selected={this.state.startDate}
onChange={(date) => {this.setState({startDate:date});console.log('updated start')}}
/>
<label>End Date:</label>
<DatePicker
key='end'
selected={this.state.endDate}
onChange={(date) => {this.setState({endDate:date});console.log('updated end')}}
/>
</div>

{(this.state.loading === true) && (<Loader type="CradleLoader" color="#somecolor" height={80} width={80} />)}
{(this.state.loading === false) && (<Rtable data={results}
                                    loading={this.state.loading}
                                    headers={headers}
                                    startDate={this.state.startDate}
                                    endDate={this.state.endDate}/>)}
</div>
    );
  }




}

export default Display;
