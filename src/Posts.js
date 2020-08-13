import React from 'react';
import './Posts.css';
import Avatar from '@material-ui/core/Avatar';

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
                        <div className="section__captions">
                            <div className="row">
                                <div className="col-md-3 avatar__text">
                                    {props.userName}
                                </div>
                                <div className="col-md-9">
                                    {props.imageCaption}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
}

export default Posts;