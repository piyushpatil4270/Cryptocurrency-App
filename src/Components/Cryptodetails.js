import React,{useState,useEffect} from 'react'
import { Row,Col,Typography,Select } from 'antd'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import {CheckOutlined, DollarCircleFilled, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined} from "@ant-design/icons"
import axios from 'axios'
import millify from 'millify'
import Linechart from './Linechart'
const {Title,Text}=Typography
const {Option}=Select
const Cryptodetails = () => {
  const {coinId} =useParams()
  const [timeperiod,settimeperiod]=useState("7")
  const [cryptoDetails,setcryptoDetails]=useState(null)
  const [coinhistory,setcoinhistory]=useState(null)
  
  const fetchCoinData=async()=>{
    const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
    setcryptoDetails(data)
    console.log(data)
  }
  const fetchCoinhistory=async()=>{
    const {data:historicaldata}=await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${timeperiod}`)
    setcoinhistory(historicaldata)
    console.log("CoinHistory",historicaldata)
  }
  useEffect(()=>{
   fetchCoinData()
   fetchCoinhistory()
   console.log("CoinData",cryptoDetails)
   console.log("CoinHistory",coinhistory)
   
  },[])

  const time = ['1', '5', '10', '30', '60', '90', '360', '1000'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.market_data?.current_price?.usd && millify(cryptoDetails?.market_data?.current_price?.usd)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.market_cap_rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.market_data.total_volume?.usd      && millify(cryptoDetails?.market_data.total_volume?.usd  )}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.market_data.market_cap?.usd      && millify(cryptoDetails?.market_data.market_cap?.usd      )}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails?.market_data.high_24h.usd)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Market Average', value: `$ ${millify(cryptoDetails?.market_data?.market_cap.usd)}`, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.market_data.high_24h.usd, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: cryptoDetails?.market_data.low_24h.usd ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails?.market_data?.total_volume.usd      )}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails?.market_data?.circulating_supply)}`, icon: <DollarCircleFilled /> },
  ];
  return (
    <>
   {!cryptoDetails?("Loading"):(<Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
     <Title  level={2} className='coin-name'>{cryptoDetails.name}  Price</Title>
      <p style={{fontWeight:"480"}}>Showing live Statistics of {cryptoDetails.name} with Market Cap , Valuation and Prices</p>
      </Col>
      <Select style={{marginTop:"5px"}} defaultValue="7d" className='selecttime-period' placeholder="Select Time Period"  onChange={(value)=>settimeperiod(value)}>
         {time.map((date)=><Option key={date}>{date}</Option>)}
      </Select>
      <Linechart coinhistory={coinhistory?.prices} currentprice={millify(cryptoDetails?.market_data?.current_price?.usd)}  coinname={cryptoDetails.name} />
      <Col className='stats-container'>
      <Col className='stats-value-stats'>
      <Col className='stats-value-stats-heading'>
        <Title level={3}  className='coin-details-heading'>
          <strong style={{color:"black"}}>{cryptoDetails.name} Value Statistics</strong>
          </Title>
        <p>Overview Showing Stats of {cryptoDetails.name}</p>
        </Col>
        {stats.map(({icon,title,value})=>(
          <Col className='coin-stats'>
            <Col className='coin-stats-name'>
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className='stats'>{value}</Text>
          </Col>
        ))}
        </Col>
        <Col className='stats-other-stats-info'>
      <Col className='stats-value-stats-heading'>
        <Title level={3}  className='coin-details-heading'>
          <strong style={{color:"black"}}>{"  "}</strong>
          </Title>
        <p>Generic Stats of {cryptoDetails.name}</p>
        </Col>
        {genericStats.map(({icon,title,value})=>(
          <Col className='coin-stats'>
            <Col className='coin-stats-name'>
              <Text>{icon}</Text>
              <Text>{title}</Text>
            </Col>
            <Text className='stats'>{value}</Text>
          </Col>
        ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'  >
          <Title level={3}  className='coin-details-heading'>What is {cryptoDetails.name}?</Title>
         <p>{HTMLReactParser(cryptoDetails.description.en)}</p> 
        </Row>
      </Col>
    </Col>)}
    </>
  )
}

export default Cryptodetails
