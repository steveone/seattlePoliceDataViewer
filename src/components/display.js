import React, { Component } from 'react';
import axios from 'axios';
import Item from './item';

class Display extends Component {

  state = {
      posts: [],
      columns: [],
      results: [],
      headers: []
    }

    componentDidMount() {
//      axios.get(`https://data.seattle.gov/resource/y7pv-r3kh.json`)
 axios.get(`http://localhost:3000/data.json`)
        .then(res => {
          //console.log(res.data[0]);
          const posts = res.data;
          //posts = Object.keys(posts);
          this.setState({ posts });
          const post = posts[0];
      //    const notAllowed = ['type','coordinates'];

          let columns = [];
          for (let key in post) {
//         if( !notAllowed.includes(key)) {
            columns.push(key);}
//          }
          this.setState({columns});

          let storage = []

          const headers = Object.keys(posts[0]).filter(key => !['raw', 'updated_at'].includes(key));
          this.setState({headers});
          console.log(headers);
          let d = Object.values(posts)
          .slice(0,10)

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

/*          .filter((k,element) => {
            if (typeof element !== 'object') {console.log(k)}
            else return false}

        )*/

          const results = d;
          console.log("next up, d")
          console.log(results);
          console.log(storage);
          this.setState({results});
        });
    }

  render() {

//    const posts = this.state.posts;
//    const columns = this.state.columns;
    const results = this.state.results;
    const headers = this.state.headers;
//    const columns = this.state.columns;

    return (
      <div className="Display">
          {
            results.map((data,i,d) => {
              return <Item key={i} headers = {headers} item={d[i]}/>
            })


}

      </div>
    );
  }
}

export default Display;
