import React, { useState, useEffect, useContext } from "react";
import { Card } from "../component/index";
import close from "../assets/close-white.svg";

//global community context
import { CommunityContext } from "../context/CommunityContext";

function RenderCards({ data, title, setIsFullScreenVisible }) {
  if (data?.length > 0) {
    return data.map((post) => (
      <Card
        key={post._id}
        {...post}
        setIsFullScreenVisible={setIsFullScreenVisible}
      />
    ));
  }

  return (
    <div className="py-24 col-span-2 md:col-span-3 lg:col-span-4 border border-gray-300 rounded-md flex justify-center">
      <h2 className="font-bold text-gray-400 text-xl">{title}</h2>
    </div>
  );
}

function Community() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isFullScreenVisible, setIsFullScreenVisible] = useState(false);

  // consuming global community state
  const { imgSource, dispatch } = useContext(CommunityContext);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://writeimg.onrender.com/api/v1/posts",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (event) => {
    clearTimeout(searchTimeout);
    setSearchText(event.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = posts.filter((post) => {
          return (
            post.name.toLowerCase().includes(searchText) ||
            post.prompt.toLowerCase().includes(searchText)
          );
        });

        setSearchedResults(searchResults);
      }, 500)
    );
  };

  const handleFullScreenClose = () => {
    dispatch({ type: "SET_IMGSOURCE", payload: null });
    setIsFullScreenVisible(false);
  };

  return (
    <section className="max-w-7xl mx-auto flex flex-col justify-center items-center relative">
      <div>
        <h1 className="my-2 text-3xl font-semibold text-slate-900">
          Community Showcase
        </h1>

        <p className="text-base text-gray-500">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI
        </p>

        <div className="my-4">
          <input
            className="w-full px-4 py-2 border border-gray-500 rounded-md"
            type="text"
            name="searchPost"
            id="searchPost"
            placeholder="Search something...."
            onChange={handleSearchChange}
          />
        </div>

        <div>
          {loading ? (
            <div className="h-[50vh] flex justify-center items-center">
              <svg
                aria-hidden="true"
                className="inline w-10 h-10 mr-2 text-gray-200 animate-spin fill-[#6469ff]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="text-gray-500 text-base mb-3">
                  Showing results for{" "}
                  <span className="font-medium text-slate-900">
                    {searchText}
                  </span>
                </h2>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="No search results found."
                  />
                ) : (
                  <RenderCards
                    data={posts}
                    setIsFullScreenVisible={setIsFullScreenVisible}
                    title="No posts yet."
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {isFullScreenVisible && (
        <div className="bg-black/50 w-full h-screen p-8 animate-fade-in backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 z-20">
          <div className="mb-4 fixed top-8 right-8">
            <img
              className="w-10 h-10 cursor-pointer"
              src={close}
              alt="close button"
              onClick={handleFullScreenClose}
            />
          </div>

          <div className="max-w-md ">
            <img className="" src={imgSource} alt="test" />
          </div>
        </div>
      )}
    </section>
  );
}

export default Community;

// lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1
