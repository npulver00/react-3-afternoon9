import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super();
    this.state={
      input: ""
    }
    
  }

  searchComments=(value)=>{
    let prevval;
    this.setState((prevState) => {
      prevval = prevState.input
      return {
        input: value
      }
    }, this.natalie(prevval))
  }

  natalie = (value) => {
    if(value){
      this.props.search(value)
    }else {
      this.props.getPosts()
    }
  }

  searchPost=(value)=>{
  }
  render() {
       
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={(e)=> this.searchComments(e.target.value)} />

          <SearchIcon id="Search__icon" onClick={()=>this.searchPost(this.state.input)}/>
        </div>
        
      </section>
    )
  }
}