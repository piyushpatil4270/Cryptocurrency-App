import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col,Row,Typography } from 'antd'
const {Title}=Typography
const Linechart = ({coinhistory,currentprice,coinname}) => {
  const coinPrice=[]
  const coinTimeStamp=[]
  
  return (
    <>
      <Row className='chart-header'>
        <Title style={{marginTop:"5px"}} level={2} className="chart-title">
        {coinname}  Price Chart
        </Title>
        <Col className='price-container'>
         <Title style={{marginTop:"10px"}} level={5} className='price-change'>
          Current {coinname} Price {currentprice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  )
}

export default Linechart
