import Image from "next/image";

export default function ProfilePic(props){
    return(
        <Image
                objectFit
                className="mx-auto rounded-full"
                alt="thinker"
                src={props.src}
                height="80"
                width="80"
              />
    )
}