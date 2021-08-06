import '../styles/globals.css'
import Link from 'next/link';
import Head from 'next/head';
import {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/router'
import supabase from '../utils/initSupabase'
import {IconBell, IconLogIn, IconTag, IconMenu, IconLogOut, IconBookOpen, IconUser, IconPlus, IconHome} from '@supabase/ui'

function MyApp({ Component, pageProps }) {
  const router= useRouter();
  const [user, setUser]=useState(null);
  // early access mail 
  const [email, setEmail]= useState("");
  let buttonStatus= useRef();
  let inputStatus=useRef();

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

  // Early access
  async function sendEmailAddress(){
  const {data, error} = await supabase.from("early-access-email").select('*').filter('email','eq', email);
  

   if (data.length>0){

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]/
     if(!email.match(re) )
     {
    inputStatus.current.placeholder="Please insert a valid email";
    buttonStatus.current.style.background="rgba(239,68,68,1)";
    console.log(buttonStatus)
     }
   else {
  buttonStatus.current.innerHTML="Requested Earlier";
  buttonStatus.current.style.background="#9ca3af";
   }
  }
 
    
   
   else{
   await supabase.from("early-access-email").insert([{email}])
   router.push("/subscribe/early-access")
   
   }
  
   
  }
  // Early access ends here

  // Universal Signout
  async function SignOut(){
    await supabase.auth.signOut()
    router.push('/')
  }

  return(
    <div>

<Head>
        <title>Scrawlo</title>
        <meta charSet="UTF-8"/>
        <meta name="description" content="Free Space For Everyone"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
</Head>
    
      <nav className="text-gray-800 p-5 border-b border-gray-100 bg-gray-50 fixed w-full z-50 flex justify-between flex-row">
<Link href="/" passHref={true}>
<span className="cursor-pointer font-medium text-gray-700 flex handwriting"><svg width="1rem" height="1rem" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title"
aria-describedby="desc" role="img" >
  <title>Scrawlo</title>
  <desc>A line styled icon from Orion Icon Library.</desc>
  <path d="M51.491 12.509L2 62m19.938-19.939V26.517M32.41 31.59h16.651m-21.654 5.005h16.815"
  strokeWidth="4" strokeMiterlimit="10" stroke="#1d4ed8" fill="none" data-name="layer2"
  strokeLinejoin="round" strokeLinecap="round"></path>
  <path strokeWidth="4" strokeMiterlimit="10" stroke="#1d4ed8"
  fill="none" d="M42.1 21.9V8.169c-10.828 5.992-23.594 17.8-31.528 41.086l2.087 2.086 2.087 2.088C61.553 37.478 62 2 62 2a41.974 41.974 0 0 0-13.147 3.014l-6.634 16.767"
  data-name="layer1" strokeLinejoin="round" strokeLinecap="round"></path>
</svg>

Scrawlo
</span>
      </Link>

      <div className="text-xs font-medium flex flex-row align-middle">
      {
  user && (<>
    <Link href='/new' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer text-green-500  flex hover:text-blue-700"><IconPlus/><span className=" hidden md:flex">&nbsp;New</span></span></Link>
    <Link href='/home' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconHome/><span className=" hidden md:flex">&nbsp;Home</span></span></Link>
    <span className="mr-4 md:mr-6 cursor-pointer hidden md:flex hover:text-blue-700"><IconBookOpen/><span className=" hidden md:flex">&nbsp;Explore</span></span>
    <span className="mr-6 cursor-pointer  hidden md:flex hover:text-blue-700"><IconTag/>&nbsp;Tags</span>
    <span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconBell/><span className=" hidden md:flex">&nbsp;Notification</span></span>
    <Link href='/profile' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconUser/><span className=" hidden md:flex">&nbsp;Profile</span></span></Link>
    <span onClick={SignOut} className="mr-0 md:mr-6 cursor-pointer text-blue-700 hover:text-red-600  flex"><IconLogOut/><span className=" hidden md:flex">&nbsp;Log Out</span></span>
 
 </>
  )
}

      
        {
        !user &&
        (<>
          <span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconBookOpen/><span className=" hidden md:flex">&nbsp;Explore</span></span>
          <span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconTag/><span className=" hidden md:flex">&nbsp;Tags</span></span>
          <span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconBell/><span className=" hidden md:flex">&nbsp;Notification</span></span>
        <Link href='/auth' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconLogIn/><span className=" hidden md:flex">&nbsp;Log In</span></span></Link>
        
       {/* /profile to / */}
        </>
        )
        }
        

      </div>
      </nav>
      
      <div className="py-8 px-5 w-screen">
      <Component {...pageProps} />
    </div>

{/* Footer */}
    <div className="flex  flex-row flex-wrap justify-between font-mono text-xs text-gray-500 py-10 px-7 w-screen mt-10 mb-5 border-t border-gray-200">
      
      <div className="flex mt-5 flex-col flex-nowrap w-28">
        <h5 className="text-gray-700 text-sm font-bold mb-3 ">Explore</h5>
        <span className="mt-1">Feeds</span>
        <span className="mt-1">Trending</span>
        <span className="mt-1">Tags</span>
        <span className="mt-1 border-b-2 border-green-400 w-16">Hack it</span>
      </div>

      <div className="flex mt-5 flex-col flex-nowrap w-28">
        <h5 className="text-gray-700 text-sm font-bold mb-3">Company</h5>
        <span className="mt-1">About Scrawlo</span>
        <span className="mt-1">Career</span>
        <span className="mt-1">Become an Ambassador</span>
      </div>

      <div className="flex mt-5 flex-col flex-nowrap w-28">
        <h5 className="text-gray-700 text-sm font-bold mb-3">Support</h5>
        <span className="mt-1">Documentation</span>
        <span className="mt-1">Contact</span>
        <span className="mt-1">Request Feature</span>
      </div>

    </div>

<div id="formify" className=" px-7 py-10 w-screen mt-5 mb-5 flex flex-wrap sm:justify-center sm:align-middle border-t border-b border-gray-200 flex-col">
  
  <input ref={inputStatus} value={email} onChange={e=> setEmail(e.target.value)}  placeholder="Email" required type="email" className="pl-2 outline-none border-2 bg-gray-50 border-gray-200 placeholder-gray-500 rounded-md mt-2 mx-auto py-2  w-full md:w-1/3 p-1 text-sm font-normal"/>
  
  <button ref={buttonStatus} onClick={sendEmailAddress} type="button"  className="p-2 outline-none rounded-md text-sm font-normal bg-green-500 text-white mx-auto mt-2">Subscribe</button>
  
  <div className="font-mono text-gray-500 text-xs font-medium tracking-wide mt-4 mb-4 text-center block">
  Receive exclusive updates and tips to make you the best creator...
</div>
</div>

<div className="flex  flex-row flex-wrap justify-between font-mono text-xs text-gray-500 py-5 px-7 w-screen mb-2">
  <span>© Scrawlo Inc.</span>
  <div>
    <span>Privacy Policy </span>
    &nbsp;
    <span>Terms</span>
  </div>
</div>
{/* Footer Ends */}


    </div>
  )

}

export default MyApp
