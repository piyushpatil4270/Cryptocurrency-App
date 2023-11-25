import React, { useState,useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { LineElement } from "chart.js";
import axios from "axios";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
 
  const [cryptos, setcryptos] = useState([]);
  const[searchterm,setsearchterm]=useState("")
 const fetchcryptos=async()=>{
  const {data}=await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
  setcryptos(data)
  console.log("cryptodata",data)
 }
 
console.log("this is cryptos", cryptos);
useEffect(()=>{
fetchcryptos()
const filtereddata=cryptos?.filter((coin)=>coin.name.toLowerCase().includes(searchterm.toLowerCase()))
setcryptos(filtereddata)
},[])

  const profit = {
    color: "darkgreen",
  };
  const loss = {
    color: "red",
  };

  return (
    <>
     {!cryptos?("Loading..."):(!simplified &&
     <>
    
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`#${currency.market_cap_rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.image} />}
                hoverable
              >
                <p>Price: ${millify(currency.current_price)}</p>
                <p>Market Cap: ${millify(currency.market_cap)} </p>
                <p>
                  Daily Change:{" "}
                  <span
                    style={
                      currency.price_change_percentage_24h < 0
                        ? { color: loss.color }
                        : { color: profit.color }
                    }
                  >
                    {millify(currency.price_change_percentage_24h)}%
                  </span>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      </>
      )}
    </>
  );
};

export default Cryptocurrencies;
