
import NewProjBtn from "@/components/NewProject";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { User } from "lucide-react";
import UserProjectsList from "@/components/UserProjectsList";
export default async function Page() {
  const { userId } =await auth();
  if (!userId) {
    return null;
  }

  const user = await currentUser()

  const allProjects = await db.select().from(projects).where(eq(projects.userId, userId))
  console.log(allProjects)
  console.log(userId)
  // console.log(user)

  return (
    <div>
      <div className=" ">
        <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-center my-4">Your Projects</h1>
      <NewProjBtn />
        </div>
        <div className="flex items-center justify-start  h-full w-full">
          <UserProjectsList projects={allProjects}  />
        </div>
      </div>
      </div>
  )
}