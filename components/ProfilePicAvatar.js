import Image from "next/image";

export default function ProfilePicAvatar(props){
    return(
        <Image
                objectFit
                className="mx-auto rounded-full shadow-sm"
                alt="profile"
                src={props.src?props.src:require('../public/profile.png')}
                height="80"
                width="80"
              />
    )
}