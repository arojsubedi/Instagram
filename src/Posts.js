import React from 'react';
import './Posts.css';
import Avatar from '@material-ui/core/Avatar';

function Posts(props){
        return(
                <div className="posts__body">
                    <div className="posts__section">
                        <div className="section__avatar">
                            <Avatar alt={props.userName} src="/static/images/avatar/1.jpg" />
                            <div className="avatar__text"><h4>{props.userName}</h4></div>
                        </div>
                        <div className="section__image">
                            <img 
                                src={props.imageUrl}
                                className="image__style"
                            />
                        </div>
                        <div className="section__captions">
                            <h5>{props.imageCaption}</h5>
                        </div>
                    </div>
                </div>
        )
}

export default Posts;