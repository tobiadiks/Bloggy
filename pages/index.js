// pages/index.js
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import supabase from "../utils/initSupabase";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    fetchPosts();
    const mySubscription = supabase
      .from("posts")
      .on("*", () => fetchPosts())
      .subscribe();
    return () => supabase.removeSubscription(mySubscription);
  }, []);
  async function fetchPosts() {
    const { data, error } = await supabase.from("posts").select();
    setPosts(data);
    setLoading(false);
  }

  

  return (
    <div>
      {/* Copy starts */}
      <div className="md:pl-48 md:pr-48 xl:pl-52 xl:pr-52  flex flex-col justify-center">
        <h1 className="text-gray-800 text-3xl font-semibold tracking-wide mt-20 text-center z-40">
          All that you need to start writing to the{" "}
          <p className="text-blue-700 font-black">world!</p>
        </h1>
        <h5 className="text-gray-600 text-md font-medium tracking-wide mt-2 mb-4 text-center z-40">
          Where your voice will be heard. Cstory gives blog space for writers
          and content creators to write about whatever they want, without being
          censored.
        </h5>
        <Link href="/auth" passHref={true}>
          <span className="bg-blue-700 font-semibold text-white p-2 text-center rounded-md hover:bg-blue-500 z-40">
            Try it free
          </span>
        </Link>
        {/* /profile to / */}
        <div className="mt-10 absolute">
          <Image
            className=" opacity-40"
            alt="thinker"
            src={require("../public/svg.svg")}
            height="400"
            width="400"
          />
        </div>
      </div>
      {/* Copy ends */}

      <div className="md:pl-42 md:pr-42 xl:pl-48 xl:pr-48 flex md:flex-row flex-col mt-2 justify-center align-middle border-b md:justify-between md:mx-auto w-full border-gray-200 py-10 z-40 md:mt-14 lg:mt-2">
        <div className="flex flex-col justify-center align-middle mt-5 mb-5 mx-auto">
          <svg
            className="mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            height="5rem"
            width="5rem"
            viewBox="0 0 64 64"
            aria-labelledby="title"
            role="img"
          >
            <title>Spacecraft</title>

            <circle
              data-name="layer1"
              cx="32"
              cy="22"
              r="4"
              fill="none"
              stroke="#5649cf"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></circle>
            <path
              data-name="layer2"
              d="M22 26h-3.1a2.9 2.9 0 0 0-2.9 2.9v12.2a2.9 2.9 0 0 1-2.4 2.9h-2.7A2.9 2.9 0 0 0 8 46.9V58h8m26-32h3.1a2.9 2.9 0 0 1 2.9 2.9v12.2a2.9 2.9 0 0 0 2.4 2.9H53a2.9 2.9 0 0 1 3 2.9V58h-8m-20 0h8m6-6V19.8C42 8.9 32 2 32 2S22 8.9 22 19.8V52"
              fill="none"
              stroke="#302a63"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <path
              data-name="layer1"
              d="M28 62v-4a6 6 0 1 0-12 0v4zm20 0v-4a6 6 0 1 0-12 0v4z"
              fill="none"
              stroke="#5649cf"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>

          <span className="text-gray-500 font-bold text-center text-sm mt-3 mx-auto">
            Launch your space
          </span>
        </div>

        <div className="flex flex-col justify-center mt-5 mb-5 align-middle mx-auto ">
          <svg
            className="mx-auto"
            height="5rem"
            width="5rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            aria-labelledby="title"
            role="img"
          >
            <title>Social</title>
            <circle
              data-name="layer2"
              cx="32"
              cy="39"
              r="7"
              fill="none"
              stroke="#5649cf"
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></circle>
            <path
              data-name="layer2"
              d="M32 46a12.1 12.1 0 0 0-12 12v2h24v-2a12.1 12.1 0 0 0-12-12z"
              fill="none"
              stroke="#5649cf"
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
            <circle
              data-name="layer2"
              cx="52"
              cy="10"
              r="6"
              fill="none"
              stroke="#5649cf"
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></circle>
            <path
              data-name="layer2"
              d="M62 28c0-7.5-4.5-12-10-12s-10 4.5-10 12z"
              fill="none"
              stroke="#5649cf"
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
            <circle
              data-name="layer2"
              cx="12"
              cy="10"
              r="6"
              fill="none"
              stroke="#5649cf"
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></circle>
            <path
              data-name="layer2"
              d="M22 28c0-7.5-4.5-12-10-12S2 20.5 2 28z"
              fill="none"
              stroke="#5649cf"
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
            <path
              data-name="layer1"
              fill="none"
              stroke="#302a63"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M12 34l8 8m32-8l-8 8M24 14h16"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>

          <span className="text-gray-500 font-bold text-center text-sm mt-3 mx-auto">
            Connect & build your community
          </span>
        </div>

        <div className="flex flex-col justify-center mt-5 mb-5 align-middle mx-auto">
          <svg
            className="mx-auto"
            height="5rem"
            width="5rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            aria-labelledby="title"
            aria-describedby="desc"
            role="img"
          >
            <title>Pro</title>
            <desc>A line styled icon from Orion Icon Library.</desc>
            <path
              data-name="layer2"
              fill="none"
              stroke="#5649cf"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M2 22h60M10 9l9 13L32 9l13 13 9-13M19 22l13 33 13-33"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
            <path
              data-name="layer1"
              fill="none"
              stroke="#302a63"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M32 55L2 22l8-13h44l8 13-30 33z"
            ></path>
          </svg>

          <span className="text-gray-500 font-bold text-center text-sm mt-3 mx-auto">
            Learn from <b>PRO</b> creators
          </span>
        </div>
      </div>

      {/* Convince them */}
      <div className=" flex flex-col">
        <h3 className="text-gray-600 text-3xl font-semibold tracking-wide mt-10 text-center z-40">
          Yes! you own it
        </h3>
        <div className="flex flex-wrap md:flex-row flex-col justify-between mt-8">
          <div className="w-full md:w-1/3 border border-gray-200 px-2 py-2 mt-1 flex flex-col justify-center md:inline-block lg:inline-block">
            <Image
              className="mx-auto"
              src={require("../public/cstory_with_cup.svg")}
              alt="cstory_with_cup"
              height="350"
              width="350"
            />
            <h5 className="text-gray-600 text-xl font-semibold tracking-wide text-left z-40 w-full ">
              Share with swags
            </h5>
            <h6 className="text-gray-500 text-md font-sm tracking-wide mt-2 mb-4 text-left z-40">
              Create a story and share with your audience. story are instant,
              unique for creative expression. Let the world see your story,
              including photos, videos, drawings, and more. Make connections
              with strangers through likes, follows, comments and more.
            </h6>
          </div>

          <div className="w-full md:w-1/3 border-l border-r border-gray-200 px-2 py-2 mt-1 flex flex-col justify-center md:inline-block lg:inline-block">
            <Image
              className="mx-auto"
              src={require("../public/cstory_with_pc.svg")}
              alt="cstory_with_cup"
              height="350"
              width="350"
            />
            <h5 className="text-gray-600 text-xl font-semibold tracking-wide text-left z-40 w-full ">
              Free space for everyone
            </h5>

            <h6 className="text-gray-500 text-md font-sm tracking-wide mt-2 mb-4 text-left z-40">
              Cstory promotes your blog, and gives an additional ecosystem for
              people to read quickly or click through links. No more lengthy
              introductions and abstracts just to get to the good stuff.
              Bloggers can now focus on what they do best and get readers to
              visit their blogs directly. Users can simply click on the Cstory
              link in the post, which will take them directly to the blog.
            </h6>
          </div>

          <div className="w-full md:w-1/3 border border-gray-200 px-2 py-2 flex flex-col justify-center md:inline-block lg:inline-block">
            <Image
              className="mx-auto"
              src={require("../public/cstory_with_bike.svg")}
              alt="cstory_with_cup"
              height="350"
              width="350"
            />
            <h5 className="text-gray-600 text-xl font-semibold tracking-wide text-left z-40 w-full">
              Reach your brand goal
            </h5>
            <h6 className="text-gray-500 text-md font-sm tracking-wide  text-left z-40 mt-2">
              Cstory is a tool that helps you create content that gets shared.
              When used strategically, Cstory can help you reach your brand
              goals, increase engagement, and grow your audience. It&apos;s the
              only tool you need to create amazing original content. We built it
              to be easy to use, with features that help all types of businesses
              produce engaging content quickly and easily.
            </h6>
          </div>
        </div>
      </div>

      {/* WordCopy Start */}
      <div className=" py-5 mt-5  flex flex-wrap justify-center md:justify-between sm:align-middle border-t  border-gray-200 md:flex-row-reverse flex-col-reverse ">
        <Image
          alt="label"
          src={require("../public/wfh_9.svg")}
          height="350"
          width="350"
        />

        <div className="mt-1 md:mt-16 md:w-1/2">
          <h5 className="mb-3">
            <span className=" font-medium flex text-2xl text-blue-700 handwriting">
              
              Cstory
            </span>
          </h5>

          <p className=" md:pr-30 xl:pr-42 text-gray-500">
            A personal space for you to start blogging, reading and building
            community. Write amazing stuffs anywhere, connect & create memories,
            be in charge of everything.
          </p>
        </div>

      </div>
      
      <Link href="/auth" passHref={true}>
          <div className="bg-blue-700 font-semibold text-white p-2 text-center rounded-md hover:bg-blue-500 z-40">
            Log In/Sign Up
          </div>
        </Link>
      {/* Ends Here */}

    </div>
  );
}
