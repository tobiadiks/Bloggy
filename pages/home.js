import { useState, useEffect, useRef, useCallback } from 'react'
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
    const [formattedPosts, setFormattedPosts] = useState()
    const [currentRange, setRange]=useState(10)
    const [currentCategory,setCategory]=useState('programming');
    const [liked,setLike]=useState(false);

    

    



  const fetchPosts=useCallback(()=>{

 Get()
  async function Get() {
    const user = supabase.auth.user()
    const { data } = await supabase
      .from('posts')
      .select(`category,content,inserted_at,isPrivate,title,user_id,id,creator: user_id(username,fullname,avatar_url),featured`)
      .filter('category', 'eq', currentCategory)
      .range(0,currentRange)
      if(!data){
        return null;
      }
      else{
      setPosts(data);
  }
  }

},[currentCategory,currentRange])

useEffect(()=>{
  fetchPosts()
},[fetchPosts])


  
  

//  posts.forEach((value)=>{b.push({...posts,creator:getCreator(value.id)})})

  


    useEffect(()=>{
        getProfile()
        async function getProfile(){
        const {data} = await supabase
        .from('profiles')
        .select('*')
        .filter('id', "eq", supabase.auth.user() === null?" ":supabase.auth.user().id)
        
        if(!data){
          setLoading(false);
        }
        else{
          setLoading(false);
        }
        }
      }
      , [user,loading])

     async function LikeCount(id){
        const {count}= await supabase.from('likes').select('post_id',{count:'exact'}).match(id);
      return count;
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

    if(user){
        return (
        <div className=" mt-10 flex">
            
            <div className='h-full  w-64 hidden md:block'>
            <div className="flex justify-between py-3 px-2 align-middle border-b mb-2 w-44">
              <div className="font-semibold">Recommended</div>
            </div>
<UserCard useravatar={require('../public/profile.png')}/>
<UserCard useravatar={require('../public/profile.png')}/>
<UserCard useravatar={require('../public/profile.png')}/>


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

 {/* category */}<div className='w-full block md:hidden lg:hidden shadow border mb-3 border-b-8'>
 <div className="flex justify-between py-3 border-b mb-2 px-1">
              <div className="font-semibold">Interests</div>
              <div className="font-light text-sm cursor-pointer text-blue-600">More...</div>
            </div>



            <div className="flex flex-wrap px-1">
            {categoryList.map((cat)=><span onClick={()=>setCategory(cat)} key={cat} className="font-extralight text-gray-800 cursor-pointer hover:text-blue-700 mr-2 mb-2">{cat}</span>)}

            </div>
            </div>

{/* posts */}
            <div>
            {!posts.length?
             (<div className="flex justify-center align-middle mt-10">
              <div className="text-sm flex mx-auto font-medium hover:text-blue-600 text-gray-800 text-center">Nothing Here&nbsp;...</div>
              </div>)
             :
              (posts.map((post, index)=><ContentCard key={index} liked={liked} id={post.id} timestamp={post.inserted_at} name={post.creator.fullname} route={`/${post.creator.username}/${post.title.replaceAll(' ','-')}`} title={post.title} category={`#${post.category}`} useravatar={post.creator.avatar_url} featured={post.featured}/>))}
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
                    <div onClick={()=>setRange((value)=>value+10)} className="text-sm flex mx-auto font-medium hover:text-blue-600 text-gray-800 text-center">Load More&nbsp;...</div>
</div>
            </div>
            
            <div className='h-full  w-64 hidden md:block'>
        {/* category */}    <div className=' w-64 hidden md:block shadow border px-1'>
              <div className="flex justify-between py-3 border-b mb-2">
              <div className="font-semibold">Interests</div>
              <div className="font-light text-sm cursor-pointer text-blue-600">More...</div>
            </div>



            <div className="flex flex-wrap">
            
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