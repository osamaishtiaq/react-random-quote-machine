import React, { Component } from 'react';
import './App.css';
import APIEndPoint from './APILink';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text : '',
      author : ''
    }
    this.fetchData = this.fetchData.bind(this);
  }
  
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(APIEndPoint)
    .then(response => response.json())
    .then(
      (result) => {
        this.setState({
          text : result.quote,
          author : result.author
        })  
      },
      (error) => {
        this.setState({
          text : "An error occured. Enjoy this generic quote instead",
          author : "Lazy Developer"
        })
      }
    );
  }
  
  render() {
    return (
      <div id='quote-box'>
        <div className='quote-text-container'>
          <QuoteText text={this.state.text}/>
          <QuoteAuthor author={this.state.author} />        
        </div>
        <div className='quote-buttons-container'>
          <QuoteButton fetchOnClick={this.fetchData}/>
          <TweetAnchor tweet={this.state.text} />
        </div>
      </div>
    );
  }
}

const QuoteButton = (props) => {
  return <button id='new-quote' onClick={props.fetchOnClick}>New Quote</button>
}

const TweetAnchor = (props) => {
  return <a id='tweet-quote' href={`https://twitter.com/intent/tweet?text=${props.tweet}`} target='_blank'>Tweet it!</a>
}

const QuoteText = (props) => {
  return <p id='text'>{props.text}</p>
}

const QuoteAuthor = (props) => {
  return <p id='author'>{props.author}</p>
}

export default App;