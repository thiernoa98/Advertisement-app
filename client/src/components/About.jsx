import React from 'react'
import { Link } from 'react-router-dom'
import growth from '../assets/img/growth.jpg';
import google from '../assets/img/google.svg.png';
import meta from '../assets/img/meta.jpg';
import microsoft from '../assets/img/microsoft.png';
import apple from '../assets/img/apple.jpg';
import searchIcon from '../assets/img/search.png';
import binocular from '../assets/img/binocular.png';
import contact from '../assets/img/contact.png';
import { CircularProgress } from '@material-ui/core';

function About() {

  return (
    <>
      <div className='about-bg_image'>
        <span className='overshadow'>
          <h2>Grow your business with Nile Add Advertising </h2>
          <p> Target relevant searchers looking for your goods & services</p>
            <Link to='/our-partners'><button> Start now </button></Link> 
        </span>
      </div>
   
      <section id='about_head' className='sec-p11'>
          <img src={growth} alt="growth" className='img'/>  
        <div>
            <h1>What to know about us</h1>
            <p>Nile Add is an American multinational technology company focusing on 
              online advertisement, we help business owner world wide grow their business. 
            </p>


          <h2>Below is our top business partners</h2>
          <section className='small_images'>  
            <div >
                <img src={google} className='small_img' alt="" />
            </div>
            <div>
                <img src={meta} alt="" className='small_img'/>
            </div>
            <div>
                <img src={microsoft}  alt="" className='small_img' />
            </div>
            <div>
                <img src={apple} alt="" className='small_img' />
            </div>
          </section>
        </div>
      </section><hr/>

      <div id='about_function' className='sec-p1'>
        <h1>See how Nile Advertising works</h1>
        <div className='divvy'>
          <div className='small_divvy'>
            <p>CUSTOMER SEARCH</p>
            <img src={searchIcon} alt="" className='small_img' />
          </div>
          <div className='small_divvy'>
            <p>CUSTOMERS SEE YOUR AD</p>
            <img src={binocular} alt="" className='small_img' />
          </div>
          <div className='small_divvy'>
            <p>CUSTOMERS CONTACT YOU</p>
            <img src={contact} alt="" className='small_img' />
          </div>
        </div>
      </div>


        {/* <h1 style={{marginTop: '500px', textAlign: 'center'}}>What would you like to know weather boi</h1> */}
    </>
  )
}

export default About
