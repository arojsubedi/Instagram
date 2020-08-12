import React from 'react';
import './NavBar.css';
import { auth } from './Firebase';

export default function NavBar({userName,settingUserName}){
    const logOutUser = ()=>{
        auth.signOut();
        settingUserName(null);
    }
    return(
        <React.Fragment>
            <div className="navbar__header">
                <img 
                    src={'https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'} 
                    alt='description'
                />
                <div>
                    Logged in as <span id="user__name"> {userName}</span>
                    <a onClick={(e)=>{logOutUser()}} className="logOut">Log Out</a>
                </div>
                
            </div>
        </React.Fragment>
    )
}

// export default NavBar;