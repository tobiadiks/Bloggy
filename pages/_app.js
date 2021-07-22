import '../styles/globals.css'
import Link from 'next/link';
import {useState, useEffect} from 'react'
import supabase from '../utils/initSupabase'

function MyApp({ Component, pageProps }) {
  const [user, setUser]=useState(null);

  useEffect(()=>{
    const {data: authListener}= supabase.auth.onAuthStateChange(
      async ()=> checkUser()
    )

    checkUser()
    return ()=> {
      authListener?.unsubscribe()
    };
  }, [])

  async function checkUser(){
    const user= supabase.auth.user()
    setUser(user)
  }

  return(
    <div>
      <nav className="text-gray-800 p-5 border-b border-gray-200 bg-white fixed w-full opacity-95 z-50 font-mono">
<Link href="/">
<span className="mr-6 cursor-pointer font-black">Bloggy</span>
      </Link>
      {
        user && (
          <Link href="/create-post">
            <span className="mr-6 cursor-pointer">Create Post</span>
          </Link>
        )
      }
      {
  user && (
    <Link href="/my-posts">
      <span className="mr-6 cursor-pointer">My Posts</span>
    </Link>
  )
}

      <Link href="/profile">
        <span className="mr-6 cursor-pointer">Profile</span>
      </Link>
      </nav>
      <div className="py-8 px-5 w-screen font-mono">
      <Component {...pageProps} />
    </div>
    </div>
  )

}

export default MyApp
