import './MatchRow.css'
import StatusBadge from './StatusBadge.tsx'
import type { Match } from '../types/match.ts'


interface MatchRowProps{
    match: Match;
}

function MatchRow({match}: MatchRowProps){
    const rowClick= () =>{
        console.log(match.homeTeam + " vs " + match.awayTeam );
        console.log("Status:" + match.status);
    }
    return(
        <tr className="MatchRow" onClick={rowClick}>
            <td>{match.homeTeam}</td>
            <td>{match.awayTeam}</td>
            <td>{match.league}</td>
            <td>{(match.status==="cancelled")? "-" : (match.time ?? "TBD")}</td>
            <td><StatusBadge status={match.status} /></td>
        </tr>
    );
};

export default MatchRow;

