import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    message: ''
  };

  change = (e) => {
    this.setState({message: e.target.value});
  };

  makeRequest = async (e) => {
    e.preventDefault();

    const data = {
      message: this.state.message
    };

    const response = await axios.post('http://localhost:8000/messages', data);
    await axios.get('http://localhost:8000/messages');
    this.setState({message: ''});
    console.log(response.data);
  };

  getRequest = async (e) => {
    e.preventDefault();
    const response = await axios.get('http://localhost:8000/messages');
    console.log(response.data);
  };

  render() {
    return (
      <div className='App_block'>
        <form onSubmit={this.makeRequest} className='App_form'>
          <label>Enter your message</label>
          <input type='text' id='massage' onChange={this.change} value={this.state.message} className='App_input'></input>
          <button onClick={this.makeRequest} className='App_btn_post'>Make post request</button>
        </form>
        <button onClick={this.getRequest} className='App_btn_get'>Make get request</button>
      </div>
    )
  }
}

export default App;
