import './assets/css/App.css'
import { Header, Home, Partners, About,Footer,Contact, PartnerDetails} from './imports';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path="/our-partners" element={<Partners/>}/>
        <Route path='/about-us' element={<About/>}/>
        <Route path='/contact-us' element={<Contact/>}/>
        <Route path='/partner-details/:_id' element={<PartnerDetails/>}/>
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
