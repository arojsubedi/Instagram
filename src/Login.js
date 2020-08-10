import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import './Login.css';
import { auth } from './Firebase';


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

export default function LoginForm() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [isModalOpen, checkModalOpen] = useState(false);
    const[userName,setUserName]=useState("");
    const[emailID,setEmailID]=useState("");
    const[userPassword,setUserPassword]=useState("");
    const[user,setUser]=useState(null)

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                //user has logged in
                setUser(authUser);
            }
            else{
                //user has logged out
                setUser(null);
            }
        })
        return ()=>{
            unsubscribe()
        }
    },[user,userName])

    const body = (
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
                            <Button variant="contained" type="submit" onClick={(e)=>{onUserSignup(e)}}>Sign Up</Button>
                    
            </form>
            
        </div>
    );

    const onUserSignup=(e)=>{
        e.preventDefault();
        console.log('emailid',emailID)
        auth.createUserWithEmailAndPassword(emailID,userPassword)
        .then((authUser)=>{
            return authUser.user.updateProfile({
                displayName:userName
            })
        })
        .catch((error)=>alert(error))
    }

    

    return (
        <div>
            {
                (user)?<Button variant="contained" onClick={(e)=>{auth.signOut()}}>Log Out</Button>:
                <Button type="button" onClick={()=>{checkModalOpen(true)}}>
                    Sign Up
                </Button>
            }
            <Modal
                open={isModalOpen}
                onClose={()=>{checkModalOpen(false)}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
