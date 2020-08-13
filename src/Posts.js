import React from 'react';
import './Posts.css';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faFlag } from '@fortawesome/free-solid-svg-icons'

function Posts(props){
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
                            <span className="like_comment_save"><FontAwesomeIcon icon={faHeart} /></span>
                            <span className="like_comment_save"><FontAwesomeIcon icon={faComment} /></span>  
                            <span className="like_comment_save"><FontAwesomeIcon icon={faFlag} /></span>    
                        </div>
                        <div className="section__captions">
                            <span className="col-md-2 comment__text">{props.userName}</span>{props.imageCaption}
                        </div>
                    </div>
                </div>
        )
}

export default Posts;