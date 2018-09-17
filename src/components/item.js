import React, { Component } from 'react';
import '../App.css';

class Item extends Component {

  state = {
      item: [],
      headers: []
    }

    componentDidMount() {

      const item = this.props.item;
      const headers = this.props.headers;
      this.setState({item});
      this.setState({headers})



    }

  render() {

//    const posts = this.state.posts;
//    const columns = this.state.columns;
    const item = this.state.item;
    const headers = this.state.headers;
//    const columns = this.state.columns;

    return (

      <div className="Display Wrapper">
      <h1 className="Display-title">Item</h1>

          {

          item.map((item,i,d) => {
              return(
              <div key={i}>
                <div className='Left'>{headers[i]}</div>
                <div className='Right'>{d[i]}</div>
              </div>
            )
            })


}

      </div>
    );
  }
}

export default Item;
