
import NewProjBtn from "@/components/NewProject";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } =await auth();
  if (!userId) {
    return null;
  }

  return (
    <div>
      <div className=" ">
        <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-center my-4">Your Projects</h1>
      <NewProjBtn />
        </div>
        <div className="flex items-center justify-end  h-full w-full">

        </div>
      </div>
      </div>
  )
}