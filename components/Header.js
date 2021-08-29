import React from 'react';
import Head from 'next/head'

export default function Header(props){
return(
    <Head>
        <title>{props.title?props.title:'Cstory - Setup your micro-blogging community'}</title>
        <meta charSet="UTF-8"/>
        <meta name="language" content="en"/>
        <meta name="robots" content="index,follow,noodp,noydir"/>
        <meta name="description" content="CStory helps you get hired with your proof of work as a content creator, write in your favorite niche and convince your future employee"/>
        <meta name="language" content="en"/>
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="rgba(109,40,217,1)"/>
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="rgba(109,40,217,1)"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="https://cstory.vercel.app"/>
</Head>
)
}