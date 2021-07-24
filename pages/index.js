// pages/index.js
import { useState, useEffect } from "react";
import Link from "next/link";
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
  if (loading)
    return (
      <p className="text-2xl mt-20 text-gray-800 text-center">Loading ...</p>
    );
  if (!posts.length)
    return (
      <p className="text-2xl mt-20 text-gray-800 text-center">No posts.</p>
    );
  return (
    <div>
<div className="md:pl-48 md:pr-48 xl:pl-52 xl:pr-52 flex flex-col justify-center">
<h1 className="text-gray-800 text-3xl font-semibold tracking-wide mt-20 text-center">All that you need to start writing to the <p className="text-blue-700 font-black">world!</p></h1>
<h4 className="text-gray-500 text-md font-medium tracking-wide mt-2 mb-4 text-center">Share your ideas, build a personal brand, and connect with audience around the globe.</h4>
<Link href="/profile" passHref={true}><span className="bg-gray-900 text-white p-2 text-center">Launch For <b>FREE</b></span></Link>
</div>

      <h1 className="text-gray-800 text-3xl font-semibold tracking-wide mt-10 mb-2 text-center">
      Trending
      </h1>
      <div className="flex flex-wrap mt-7 flex-col w-full">
      <div className="flex flex-wrap  mt-7 justify-around">
      {
        posts.map(post => (
          <Link key={post.id} href={`/posts/${post.id}`} passHref={true}>
            <div className="cursor-pointer border-b border-gray-300	mt-1 p-4 bg-gray-800 text-white h-28 rounded-sm flex flex-col justify-between font-mono md:w-1/3  sm:w-full md:border-r-2 md:border-white">
              <h2 className="font-semibold text-xs">{post.title}</h2>
              <p className="text-gray-500 mt-2 text-xs">Author: {post.user_email}</p>
            </div>
          </Link>)
        )
      }
      </div>
    </div>
    </div>
  )
}
