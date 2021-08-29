import { Button } from '@supabase/ui';
import UserAvatar from './UserAvatar';
import Link from 'next/link';

export default function UserCard(props){
    return(
       
        <div className=" w-44 bg-white p-2 border rounded shadow-md mb-5">
        <div className="flex">
<UserAvatar src={props.useravatar}/>
<Link href={`/${props.username}`} passHref={true}>
<div className="flex flex-row ml-2 hover:text-gray-900 cursor-pointer"><span className="text-xs text-grey-600 font-semibold">{props.fullname}</span>&nbsp;&nbsp;<span className="text-xs text-gray-500">@{props.username}</span></div>
</Link>
</div>
        <div className="flex mt-2 justify-between">
        <p className="bg-purple-700 text-center font-bold mx-auto align-middle w-full hover:bg-purple-600 px-2 py-2 text-xs rounded text-white my-auto">Follow</p> 
        {/* <Button type="secondary" className="hover:bg-gray-600">Ignore</Button> */}
        </div>
        </div>
    
    )
}