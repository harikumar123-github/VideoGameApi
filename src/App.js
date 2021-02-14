import { useState } from 'react';
import useSWR from 'swr';
import './App.css';


const fetcher = (...args) => fetch(...args).then( res => (res.json()) );

function App() {

  const [gameTitle, setGameTitle] = useState('');
  const [searchedGames,setSearchedGames] = useState([])


  const {data} = useSWR( 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3' , fetcher );


  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`).then( res => (res.json())).then( data => {
      setSearchedGames(data)
    } );
  }

  return (
    <div className="App">

      <div className="searchSection">

          <h1>Search for a game</h1>

          <input type="text" placeholder="Game" onChange={ e => { setGameTitle(e.target.value) } } />

          <button onClick={searchGame} >Search</button>

          <div className="games">

            {searchedGames.map( (v,k) => {
              return <div key={k} className="game">
                {v.external}
                <img src={v.thumb} alt="img"/>
                ${v.cheapest}
              </div>
            } )}

          </div>

      </div>

      <div className="dealsSection">
          <h1>Latest deals</h1>

          <div className="games">

            {data && data.map( (v,k) => {
              return <div key={k} className="deals">
                 <h3>{v.title}</h3>
                 <p> Normal price: {v.normalPrice} </p>
                 <p> Deal price: {v.salePrice} </p>
                 <h3> YOU SAVE: {v.savings.substr(0,2)}% </h3>
              </div>
            } )}

          </div>

      </div>

    </div>
  );
}

export default App;
