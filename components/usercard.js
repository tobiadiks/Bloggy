import { Button } from '@supabase/ui';
import CardAvatar from './cardavatar';

export default function UserCard(props){
    return(
       
        <div className=" w-44 bg-white p-2 border rounded shadow-md mb-5">
        <div className="flex">
<CardAvatar src={props.useravatar}/> <div className="flex flex-col ml-2"><span className="text-xs text-grey-800">{props.fullname}</span><span className="text-xs text-gray-500">{props.username}</span></div>
        </div>
        <div className="flex mt-2 justify-between">
        <p className="bg-purple-700 hover:bg-purple-600 px-2 py-2 text-xs rounded text-white flex my-auto">Follow</p> <Button type="secondary" className="hover:bg-gray-600">Ignore</Button>
        </div>
        </div>
    
    )
}