"use client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const CreateWorkspace = () => {
  const router = useRouter();

  const handleCreateWorkspace = () => {
    const roomId = uuidv4();
    router.push(`/workspace/${roomId}`);
  };

  return (
    <button onClick={handleCreateWorkspace} >
      Create Your Workspace
    </button>
  );
};

export default CreateWorkspace;
