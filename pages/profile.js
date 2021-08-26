// pages/profile.js
import { useState, useEffect, useRef } from 'react'
import { Auth, Button, Modal, IconCamera , Input} from "@supabase/ui";
import supabase from "../utils/initSupabase";
import dynamic from "next/dynamic";
import Loader from "react-loader-spinner";
import {useRouter} from 'next/router'





const DynamicImage=dynamic(()=>import('../components/profilepic'), {ssr:false});


function Profile(props) {

  const initialState={
    id:'',
    avatar_url:null,
    fullname:'',
    phone:'',
    address:'',
    bio:'',
    country:'',
    gender:'',
    dateofbirth:'',
    language:'',
    twitter:'',
    facebook:'',
    linkdin:'',
    google:'',
    username:''
  }

  const { user } = Auth.useUser();
  const [profile, setProfile]= useState(initialState);
  const [visible, setVisible] = useState(false);
  const inputButton = useRef();
  const [loading, setLoading] = useState(true);
  const [currentUserName, setCurrentUserName]= useState('')
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const router = useRouter();
  

  function toggle() {
    setVisible(!visible);
  }

  function toggleFileUpload(){
    inputButton.current.click();
  }

  // async function handleFileUpload(entry){
  // await supabase.storage.from('avatars').upload(`${user.id}/avatar`,entry, { cacheControl: 3600,
  //   upsert: false})
  // }
  
  async function handleImageUploadUpdate(e){
    await supabase.storage.from('avatars').update(`${user.id}/avatar`,e.target.files[0], { cacheControl: 3600,
      upsert: false});
toggle();
    }

  const {
    id,
    avatar_url,
    fullname,
    phone,
    address,
    bio,
    country,
    gender,
    dateofbirth,
    language,
    twitter,
    facebook,
    linkdin,
    google,
    username
  }=profile?profile:initialState;

  // profile updates and inputs

useEffect(()=>{
  getProfile()
  async function getProfile(){
  const loggedInUser=await supabase.auth.user()  
  if(loggedInUser){
  const {data} = await supabase
  .from('profiles')
  .select('*')
  .filter('id', "eq", supabase.auth.user() === null?" ":supabase.auth.user().id)
  
  
  if(!data.length){
    await supabase.storage.from('avatars').upload(`${supabase.auth.user().id}/avatar`,'../public/profile.png', { cacheControl: 3600,
      upsert: false});
   let picture=await supabase.storage.from('avatars').getPublicUrl(`${supabase.auth.user().id}/avatar`);
   await supabase.from('profiles').insert([{id:loggedInUser.id,avatar_url:picture.publicURL}]);
    setLoading(false);
  }
  else{
  setProfile(data[0])
  setCurrentUserName(!data.length?" ":data[0].username)
  setLoading(false);
  }

  
}

else{
  router.push('/auth')
}

  }
}
, [loading,router])



function onChange(e){
setProfile({...profile,id:user.id,[e.target.name]: e.target.value})
}








async function setUpdate(){
await supabase
.from('profiles')
.update([
{
  fullname,
  phone,
  address,
  bio,
  country,
  gender,
  dateofbirth,
  language,
  twitter,
  facebook,
  linkdin,
  google,
  
}
])
.match({id})
}

async function setInsert(){
  await supabase.from('profiles')
  .insert(
    [
      {
  id:supabase.auth.user().id,
  fullname,
  phone,
  address,
  bio,
  country,
  gender,
  dateofbirth,
  language,
  twitter,
  facebook,
  linkdin,
  google
      }
    ]
  )
  }
  
async function Submit(){
  const {data} = await supabase
  .from('profiles')
  .select('id')
  .match({id})
  if(!data.length){
    setInsert()
  }
  else{
  setUpdate()
  }

  toggle()
}


async function InsertUsername(){
  if (username){
    const {data}= await supabase.from('profiles').select('username').filter('username', 'eq',currentUserName)
    if ((currentUserName.length<=2)||(data.length)){
      setUsernameAvailable(false)
      setIsTooltipVisible(true)
      
    }
    else{
      setUsernameAvailable(true)
  await supabase.from('profiles').update([{username:currentUserName}]).match({id})
  setIsTooltipVisible(true)
  router.push('/profile')
}
  }
  else{
    const {data}= await supabase.from('profiles').select('username').filter('username', 'eq',currentUserName)
    if ((currentUserName.length<=2)||(data.length)){
      setUsernameAvailable(false)
      setIsTooltipVisible(true)
      
      
    }
    else{
      setUsernameAvailable(true)
  await supabase.from('profiles').update([{username:currentUserName}]).match({id})
  setIsTooltipVisible(true)
  router.push('/profile')
}
  }
}


while (loading){
return (<div className="flex justify-center align-middle mt-20">
            <div className="text-xl mt-5 mx-auto text-gray-800 text-center">
            <Loader
        type="Puff"
        color="rgba(31,41,55)"
        height={80}
        width={80}
        
      />
            </div>
        </div>)
}

  if (user)
    return (
      <div className="mt-10">
        {/* profile starts */}


        {/* profile container starts */}
        {/* Loader Condition Opens */}


        <div className="flex w-full mb-12 flex-col md:flex-row lg:flex-row">
          {/* container 1 start*/}

          <div className="flex flex-col w-full md:w-1/2 lg:w-1/2 mr-0 md:mr-4 lg:mr-4">
            <div className="mb-5 flex justify-center border-t-8 border-gray-900 pt-6 rounded-t-md">
              {/* imagepic */}
              <DynamicImage src={profile.avatar_url}/>
              <IconCamera onClick={toggleFileUpload}/>
              <input onChange={handleImageUploadUpdate} accept="image/*" style={{display:'none'}} ref={inputButton} type='file'/>
            </div>

            <div className="flex flex-col mt-4">
              <label className="text-gray-500 text-xs font-bold">Username</label>
             <div className='flex justify-between'>
              <input
                minLength='3'
                value={`${currentUserName?currentUserName:''}`}
                name="username"
                className="border mr-4 border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight w-3/4"
                type="text"
                onChange={(e)=>setCurrentUserName(e.target.value)}
              />

            { <div className="bg-gray-900 hover:bg-purple-600 p-2 text-md rounded-sm text-white font-medium animate-pulse cursor-pointer" onClick={InsertUsername}>{`${usernameAvailable?'Saved':'Check'}`}</div>}
              
              </div>
            <div className={`${isTooltipVisible?'block':'hidden'}`}>{usernameAvailable?<div className='text-xs font-light text-purple-600'>Username Saved</div>:<div className='text-xs font-light text-red-600'>Username Taken, Minimum of 3 Character</div>}</div>
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row justify-between">         
              <div className="flex mt-4 flex-col w-full ">
                <label className="text-gray-500 text-xs font-bold">
                  Full Name
                </label>
                <input
                  value={fullname}
                  onChange={onChange}
                  name="fullname"
                  className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                  type="text"
                />
              </div>
              {/* <div className="flex mt-4 flex-col">
                <label className="text-gray-500 text-xs font-bold">
                  Last Name
                </label>
                <input
                  value={lastname}
                  onChange={onChange}
                  name="lastname"
                  className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                  type="text"
                />
              </div> */}
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-gray-500 text-xs font-bold">Bio</label>
              <input
                value={bio}
                onChange={onChange}
                name="bio"
                className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                type="text"
              />
            </div>

            <div className="flex flex-col mt-4">
              <label className="text-gray-500 text-xs font-bold">
                Password
              </label>
              <div className="flex flex-row align-middle">
                <input
                  readOnly
                  value="xxxxxx"
                  name="password"
                  className="border border-gray-300 rounded-sm text-md py-2 pl-1 w-1/2 outline-none text-gray-700 font-extralight"
                  type="password"
                />
                <span className="my-auto ml-5 text-purple-500 text-xs font-medium cursor-pointer line-through">
                  CHANGE PASSWORD
                </span>
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <label className="text-gray-500 text-xs font-bold">Email</label>
              <input
                readOnly
                value={user.email}
                name="email"
                className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                type="email"
              />
            </div>


            <div className="flex flex-col mt-4">
              <label className="text-gray-500 text-xs font-bold">Country</label>
              <input
                value={country}
                onChange={onChange}
                name="country"
                className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                type="text"
              />
            </div>
          </div>

          {/* container 1 end */}

          {/* 2 and 3 */}
          <div className="w-full md:w-1/2 flex justify-between mt-0 md:mt-5 lg:mt-5 flex-col md:flex-row lg:flex-row ">
            {/* container 2 start*/}
            <div className="flex flex-col w-full mr-2">
              <div className="flex flex-col mt-4 md:mt-0 lg:mt-0">
                <label
                  
                  className="text-gray-500 text-xs font-bold"
                >
                  Gender
                </label>
                <select value={gender} name="gender" onChange={onChange} className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight">
                <option value="--">--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="flex flex-col mt-4">
                <label className="text-gray-500 text-xs font-bold">
                  Date of Birth
                </label>
                <div>
                  <input
                    value={dateofbirth}
                    onChange={onChange}
                    name="dateofbirth"
                    className="border border-gray-300 w-full rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                    type="date"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-6">
                <label className="text-gray-500 text-xs font-bold">
                  Twitter
                </label>
                <input
                  value={twitter}
                  onChange={onChange}
                  name="twitter"
                  className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                  type="text"
                />
              </div>

              <div className="flex flex-col mt-4">
                <label className="text-gray-500 text-xs font-bold">
                  Facebook
                </label>
                <input
                  value={facebook}
                  onChange={onChange}
                  name="facebook"
                  className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                  type="text"
                />
              </div>
            </div>
            {/* container 2 ends */}

            {/* container 3 starts */}
            <div className="flex flex-col-reverse md:flex-col lg:flex-col">
              <div className="flex flex-col">
                <label className="text-gray-500 text-xs mt-4 md:mt-0 lg:mt-0 font-bold">
                  Language
                </label>
                <input
                  value={language}
                  onChange={onChange}
                  name="language"
                  className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                  type="text"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-500 text-xs mt-4 md:mt-24 lg:mt-24 font-bold">
                  Linked In
                </label>
                <input
                  value={linkdin}
                  onChange={onChange}
                  name="linkdin"
                  className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                  type="text"
                />
              </div>

              <div className="flex flex-col mt-4">
                <label className="text-gray-500 text-xs font-bold">
                  Google
                </label>
                <input
                  value={google}
                  onChange={onChange}
                  name="google"
                  className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                  type="text"
                />
              </div>
            </div>

            {/* container 3 ends */}
          </div>
         

          {/* 2 and 3 end */}
        </div>
        

        
        {/* profile container ends */}
        {/* button */}
        <div style={{display:`${loading?'none':'block'}`}}>
        <Button className="mt-5 h-10 bg-purple-700" onClick={Submit} block>
            Save
          </Button>

          <Modal
          title="Successful"
        description="Updated Successfully!!!"
        visible={visible}
        onCancel={toggle}
        onConfirm={toggle}
        hideFooter
          >
          </Modal>
       
          <Button danger block className="mt-5 h-10"  onClick={() => props.supabaseClient.auth.signOut()}>
            Sign out
          </Button>
        </div>
        {/* button end */}
      </div>
      // profile ends
    );


else{

  return props.children;
}
}


export default function AuthProfile() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Profile supabaseClient={supabase}>
        <Auth
          className="mt-20"
          supabaseClient={supabase}
          providers={["github","google"]}
          socialLayout="horizontal"
        />
      </Profile>
    </Auth.UserContextProvider>
  );
}
