import React, { useEffect, useState } from "react";
import { Select, Row, Col, Avatar, Card, Typography } from "antd";
import moment from "moment";
import { useGetcryptoNewsQuery } from "../services/cryptoNewsApi";

import axios from "axios";
import {NewsOptions} from "../Cryptonews"

const {Title}=Typography
const News = () => {
  const [news,setnews]=useState(null)
  const {Text}=Typography
  const fetchdadata = async () => {
   const {data}=await axios.request(NewsOptions)
   setnews(data.data)

    
  };
  useEffect(()=>{
    fetchdadata();
    console.log("news",news)
  },[])


  
  return(
    <>
    <Title  level={2}>Latest Crypto News</Title>
       {(!news?("Loading..."):(
        <>
        <Row gutter={[24,24]}>
         {news.map((news,i)=>(
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
           <a  href={news.url} target="_blank" rel="noreferrer">
            <div className="news-image-container">
              <Text className="news-title" ><strong>{news.title}</strong></Text>
              <img src={news?.thumbnail}  style={{height:"100px",width:"70px",borderRadius:"5px",objectFit:"cover"}}/>
            </div>
            <p>
              {news.description?(news.description.length>200?(`${news.description.substring(0,200)}...`):(news.description)):"No Information Available"}
            </p>
            <div>
              <Title level={5} >{moment(news.createdAt).startOf("ss").fromNow()}</Title>
            </div>
          
           </a>
            </Card>
          </Col>
         ))}
        </Row>
        </>
       ))}
    </>
  
  )
  
  
};

export default News;
