import './StatusBadge.css'
import type { MatchStatus } from '../types/match.ts';


const config: Record<MatchStatus, {label: string, className: string}> = {
    "upcoming": {label: "Upcoming", className: "status-upcoming"},
    "live": {label: "Live", className: "status-live"},
    "finished": {label: "Finished", className: "status-finished"},
    "cancelled": {label: "Cancelled", className: "status-cancelled"}
}


interface StatusBadgeProps {
    status: MatchStatus;

}

const StatusBadge = ({status}: StatusBadgeProps) => {
    const {label, className} = config[status];
    return(
        <span className = {`status-pill ${className}`}>{label}</span>
    );
}


export default StatusBadge;