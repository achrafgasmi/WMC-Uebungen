import Header from './components/Header'
import './App.css'
import MatchRow from './components/MatchRow.tsx';

function App() {
  return (
    <div className="app-page">
      <Header title='Football Board' 
              subtitle='All matches. All scores. One place' 
      />

      <h2>Upcoming Matches</h2>
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
          <MatchRow
            homeTeam="FC Barcelona"
            awayTeam="Real Madrid"
            league="La Liga"
            time="20:00"
            status="Upcoming"
          />
          <MatchRow
            homeTeam="Paris Saint-Germain"
            awayTeam="AC Monaco"
            league="Ligue 1"
            time="21:00"
            status="Upcoming"
          />
          <MatchRow
            homeTeam="FC Bayern Munich"
            awayTeam="Borussia Dortmund"
            league="Bundesliga"
            time="20:00"
            status="Upcoming"
          />

          
        </tbody>
      </table>

    </div>
  )
}

export default App
