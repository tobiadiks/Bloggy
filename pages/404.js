import Image from 'next/image'
export default function  Error404(){

    return(
        <div>
        <Header title='Cstory-404'/>
            <div className="flex flex-wrap mt-7 flex-col justify-center">
            <div className="flex flex-col mt-7 justify-center w-full md:w-1/2 lg:w-1/2 mx-auto">
            <Image alt="404" src={require("../public/404.svg")}  height="400" width="400"/>
            <h1 className="text-gray-400 text-md md:text-xl font-thin tracking-wide mt-10 text-center font-serif z-40">Opps! you are not alone...</h1>

</div>
</div>
        </div>
    )
}