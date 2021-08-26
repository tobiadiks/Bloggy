
// pages/cstory.js
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import supabase from "../../utils/initSupabase";
import { useRouter } from 'next/dist/client/router';
import { Auth, Input, Button, IconSearch, IconMoreHorizontal} from "@supabase/ui";
import Loader from "react-loader-spinner";
import ContentCard from '../../components/contentcard';

const DynamicImage=dynamic(()=>import('../../components/profilepic'), {ssr:false});

 export default function Index(props) {
  const [posts, setPosts] = useState([])
  const [userProfile, setUserProfile]=useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {username}=router.query;

  useEffect(()=>{
    getUserProfile()
    
        async function getUserProfile(){
        const profile = await supabase
        .from('profiles')
        .select('*')
        .filter('username', 'eq', username);

        if(!profile.data){
            router.push('/404');
          }
          else{
            setUserProfile(profile.data[0]);
            const { data } = await supabase
            .from('posts')
            .select(`id,category,content,inserted_at,isPrivate,title,user_id, creator: user_id(username,fullname,avatar_url)`)
            .filter('user_id', 'eq', userProfile?userProfile.id:'');
            // .range(0,currentRange)
            if(!data){
              return null;
            }
            else{
            setPosts(data);
            setLoading(false);
      }
        
      }

    }
}, [router,username,userProfile]);


  

  

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

      
          return(<div className='mt-20'>
          <div className="flex flex-col md:flex-row w-full  mr-0 md:mr-4 lg:mr-4">
        <div className='w-full sm:h-auto md:h-72 md:w-1/2 border border-gray-200 mb-8'>
            profile here
        </div>

        <div className='w-full h-auto md:h-screen md:ml-16 overflow-y-scroll md:w-full'>
        <div>
            {!posts.length?
             (<div className="flex justify-center align-middle mt-10">
              <div className="text-sm flex mx-auto font-medium hover:text-purple-600 text-gray-800 text-center">Nothing Here&nbsp;...</div>
              </div>)
             :
             (posts.map((post, index)=><ContentCard key={index} timestamp={post.inserted_at} name={post.creator.fullname} route={`/${post.creator.username}/${post.title.replaceAll(' ','-')}`} title={post.title} category={`#${post.category}`} useravatar={post.creator.avatar_url} featured={post.featured} username={post.creator.username}/>))}
            
            </div>

        </div>
          </div>
          </div>)
      }



