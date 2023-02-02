import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils/index";
import noImage from "../assets/no-image.svg";

function Post() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.prompt && form.photo) {
      try {
        setLoading(true);

        const response = await fetch(
          "https://writeimg.onrender.com/api/v1/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: form.name,
              prompt: form.prompt,
              photo: form.photo,
            }),
          }
        );

        const json = await response.json();

        navigate("/community");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt & generate image first.");
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleRandomPrompt = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleGenerate = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "https://writeimg.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto flex flex-col justify-center items-center">
      <div>
        <div>
          <h1 className="my-2 font-semibold text-slate-900 text-3xl">Create</h1>
          <p className="text-gray-500 text-base">
            Generate an imaginative image through DALL-E AI and share it with
            the community.
          </p>
        </div>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <label className="font-semibold text-base" htmlFor="name">
                Your Name
              </label>
              <input
                className="w-full my-1 px-4 py-2 border border-gray-300 outline-gray-400 rounded-md"
                type="text"
                name="name"
                id="name"
                placeholder="Ex. Teman Hoppo"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="font-semibold text-base" htmlFor="prompt">
                Prompt
              </label>
              <input
                className="w-full my-1 px-4 py-2 border border-gray-300 outline-gray-400 rounded-md"
                type="text"
                name="prompt"
                id="prompt"
                placeholder="A Samurai riding a Horse on Mars, lomography."
                value={form.prompt}
                onChange={handleChange}
                required
                autoComplete="off"
              />
              <button
                className="bg-amber-500 text-white text-sm mt-1 px-2 py-1 rounded-md"
                type="button"
                onClick={handleRandomPrompt}
              >
                Get Random Prompt
              </button>
            </div>

            <div className="w-full h-[85vw] md:w-[40vw] md:h-[40vw] xl:w-[40vw] xl:h-[40vw] mx-auto p-2 border border-gray-300 rounded-md flex justify-center items-center relative">
              {form.photo ? (
                <img
                  className="w-full h-full object-contain"
                  src={form.photo}
                  alt={form.prompt}
                />
              ) : (
                <img
                  className="w-24 object-contain opacity-20"
                  src={noImage}
                  alt="no image"
                />
              )}

              {generatingImg && (
                <div className="w-full h-full bg-black/40 rounded-md flex justify-center items-center absolute top-0 left-0">
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
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              className="bg-green-500 text-white w-full py-2 rounded-md"
              type="button"
              onClick={handleGenerate}
            >
              {generatingImg ? "Generating...." : "Generate"}
            </button>
          </div>

          <div className="my-4">
            <p className="text-gray-500 text-base">
              Once you created the image, you can share it with others in the
              community.
            </p>
            <button className="bg-indigo-500 text-white mt-4 py-2 w-full rounded-md">
              {loading ? "Sharing...." : "Share with the community"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Post;
