import './button.style.css'

type ButtonProps = {
    title: string;
    onClick: (e: any) => void;
}

function Button({onClick, title}: ButtonProps) {
    return <button onClick={(e) => onClick(e)} className="btn">{title}</button>;
}

export default Button;