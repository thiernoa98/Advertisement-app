import React, { useState,useEffect } from 'react'
import {API_URL} from '../API_URL';
import axios from 'axios';
import {CircularProgress, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';


function Partners() {

  //the front and backend variables needs to be the same in order to get values
  const [partners, setPartners] = useState([]);

  async function getPartners() {
    let partnersData = await axios.get(`${API_URL}/partners`);
    setPartners(partnersData)
  }

  useEffect(()=>{
    getPartners();
  }, []) //the depency [] stops the infinite loop


  if(!partners?.data?.payload) return <div className='spinner'> <CircularProgress/> </div>
  return (
    <>
      {/* <form onSubmit={handleOnSubmit}>
          <label htmlFor="email">Email-Address</label>
          <input  style={{marginTop:'50px'}}  type="text" name="email" id="email" /><br/>
          <label htmlFor="message">Message</label>
          <textarea style={{marginTop:'50px'}}  name="message" id="inputMessage" cols="30" rows="10"></textarea><br/><br/>
          <button type='submit'>
            Submit
          </button>
      </form> */}

      <div id='partners' className='sec-p1'>
          <h2>Welcome to our Partners page</h2>
          <p>Below you can see who we are parnering with, and you can choose who you wanna work with</p>
          <div className='partners-container'>
            {
              partners.data.payload.map((dataObj) =>{
                  // return console.log('data ', data);
                return <div className='partner' key={dataObj._id}>
                    <h3>{dataObj.Name}</h3>
                    <Link to={`/partner-details/${dataObj._id}`}>
                      <img src={dataObj.img} alt='images'/>
                    </Link>
                    <Typography>{dataObj.Followers}</Typography>
                  </div>
              })
            }

          </div>
      </div>

    </>
  )
}

export default Partners
