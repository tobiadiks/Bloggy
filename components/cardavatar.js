import Image from "next/image";

export default function CardAvatar(props){
    return(
        <Image
                objectFit
                className="mx-auto rounded-full"
                alt="avatar"
                src={props.src}
                height="50"
                width="50"
              />
    )
}