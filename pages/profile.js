// pages/profile.js
import { useState, useEffect, useRef } from 'react'
import { Auth, Typography, Button, Modal, IconPlusCircle, IconCamera } from "@supabase/ui";
const { Text } = Typography;
import supabase from "../utils/initSupabase";
import Image from "next/image";
import dynamic from "next/dynamic";
import Loader from "react-loader-spinner";


const DynamicImage=dynamic(()=>import('../components/profilepic'), {ssr:false})


function Profile(props) {

  const initialState={
    user_id:'',
    firstname:'',
    lastname:'',
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
    google:''
  }

  const { user } = Auth.useUser();
  const [profile, setProfile]= useState(initialState);
  const [visible, setVisible] = useState(false);
  const inputButton = useRef();
  const [loading, setLoading] = useState(true);

  function toggle() {
    setVisible(!visible);
  }

  function toggleFileUpload(){
    inputButton.current.click();
  }

  async function handleFileUpload(entry){
  await supabase.storage.from('avatar').upload(`${user.id}/avatar`,entry, { cacheControl: 3600,
    upsert: false})
  }
  
  async function handleFileUploadUpdate(entry){
    await supabase.storage.from('avatar').update(`${user.id}/avatar`,entry, { cacheControl: 3600,
      upsert: false})
    }

  const {
    user_id,
    firstname,
    lastname,
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
  }=profile;

  // profile updates and inputs

useEffect(()=>{
  getProfile()
  async function getProfile(){
  const {data} = await supabase
  .from('profile')
  .select()
  .filter('user_id', "eq", supabase.auth.user() === null?" ":supabase.auth.user().id)
  
  if(!data){
    setLoading(false);
    return null;}
  else{
  setProfile(data[0])
  setLoading(false);
  }
  setLoading(false);
  }
}
, [user,loading])



function onChange(e){
setProfile({...profile,user_id:user.id,[e.target.name]: e.target.value})
}




const {publicURL}=supabase.storage.from('avatar').getPublicUrl(`${user_id}/avatar`);
async function ProfilePictureSubmit(e){
  const {publicURL}=await supabase.storage.from('avatar').getPublicUrl(`${user_id}/avatar`);
  if(!publicURL.length){
    handleFileUpload(e.target.files[0])
   await toggle()
  }
  else{
  handleFileUploadUpdate(e.target.files[0]);
  await toggle()
  }

}


async function setUpdate(){
await supabase
.from('profile')
.update([
{
  
  firstname,
  lastname,
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
])
.match({user_id})
}

async function setInsert(){
  await supabase.from('profile')
  .insert(
    [
      {
  user_id,
  firstname,
  lastname,
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
  .from('profile')
  .select('user_id')
  .match({user_id})
  if(!data.length){
    setInsert()
  }
  else{
  setUpdate()
  }

  toggle()
}



while (loading){
return (<div className="flex justify-center align-middle mt-20">
            <p className="text-xl mt-5 mx-auto text-gray-800 text-center">
            <Loader
        type="Puff"
        color="rgba(31,41,55)"
        height={80}
        width={80}
        
      />
            </p>
        </div>)
}

  if (user)
    return (
      <div className="mt-20">
        {/* profile starts */}


        {/* profile container starts */}
        {/* Loader Condition Opens */}


        <div className="flex w-full mb-12 flex-col md:flex-row lg:flex-row">
          {/* container 1 start*/}

          <div className="flex flex-col w-full md:w-1/2 lg:w-1/2 mr-0 md:mr-4 lg:mr-4">
            <div className="mb-5 flex justify-center border-t-8 border-gray-700 pt-6 rounded-t-md">
              {/* imagepic */}
              <DynamicImage src={`${publicURL}`}/>
              <IconCamera onClick={toggleFileUpload}/>

              <input onChange={ProfilePictureSubmit} accept="image/*" style={{display:'none'}} ref={inputButton} type='file'/>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row justify-between">
              <div className="flex mt-4 flex-col w-full md:w-1/2 lg:w-1/2">
                <label className="text-gray-500 text-xs font-bold">
                  First Name
                </label>
                <input
                  value={firstname}
                  onChange={onChange}
                  name="firstname"
                  className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                  type="text"
                />
              </div>
              <div className="flex mt-4 flex-col">
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
              </div>
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
                <span className="my-auto ml-5 text-blue-500 text-xs font-medium cursor-pointer line-through">
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
              <label className="text-gray-500 text-xs font-bold">Phone</label>
              <input
                value={phone}
                onChange={onChange}
                name="phone"
                className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                type="phone"
              />
            </div>

            <div className="flex flex-col mt-4">
              <label className="text-gray-500 text-xs font-bold">Address</label>
              <input
                value={address}
                onChange={onChange}
                name="address"
                className="border border-gray-300 rounded-sm text-md py-2 pl-1 outline-none text-gray-700 font-extralight"
                type="text"
              />
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
        <Button className="mt-5 h-10" onClick={Submit} block>
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
