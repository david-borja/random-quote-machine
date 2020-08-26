//Tutorial followed -> https://www.youtube.com/watch?v=iGWei_0EJIc

// 1. import React ReactDOM
// 2. get the API url
// 3. create the layout (box + inner content)
// 4. add event listeners
// 5. style
// 6. complete user stories

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

/* I had to remove colors from here since it couldn't be accessed from inside the React Component*/

//const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

class App extends React.Component {
  constructor(props){
    super(props);
    // We are giving a state here so when the Get Button first loads doesn't throw an error. But this is not a good practice!!
    this.state = {
      quotes: undefined,
      quote: 'testquote',
      author: 'testauthor',
      colors: ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"],
      color: 'grey'
    }
  }
  
  componentDidMount() {
    //call the API and update state
    fetch(API).then(response => response.json())
      .then(response => {
        this.setState({
          quotes: response.quotes
        }, this.updatePage) //Here I don't understand why it doesn't work when we try to declare this function afterwards with the word 'const'
    });  
  }
  
  updatePage = () => { //to target the 'this' element, it needs to be an arrow function
    const quotes = this.state.quotes;
    const colors = this.state.colors;
    const randomIndex = (array) => Math.floor(Math.random() * array.length);
    const randomQuoteIndex = randomIndex(quotes);
    const randomColorIndex = randomIndex(colors);
    this.setState({
      quote: quotes[randomQuoteIndex].quote,
      author: quotes[randomQuoteIndex].author,
      color: colors[randomColorIndex]
    })
  }
  
  render(){
    
    const tweetURL = `https://twitter.com/intent/tweet?text=${this.state.quote} - ${this.state.author}`;
       
    return (
      
      <div className="wrapper d-flex align-items-center justify-content-center" style={{backgroundColor: this.state.color}}>
        <div className="col-6 box p-4 rounded" id="quote-box">
          {
            this.state.quotes && (
              <div className="mb-4">
                <h5 id="text" style={{color: this.state.color}}>
                  <i className="fas fa-2x fa-quote-left" style={{color: this.state.color}}></i>
                  {this.state.quote}
                </h5> 
                <cite className="d-block text-right" id="author" style={{color: this.state.color}}>- {this.state.author}</cite>
              </div>
            )
          }
          <div className="d-flex justify-content-between">
            <a className="btn btn-sm btn-primary border-0" id="tweet-quote" target="_blank" href = {tweetURL} style={{backgroundColor: this.state.color}}>
              <i className="fab fa-twitter"></i> Tweet
            </a>
            <button className="btn btn-sm btn-primary border-0" id="new-quote" onClick={this.updatePage} style={{backgroundColor: this.state.color}}>
              <i className="fas fa-random"></i> Get Quote
            </button>
          </div>
        </div>
      </div> 
       
    ) 
  } 
} 
  
ReactDOM.render(<App />, document.getElementById("app")); 
