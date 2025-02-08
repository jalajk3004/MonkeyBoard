
import Image from "next/image";
import { AppSidebar } from "./components/sidemenu/page";

export default function Home() {
  return (
    <div className="flex" >
      <AppSidebar />
      <div>

      <h1 className="text-4xl text-center font-bold mt-10 mr-10">Lord of the Board</h1>
      <header>
        <div className="flex flex-col justify-center mt-10 p-20">
          <p>
            Welcome to Lord Of The Board, a dynamic space where creativity and collaboration meet in real-time! Our interactive whiteboard allows users to draw, sketch, and brainstorm together seamlessly, no matter where they are. Whether you're working on a project, planning ideas, or simply having fun, our platform offers smooth, instant collaboration with multiple participants. Join in and bring your ideas to life, together, in a shared virtual canvas.
          </p>
          <button className="bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-1 px-1 rounded-2xl">
            Create Your WorkSpace!
          </button>
        </div>
        <div>
        <video width="480" height="320" loop autoPlay className="rounded-lg shadow-lg">
              <source
                src="https://v1.pinimg.com/videos/mc/720p/b3/4d/c2/b34dc2e303d5a5462cf5f0fe90b5beea.mp4"
                type="video/mp4"
              />
              
            </video>
        </div>
      </header>


      
      <section className=" ">
        <h1>Your Work</h1>
      </section>
      </div>
      <footer>

      </footer>
    </div>
  );
}
