import { Button } from '@supabase/ui';
import CardAvatar from './cardavatar';

export default function UserCard(props){
    return(
       
        <div className=" w-44 bg-white p-2 border rounded shadow-md mb-5">
        <div className="flex">
<CardAvatar src={props.useravatar}/> <div className="flex flex-col ml-2"><span className="text-xs text-grey-800">Adeleke Oluwatobi</span><span className="text-xs text-gray-500">@tobiadiks</span></div>
        </div>
        <div className="flex mt-2 justify-between">
        <Button className="bg-blue-700">Follow</Button> <Button type="secondary" className="hover:bg-gray-600">Ignore</Button>
        </div>
        </div>
    
    )
}