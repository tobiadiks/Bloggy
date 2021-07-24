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
<span className="cursor-pointer font-semibold flex"><svg width="1rem" height="1rem" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title"
aria-describedby="desc" role="img" >
  <title>Feather</title>
  <desc>A line styled icon from Orion Icon Library.</desc>
  <path d="M51.491 12.509L2 62m19.938-19.939V26.517M32.41 31.59h16.651m-21.654 5.005h16.815"
  stroke-Width="3" stroke-Miterlimit="10" stroke="#007e85" fill="none" data-name="layer2"
  stroke-Linejoin="round" stroke-Linecap="round"></path>
  <path stroke-Width="3" stroke-Miterlimit="10" stroke="#007e85"
  fill="none" d="M42.1 21.9V8.169c-10.828 5.992-23.594 17.8-31.528 41.086l2.087 2.086 2.087 2.088C61.553 37.478 62 2 62 2a41.974 41.974 0 0 0-13.147 3.014l-6.634 16.767"
  data-name="layer1" stroke-Linejoin="round" stroke-Linecap="round"></path>
</svg>
Scrawlo</span>
      </Link>

      <div className="text-xs font-medium">
{user &&
      (
      <>
      <span className="mr-6 cursor-pointer pb-1 border-b border-green-400 hidden md:inline">Hack it</span>
      <span className="mr-6 cursor-pointer hidden md:inline">Career</span>
      </>)
}
      {
        user && (
          <Link href="/create-post" passHref={true}>
            <span className="mr-6 cursor-pointer hidden md:inline">Create</span>
          </Link>
        )
      }
      {
  user && (
    <Link href="/my-posts" passHref={true}>
      <span className="mr-6 cursor-pointer hidden md:inline">My Posts</span>
    </Link>
  )
}

      
        {
        !user ? 
        (<>
        <span className="mr-6 cursor-pointer hidden md:inline">About us</span>
        <span className="mr-6 cursor-pointer pb-1 border-b border-green-400 hidden md:inline">Hack it</span>
        <span className="mr-6 cursor-pointer hidden md:inline">Career</span>
        <Link href="/profile" passHref={true}><span className="mr-6 cursor-pointer bg-green-500 text-white mt-2 pt-2 pb-2 pr-3 pl-3 rounded-r-2xl rounded-l-2xl font-semibold">Get started</span></Link>
        </>
        )
        :
       (<>
       <Link href="/profile" passHref={true}><span className="mr-6 cursor-pointer">Profile</span></Link> 
       </>
       )
        }
        

      </div>
      </nav>
      <div className="py-8 px-5 w-screen">
      <Component {...pageProps} />
    </div>
    </div>
  )

}

export default MyApp
