import { Button, IconHeart,IconSave, IconShare2, IconActivity } from '@supabase/ui';
import CardAvatar from './cardavatar';

export default function ContentCard(props){
    return(
       
        <div className=" w-full h-auto bg-white p-2 rounded shadow-md border cursor-pointer hover:shadow-lg mb-5">
        <div className="flex justify-between">
 <div className="flex"><CardAvatar src={props.useravatar}/> <div className="flex flex-col ml-2"><span className="text-xs font-medium text-gray-500 hover:text-gray-900">@tobiadiks</span><span className="text-xs font-thin text-gray-500 hover:text-gray-900">Aug 5</span>
</div>
</div>

<div><span className="text-xs font-thin text-gray-500">5 min read</span></div>
        </div>
        
        <div className="mt-2"><span className="text-xs text-white rounded-md p-1 font-medium bg-gray-900 hover:bg-gray-700">{props.category}</span></div>
        <h3 className="md:text-xl mt-2 text-sm font-semibold text-gray-900 hover:text-blue-600">{props.title}</h3>

        <div className="mt-4 flex justify-between">
        <div className="flex">
            <div className="mr-4 hover:text-red-600">
                <IconHeart/>
            </div>
            <div className="mr-4 hover:text-blue-600">
                <IconActivity/>
            </div>
            <div className="mr-4 hover:text-green-600">
                <IconSave/>
            </div>
            
            </div>

            <div className="flex">
            <div className="mr-4 flex align-middle justify-center
             hover:text-blue-600">
                <IconShare2/>&nbsp;<div className="text-xs">Share</div>
            </div>
            </div>


        </div>
        </div>
       
    
    )
}