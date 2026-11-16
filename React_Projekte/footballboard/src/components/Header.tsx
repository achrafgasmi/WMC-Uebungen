import type { ReactNode } from 'react';
import './Header.css'

interface HeaderProps {
    title: string;
    children?: ReactNode;
    showSubtitle?: boolean;
}

function Header({title, children, showSubtitle = true}: HeaderProps) {
    return(
        <header className="header">
            <h1 className="header-title"> {title}</h1>
            {showSubtitle && <p className="header-subtitle">{children}</p>}
        </header>
    )
}

export default Header;