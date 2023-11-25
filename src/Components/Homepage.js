import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Typography,Row,Col,Statistic} from 'antd';
import { Link } from 'react-router-dom';
import { useGetcryptoQuery } from '../services/cryptoAPI';
import Cryptocurrencies from './Cryptocurrencies';
import axios from 'axios';
import News from './News';
//import {  useGetCryptosQuery } from '../services/cryptoAPI';
const {Title}=Typography;
const Homepage = () => {
  const [golbalstats,setgolbalstats]=useState(null)
  const fetchglobaldata=async()=>{
    const {data}=await axios.get("https://api.coingecko.com/api/v3/global")
    setgolbalstats(data.data)
    console.log("global",golbalstats)
  }
   
    useEffect(()=>{
      fetchglobaldata()
      console.log(golbalstats)
    },[])
  
  return (
    
    <>
  {!golbalstats?("Loading..."):(
  <><Title level={2} className='heading'>Global Crypto Statistics</Title>
   <Row>
    <Col span={12}><Statistic title="Total Cryptocurrencies" value={golbalstats.active_cryptocurrencies} /></Col>
    <Col span={12}><Statistic title="Total Market Capitalization" value={millify(golbalstats.total_market_cap.usd)} /></Col>
    <Col span={12}><Statistic title="Total 24h Volume" value={millify(golbalstats.total_volume.usd)} /></Col>
    <Col span={12}><Statistic title="Total Markets" value={millify(golbalstats.markets)} /></Col>
   </Row>
   <div className='home-heading-container'>
    <Title level={3} className='home-title'>Explore Cryptocurrencies</Title>
    <Title level={3} className='show-more' ><Link to='/cryptocurrencies'>Show More</Link></Title>
   </div>
   <div className='home-heading-container'>
    <Title level={3} className='home-title'>Explore Exchanges</Title>
    <Title level={3} className='show-more' ><Link to='/exchanges'>Show More</Link></Title>
   </div>
   <div className='home-heading-container'>
    <Title level={3} className='home-title'>Explore News</Title>
    <Title level={3} className='show-more' ><Link to='/news'>Show More</Link></Title>
   </div>
   
   </>
   )}
   
  

    </>
    
  ) 
}

export default Homepage;
