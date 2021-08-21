import { useState, useEffect, useRef } from 'react'
import { Auth, Input, Button, IconSearch, IconMoreHorizontal} from "@supabase/ui";
import supabase from "../utils/initSupabase";
import {useRouter} from 'next/router';
import Loader from "react-loader-spinner";
import ContentCard from "../components/contentcard";
import ActionCard from "../components/ActionAuth";
import {categoryList} from '../constants/categories'

 export default function Explore(props){
    const [loading, setLoading] = useState(true);
    const loadMore=useRef(null);
    const router=useRouter()
    const [posts, setPosts] = useState([])
    const [currentRange, setRange]=useState(10)
    const [currentCategory,setCategory]=useState('programming');

    


  useEffect(() => {
    fetchPosts()
  }, [currentCategory, currentRange])

  async function fetchPosts() {
    const {id}=supabase.auth.user
    if(id){
        router.push('/home')
    }
    else{
      const { data } = await supabase
      .from('posts')
      .select(`category,content,inserted_at,isPrivate,title,user_id, creator: user_id(username,fullname,avatar_url)`)
      .filter('category', 'eq', currentCategory)
      .range(0,currentRange)
   
      if(!data){
        setLoading(false);
      }
      else{
      setLoading(false);
      setPosts(data)
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

    
        return (
        <div className=" mt-10 flex flex-col md:flex-row">
            
            <div className='h-full  md:w-64 w-full  block'>
            <div className=" justify-between py-3 px-2 align-middle border-b mb-2 w-44 hidden md:flex">
              <div className="font-semibold text-green-500">Quick Link</div>
            </div>
<ActionCard/>
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
            {!posts.length?
             (<div className="flex justify-center align-middle mt-10">
              <div className="text-sm flex mx-auto font-medium hover:text-blue-600 text-gray-800 text-center">Nothing Here&nbsp;...</div>
              </div>)
             :
             (posts.map((post, index)=><ContentCard key={index} timestamp={post.inserted_at} name={post.creator.fullname} route={`/${post.creator.username}/${post.title.replaceAll(' ','-')}`} title={post.title} category={`#${post.category}`} useravatar={post.creator.avatar_url}/>))}
            
            </div>


            <div className='w-full md:hidden block shadow border-2 rounded border-blue-600 mt-5 px-1'>
              <div className="flex justify-between py-3 border-b mb-2">
              <div className="font-semibold px-2 text-gray-900 mt-2">Join Big Events 🎊</div>
              <div className=" text-sm cursor-pointer mr-2 bg-blue-600 hover:bg-blue-400 text-white p-2 rounded-sm font-semibold">Browse</div>
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
            <div className=' w-64 hidden md:block shadow border px-1'>
              <div className="flex justify-between py-3 border-b mb-2">
              <div className="font-semibold">Interests</div>
              <div className="font-light text-sm cursor-pointer text-blue-600">More...</div>
            </div>


{/* category */}
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




