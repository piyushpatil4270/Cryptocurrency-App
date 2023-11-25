import axios from "axios"
import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useState,useEffect } from "react"
import { Link } from "react-router-dom";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const [Exchanges,setExchanges]=useState(null)
  const fetchexchanges=async()=>{
    const {data}=await axios.get(`https://api.coingecko.com/api/v3/exchanges`)
     setExchanges(data)
    console.log("exchanges",data)
  }
  useEffect(()=>{
     fetchexchanges()
     console.log(Exchanges)
  },[])
  return ( 
    <>
     {!Exchanges?("Loading..."):(
      <>
       <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Country</Col>
        <Col span={6}>Visit</Col>
        
      </Row>
      <Row>
         {Exchanges.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.name}
                showArrow={false}
                header={(
                  <Row key={exchange.uuid}>
                    <Col span={6}>
                      <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.trade_volume_24h_btc)}</Col>
                    <Col span={6}>{exchange.country}</Col>
                   <Link to={exchange.url}><Col span={6}>{exchange.url}</Col></Link> 
                   
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || "No Information Available")}
              </Panel>
            </Collapse>
          </Col>
        ))} 
      </Row>
      </>
     )} 
    </>
  )
}

export default Exchanges
