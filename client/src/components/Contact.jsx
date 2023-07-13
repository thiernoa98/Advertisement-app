import React, {useState } from 'react'
import axios from 'axios';
import { API_URL } from '../API_URL'; 
import { Divider, Drawer, IconButton, List, ListItem } from '@material-ui/core';
import {Minimize } from '@material-ui/icons';

function Contact() {
  const [client_fname, setClient_fname] = useState('');
  const [client_lname, setClient_lname] = useState('');
  const [client_email, setClientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

async function sendEmail(e) {
    e.preventDefault();

    console.log('client_email ', client_email);
    if (client_email && subject && message) {
       await axios.post(`${API_URL}/sendEmail`, {
            client_fname, 
            client_lname,
            client_email,
            subject,
            message
       })
       .then(()=> alert('yessss! Message sent successfully'))
       .catch(()=> alert('failed'));
       return;
    }else{
        return alert('fill in all the fields to proceed');
    }
  }




  return (
    <>
        <div id='page_head' >
            <span id='contactD' className="overshadow" >
                <div className='contactD'>
                    <h2>Talk To US</h2>
                    <p>Have a question about our compnay? leave a message</p>
                </div>
            </span>
        </div>
        
          <div id='contact_detail' className='sec-p1'>
              <div className='details'>
                  <h1>get in touch</h1>
                  <h2>Come Visit one of our Head Quaters locations</h2>
                      <li>
                          <i className="fas fa-map"></i>
                          <p>2nd Ave, New York, NY 10029</p>
                      </li>
                      <li>
                          <i className="fas fa-envelope"></i>
                          <p>contact@gmail.com</p>
                      </li>
                      <li>
                          <i className="fas fa-phone-alt"></i>
                          <p>(212) 996-2412</p>
                      </li>
                      <li>
                          <i className="fas fa-clock"></i>
                          <p>mon-sat 8:00AM-8PM</p>
                      </li>
               </div>

            </div>

            <div id="footer-message"> 
                <button onClick={()=>setOpen(true)} >Leave a message</button>

            </div>

               <Drawer style={{width: '50vh'}}
                anchor='bottom'
                open={open} onOpen={()=>setOpen(true)} onClose={()=> setOpen(false)} >
                    <div> <IconButton> <Minimize style={{color:'red'}} onClick={()=>setOpen(false)} /></IconButton></div>
                        <Divider/>                        
                        <List >
                        {/* style={{display:'flex', flexDirection:'column'}} */}
                            <ListItem className='contact-form' >
                            <section style={{textAlign:'center'}}>
                                    <h2>Conatct US</h2><br/>
                                    <p>Have questions/inquiries reeach out to use via phone or email.<br/>
                                        have questions about business plan, reach out to use
                                    </p><br/>
                                    <form >
                                       <div className='form-container_fields-content_input'>
                                        <label htmlFor="email">First Name </label>
                                        <input 
                                        type="text" 
                                        id='fanme' 
                                        placeholder='first name'
                                        onChange={e=> setClient_fname(e.target.value)}/><br/><br/>

                                        <label htmlFor="email">Last Name </label>
                                        <input 
                                        type="text" 
                                        id='lname' 
                                        placeholder='last name'
                                        onChange={e=> setClient_lname(e.target.value)}/><br/><br/>

                                        <label htmlFor="email">Email </label>
                                        <input 
                                        type="text" 
                                        id='email' 
                                        placeholder='your-email'
                                        onChange={e=> setClientEmail(e.target.value)}/><br/><br/>

                                        <label htmlFor="subject">Subject </label>
                                        <input 
                                        type="text" 
                                        id='subject' 
                                        placeholder='subject'
                                        onChange={e=> setSubject(e.target.value)}/><br/><br/>

                                        <label htmlFor="message">Your Message </label><br/>
                                        <textarea 
                                        name="message" 
                                        id="message" cols="30" rows="10" 
                                        placeholder='start message...'
                                        onChange={e=> setMessage(e.target.value)} >
                                        </textarea><br/><br/>

                                        </div>
                                        <button onClick={(e)=> sendEmail(e)} type='submit'>
                                            send message
                                        </button>
                                    </form>
                                </section>

                            </ListItem>
                        
                        </List>
                </Drawer>
      
    </>
  )
}

export default Contact
