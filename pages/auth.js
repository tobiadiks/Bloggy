import { useState, useEffect, useRef } from 'react'
import { Auth} from "@supabase/ui";
import supabase from "../utils/initSupabase";
import {useRouter} from 'next/router';
import Loader from "react-loader-spinner";

function Profile(props) {
    const { user } = Auth.useUser();
    const [loading, setLoading] = useState(true);
    const router=useRouter()

    useEffect(()=>{
        getProfile()
        async function getProfile(){
        const {data} = await supabase
        .from('profiles')
        .select()
        .filter('id', "eq", supabase.auth.user() === null?" ":supabase.auth.user().id)
        
        if(!data){
          setLoading(false);
        }
        else{
        setLoading(false);
        }
        }
      }
      , [user,loading])


      while (loading){
        return (<div className="flex justify-center align-middle mt-10">
                    <p className="text-xl mt-5 mx-auto text-gray-800 text-center">
                    <Loader
                type="Puff"
                color="rgba(31,41,55)"
                height={80}
                width={80}
                
              />
                    </p>
                </div>)
        }
        
            if (user){
            router.push('/home')
            return null
            }

            else{
            return props.children;
            }


}


export default function AuthProfile() {
    return (
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Profile supabaseClient={supabase}>
          <Auth
            className="mt-20"
            supabaseClient={supabase}
            providers={["github","google"]}
            socialLayout="horizontal"
          />
        </Profile>
      </Auth.UserContextProvider>
    );
  }