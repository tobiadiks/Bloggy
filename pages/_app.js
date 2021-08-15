import '../styles/globals.css'
import Link from 'next/link';
import {Modal} from '@supabase/ui'
import Head from 'next/head';
import {useState, useEffect, useRef} from 'react'
import {useRouter} from 'next/router'
import supabase from '../utils/initSupabase'
import {IconBell, IconLogIn, IconTag, IconMenu, IconLogOut, IconBookOpen, IconUser, IconPlus, IconHome, IconEdit} from '@supabase/ui'

function MyApp({ Component, pageProps }) {
  const router= useRouter();
  const [user, setUser]=useState(null);
  // early access mail 
  const [email, setEmail]= useState('');
  let buttonStatus= useRef();
  let inputStatus=useRef();
  const [username, setUserName]=useState('');
  const [visibleFail, setVisibleFail] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);


  function toggleFail() {
    setVisibleFail(!visibleFail);
  }

  function toggleSuccess() {
    setVisibleSuccess(!visibleSuccess);
  }

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
  
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]/
    if(!email.match(re) )
    {
    await toggleFail()
     }

   else {
    const {data, error} = await supabase.from("early-access-email").select('email').filter('email','eq', email);
    if (data.length>0){
buttonStatus.current.innerHTML="Requested Earlier";
buttonStatus.current.style.background="#9ca3af";
    }
else{
   await supabase.from("early-access-email").insert([{email}])
   toggleSuccess
   }
  
   }
 
 
    
   
   
  
   
  }
  // Early access ends here

  // Universal Signout
  async function SignOut(){
    await supabase.auth.signOut()
    router.push('/')
  }


  useEffect(()=>{
    getUserName()
    
        async function getUserName(){
        const user = await supabase.auth.user()
        if(user){
        const {data} = await supabase
        .from('profiles')
        .select('*')
        .filter('id', 'eq', user.id)
      setUserName(!data.length?" ":data[0].username)}
      }
    }
      ,[username])

  return(
    <div>

<Head>
        <title>Scrawlo</title>
        <meta charSet="UTF-8"/>
        <meta name="description" content="Free Space For Everyone"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
</Head>
    
      <nav className="text-gray-800 p-5 border-b border-gray-100 bg-gray-50 fixed w-full z-50 flex justify-between flex-row">
<Link href={`${username?'/home':'/'}`} passHref={true}><span className="cursor-pointer text-lg font-medium text-blue-700 flex handwriting">Scrawlo</span></Link>

      <div className="text-xs font-medium flex flex-row align-middle">
      {
  user && (<>
    <Link href='/new' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer text-green-500  flex hover:text-blue-700"><IconPlus/><span className=" hidden md:flex">&nbsp;New</span></span></Link>
    <Link href='/home' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconHome/><span className=" hidden md:flex">&nbsp;Home</span></span></Link>
   <Link href={`/m/scrawl`} passHref={true}><span className="mr-4 md:mr-6 cursor-pointer hidden md:flex hover:text-blue-700"><IconEdit/><span className=" hidden md:flex">&nbsp;Edits</span></span></Link>
    {/* <span className="mr-6 cursor-pointer  hidden md:flex hover:text-blue-700"><IconTag/>&nbsp;Tags</span> */}
  {/* <span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconBell/><span className=" hidden md:flex">&nbsp;Notification</span></span> */}
    <Link href='/profile' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconUser/><span className=" hidden md:flex">&nbsp;Profile</span></span></Link>
    <span onClick={SignOut} className="mr-0 md:mr-6 cursor-pointer text-blue-700 hover:text-red-600  flex"><IconLogOut/><span className=" hidden md:flex">&nbsp;Log Out</span></span>
 
 </>
  )
}

      
        {
        !user &&
        (<>
          <Link href='/explore' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconBookOpen/><span className=" hidden md:flex">&nbsp;Explore</span></span></Link>
          {/* <span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconTag/><span className=" hidden md:flex">&nbsp;Tags</span></span> */}
          {/* <span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-blue-700"><IconBell/><span className=" hidden md:flex">&nbsp;Notification</span></span> */}
        <Link href='/auth' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer text-blue-700  flex hover:text-blue-500"><IconLogIn/><span className=" hidden md:flex">&nbsp;Log In</span></span></Link>
        
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


    <Modal
        title={<span className="text-red-500">Failed</span>}
        description="Try a valid email address"
        visible={visibleFail}
        onCancel={toggleFail}
        onConfirm={toggleFail}
        hideFooter
          >
          </Modal>


          <Modal
        title={<span className="text-green-500">Success</span>}
        description={<h3 className="text-gray-900">Thanks for subscribing to our <span className="font-bold text-blue-900">Newsletter</span></h3>}
        visible={visibleSuccess}
        onCancel={toggleSuccess}
        onConfirm={toggleSuccess}
        hideFooter
          >
          </Modal>
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
