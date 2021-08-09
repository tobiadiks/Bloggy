// pages/scrawl.js
import { useState, useEffect } from 'react'
import Link from 'next/link'
import supabase from "../../utils/initSupabase";

export default function MyPosts() {
  const [posts, setPosts] = useState([])
  const [username, setUserName]=useState('')

  useEffect(() => {
    fetchPosts()
  }, [posts])

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

  useEffect(()=>{
    getUserName()
    
        async function getUserName(){
        const user = await supabase.auth.user()
        const {data} = await supabase
        .from('profile')
        .select('*')
        .filter('user_id', 'eq', user.id)
      setUserName(data[0].username)
      }
    })

  return (
    <div>
      <h1 className="text-gray-800 text-3xl font-semibold tracking-wide mt-20 mb-2 text-center">My Scrawls</h1>
      <div className="flex flex-wrap mt-7 w-full justify-around">
      {
        posts.map((post, index) => (
          <div key={index} className="border-r border-gray-300	mt-8 pr-1 ">
            <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
            <Link href={`/${username}/edit/${post.title.replaceAll(' ', '-')}`} passHref={true}><a className="text-sm mr-4 text-blue-500">Edit</a></Link>
            <Link href={`/${username}/${post.title.replaceAll(' ','-')}`} passHref={true}><a className="text-sm mr-4 text-blue-500">View</a></Link>
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