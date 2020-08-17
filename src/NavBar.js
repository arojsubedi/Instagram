import React,{useState} from 'react';
import './NavBar.css';
import { auth } from './Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faUser, faSignOutAlt,faBookmark,faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import {Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUpload from './ImageUpload.js';

export default function NavBar({userName,settingUserName}){
  
    const [open, setOpen] = React.useState(false);
    const [showModal, setShowModal] = useState(false);

  
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    // start Handling profile  dropdown part
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
    //end handling profile dropdown part

    //start handling image upload part
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    //close handling image upload part

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
                {/* <div>
                    <span className="upload__icon"><FontAwesomeIcon icon={faUpload} /></span>
                    <span><FontAwesomeIcon icon={faUserCircle} /></span> <span className="user__name"> {userName}</span>
                    <a onClick={(e)=>{logOutUser()}} className="logOut">Log Out</a>
                </div> */}
                <div>
                  <Button
                    onClick={handleShowModal}
                  >
                    <span className="upload__icon"><FontAwesomeIcon icon={faUpload} /><span className="img__upload">Image Upload</span></span>    
                  </Button>
                
                  <Button
                      ref={anchorRef}
                      aria-controls={open ? 'menu-list-grow' : undefined}
                      // aria-haspopup="true"
                      onClick={handleToggle}
                      >
                      <span><FontAwesomeIcon icon={faUser} /></span> <span className="user__name"> {userName}</span>
                  </Button>
                  <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                      <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                      <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                              <MenuItem className="menu__options" onClick={handleClose}><span className="menu__favoption"><FontAwesomeIcon icon={faUserCircle} /></span>Profile</MenuItem>
                              <MenuItem className="menu__options" onClick={handleClose}><span className="menu__favoption"><FontAwesomeIcon icon={faBookmark} /></span>Saved</MenuItem>
                              <MenuItem className="menu__options" onClick={(e)=>{logOutUser()}}><span className="menu__favoption"><FontAwesomeIcon icon={faSignOutAlt} /></span>Logout</MenuItem>
                          </MenuList>
                          </ClickAwayListener>
                      </Paper>
                      </Grow>
                  )}
                  </Popper>
                </div>
                <Modal show={showModal} onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Upload a image</Modal.Title>
                  </Modal.Header>
                  <Modal.Body><ImageUpload userName={userName} handleCloseModal={handleCloseModal}/></Modal.Body>
                  {/* <Modal.Footer>
                    <Button  onClick={handleCloseModal}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleCloseModal}>
                      Upload
                    </Button>
                  </Modal.Footer> */}
                </Modal>
            </div>
        </React.Fragment>
    )
}

// export default NavBar;