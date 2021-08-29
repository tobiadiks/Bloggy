import Link from 'next/link';


export default function LoginActionCard(props){
    return(
       
        <div className=" w-full md:w-44 bg-white p-2 border rounded shadow-md mb-5">
        <div className="font-semibold text-gray-900 text-lg">Personalize your space by signing in to your account.</div>
        <div className="flex mt-2">
        <Link href="/auth" passHref={true}>
          <div className="bg-purple-700 w-full font-semibold text-white p-2 text-center rounded-md hover:bg-purple-500 z-40">
            Log In/Sign Up
          </div>
        </Link>
        </div>
        </div>
    
    )
}