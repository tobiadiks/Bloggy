import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import {IconBell, IconLogIn, IconTag, IconMenu, IconLogOut, IconBookOpen, IconUser, IconPlus, IconHome, IconEdit} from '@supabase/ui'
import supabase from '../utils/initSupabase';
import {useRouter} from 'next/router'




export default  function GlobalNavigation(){
const [username, setUserName]=useState('');
const [user, setUser]=useState(null);
const router= useRouter();
  useEffect(()=>{
    getUserName()
    
        async function getUserName(){
        const user = await supabase.auth.user();
        setUser(user);
        if(user){
        const {data} = await supabase
        .from('profiles')
        .select('*')
        .filter('id', 'eq', user.id)
      setUserName(!data.length?" ":data[0].username)}
      }
    }
      ,[user]);

      async function SignOut(){
        await supabase.auth.signOut()
        router.push('/')
      }


    return(<>
        <nav className="text-gray-800 p-5 border-b border-gray-100 bg-gray-50 fixed w-screen z-50 flex justify-between flex-row top-0">
<Link href={username?`/${username}`:'/'} passHref={true}><span className="cursor-pointer text-lg font-medium text-purple-700 flex handwriting">C<span className='text-gray-700 text-md'>story</span></span></Link>

      <div className="text-xs font-medium flex flex-row align-middle">
      {
  user && (<>
    <Link href='/new' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer text-purple-500  flex hover:text-purple-700"><IconPlus/><span className=" hidden md:flex">&nbsp;New</span></span></Link>
    {/* <Link href='/home' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-purple-700"><IconHome/><span className=" hidden md:flex">&nbsp;Home</span></span></Link> */}
   <Link href={`/m/story`} passHref={true}><span className="mr-4 md:mr-6 cursor-pointer flex hover:text-purple-700"><IconEdit/><span className=" hidden md:flex">&nbsp;Edits</span></span></Link>
    {/* <span className="mr-6 cursor-pointer  hidden md:flex hover:text-purple-700"><IconTag/>&nbsp;Tags</span> */}
  {/* <span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-purple-700"><IconBell/><span className=" hidden md:flex">&nbsp;Notification</span></span> */}
    <Link href='/profile' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-purple-700"><IconUser/><span className=" hidden md:flex">&nbsp;Profile</span></span></Link>
    <span onClick={SignOut} className="mr-0 md:mr-6 cursor-pointer text-purple-700 hover:text-red-600  flex"><IconLogOut/><span className=" hidden md:flex">&nbsp;Log Out</span></span>
 
 </>
  )
}

      
        {
        !user &&
        (<>
          <Link href='/explore' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-purple-700"><IconBookOpen/><span className=" hidden md:flex">&nbsp;Explore</span></span></Link>
          {/* <span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-purple-700"><IconTag/><span className=" hidden md:flex">&nbsp;Tags</span></span> */}
          {/* <span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-purple-700"><IconBell/><span className=" hidden md:flex">&nbsp;Notification</span></span> */}
        <Link href='/auth' passHref={true}><span className=" md:mr-6 cursor-pointer text-purple-700  flex hover:text-purple-500"><IconLogIn/><span className=" hidden md:flex">&nbsp;Log In</span></span></Link>
        
       {/* /profile to / */}
        </>
        )
        }
        

      </div>
      </nav>
      </>
    )
}