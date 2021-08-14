import { useRouter } from 'next/router'
import supabase from "../../utils/initSupabase";
import {useEffect,useState} from 'react'
import dynamic from 'next/dynamic'


const ReactMarkdown= dynamic(() => import('react-markdown'), { ssr: false })
export default function PostView(){

    const [post,setPost]=useState(null)
    const router=useRouter();
    const {username,title}=router.query;

useEffect(()=>{
getPost()
    async function getPost(){
       const {data}=
            await supabase
            .from('posts')
            .select('title,username,content,category')
            .filter('username','eq',username)
            .filter('title','eq', title===undefined?' ':title.replaceAll('-',' '))
            setPost(data[0])
        
    }
},[title,username])
   


   if (!post) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1 className="text-gray-800 text-3xl mt-20 font-semibold tracking-wide text-center">{post.title}</h1>
      <p className="text-gray-800 text-sm font-light my-4 text-center">by @{post.username}</p>
      <div className="mt-8 text-gray-800">
        {// eslint-disable-next-line react/no-children-prop 
        <ReactMarkdown  className='prose mx-auto' children={post.content} />
        
        }</div>
    </div>
    )
}

