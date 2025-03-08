import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [codeSnippet, setCodeSnippet] = useState("");
  console.log(posts);
  const handleClick = async () => {
    const { data } = await axios.post("/api/posts", {
      selectedLanguage,
      codeSnippet,
    });
    console.log(data);
    // Make a GET request to fetch the updated list of posts
    fetchPosts();
  };

  const fetchPosts = async () => {
    const response = await axios.get("/api/posts");
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const getTimeElapsed = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const timeDiff = currentTime - postTime;
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };

  const postsMapping = posts.map((el) => {
    const timeElapsed = getTimeElapsed(el.createdAt);

    return (
      <div className="post">
        <h1>{el.title}</h1>
        <p>{el.code}</p>
        <h5>Language: {el.language}</h5>
        <p>Time: {timeElapsed}</p>
      </div>
    );
  });
  return (
    <>
      <select
        id="languageSelect"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="javascript">Javascript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="c++">C++</option>
      </select>
      <textarea
        type="text"
        placeholder="Code Snippet"
        value={codeSnippet}
        onChange={(e) => setCodeSnippet(e.target.value)}
      />
      <button onClick={handleClick}>Push</button>
      {postsMapping}
    </>
  );
}

/* export async function getServerSideProps() {
  // will always run on the server
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
} */
