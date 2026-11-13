import './MatchRow.css'

interface MatchRowProps{
    homeTeam: string;
    awayTeam: string;
    league: string;
    time: string;
    status: string;
}

function MatchRow(props: MatchRowProps){
    const rowClick= () =>{
        console.log(props.homeTeam + " vs " + props.awayTeam );
    }
    return(
        <tr className="MatchRow" onClick={rowClick}>
            <td>{props.homeTeam}</td>
            <td>{props.awayTeam}</td>
            <td>{props.league}</td>
            <td>{props.time}</td>
            <td><span className="status">{props.status}</span></td>
        </tr>
    );
};

export default MatchRow

