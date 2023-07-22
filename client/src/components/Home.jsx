import React from 'react'
import {Link} from 'react-router-dom';

function Home() {
  const go = ()=> {
    console.log('went');
    
  }

  // function go() {
  //   console.log('went');
  // }

  return (
    <div>
      <div className='home_bg-img'>
        <span className='overshadow'>
            <h2>You run your business. <br/> We'll help find your customers.</h2>
            <p>Nile Advertising can connect you with millions of customers not using Google.</p>
            <Link to='/our-partners'><button> Start now </button></Link> 
        </span>
      </div>


      <div className='home_wt-div'>
        <h2>This is how this works:</h2>
        <ul>
            <li>Reach customers using search and native ads without any additional effort</li>
            <li>Easy to get started - First View our partners </li>
            <li>You can then select the one you prefer to work with, then proceed</li>
            <li>Connect with people ready to engage and transact</li>
        </ul>
      </div>
    </div>
  )
}

export default Home
