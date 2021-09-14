import React from 'react';
import Head from 'next/head'

export default function Header(props){
return(
    <Head>
        <title>{props.title?props.title:'Cstory - Setup your micro-blogging community'}</title>
        <meta charSet="UTF-8"/>
        <meta name="language" content="en"/>
        <meta name="google-site-verification" content="WJoe5To1YuI77Ol_k-iXwBlCVCswDf_Y4E9kWzil1rc" />
        <meta name="robots" content="index,follow,noodp,noydir"/>
        <meta name="description" content="Setup your micro-blogging community
without writing any line of code"/>
        <meta name="language" content="en"/>
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="rgba(109,40,217,1)"/>
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="rgba(109,40,217,1)"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="https://cstory.vercel.app"/>
</Head>
)
}