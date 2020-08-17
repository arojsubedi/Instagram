import React,{useState,useEffect} from 'react';
import './Posts.css';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faFlag } from '@fortawesome/free-solid-svg-icons';
import {FormControl} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { db } from './Firebase';
import firebase from 'firebase';
function Posts(props){
        const [comments,setComments] =useState('')
        const [pcomments,setPComments]=useState('')

        useEffect(()=>{
            let unsubscribe=function(){};
            if(props.postId){
                unsubscribe = db
                    .collection("posts")
                    .doc(props.postId)
                    .collection("comments")
                    .orderBy("timestamp","desc")
                    .onSnapshot((snapshot)=>{
                        setPComments(snapshot.docs.map((doc)=>doc.data()));
                    });
            }
            return()=>{
                unsubscribe();
            };
        },[props.postId]);

        const postComments = (e) =>{
            e.preventDefault();
            db.collection("posts").doc(props.postId).collection("comments").add({
                text:comments,
                username:props.userName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            });
            setComments("");
        }
        return(
                <div className="posts__body">
                    <div className="posts__section">
                        <div className="section__avatar">
                            <Avatar alt={props.userName} src="/static/images/avatar/1.jpg" />
                            <div className="avatar__text">{props.userName}</div>
                        </div>
                        <div className="section__image">
                            <img 
                                src={props.imageUrl}
                                className="image__style"
                                alt={props.userName}
                            />
                        </div>
                        <div className="section_likeComment">
                            <span className="like_comment_save"><FontAwesomeIcon icon={faHeart} swapOpacity/></span>
                            <span className="like_comment_save"><FontAwesomeIcon icon={faComment} /></span>  
                            <span className="like_comment_save"><FontAwesomeIcon icon={faFlag} /></span>    
                        </div>
                        <div className="section__captions">
                            <span className="col-md-2 comment__text">{props.userName}</span>{props.imageCaption}
                            
                            <div className="post__comments">     
                            {
                                (pcomments.length !== 0)?
                                    pcomments.map((comment)=>{
                                        return(
                                        <React.Fragment>
                                            <span className="col-md-2 comment__text posted__comments">{comment.username}</span><span className="posted__comments">{comment.text}</span><br/>
                                        </React.Fragment>)
                                    })
                                    :<div></div>
                            }
                        </div>
                        </div>
                        
                        <div className="section__Comments">
                            <FormControl
                                placeholder="Add a comment...."
                                name="comments"
                                value={comments}
                                className="add__acomment"
                                onChange={(e)=>setComments(e.target.value)}
                            />
                            
                            <Button className={(comments==='')?"post__buttonEnabled":"post__buttonDisabled"} disabled={comments===''} type="submit" onClick={(e)=>{postComments(e)}}>Post</Button>
                        </div>
                    </div>
                </div>
        )
}

export default Posts;