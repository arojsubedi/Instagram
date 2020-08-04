import React from 'react';
import './Posts.css';
import Avatar from '@material-ui/core/Avatar';

class Posts extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="posts__body">
                    <div className="posts__section">
                        <div className="section__avatar">
                            <Avatar alt="Aroj Subedi" src="/static/images/avatar/1.jpg" />
                            <div className="avatar__text"><h4>Aroj Subedi</h4></div>
                        </div>
                        <div className="section__image">
                            <img 
                                src='https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                                className="image__style"
                            />
                        </div>
                        <div className="section__captions">
                            <h5><strong>arojsubedi</strong> Such a beautiful picture. Speaks volume. #wonderful</h5>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Posts;