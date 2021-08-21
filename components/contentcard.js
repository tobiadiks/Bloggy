import {
  Button,
  IconHeart,
  IconSave,
  IconShare2,
  IconActivity,
} from "@supabase/ui";
import CardAvatar from "./cardavatar";
import Link from "next/link";
import moment from "moment";
import supabase from '../utils/initSupabase';
import { useRouter } from "next/router";

export default function ContentCard(props) {

  const router =useRouter();


  async function NewLike(id){
    if(!supabase.auth.user()){
      alert('Please Log In To Perform This Action')
    }
    else{
    const {data}= await supabase.from('likes').select('post_id,user_id').filter('post_id','eq',id).filter('user_id','eq',supabase.auth.user().id);

    if (!data.length){
  await supabase.from('likes').insert([{user_id:supabase.auth.user().id,post_id:id}])
  alert('liked ❤️')
}
else{
  await supabase.from('likes').delete().filter('post_id','eq',id).filter('user_id','eq',supabase.auth.user().id)
  alert('disliked 👎')
}
    }
  }   

  function Like(id){
    NewLike(id)
          }

          async function NewSave(id){
            if(!supabase.auth.user()){
              alert('Please Log In To Perform This Action')
            }
            else{
            const {data}= await supabase.from('saved').select('post_id,user_id').filter('post_id','eq',id).filter('user_id','eq',supabase.auth.user().id);
        
            if (!data.length){
          await supabase.from('saved').insert([{user_id:supabase.auth.user().id,post_id:id}])
          alert('saved 💾')
        }
        else{
          await supabase.from('saved').delete().filter('post_id','eq',id).filter('user_id','eq',supabase.auth.user().id)
          alert('removed 😲')
        }
            }
          }   
        
          function Save(id){
            NewSave(id)
                  }
    




  return (
    <div className=" w-full h-auto p-2 rounded shadow-md border cursor-pointer hover:shadow-lg mb-5">
      <div className="flex justify-between">
        <div className="flex">
          <CardAvatar src={props.useravatar} />{" "}
          <div className="flex flex-col ml-2">
            <span className="text-xs font-semibold text-gray-500 hover:text-gray-900">
              {props.name}
            </span>
            <span className="text-xs font-thin text-gray-500 hover:text-gray-900">
              {moment(props.timestamp).fromNow()}
            </span>
          </div>
        </div>

        <div>
          <span className="text-xs font-thin text-gray-500">5 min read</span>
        </div>
      </div>

      <div className="mt-2">
        <span className="text-xs text-white rounded-md p-1 font-medium bg-gray-900 hover:bg-gray-700">
          {props.category}
        </span>
        {props.featured ? (
          <span className="text-xs ml-1 text-white rounded-md p-1 font-medium bg-blue-700 hover:bg-blue-600">
            #featured
          </span>
        ) : null}
      </div>

      <Link href={props.route} passHref={true}>
        <h3 className="md:text-xl mt-2 text-sm font-semibold text-gray-900 hover:text-blue-600">
          {props.title}
        </h3>
      </Link>

      <div className="mt-4 flex justify-between">
        <div className="flex">
          <div onClick={()=>Like(props.id)} className={`mr-4 flex align-middle hover:text-red-600 ${props.liked?'text-red-700':''}`}>
            <IconHeart />
          </div>
          {/* <div className="mr-4 hover:text-blue-600">
            <IconActivity />
          </div> */}
          <div onClick={()=>Save(props.id)} className="mr-4 hover:text-green-600">
            <IconSave />
          </div>
        </div>

        <div className="flex">
          <div
            className="mr-4 flex align-middle justify-center
             hover:text-blue-600"
          >
            <IconShare2 />
            &nbsp;<div className="text-xs">Share</div>
          </div>
        </div>
      </div>
    </div>
  );
}
