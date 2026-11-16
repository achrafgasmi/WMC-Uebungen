import Header from './components/Header'
import './App.css'
import MatchRow from './components/MatchRow.tsx';
import { matches } from './data/matches.ts';
import { useState } from 'react';
import type { MatchStatus } from './types/match.ts';

function App() {
  const[filter, setFilter] = useState<MatchStatus | "all">("all");

  const filteredMatches = filter === "all"? matches : matches.filter(match => match.status === filter);

  return (
    <div className="app-page">
      <Header title='Football Board'>
              All matches. All scores. One place
      </Header>

      <div className='filter-buttons'>
        <button className= {filter === "all"? "active" : ""}
                onClick={()=>setFilter("all")}>All Matches</button>

        <button className= {filter === "upcoming"? "active" : ""}
                onClick={()=>setFilter("upcoming")}>Upcoming</button>

        <button className= {filter === "live"? "active" : ""}
                onClick={()=>setFilter("live")}>Live</button>

        <button className= {filter === "cancelled"? "active" : ""}
                onClick={()=>setFilter("cancelled")}>Cancelled</button>

        <button className= {filter === "finished"? "active" : ""}
                onClick={()=>setFilter("finished")}>Finished</button>
      </div>
      <table className="match-table">
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>League</th>
            <th>Time</th>
            <th>Status</th>
          </tr>

        </thead>
        <tbody>
          {filteredMatches.map((match) =>(
            <MatchRow key= {match.id} match = {match}/>
          ))}

          
        </tbody>
      </table>

    </div>
  )
}

export default App
