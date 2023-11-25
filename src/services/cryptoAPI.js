import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const cryptoapiheaders={
    'x-access-token': 'coinrankingee2247a82f361a929eae439a2c648fc6d47bbe5aea81e5f9',
}

/*const baseurl='https://api.coinranking.com';
const createrequest=(url)=>({url,cryptoapiheaders})
export const cryptoapi=createApi({
    reducerPath:'cryptoapi',
    baseQuery:fetchBaseQuery({baseurl}),
    endpoints:(builder)=>({
        getcryptos:builder.query({
            query:()=>createrequest('/v2/coins')
        })
    })
});



export const{
useGetCryptosQuery,
}=createApi;*/

export const cryptoapi=createApi({
    reducerPath:'cryptoapi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://api.coinranking.com',
        prepareHeaders:(headers)=>{
            headers.set('x-access-token','coinrankingee2247a82f361a929eae439a2c648fc6d47bbe5aea81e5f9')
            return headers;
        }
    }),
    endpoints:(builder)=>({
        getcrypto:builder.query({query:(count)=>`/v2/coins?limit=${count}`})
    }),
});
export const {
    useGetcryptoQuery,
}=cryptoapi;