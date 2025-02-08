
import Image from "next/image";
import { AppSidebar } from "./components/sidemenu/page";

export default function Home() {
  return (
    <div>
      <header>
        <AppSidebar />
        <h1 className="text-4xl text-center font-bold mt-10">Lord of the Board</h1>
        <div className="flex justify-center mt-10">

        <button>
          Create Your WorkSpace!
        </button>
        <p>
        Welcome to Lord Of The Board, a dynamic space where creativity and collaboration meet in real-time! Our interactive whiteboard allows users to draw, sketch, and brainstorm together seamlessly, no matter where they are. Whether you're working on a project, planning ideas, or simply having fun, our platform offers smooth, instant collaboration with multiple participants. Join in and bring your ideas to life, together, in a shared virtual canvas.
        </p>
        </div>
      </header>
      <section className="flex flex-col items-center mt-10">
        <h1>Your Work</h1>
      </section>
      <footer>

      </footer>
    </div>
  );
}
