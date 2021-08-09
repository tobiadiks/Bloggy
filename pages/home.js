import { useState, useEffect, useRef } from 'react'
import { Auth, Input, Button, IconSearch, IconMoreHorizontal} from "@supabase/ui";
import supabase from "../utils/initSupabase";
import {useRouter} from 'next/router';
import Loader from "react-loader-spinner";
import UserCard from "../components/usercard";
import ContentCard from "../components/contentcard";
import {categoryList} from '../constants/categories'

 function Home(props){
    const { user } = Auth.useUser();
    const [loading, setLoading] = useState(true);
    const loadMore=useRef(null);
    const router=useRouter()
    const [posts, setPosts] = useState([])
    const [currentCategory,setCategory]=useState('programming');

    


  useEffect(() => {
    fetchPosts()
  }, [currentCategory])

  async function fetchPosts() {
    const user = supabase.auth.user()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .filter('category', 'eq', currentCategory)
    setPosts(data)
  }


    useEffect(()=>{
        getProfile()
        async function getProfile(){
        const {data} = await supabase
        .from('profile')
        .select()
        .filter('user_id', "eq", supabase.auth.user() === null?" ":supabase.auth.user().id)
        
        if(!data){
          setLoading(false);
        }
        else{
        setLoading(false);
        }
        }
      }
      , [user,loading])


    

      

      
        
      


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

    if(user){
        return (
        <div className=" mt-10 flex">
            
            <div className='h-full  w-64 hidden md:block'>
            <div className="flex justify-between py-3 px-2 align-middle border-b mb-2 w-44">
              <div className="font-semibold">Recommended</div>
            </div>
<UserCard useravatar={require('../public/profile.jpg')}/>
<UserCard useravatar={require('../public/profile.jpg')}/>
<UserCard useravatar={require('../public/profile.jpg')}/>
<UserCard useravatar={require('../public/profile.jpg')}/>
<UserCard useravatar={require('../public/profile.jpg')}/>
<UserCard useravatar={require('../public/profile.jpg')}/>


<div className="font-light text-sm cursor-pointer text-blue-600">See more...</div>
            </div>



            <div className=" w-full md:px-2 px-0 md:w-3/4 ">
            <div className="flex justify-between align-middle py-3 px-2 border-b mb-2">
              <div className="font-semibold mr-2">Posts</div>
              <div className="font-light text-sm cursor-pointer text-blue-600">
<Input
  className="h-1"
  actions={[
        <Button key='search' size="tiny" type="link" icon={<IconSearch />}>
          Search
        </Button>]}
/>
              </div>
            </div>

{/* posts */}
            <div>
            {
             (<div className="flex justify-center align-middle mt-10">
              <div className="text-sm flex mx-auto font-medium hover:text-blue-600 text-gray-800 text-center">Nothing Here&nbsp;...</div>
              </div>)
             &&
              (posts.map((post)=><ContentCard key={post.id} timestamp={post.inserted_at} username={post.username} route={`/${post.username}/${post.title.replaceAll(' ','-')}`} title={post.title} category={post.category} useravatar={require('../public/profile.jpg')}/>))}
            </div>


            <div className='w-full md:hidden block shadow border-2 rounded border-blue-600 mt-5 px-1'>
              <div className="flex justify-between py-3 border-b mb-2">
              <div className="font-semibold text-blue-600 p-2">Join Big Events 🎊</div>
              <div className=" text-sm cursor-pointer bg-blue-600 hover:bg-blue-400 text-white p-2 rounded-sm font-semibold">Browse</div>
            </div>



            <div className="flex p-2 flex-wrap">
            <span className="font-medium text-gray-800">
            Be part of events & hackathons, building careers and leveraging your skill by taking internships & browsing job openings from top companies.
            </span>
            </div>
            </div>

{/* loading more */}
            {/* <div ref={loadMore} className="flex justify-center align-middle mt-20">
                    <div className="text-xl mt-5 mx-auto text-gray-800 text-center">
                    <Loader
                type="Puff"
                color="rgba(31,41,55)"
                height={30}
                width={30}
                
              />
                    </div>
                </div> */}

                <div ref={loadMore} className="flex justify-center align-middle mt-10">
                    <div className="text-sm flex mx-auto font-medium hover:text-blue-600 text-gray-800 text-center">Load More&nbsp;...</div>
</div>
            </div>
            
            <div className='h-full  w-64 hidden md:block'>
            <div className=' w-64 hidden md:block shadow border px-1'>
              <div className="flex justify-between py-3 border-b mb-2">
              <div className="font-semibold">Interests</div>
              <div className="font-light text-sm cursor-pointer text-blue-600">More...</div>
            </div>


{/* category */}
            <div className="flex flex-wrap">
            <span className="font-extralight text-white bg-blue-700 px-2  rounded-sm cursor-pointer hover:text-blue-200 mr-2 mb-2">featured</span>
            {categoryList.map((cat)=><span onClick={()=>setCategory(cat)} key={cat} className="font-extralight text-gray-800 cursor-pointer hover:text-blue-700 mr-2 mb-2">{cat}</span>)}

            </div>
            </div>



            <div className=' w-64 hidden md:block shadow border-2 rounded border-blue-600 mt-5 px-1'>
              <div className="flex justify-between py-3 border-b mb-2">
              <div className="font-semibold text-blue-600 p-2">Join Big Events 🎊</div>
              <div className=" text-sm cursor-pointer bg-blue-600 hover:bg-blue-400 text-white p-2 rounded-sm font-semibold">Browse</div>
            </div>



            <div className="flex p-2 flex-wrap">
            <span className="font-light text-gray-800">
            Be part of events & hackathons, building careers and leveraging your skill by taking internships & browsing job openings from top companies.
            </span>
            </div>
            </div>

</div>



        </div>

        
    )
}
else{
    return props.children
}
}


export default function AuthProfile() {
    return (
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Home supabaseClient={supabase}>
          <Auth
            className="mt-20"
            supabaseClient={supabase}
            providers={["github","google"]}
            socialLayout="horizontal"
          />
        </Home>
      </Auth.UserContextProvider>
    );
  }