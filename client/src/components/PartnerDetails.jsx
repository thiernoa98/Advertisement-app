import React, {useState, useEffect} from 'react'
import { API_URL } from '../API_URL';
import axios from 'axios';
import { CircularProgress} from '@material-ui/core';

function Partnerdetails() {

  const [partnerDetail, setPartnerDetails] = useState([]);
  const [client_email, setClientEmail] = useState('');
  const [client_fname, setClient_fname] = useState('')
  const [client_lname, setClient_lname] = useState('')
  const [client_phone, setClient_phone] = useState('')
  const [client_business, setClient_business] = useState('')
  const [client_product, setClient_product] = useState('');
  const [businessDesc, setBusinessDesc] = useState('');
  const [client_price, setClient_price] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [error, setError] = useState('');

  //getting confirmation notification
  async function getNotification(e) {
    e.preventDefault();

    if (client_email && partnerName) {
        await axios.post(`${API_URL}/confirm`, {
            client_fname,
            client_lname,
            client_email,
            client_phone,
            client_business,
            client_product,
            businessDesc,
            client_price,
            partnerName
        })
        .then(()=> alert('Message sent successfully'))
        .catch(()=> alert('failed'));
        return;
    }else {
      return setError('Please make sure to fill in the form and check the box');
    }
  }

  //hendle on change checkBox
  function handleCBChange(e) {
    setError('')
    setPartnerName(e.target.checked ? e.target.value: '');
  }

  function handleChange(e) {
    setError('')
    // setClient_fname(e.target.value)
    // setClient_lname(e.target.value)
    // setClient_phone(e.target.value)
    // setClient_business(e.target.value)
    // setClient_product(e.target.value)
    // setBusinessDesc(e.target.value)
    // setClient_price(e.target.value)
    setClientEmail(e.target.value)
  }

  async function getPartners(_id) {
    let partner_detail =  await axios.get(`${API_URL}/partnerDetails/${_id}`);
    setPartnerDetails(partner_detail)
  }


  useEffect(()=>{
    const id = window.location.pathname.split('/');
    getPartners(id[2]); //2 is from where the id nmber is on the path header
  }, []) //the depency [] stops the infinite loop

  if ( !partnerDetail?.data?.payload ) return <div className='spinner'> <CircularProgress/> </div> 
  
  return (
    <>
    <div id='partners' className='sec-p1'>
        <div className='sing_part_img'>
            {/*can't map here because payload is not an array */}
            <img src={partnerDetail.data.payload.img} alt='phtos' id='mainImg'/>
         </div>

         <div className='partner_detail'>
            <h1>{partnerDetail.data.payload.Name}</h1>
            <h2>{partnerDetail.data.payload.Followers}</h2>
            <h4>{partnerDetail.data.payload.About}</h4>
         </div>
        </div>
        <div id='form' className='sec-p1 sec-m1'>
            <h2>If you wish to work with {partnerDetail.data.payload.Name}, please start filling out the form below </h2>
        </div>
        <div className='form-container'>
          <div className='login__form-container_fields'>
            <div className='form-container_fields-content'>
              <form>
              <br/>
              <div className='form-container_fields-content_input'>
                <label htmlFor="first-name">First Name: </label>
                    <input 
                    type="text" 
                    id='first-name' 
                    placeholder='first-name'
                    onChange={(e)=> setClient_fname(e.target.value)}/><br/><br/>
              
                <label htmlFor="last-name">Last Name: </label>
                    <input 
                    type="text" 
                    id='last-name' 
                    placeholder='last-name'
                    onChange={(e)=> setClient_lname(e.target.value)}/><br/><br/>

                <label htmlFor="email">Email-Address: </label>
                    <input 
                    type="text" 
                    id='email' 
                    placeholder='your-email'
                    onChange={handleChange}/><br/><br/>
                <label htmlFor="phone-number">phone-number: </label>
                    <input 
                    type="text" 
                    id='phone-number' 
                    placeholder='phone-number'
                    onChange={(e)=> setClient_phone(e.target.value)}/><br/><br/>
                <label htmlFor="business-name">business-name: </label>
                    <input 
                    type="text" 
                    id='business-name' 
                    placeholder='your business name'
                    onChange={(e)=> setClient_business(e.target.value)}/><br/><br/>
                <label htmlFor="product-name">product-name: </label>
                    <input 
                    type="text" 
                    id='product-name' 
                    placeholder="product you're selling"
                    onChange={(e)=> setClient_product(e.target.value)}/><br/><br/>
                <label htmlFor="product-description">product-description: </label>
                    <textarea
                    cols="25" rows="10"  
                    type="text" 
                    id='product-description' 
                    placeholder='describ your business or product'
                    onChange={(e)=> setBusinessDesc(e.target.value)}/><br/><br/>
                <label htmlFor="price">your-price: </label>
                    <input 
                    type="text" 
                    id='price' 
                    placeholder='enter your price'
                    onChange={(e)=> setClient_price(e.target.value)}/><br/><br/>
                </div>
                  <div>
                    <input style={{marginTop:'50px'}}
                      type='checkbox' id={partnerDetail.data.payload.Name}
                      value={partnerDetail.data.payload.Name}
                      onChange={handleCBChange}
                      required
                    />
                    <label htmlFor={partnerDetail.data.payload.Name}>
                        {partnerDetail.data.payload.Name}
                    </label>
                  </div><br/>
                  <p className='error'>{error}</p>
                 <div className='form-container_fields-content_button'>

                  <button onClick={e => getNotification(e)}>
                    Submit
                  </button>
                 </div>
              {/* </div> */}
            </form>
            </div>
          </div>
      </div>
    </>
  )
}

export default Partnerdetails
