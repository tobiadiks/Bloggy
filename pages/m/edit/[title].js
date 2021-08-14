// pages/edit-post/[id].js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {Select, Checkbox, Input} from '@supabase/ui'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import supabase from "../../../utils/initSupabase";
import {categoryList} from '../../../constants/categories'
import Loader from "react-loader-spinner";

const SimpleMDEX = dynamic(() => import('react-simplemde-editor'), { ssr: false })

function EditPost() {
  const [post, setPost] = useState(null)
  const router = useRouter()
  const {title}=router.query;
  const [checked, setChecked]=useState(false)
  const [username, setUserName]=useState(null);
  const [loading, setLoading] = useState(true);

  
  function handleOnChange() {
    setChecked(!checked);
  }

  useEffect(() => {
    fetchPost()
    async function fetchPost() {
      if (username){
      const { data } = await supabase
        .from('posts')
        .select("*")
        .filter('username', 'eq', username)
        .filter('title','eq',title.replaceAll('-',' '))
      setPost(data[0]);
      setLoading(false);
      }
      
    }
  }, [username,title,router])

  useEffect(()=>{
    getUserName()
    
        async function getUserName(){
        const user = await supabase.auth.user()
        if (user){
        const {data} = await supabase
        .from('profile')
        .select('*')
        .filter('user_id', 'eq', user.id)
        setUserName(data[0].username)
        setLoading(false)
        }
        else{
          router.push('/auth')
        }
      
      }
    }, [username, router])
  
  if (!post) return null

  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }
  
  async function updateCurrentPost() {
    if (!post.title || !post.title) return
    await supabase
      .from('posts')
      .update([
          { title:post.title, content:post.content, isPrivate:post.isPrivate, category:post.category}
      ])
      .match({ id:post.id })
    router.push('/scrawl')
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
    <div>
      <h1 className="text-gray-800 text-3xl font-semibold tracking-wide mt-20 mb-2">Edit post</h1>
      <Input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className=" text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 "
      /> 

<div className="mt-5 mb-5">
<Select name='category' value={post.category}  onChange={onChange}>
{categoryList.map((cat)=><Select.Option key={cat}>{cat}</Select.Option>)}
</Select>
</div>
     <div><SimpleMDEX  className="text-gray-800" value={post.content} onChange={value => setPost({ ...post, content: value })} /></div>
      <div className="mt-5 mb-5">
<Checkbox
          checked={post.isPrivate}
          label="Private"
          description="This will make your post visible to who you want"
          name="isPrivate"
          onChange={handleOnChange}
        />
</div>
     
      <button
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={updateCurrentPost}>Update Post</button>
    </div>
  )
}

export default EditPost