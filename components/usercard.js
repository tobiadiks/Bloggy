import { Button } from '@supabase/ui';
import CardAvatar from './cardavatar';

export default function UserCard(props){
    return(
       
        <div className=" w-52 bg-white p-2 rounded shadow-md mb-5">
        <div className="flex">
<CardAvatar src={props.useravatar}/> <div className="flex flex-col ml-2"><span className="text-sm text-grey-800">Adeleke Oluwatobi</span><span className="text-xs text-gray-500">@tobiadiks</span></div>
        </div>
        <div className="flex mt-2 justify-between">
        <Button className="">Follow</Button> <Button  style={{background:'rgba(75,89,99,1)' }} className="hover:bg-gray-600">Ignore</Button>
        </div>
        </div>
    
    )
}