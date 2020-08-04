import React from 'react';
import './NavBar.css';

class NavBar extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="navbar__header">
                    <img src={'https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'} />
                </div>
 
            </React.Fragment>
        )
    }
}

export default NavBar;