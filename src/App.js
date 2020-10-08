import React, { Component } from 'react';
import './App.css';

const URL ='http://ctp-zip-api.herokuapp.com/zip/';


function City(props) {
 // const {city, usstate,population,location} = this.props;
 const{namecity,statename,locationlong,locationlat,population,totalwage} = props;
  return(
    <div className="align-content-center">
      <div className="card-deck">
         <div className="card text-white bg-info mb-3">

            
              <div className="card-header text-center ">
                {namecity}
              </div>
              <ul>
              <div className="card-body">
                      <li>State:{statename}</li>
                      <li>Location: ({locationlat}, {locationlong})</li>
                      <li>Population (estimated):{population}</li>
                      <li>Total Wages: {totalwage}</li>
               </div>
               </ul>
         
        </div>  
</div>
</div>);

}


function ZipCode(props) {
  return (<div>
    <p>{props.zipCode}</p>
  </div>);
}
function Searching(props) {
  return (<div>
    City Search:
    <input type="text" onChange = {props.handlEvent} value = {props.city} />
  </div>);
}

class CitySearch extends Component{
  state = {
    items: [],
    city: '',
    zipCode: [],
  }

  onChangeHandle(event) {
    const query = (event.target.value).toUpperCase();
    const url = `http://ctp-zip-api.herokuapp.com/city/${query}`;
    fetch(url)
    .then(res => res.json() )
    .then(data => {
      this.setState({
        items: data,
      })
     
    })
    .catch(err => {
      this.setState({
        items: [],
      })
      console.log();
    })
  }

  
  render() {
    return (
      <div>
      <Searching handlEvent = {(e) => this.onChangeHandle(e)} dataArray = {this.items}/>
      
      <div>
        {
          this.state.items.map((item, index) =>{
               return <ZipCode zipCode = {item} key = {index} />
             }
          )
        }
      </div>
      </div>
    )
  }

}
class App extends Component {
 
 
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Zip Code Search</h2>
        </div>
        <div >
        <CitySearch />
        </div>
      
      </div>
    );
  }
}
export default App;