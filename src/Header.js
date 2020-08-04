import React from 'react';
import './Header.css';

class Header extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="app_header">
                    <img src={'https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'} />
                </div>
 
            </React.Fragment>
        )
    }
}

export default Header;