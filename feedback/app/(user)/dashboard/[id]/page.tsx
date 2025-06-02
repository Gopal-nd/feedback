import { db } from "@/db"
import { eq } from "drizzle-orm"
import { projects as dbProjects } from "@/db/schema"
import Link from "next/link"
import { Globe, ChevronLeft, Code } from "lucide-react"
import Table from "@/components/Tabel"


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  if (!id) return <div className="text-red-500 dark:text-red-400">Invalid Project ID</div>

  const projects = await db.query.projects.findMany({
    where: eq(dbProjects.id, Number.parseInt(id)),
    with: {
      feedbacks: true,
    },
  })

  const project = projects[0]
  if (!project) return <div className="text-red-500 dark:text-red-400">Project not found</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div>
        <Link
          href="/dashboard"
          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-5 w-fit"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span className="text-lg">Back to projects</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">{project.name}</h1>
          <h2 className="text-gray-700 dark:text-gray-300 text-xl mb-2">{project.description}</h2>
        </div>

        <div className="flex flex-col">
          {project.url ? (
            <a
              href={project.url.startsWith("http") ? project.url : `https://${project.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400 flex items-center hover:text-blue-800 dark:hover:text-blue-300"
            >
              <Globe className="h-5 w-5 mr-1" />
              <span className="text-lg">Visit site</span>
            </a>
          ) : null}

          <Link
            href={`/dashboard/${id}/instructions`}
            className="underline text-blue-600 dark:text-blue-400 flex items-center mt-2 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <Code className="h-5 w-5 mr-1" />
            <span className="text-lg">Embed Code</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Feedback</h2>
        {project.feedbacks.length > 0 ? (
          <Table data={project.feedbacks} />
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">No feedback received yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
