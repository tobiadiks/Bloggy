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
      <nav className="text-gray-800 p-5 border-b border-gray-100 bg-gray-50 fixed w-full z-50">
<Link href="/" passHref={true}>
<span className="mr-6 cursor-pointer font-semibold">Bloggy</span>
      </Link>
      {
        user && (
          <Link href="/create-post" passHref={true}>
            <span className="mr-6 cursor-pointer">Create Post</span>
          </Link>
        )
      }
      {
  user && (
    <Link href="/my-posts" passHref={true}>
      <span className="mr-6 cursor-pointer">My Posts</span>
    </Link>
  )
}

      <Link href="/profile" passHref={true}>
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
