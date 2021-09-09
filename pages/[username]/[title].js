import { useRouter } from 'next/router'
import supabase from "../../utils/initSupabase";
import {useEffect,useState} from 'react'
import dynamic from 'next/dynamic'
import Loader from "react-loader-spinner";
import Header from '../../components/Header';



const ReactMarkdown= dynamic(() => import('react-markdown'), { ssr: false })
export default function PostView(){

    const [post,setPost]=useState(null)
    const [creator, setCreator]=useState(null)
    const router=useRouter();
    const [loading, setLoading] = useState(true);
    const {username,title}=router.query;

useEffect(()=>{
getCreator()

    async function getCreator(){
      const {data}=
      await supabase
      .from('profiles')
      .select('username,id')
      .filter('username', 'eq',username) ;
    await setCreator(!data.length?null:data[0].id)
      
    }

},[title,username])

useEffect(()=>{
  getPost()
  async function getPost(){
  const {data}=
  await supabase
  .from('posts')
  .select('title,content,user_id,creator: user_id(fullname,username)')
  .filter('user_id','eq',creator)
  .filter('title','eq',title===undefined?' ':title.replaceAll('-',' '))
 await  setPost(!data?null:data[0])
  if(data){
    setLoading(false)
  }
  }
},[creator,title])

   


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

   if (post===undefined) {
    return <div className="text-gray-800 text-3xl mt-20 px-5 font-semibold tracking-wide text-center">Not found</div>
  }
  return (
    <div className="px-5">
    <Header title={`${post.creator.username}-${post.title}`}/>

      <h1 className=" text-3xl mt-20 font-bold tracking-wide text-left text-purple-800 md:text-center">{post.title}</h1>
      <p className="text-gray-800 text-sm font-medium cursor-pointer my-4 text-center">{post.creator.fullname}</p>
      <div className="mt-8 text-gray-800">
        {// eslint-disable-next-line react/no-children-prop 
        <ReactMarkdown  className='prose mx-auto' children={post.content} />
        
        }</div>
    </div>
    )
}

