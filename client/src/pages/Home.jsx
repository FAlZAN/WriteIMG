import React from "react";
import prompt from "../assets/gif/prompt.gif";
import generating from "../assets/gif/generating.gif";
import sampleImage from "../assets/sample-image.png";
import sharing from "../assets/gif/sharing.gif";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="max-w-3xl mx-auto -mt-1">
      <div>
        <div className="py-12">
          <p className="text-5xl text-center">
            Welcome to <br /> <strong className="text-7xl">WriteIMG</strong>
          </p>
        </div>

        <div className="mb-8 text-lg flex flex-col gap-2">
          <p>
            WRITE IMG is built on top of DALL·E 2 by OpenAI. It is an AI system
            that can create realistic images and art from a description in
            natural language.
          </p>
        </div>

        <div className="mb-8 flex gap-2 lg:gap-4">
          <Link to="/community">
            <button className="bg-indigo-500 px-4 py-2 text-white text-sm rounded-md">
              Browse Community Showcase
            </button>
          </Link>

          <Link to="/post">
            <button className="bg-green-500 px-4 py-2 text-white text-sm rounded-md">
              Generate Image
            </button>
          </Link>
        </div>
      </div>

      <div className="text-base flex flex-col gap-4">
        <p>It is as simple as it sounds.</p>

        <ol className="px-4 list-decimal flex flex-col gap-4">
          <li>
            <span className="flex flex-col gap-4">
              <p>Describe the image as you need in a prompt field.</p>
              <img src={prompt} alt="describing prompt example" />
            </span>
          </li>

          <li>
            <span className="flex flex-col gap-4">
              <p>Simply click on the Generate button to generate an image.</p>
              <img src={generating} alt="generating image button example" />
            </span>

            <span>
              <p className="my-4 text-start">
                patience for a few seconds and you will get the generated image
              </p>
              <img
                className="w-full lg:max-w-sm mx-auto"
                src={sampleImage}
                alt="generated sample image"
              />
            </span>
          </li>

          <li>
            <span className="flex flex-col gap-4">
              <p>
                Like what you generated, you can post it on the community
                showcase. Just click on share with the community button
              </p>
              <img src={sharing} alt="sharing with community example" />
            </span>
          </li>
        </ol>
      </div>
    </section>
  );
}

export default Home;
