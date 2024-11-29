import './vacancy-status.style.css'

type VacancyStatusProps = {
    status: boolean;
}

function VacancyStatus({status}: VacancyStatusProps ) {
    if(status) return <p className="accepted-vacancy-status">Accepted</p>
    return <p className="rejected-vacancy-status">Rejected</p>
}

export default VacancyStatus;