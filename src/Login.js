import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import './Login.css';
import { auth } from './Firebase';


//functions to set up Modal --> Modal used from Material-UI
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 45 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function LoginForm({settingUserName}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    
    //setting up React hooks to keep track of the React state to handle Modals, username, emailid, password and also user if logged in
    const [isSignUpOpen, checkSignUpOpen] = useState(false);
    const [isSignInOpen,checkSignInOpen]=useState(false);
    const[userName,setUserName]=useState("");
    const[emailID,setEmailID]=useState("");
    const[userPassword,setUserPassword]=useState("");
    const[user,setUser]=useState(null) //user initially set to null

    //everytime authentication is done (during login and logout), onAuthStateChanged is invoked and user is tracked and stored in user state
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                //user has logged in
                setUser(authUser);
                settingUserName(authUser.displayName)
            }
            else{
                //user has logged out
                setUser(null);
                settingUserName('')
            }
        })
        return ()=>{
            unsubscribe()
        }
    },[user,userName,settingUserName])

    //fired when a user signs up i.e creates an user name, id and password
    const onUserSignup=(e)=>{
        e.preventDefault(); //to prevent unusual behaviour and is a ust
        auth.createUserWithEmailAndPassword(emailID,userPassword) //creating a user in firebase user portfolio
        .then((authUser)=>{
            return authUser.user.updateProfile({
                displayName:userName   //updating user profile with the username
            })
        })
        .catch((error)=>alert(error))
        checkSignUpOpen(false)  //closing the signup modal
    }

    //fired when a user signs in after creating an account
    const onUserSignIn=(e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(emailID,userPassword)
        .catch((error)=>alert(error))
        checkSignInOpen(false)
    }

    return (
        <div>
            {/* logic to handle sign in, sing up and logout button */}
            {
                (user)?<Button variant="contained" onClick={(e)=>{auth.signOut()}}>Log Out</Button>:
                <div className="signInSignUp">
                    <Button type="button" onClick={()=>{checkSignInOpen(true)}}>Sign In</Button>
                    <Button type="button" onClick={()=>{checkSignUpOpen(true)}}>Sign Up</Button>
                </div>
            }
            {/* logic to handle sign in and sign up modal */}
            <Modal
                open={isSignUpOpen}
                onClose={()=>{checkSignUpOpen(false)}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="login__form">
                            <img 
                                src={'https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'} 
                                alt='description'
                            />
                            <Input
                                name="username"
                                placeholder="User Name"
                                value={userName}
                                onChange={(e)=>setUserName(e.target.value)}
                            />
                            <Input
                                name="emailID"
                                placeholder="Email ID"
                                value={emailID}
                                onChange={(e)=>setEmailID(e.target.value)}
                            />
                            <Input
                                name="userPassword"
                                placeholder="Password"
                                type="password"
                                value={userPassword}
                                onChange={(e)=>setUserPassword(e.target.value)}
                            />
                                    <Button type="submit" onClick={(e)=>{onUserSignup(e)}}>Sign Up</Button>
                            
                    </form>
                    
                </div>
            </Modal>
            
            <Modal
                open={isSignInOpen}
                onClose={()=>{checkSignInOpen(false)}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="login__form">
                            <img 
                                src={'https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'} 
                                alt='description'
                            />
                            <Input
                                name="emailID"
                                placeholder="Email ID"
                                value={emailID}
                                onChange={(e)=>setEmailID(e.target.value)}
                            />
                            <Input
                                name="userPassword"
                                placeholder="Password"
                                type="password"
                                value={userPassword}
                                onChange={(e)=>setUserPassword(e.target.value)}
                            />
                                    <Button type="submit" onClick={(e)=>{onUserSignIn(e)}}>Sign In</Button>
                            
                    </form>
                    
                </div>
            </Modal>
        </div>
    );
}
