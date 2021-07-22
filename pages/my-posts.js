// pages/my-posts.js
import { useState, useEffect } from 'react'
import Link from 'next/link'
import supabase from "../utils/initSupabase";

export default function MyPosts() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const user = supabase.auth.user()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .filter('user_id', 'eq', user.id)
    setPosts(data)
  }
  async function deletePost(id) {
    await supabase
      .from('posts')
      .delete()
      .match({ id })
    fetchPosts()
  }
  return (
    <div>
      <h1 className="text-gray-800 text-3xl font-semibold tracking-wide mt-20 mb-2 text-center">My Posts</h1>
      <div className="flex flex-wrap mt-7 w-full justify-around">
      {
        posts.map((post, index) => (
          <div key={index} className="border-r border-gray-300	mt-8 pr-1 ">
            <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
            <Link href={`/edit-post/${post.id}`}><a className="text-sm mr-4 text-blue-500">Edit</a></Link>
            <Link href={`/posts/${post.id}`}><a className="text-sm mr-4 text-blue-500">View</a></Link>
            <button
              className="text-sm mr-4 text-red-500"
              onClick={() => deletePost(post.id)}
            >Delete</button>
          </div>
        ))
      }
      </div>
    </div>
  )
}