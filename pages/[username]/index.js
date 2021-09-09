// pages/cstory.js
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import supabase from "../../utils/initSupabase";
import { useRouter } from "next/dist/client/router";
import {
  Auth,
  Input,
  Button,
  IconSearch,
  IconMoreHorizontal,
  IconTwitter,
  IconDribbble,
  IconFacebook,
  IconLinkedin,
  IconLink,
  IconGitHub,
} from "@supabase/ui";
import Loader from "react-loader-spinner";
import ContentCard from "../../components/ContentCard";
import Header from "../../components/Header";

const DynamicImage = dynamic(
  () => import("../../components/ProfilePicAvatar"),
  { ssr: false }
);

export default function Index(props) {
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    getUserProfile();

    async function getUserProfile() {
      const profile = await supabase
        .from("profiles")
        .select("*")
        .filter("username", "eq", username);

      if (!profile.data) {
        router.push("/404");
      } else {
        setUserProfile(profile.data[0]);
        const { data } = await supabase
          .from("posts")
          .select(
            `id,featured,category,content,inserted_at,isPrivate,title,user_id, creator: user_id(username,fullname,avatar_url)`
          )
          .filter("user_id", "eq", userProfile ? userProfile.id : "");
        // .range(0,currentRange)
        if (!data) {
          return null;
        } else {
          setPosts(data);
          setLoading(false);
        }
      }
    }
  }, [username, userProfile, router]);

  while (loading) {
    return (
      <div className="flex justify-center align-middle mt-20">
        <div className="text-xl mt-5 mx-auto text-gray-800 text-center">
          <Loader type="Puff" color="rgba(31,41,55)" height={80} width={80} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 px-5">
      <Header
        title={`${userProfile.username}-${
          userProfile.bio ? userProfile.bio : ""
        }`}
      />
      <div className="flex flex-col md:flex-row w-full  mr-0 md:mr-4 lg:mr-4">
        <div className="shadow-sm w-full sm:h-auto md:h-auto md:w-full border rounded-t-lg border-gray-200 mb-8 flex flex-col align-middle">
          <div className="w-full h-1 bg-purple-700 rounded-t-2xl"></div>
          <div className="mx-auto rounded-full mt-5">
            <DynamicImage src={userProfile.avatar_url} />
          </div>
          <div className="mx-auto mt-5 flex flex-col">
            <span className="font-black text-2xl border-b-4 border-purple-700">
              {userProfile.fullname}
            </span>
            <span className="font-thin text-md text-center text-gray-700">
              @{userProfile.username}
            </span>
          </div>
          {userProfile.bio ? (
            <div className="mt-2 px-5">
              <p className="text-center text-gray-800">{userProfile.bio}</p>
            </div>
          ) : (
            <div className="mt-2 px-5">
              <p className="text-center text-gray-800">-</p>
            </div>
          )}

          <div className="mt-5 px-5 flex flex-col align-middle">
            <div className="mx-auto flex flex-row">
              {userProfile.twitter ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={userProfile.twitter}
                  className="mr-5 md:mr-3 hover:text-purple-600 text-gray-900 font-bold"
                >
                  <IconTwitter />
                </a>
              ) : (
                ""
              )}
              {userProfile.dribble ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={userProfile.dribble}
                  className="mr-5 md:mr-3 hover:text-red-500 text-gray-900 font-bold"
                >
                  <IconDribbble />
                </a>
              ) : (
                ""
              )}
              {userProfile.facebook ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={userProfile.facebook}
                  className="mr-5 md:mr-3 hover:text-purple-800 text-gray-900 font-bold"
                >
                  <IconFacebook />
                </a>
              ) : (
                ""
              )}
              {userProfile.linkdn ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={userProfile.linkdn}
                  className="mr-5 md:mr-3 hover:text-purple-400 text-gray-900 font-bold"
                >
                  <IconLinkedin />
                </a>
              ) : (
                ""
              )}
              {userProfile.github ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={userProfile.github}
                  className="mr-5 md:mr-3 hover:text-black text-gray-900 font-bold"
                >
                  <IconGitHub />
                </a>
              ) : (
                ""
              )}
              {userProfile.website ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={userProfile.website}
                  className="mr-5 md:mr-3 hover:text-green-500 text-gray-900 font-bold"
                >
                  <IconLink />
                </a>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="mx-auto mt-8 md:mb-8 mb-12">
            <div className="bg-purple-700 text-white p-2 px-8 rounded font-semibold cursor-pointer">
              Subscribe
            </div>
          </div>
        </div>

        <div className="w-full h-auto md:h-full md:ml-16  md:w-full">
          <div className="mb-5 font-semibold">/{userProfile.username}&apos;s Stories</div>
          <div className="w-full h-auto md:h-screen overflow-y-scroll md:w-full">
            {!posts.length ? (
              <div className="flex justify-center align-middle mt-10">
                <div className="text-sm flex mx-auto font-medium hover:text-purple-600 text-gray-800 text-center">
                  Nothing Here&nbsp;...
                </div>
              </div>
            ) : (
              posts.map((post, index) => (
                <ContentCard
                  key={index}
                  timestamp={post.inserted_at}
                  name={post.creator.fullname}
                  route={`/${post.creator.username}/${post.title.replaceAll(
                    " ",
                    "-"
                  )}`}
                  title={post.title}
                  category={`#${post.category}`}
                  useravatar={post.creator.avatar_url}
                  featured={post.featured}
                  username={post.creator.username}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
