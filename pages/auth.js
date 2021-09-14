import { useState, useEffect, useRef } from "react";
import { Auth } from "@supabase/ui";
import supabase from "../utils/initSupabase";
import { useRouter } from "next/router";
import Loader from "react-loader-spinner";
import Header from "../components/Header";

function Profile(props) {
  const { user } = Auth.useUser();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getProfile();
    async function getProfile() {
      const { data } = await supabase
        .from("profiles")
        .select()
        .filter(
          "id",
          "eq",
          supabase.auth.user() === null ? " " : supabase.auth.user().id
        );

      if (!data) {
        setLoading(false);
      } else {
        if (data[0].username) {
          router.push(`/${data[0].username}`);
        } else {
          router.push("/profile");
        }
      }
    }
  }, [user, loading, router]);

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
    <div className="px-5">
      <Header title="Cstory-Login|Signup" />
      {props.children}
    </div>
  );
}

export default function AuthProfile() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Profile supabaseClient={supabase}>
        <Auth
          className="mt-20 px-5"
          supabaseClient={supabase}
          providers={["github", "twitter"]}
          socialLayout="horizontal"
        />
      </Profile>
    </Auth.UserContextProvider>
  );
}
