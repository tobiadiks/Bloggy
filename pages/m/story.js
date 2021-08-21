// pages/cstory.js
import { useState, useEffect } from 'react'
import Link from 'next/link'
import supabase from "../../utils/initSupabase";
import { Auth, Input, Button, IconSearch, IconMoreHorizontal} from "@supabase/ui";
import Loader from "react-loader-spinner";

 function MyPosts(props) {
  const [posts, setPosts] = useState([])
  const [username, setUserName]=useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
  }, [posts])

  async function fetchPosts() {
    const user = supabase.auth.user()
    const { data } = await supabase
      .from('posts')
      .select(`id,category,content,inserted_at,isPrivate,title,user_id, creator: user_id(username,fullname)`)
      .filter('user_id', 'eq', user.id)
      // .range(0,currentRange)
      if(!data){
        setLoading(false)
        return null;
        
      }
      else{
      setPosts(data);
      setLoading(false)
  }
  }

  async function deletePost(id,title) {
    await supabase
      .from('posts')
      .delete()
      .match({ id,title })
    fetchPosts()
  }

  useEffect(()=>{
    getUserName()
    
        async function getUserName(){
        const user = await supabase.auth.user()
        if (user){
        const {data} = await supabase
        .from('profiles')
        .select('*')
        .filter('id', 'eq', user.id)
        setUserName(data[0].username)
        }
      
      }
    }, [username])

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

  if (username)  {
  return (
    <div>
      <h1 className="text-gray-800 text-3xl font-semibold tracking-wide mt-20 mb-2 text-center">My Story</h1>
      <div className="flex flex-wrap mt-7 w-full justify-start">
      
      
      {
        posts.map((post,index) => (
          <div key={index} className="w-full md:w-1/4 mr-0 md:mr-1 h-auto p-2 rounded shadow-md border cursor-pointer hover:shadow-lg mb-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
            <Link href={`/m/edit/${post.title.replaceAll(' ', '-')}`} passHref={true}><a className="text-sm mr-4 text-blue-500">Edit</a></Link>
            <Link href={`/${post.creator.username}/${post.title.replaceAll(' ','-')}`} passHref={true}><a className="text-sm mr-4 text-blue-500">View</a></Link>
            <button
              className="text-sm mr-4 text-red-500"
              onClick={() => deletePost(post.id,post.title)}
            >Delete</button>
          </div>
        ))
      }


      </div>
    </div>
  )}

  else {
    return props.children;
  }

}


export default function AuthProfile() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <MyPosts supabaseClient={supabase}>
        <Auth
          className="mt-20"
          supabaseClient={supabase}
          providers={["github","google"]}
          socialLayout="horizontal"
        />
      </MyPosts>
    </Auth.UserContextProvider>
  );
}