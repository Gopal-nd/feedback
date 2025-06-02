'use server'
import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export const createProject = async (formData: FormData) => {
    const { userId } = await auth();

    const project = {
        name: formData.get("name") as string ,
        description: formData.get("description") as string ,
        url: formData.get("url") as string ,
        userId: userId as string 
    }
    const newProjectId = await db.insert(projects).values(project).returning({insertedId: projects.id}) ;
    console.log(`new project created with id: ${newProjectId[0].insertedId}`)

    redirect(`/dashboard/${newProjectId[0].insertedId}/instructions`);
}