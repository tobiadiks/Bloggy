// pages/index.js
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"
import supabase from "../utils/initSupabase";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPosts();
    const mySubscription = supabase
      .from("posts")
      .on("*", () => fetchPosts())
      .subscribe();
    return () => supabase.removeSubscription(mySubscription);
  }, []);
  async function fetchPosts() {
    const { data, error } = await supabase.from("posts").select();
    setPosts(data);
    setLoading(false);
  }

  
  return (

    
<div>
{/* Copy starts */}
<div className="md:pl-48 md:pr-48 xl:pl-52 xl:pr-52 flex flex-col justify-center">
<h1 className="text-gray-800 text-3xl font-semibold tracking-wide mt-20 text-center z-40">All that you need to start writing to the <p className="text-blue-700 font-black">world!</p></h1>
<h4 className="text-gray-500 text-md font-medium tracking-wide mt-2 mb-4 text-center z-40">Share your ideas, build a personal brand, and connect with audience around the globe.</h4>
<Link href="/#formify" passHref={true}><span className="bg-gray-900 text-white p-2 text-center rounded-md hover:bg-gray-800 z-40">Launch For <b>FREE</b></span></Link>
{/* /profile to / */}
</div>
{/* Copy ends */}

<div className="md:pl-42 md:pr-42 xl:pl-48 xl:pr-48 flex md:flex-row flex-col mt-10 justify-center align-middle border-b border-gray-200 py-10 z-40 md:mt-20 lg:mt-52">
 
  <div className="flex flex-col justify-center align-middle mt-5 mb-5 mx-auto">

  <svg className="mx-auto" xmlns="http://www.w3.org/2000/svg" height="5rem" width="5rem" viewBox="0 0 64 64" aria-labelledby="title"
aria-describedby="desc" role="img" >
  <title>Spacecraft</title>
  <desc>A line styled icon from Orion Icon Library.</desc>
  <circle data-name="layer1"
  cx="32" cy="22" r="4" fill="none" stroke="#5649cf" stroke-Linecap="round"
  stroke-Linejoin="round" stroke-Width="2"></circle>
  <path data-name="layer2" d="M22 26h-3.1a2.9 2.9 0 0 0-2.9 2.9v12.2a2.9 2.9 0 0 1-2.4 2.9h-2.7A2.9 2.9 0 0 0 8 46.9V58h8m26-32h3.1a2.9 2.9 0 0 1 2.9 2.9v12.2a2.9 2.9 0 0 0 2.4 2.9H53a2.9 2.9 0 0 1 3 2.9V58h-8m-20 0h8m6-6V19.8C42 8.9 32 2 32 2S22 8.9 22 19.8V52"
  fill="none" stroke="#302a63" stroke-Linecap="round" stroke-Linejoin="round"
  stroke-Width="2"></path>
  <path data-name="layer1" d="M28 62v-4a6 6 0 1 0-12 0v4zm20 0v-4a6 6 0 1 0-12 0v4z"
  fill="none" stroke="#5649cf" stroke-Linecap="round" stroke-Linejoin="round"
  stroke-Width="2"></path>
</svg>

<span className="text-gray-500 font-bold text-center text-sm mt-3 mx-auto">Launch your space</span>
  </div>

  <div className="flex flex-col justify-center mt-5 mb-5 align-middle mx-auto ">
  <svg className="mx-auto" height="5rem" width="5rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
aria-describedby="desc" role="img">
  <title>Social</title>
  <desc>A line styled icon from Orion Icon Library.</desc>
  <circle data-name="layer2"
  cx="32" cy="39" r="7" fill="none" stroke="#5649cf" stroke-Miterlimit="10"
  stroke-Width="2" stroke-Linejoin="round" stroke-Linecap="round"></circle>
  <path data-name="layer2" d="M32 46a12.1 12.1 0 0 0-12 12v2h24v-2a12.1 12.1 0 0 0-12-12z"
  fill="none" stroke="#5649cf" stroke-Miterlimit="10" stroke-Width="2" stroke-Linejoin="round"
  stroke-Linecap="round"></path>
  <circle data-name="layer2" cx="52" cy="10" r="6" fill="none" stroke="#5649cf"
  stroke-Miterlimit="10" stroke-Width="2" stroke-Linejoin="round" stroke-Linecap="round"></circle>
  <path data-name="layer2" d="M62 28c0-7.5-4.5-12-10-12s-10 4.5-10 12z"
  fill="none" stroke="#5649cf" stroke-Miterlimit="10" stroke-Width="2" stroke-Linejoin="round"
  stroke-Linecap="round"></path>
  <circle data-name="layer2" cx="12" cy="10" r="6" fill="none" stroke="#5649cf"
  stroke-Miterlimit="10" stroke-Width="2" stroke-Linejoin="round" stroke-Linecap="round"></circle>
  <path data-name="layer2" d="M22 28c0-7.5-4.5-12-10-12S2 20.5 2 28z"
  fill="none" stroke="#5649cf" stroke-Miterlimit="10" stroke-Width="2" stroke-Linejoin="round"
  stroke-Linecap="round"></path>
  <path data-name="layer1" fill="none" stroke="#302a63" stroke-Miterlimit="10"
  stroke-Width="2" d="M12 34l8 8m32-8l-8 8M24 14h16" stroke-Linejoin="round"
  stroke-Linecap="round"></path>
</svg>

<span className="text-gray-500 font-bold text-center text-sm mt-3 mx-auto">Connect & build your community</span>
  </div>

  <div className="flex flex-col justify-center mt-5 mb-5 align-middle mx-auto">

  <svg className="mx-auto" height="5rem" width="5rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
aria-describedby="desc" role="img">
  <title>Luxury</title>
  <desc>A line styled icon from Orion Icon Library.</desc>
  <path data-name="layer2"
  fill="none" stroke="#5649cf" stroke-Miterlimit="10" stroke-Width="2" d="M2 22h60M10 9l9 13L32 9l13 13 9-13M19 22l13 33 13-33"
  stroke-Linejoin="round" stroke-Linecap="round"></path>
  <path data-name="layer1" fill="none" stroke="#302a63" stroke-Linecap="round"
  stroke-Linejoin="round" stroke-Width="2" d="M32 55L2 22l8-13h44l8 13-30 33z"></path>
</svg>

<span className="text-gray-500 font-bold text-center text-sm mt-3 mx-auto">Learn from <b>PRO</b> creators</span>

</div>

{/* WordCopy Start */}

<div className="flex flex-col justify-center align-middle mt-5 mb-5 mx-auto">
<div className="mt-10">
  <Image className=" opacity-40"  alt="label" src="/../public/svg.svg" layout="fill"/>
</div>
</div>
</div>

<div className="px-7 py-5 mt-5 mb-5 flex flex-wrap justify-center md:justify-between sm:align-middle border-b border-gray-200 md:flex-row-reverse flex-col-reverse ">

  <Image  alt="label" src="/../public/wfh_9.svg"  height="400" width="400"/>


<div className="mt-1 md:mt-16 md:w-1/2">
<h1 className="mb-3">
<span className="cursor-pointer font-semibold flex text-2xl text-gray-700"><svg width="2rem" height="2rem" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title"
aria-describedby="desc" role="img" >
  <title>Feather</title>
  <desc>A line styled icon from Orion Icon Library.</desc>
  <path d="M51.491 12.509L2 62m19.938-19.939V26.517M32.41 31.59h16.651m-21.654 5.005h16.815"
  stroke-Width="5" stroke-Miterlimit="10" stroke="#007e85" fill="none" data-name="layer2"
  stroke-Linejoin="round" stroke-Linecap="round"></path>
  <path stroke-Width="5" stroke-Miterlimit="10" stroke="#007e85"
  fill="none" d="M42.1 21.9V8.169c-10.828 5.992-23.594 17.8-31.528 41.086l2.087 2.086 2.087 2.088C61.553 37.478 62 2 62 2a41.974 41.974 0 0 0-13.147 3.014l-6.634 16.767"
  data-name="layer1" stroke-Linejoin="round" stroke-Linecap="round"></path>
</svg>
Scrawlo
</span>
</h1>

<p className=" md:pr-30 xl:pr-42 text-gray-500">
A personal space for you to start blogging, reading and building community.
Write amazing stuffs anywhere, connect & create memories, be in charge of everything.
</p>
</div>

</div>
{/* Ends Here */}

      <h1 className="text-gray-800 text-3xl font-semibold tracking-wide mt-10 mb-2 text-center">
      Trending
      </h1>
      <div className="flex flex-wrap mt-7 flex-col w-full">
      <div className="flex flex-wrap  mt-7 justify-around">
      {
        
        loading?(
          <p className="text-xl mt-5 text-gray-800 text-center">Loading ...</p>) 
        :
        !posts.length?(<p className="text-xl mt-5 text-gray-800 text-center">No posts.</p>)
        :
        (posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`} passHref={true}>
            <div className="cursor-pointer border-b border-gray-300	mt-1 p-4 bg-gray-800 text-white h-28 rounded-sm flex flex-col justify-between font-mono md:w-1/3  w-full md:border-r-2 md:border-white">
              <h2 className="font-semibold text-xs">{post.title}</h2>
              <p className="text-gray-500 mt-2 text-xs">Author: Scrawlo Kage</p>  
            </div>
          </Link>)
        ))
      }
{/* Checks if its loading above */}

      </div>
    </div>
    </div>
  )
}
