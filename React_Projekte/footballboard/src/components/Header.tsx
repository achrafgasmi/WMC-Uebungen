import './Header.css'

interface HeaderProps {
    title: string;
    subtitle: string;
}

function Header(props: HeaderProps) {
    return(
        <header className="header">
            <h1 className="header-title"> {props.title}</h1>
            <p className="header-subtitle">{props.subtitle}</p>
        </header>
    )
}

export default Header;