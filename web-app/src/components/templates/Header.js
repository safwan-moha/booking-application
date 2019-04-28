import React from 'react';

function Header(props) {
    const { name } = props;
    return (<header class="main-header" style={{backgroundColor: '#3c8dbc'}}>
        <a class="logo">
            <span class="logo-mini"><b>A</b>PP</span>
            <span class="logo-lg"><b>Tazweed</b>APP</span>
        </a>
        <nav class="navbar navbar-static-top">
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <span class="hidden-xs" style={{color: 'white'}}>Welcome, {name}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>);
}

export default Header;
