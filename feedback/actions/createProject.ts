'use server'
import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export const createProject = async (formData: FormData) => {
   const token = formData.get("turnstileToken")?.toString()

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: token!,
    }),
  })

  const data = await response.json()

  if (!data.success) {
    throw new Error("Turnstile verification failed")
  }
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