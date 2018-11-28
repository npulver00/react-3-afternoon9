import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import Post from "./Post/Post";
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    this.getPosts()
  }

  getPosts = () => {
    axios.get("https://practiceapi.devmountain.com/api/posts").then(response=>{
     this.setState({ posts:response.data});
    });
  }

  updatePost(id, text) {
   axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text}).then(response=>{
     this.setState({posts:response.data})
   })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(response=>{
      this.setState({posts:response.data})
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`,{text}).then(response=>{
     this.setState({posts:response.data})
   })
  }

  searchPost=(input)=>{
    const{posts}= this.state
    console.log("input", input)
    const searchInput = posts.filter(e=>e.text.includes(input))
    console.log("searchInput", searchInput)
      this.setState({
         posts: searchInput,
        
      })
    console.log("State",this.state)
  }

  render() {
    const { posts } = this.state;
     const renderPost = posts.map(e=>{
      return <Post update={this.updatePost} delete={this.deletePost} id={e.id} key={e.id} text={e.text} date={e.date}/>
     })

    return (
      <div className="App__parent">
        <Header getPosts={this.getPosts} search={this.searchPost} />

        <section className="App__content">

          <Compose create={this.createPost} />
          {renderPost}
          
        </section>
      </div>
    );
  }
}

export default App;
