// pages/posts/[id].js
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import supabase from "../../../utils/initSupabase";

export default function Post({ post }) {
  
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1 className="text-gray-800 text-3xl mt-20 font-semibold tracking-wide text-center">{post.title}</h1>
      <p className="text-gray-800 text-sm font-light my-4 text-center">by {post.user_email}</p>
      <div className="mt-8 text-gray-800">
        {// eslint-disable-next-line react/no-children-prop 
        <ReactMarkdown className='prose mx-auto' children={post.content} />
        }</div>
    </div>
    )
}

export async function getStaticPaths() {
  const { data, error } = await supabase
    .from('posts')
    .select('id')
  const paths = data.map(post => ({ params: { id: JSON.stringify(post.id) }}))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }) {
  const { id } = params
  const { data } = await supabase
    .from('posts')
    .select()
    .filter('id', 'eq', id)
    .single()
  return {
    props: {
      post: data
    }
  }
}