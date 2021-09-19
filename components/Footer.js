import React from 'react';
import {Modal} from '@supabase/ui'
import {useState, useEffect, useRef} from 'react'
import supabase from '../utils/initSupabase'
import Link from 'next/link'

export default function Footer(){
    const [user, setUser]=useState(null);
    // early access mail 
    const [email, setEmail]= useState('');
    let buttonStatus= useRef();
    let inputStatus=useRef();
    
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
  



    return(
        <>
    <div className="flex  flex-row flex-wrap justify-between font-mono text-xs text-gray-500 py-10 px-7 w-full mt-10 mb-5 border-t border-gray-200">
      
    <div className="flex mt-5 flex-col flex-nowrap w-28 ">
      <h5 className="text-gray-700 text-sm font-bold mb-3 ">Explore</h5>
      <Link href='/' passHref><span className="mt-1 hover:text-purple-600 cursor-pointer">Home</span></Link>
      <Link href='/explore' passHref><span className="mt-1 hover:text-purple-600 cursor-pointer">Feeds</span></Link>
      <span className="mt-1 border-b-2 border-purple-400 w-16 hover:text-purple-600 cursor-pointer">Pricing</span>
    </div>

    <div className="flex mt-5 flex-col flex-nowrap w-28">
      <h5 className="text-gray-700 text-sm font-bold mb-3">Company</h5>
      <span className="mt-1 hover:text-purple-600 cursor-pointer">About</span>
      <a className="mt-1 hover:text-purple-600 cursor-pointer" href='https://twitter.com/cstory_hq'><span className="mt-1 hover:text-purple-600 cursor-pointer">Twitter</span></a>
      <a className="mt-1 hover:text-purple-600 cursor-pointer" href='https://instagram.com/cstory_hq'><span className="mt-1 hover:text-purple-600 cursor-pointer">Instagram</span></a>
    </div>

    <div className="flex mt-5 flex-col flex-nowrap w-28">
      <h5 className="text-gray-700 text-sm font-bold mb-3">Support</h5>
      <span className="mt-1 hover:text-purple-600 cursor-pointer">Documentation</span>
      <span className="mt-1 hover:text-purple-600 cursor-pointer">Contact</span>
      <span className="mt-1 hover:text-purple-600 cursor-pointer">Request Feature</span>
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
      title={<span className="text-purple-500">Success</span>}
      description={<h3 className="text-gray-900">Thanks for subscribing to our <span className="font-bold text-purple-900">Newsletter</span></h3>}
      visible={visibleSuccess}
      onCancel={toggleSuccess}
      onConfirm={toggleSuccess}
      hideFooter
        >
        </Modal>
<div id="formify" className=" px-7 py-10 w-screen mt-5 mb-5 flex flex-wrap sm:justify-center sm:align-middle border-t border-b border-gray-200 flex-col">

<input ref={inputStatus} value={email} onChange={e=> setEmail(e.target.value)}  placeholder="Email" required type="email" className="pl-2 outline-none border-2 bg-gray-50 border-gray-200 placeholder-gray-500 rounded-md mt-2 mx-auto py-2  w-full md:w-1/3 p-1 text-sm font-normal"/>

<button ref={buttonStatus} onClick={sendEmailAddress} type="button"  className="p-2 outline-none rounded-md text-sm font-normal bg-purple-700 text-white mx-auto mt-2">Subscribe</button>

<div className="font-mono text-gray-500 text-xs font-medium tracking-wide mt-4 mb-4 text-center block">
Receive exclusive updates and tips to make you the best creator...
</div>
</div>

<div className="flex  flex-row flex-wrap justify-between font-mono text-xs text-gray-500 py-5 px-7 w-screen mb-2">
<span className="hover:text-purple-600 cursor-pointer">© Cstory Inc.</span>
<div>
  <span className="hover:text-purple-600 cursor-pointer">Privacy Policy </span>
  &nbsp;
  <span className="hover:text-purple-600 cursor-pointer">Terms</span>
</div>
</div>
</>
)
}