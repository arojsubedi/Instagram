import React,{useState} from 'react';
import NavBar from './NavBar.js';
import Posts from './Posts.js';

function App() {
  const [posts, setPosts] = useState([
    {
      userName:'Aroj Subedi',
      imageCaption : 'Such a beautiful picture. Speaks volume. #wonderful',
      imageUrl:'https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    },
    {
      userName:'Steven Gerrard',
      imageCaption:'Thats dope mate',
      imageUrl:'https://images.unsplash.com/photo-1594433743374-1b4b98798c0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      userName:'Roberto Firmino',
      imageCaption :'No words to describe',
      imageUrl:'https://images.unsplash.com/photo-1593088177922-aa1c5055c7b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      userName:'Sadio Mane',
      imageCaption :'Creative shot',
      imageUrl:'https://images.unsplash.com/photo-1593983649075-9fd447bb280a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ]);
  return (
    <React.Fragment>
        <NavBar />
        <Posts  userName='Aroj' imageCaption='Hi there' imageUrl='https://images.unsplash.com/photo-1542044896530-05d85be9b11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' />
        {
          posts.map((nPosts)=>{
            // <Posts />
            <Posts  userName={nPosts.userName} imageCaption={nPosts.imageCaption} imageUrl={nPosts.imageUrl} />
          })
        }
       
        {/* <Posts />
        <Posts />
        <Posts /> */}
    </React.Fragment>
  );
}

export default App;
