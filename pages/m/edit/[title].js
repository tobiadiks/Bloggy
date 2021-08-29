// pages/new.js
import { useState, useEffect, useCallback } from "react";
import { Select, Checkbox, Input } from "@supabase/ui";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import supabase from "../../../utils/initSupabase";
import { categoryList } from "../../../constants/categories";
import Loader from "react-loader-spinner";
import Header from "../../../components/Header";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
const initialState = { title: "", content: "", category: "" };

function Edit() {
  const [post, setPost] = useState(initialState);

  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { title } = router.query;

  const fetchPost = useCallback(() => {
    const user = supabase.auth.user();
    Get();
    async function Get() {
     
      const { data } = await supabase
        .from("posts")
        .select(
          `category,content,inserted_at,isPrivate,title,user_id,id,creator: user_id(username,fullname)`
        )
        .filter("user_id", "eq", user.id)
        .filter("title", "eq", title.replaceAll("-", " "));
      // .range(0,currentRange)

      if (!data) {
        return null;
      } else {
        setPost(data[0]);
        setChecked(data[0].isPrivate);
        setLoading(false);
      }
    }
  }, [title]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }

  function handleOnChange() {
    setChecked(!checked);
  }

  async function UpdatePost() {
    if (!title || !post.content) return null;
    await supabase
      .from("posts")
      .update([
        {
          title: post.title,
          content: post.content,
          category: post.category,
          isPrivate: checked,
        },
      ])
      .filter("user_id", "eq", supabase.auth.user().id)
      .filter("id", "eq", post.id);
    router.push(`/${post.creator.username}/${post.title.replaceAll(" ", "-")}`);
  }

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
    <div>
    <Header title={`Edit - ${title}`}/>
      <h1 className="text-gray-800 text-3xl font-semibold tracking-wide mt-10 text-center">
        Create
      </h1>
      <Input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className=" text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 "
      />
      
      <div className="mt-5 mb-5">
        <Select name="category" onChange={onChange}>
          {categoryList.map((cat) => (
            <Select.Option key={cat}>{cat}</Select.Option>
          ))}
        </Select>
      </div>
      <SimpleMDE
        className="text-gray-800"
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />

      <div className="mt-5 mb-5">
        <Checkbox
          value={checked}
          checked={checked}
          label="Private"
          description="This will make your post visible to who you want"
          name="isPrivate"
          onChange={handleOnChange}
        />
      </div>

      <button
        type="button"
        className="mb-4 mt-5 bg-purple-500 text-white font-semibold px-8 py-2 rounded-lg"
        onClick={UpdatePost}
      >
        Update
      </button>
    </div>
  );
}

export default Edit;
