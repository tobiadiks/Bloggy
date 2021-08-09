// pages/edit-post/[id].js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {Select, Checkbox, Input} from '@supabase/ui'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import supabase from "../../../utils/initSupabase";
import {categoryList} from '../../../constants/categories'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

function EditPost() {
  const [post, setPost] = useState(null)
  const router = useRouter()
  const {username,title}=router.query;
  const {category, content, isPrivate } = post
  const [checked, setChecked]=useState(false)

  
  function handleOnChange() {
    setChecked(!checked);
  }

  useEffect(() => {
    fetchPost()
    async function fetchPost() {
      if (!id) return
      const { data } = await supabase
        .from('posts')
        .select("*")
        .filter('id', 'eq', username)
        .filter('title','eq',title)
        
      setPost(data[0])
    }
  }, [username,title])
  
  if (!post) return null
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }
  
  async function updateCurrentPost() {
    if (!post.title || !content) return
    await supabase
      .from('posts')
      .update([
          { title:post.title, content:post.content}
      ])
      .match({ id })
    router.push('/scrawl')
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
<Select name='category'  onChange={onChange}>
{categoryList.map((cat)=><Select.Option key={cat}>{cat}</Select.Option>)}
</Select>
</div>
      <SimpleMDE className="text-gray-800" value={post.content} onChange={value => setPost({ ...post, content: value })} />
      <div className="mt-5 mb-5">
<Checkbox
          checked={checked}
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

// export default EditPost