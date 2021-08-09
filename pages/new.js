// pages/new.js
import { useState , useEffect} from 'react'
import {Select, Checkbox, Input} from '@supabase/ui'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import supabase from "../utils/initSupabase";
import {categoryList} from '../constants/categories'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
const initialState = { title: '', content: '',category:'' }

function New() {
  const [post, setPost] = useState(initialState)
  const { title,category, content, isPrivate } = post
  const router = useRouter()
  const [username, setUserName]=useState('')
  const [checked, setChecked]=useState(false)

  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }

  function handleOnChange() {
    setChecked(!checked);
  }

  useEffect(()=>{
getUserName()

    async function getUserName(){
    const user = await supabase.auth.user()
    const {data} = await supabase
    .from('profile')
    .select('*')
    .filter('user_id', 'eq', user.id)
  setUserName(data[0].username)
  }

    

  },[username])


  async function createNewPost() {
    if (!title || !content) return
    const user = supabase.auth.user()
    const id = uuid()
    post.id = id
    const { data } = await supabase
      .from('posts')
      .insert([
          { title, content,category,isPrivate:checked, user_id: user.id, user_email: user.email,username }
      ])
      .single()
     router.push(`/${username}/${title.replaceAll(' ', '-')}`)
  }

  return (
    <div>
      <h1 className="text-gray-800 text-3xl font-semibold tracking-wide mt-10 text-center">Create</h1>
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
      <SimpleMDE
        className="text-gray-800"
        value={post.content}
        onChange={value => setPost({ ...post, content: value })}
      />

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
        type="button"
        className="mb-4 mt-5 bg-green-500 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={createNewPost}
      >Create Post</button>
    </div>
  )
}

export default New;