import { Button } from '@supabase/ui';
import CardAvatar from './cardavatar';

export default function ContentCard(props){
    return(
       
        <div className=" w-full h-32 bg-white p-2 rounded shadow-md mb-5 cursor-pointer hover:shadow-lg mb-5">
        <div className="flex">
<CardAvatar src={props.useravatar}/> <div className="flex flex-col ml-2"><span className="text-xs font-medium text-grey-600">@tobiadiks</span><span className="text-xs font-thin text-gray-500">Aug 5</span></div>
        </div>
        <h3 className="md:text-xl mt-2 text-sm font-semibold text-gray-900">How i secured my first job as a manager.</h3>
        </div>
       
    
    )
}