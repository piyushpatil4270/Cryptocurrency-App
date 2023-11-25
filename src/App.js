import './App.css';
import { BrowserRouter,Routes,Route ,Switch, Link} from 'react-router-dom';
import { Layout,Typography,Space } from 'antd';
import Navbar from './Components/Navbar';
import News from './Components/News';
import Cryptocurrencies from './Components/Cryptocurrencies';
import Cryptodetails from './Components/Cryptodetails';
import Homepage from './Components/Homepage';
import Exchanges from './Components/Exchanges';
import './App.css'
function App() {
  return (
    <div className="app">
      <div className='navbar'>
       <Navbar/>
      </div>
      <div className='main'>
      <Layout>
        < div className='routes'>
          <Routes>
            <Route path="/" Component={Homepage}/>
              
            <Route path="/exchanges" Component={Exchanges} />
              
            <Route path="/cryptocurrencies" Component={Cryptocurrencies}/>
              
            <Route path="/crypto/:coinId" Component={Cryptodetails} />
              
            <Route path="/news" Component={News} />
              
          </Routes>
        </div>
      </Layout>
      
      <div className='footer'>
       <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
        Cryptoverse <br/>
        All rights reserved
       </Typography.Title>
       <Space>
        <Link to='/'>Home</Link>
        <Link to='/exchanges'>Exchanges</Link>
        <Link to='news'>News</Link>
       </Space>
       </div>
      </div>
    </div>
  );
}

export default App;
