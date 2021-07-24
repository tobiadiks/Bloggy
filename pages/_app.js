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
      <nav className="text-gray-800 p-5 border-b border-gray-100 bg-gray-50 fixed w-full z-50 flex justify-between flex-row">
<Link href="/" passHref={true}>
<span className="cursor-pointer font-semibold">Bloggy</span>
      </Link>

      <div className="text-xs font-medium">
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
        {
        !user ? 
        (<>
        <span className="mr-6 cursor-pointer hidden md:inline">About us</span>
        <span className="mr-6 cursor-pointer pb-1 border-b border-green-400 hidden md:inline">Hack it</span>
        <span className="mr-6 cursor-pointer hidden md:inline">Career</span>
        <span className="mr-6 cursor-pointer bg-green-400 text-white p-1 pr-3 pl-3 rounded-r-2xl rounded-l-2xl">Get started</span>
        </>
        )
        :
        <span className="mr-6 cursor-pointer">Profile</span>
        }
        
      </Link>

      </div>
      </nav>
      <div className="py-8 px-5 w-screen">
      <Component {...pageProps} />
    </div>
    </div>
  )

}

export default MyApp
