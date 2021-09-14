import React from 'react';
import Link from 'next/link';
import {IconBell, IconLogIn, IconTag, IconMenu, IconLogOut, IconBookOpen, IconUser, IconPlus, IconHome, IconEdit} from '@supabase/ui'

const SideNav=()=>{
    return(
        <div className="h-full  w-64 hidden md:block">
          <div className="flex justify-between py-3 px-2 align-middle border-b mb-2 w-44">
            <div className="font-semibold">Links</div>
          </div>

          {/* {follow ? (
            follow.map((connection) => (
              <UserCard
                key={connection.id}
                fullname={connection.fullname}
                username={connection.username}
                useravatar={connection.avatar_url}
              />
            ))
          ) : (
            <p>Opps you don&apos;t a connection yet!</p>
          )} */}
          <>
    <Link href='/new' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer text-purple-500  flex hover:text-purple-700 my-3 font-semibold"><IconPlus/><span className=" hidden md:flex">&nbsp;&nbsp;&nbsp;New</span></span></Link>
    {/* <Link href='/home' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer font-semibold flex hover:text-purple-700 my-3"><IconHome/><span className=" hidden md:flex">&nbsp;&nbsp;&nbsp;Home</span></span></Link> */}
   <Link href={`/m/story`} passHref={true}><span className="mr-4 md:mr-6 font-semibold cursor-pointer flex hover:text-purple-700 my-3"><IconEdit/><span className=" hidden md:flex">&nbsp;&nbsp;&nbsp;Edits</span></span></Link>
    {/* <span className="mr-6 cursor-pointer  hidden md:flex hover:text-purple-700"><IconTag/>&nbsp;Tags</span> */}
  {/* <span className="mr-4 md:mr-6 cursor-pointer  flex hover:text-purple-700"><IconBell/><span className=" hidden md:flex">&nbsp;Notification</span></span> */}
    <Link href='/profile' passHref={true}><span className="mr-4 md:mr-6 cursor-pointer font-semibold flex hover:text-purple-700 my-3"><IconUser/><span className=" hidden md:flex">&nbsp;&nbsp;&nbsp;Profile</span></span></Link>
    {/* <span onClick={SignOut} className="mr-0 md:mr-6 cursor-pointer text-purple-700 hover:text-red-600  flex"><IconLogOut/><span className=" hidden md:flex">&nbsp;Log Out</span></span> */}
 </>

        </div>
    )
}

export default SideNav;