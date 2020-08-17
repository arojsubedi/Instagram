import React,{useState,useEffect} from 'react';
import NavBar from './NavBar.js';
import Posts from './Posts.js';
import LoginForm from './Login.js';
import './App.css'
import Footer from './Footer';
import {db} from './Firebase.js';
import InstagramEmbed from 'react-instagram-embed';


function App() {
  const [posts, setPosts] = useState([
    // {
    //   userName:'Aroj Subedi',
    //   imageCaption : 'Such a beautiful picture. Speaks volume. #wonderful',
    //   imageUrl:'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    // },
    // {
    //   userName:'Steven Gerrard',
    //   imageCaption:'Thats dope mate',
    //   imageUrl:'https://images.unsplash.com/photo-1594433743374-1b4b98798c0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    // },
    // {
    //   userName:'Roberto Firmino',
    //   imageCaption :'No words to describe',
    //   imageUrl:'https://images.unsplash.com/photo-1593088177922-aa1c5055c7b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    // },
    // {
    //   userName:'Sadio Mane',
    //   imageCaption :'Creative shot',
    //   imageUrl:'https://images.unsplash.com/photo-1593983649075-9fd447bb280a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    // }
  ]);
  const [userName,setUserName]=useState("")
  // const [authSuccessfull,setAuthSuccessfull]=useState(false)

  useEffect(()=>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>
        ({id:doc.id,post:doc.data()})
      ));
    })
  },[]);

  return (
    <div>
        {userName?
          <React.Fragment>
            {/* <ImageUpload userName={userName} /> */}
            <NavBar userName={userName} settingUserName={setUserName}/>
          </React.Fragment>
          :
          <LoginForm settingUserName={setUserName}/>
        
        }
        <div className="section_leftRight">
          <div className="posts__sectionLeft">
            {
              userName?
              (  posts.map(({id,post})=>{
                    return(<Posts  key={id} postId={id} userName={post.userName} imageCaption={post.imageCaption} imageUrl={post.imageUrl} />)
                  })
              ):<Posts  key={'a'} userName={'arojsubedi'} imageCaption={'what a wonderful world'} imageUrl={'https://images.unsplash.com/photo-1597582063548-572c669c186b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'} />
              
            }
          </div>
          
          <div className="embed__SectionRight">
            <InstagramEmbed
              url='https://www.instagram.com/p/CA4WJuyMwY_/'
              maxWidth={320}  
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
          </div>
        </div>
        
      <div className="optional__section"></div>
          {/* {(posts.length !==0)?<div className="optional__section"></div>:''} */}
          <Footer />
    </div>
  );
}

export default App;
