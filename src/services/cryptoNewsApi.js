import { createApi } from "@reduxjs/toolkit/dist/query";
import { CreateApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const options = {
  headers: {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '39315176b8msh06ed59e28e589e7p111e04jsn49f7d47501c0',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }
};


 const cryptonewsheaders= {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '39315176b8msh06ed59e28e589e7p111e04jsn49f7d47501c0',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }
  const baseUrl='https://bing-news-search1.p.rapidapi.com/news';


  export const cryptonewsapi=createApi({
    reducerPath:'cryptonewsapi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://bing-news-search1.p.rapidapi.com/news',
        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key','39315176b8msh06ed59e28e589e7p111e04jsn49f7d47501c0')
            return headers;
        }
    }),
    endpoints:(builder)=>({
        getcryptonews:builder.query({query:(newscategory,count)=>`/news/search?q=${newscategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`})
    }),
});
  export const {useGetcryptoNewsQuery,}=cryptonewsapi;