import Image from "next/image";

export default function CardAvatar(props){
    return(
        <Image
                objectFit
                className="mx-auto rounded-full shadow-sm"
                alt="avatar"
                src={props.src?props.src:require('../public/profile.png')}
                height="50"
                width="50"
              />
    )
}