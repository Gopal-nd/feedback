import { db } from "@/db";
import { eq } from "drizzle-orm";
import { projects as dbProjects } from "@/db/schema";
import Link from "next/link";
import { Globe, ChevronLeft, Code } from 'lucide-react';
import Table from "@/components/Tabel";


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
  if (!id) return (<div>Invalid Project ID</div>);

  const projects = await db.query.projects.findMany({
    where: (eq(dbProjects.id, parseInt(id))),
    with: {
      feedbacks: true
    }
  });

  const project = projects[0];
  

  return (
    <div>
      <div>
        <Link href="/dashboard" className="flex items-center text-indigo-700 mb-5 w-fit"><ChevronLeft className="h-5 w-5 mr-1" /><span className="text-lg">Back to projects</span></Link>
      </div>
      <div className="flex justify-between items-start">
        <div className="proj-info">
          <h1 className="text-3xl font-bold mb-3">{project.name}</h1>
          <h2 className="text-primary-background text-xl mb-2">{project.description}</h2>
        </div>
        <div className="flex flex-col">
        {project.url ? (
  <a
    href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
    target="_blank"
    rel="noopener noreferrer"
    className="underline text-indigo-700 flex items-center"
  >
    <Globe className="h-5 w-5 mr-1" />
    <span className="text-lg">Visit site</span>
  </a>
) : null}

          <Link href={`/dashboard/${id}/instructions`} className="underline text-indigo-700 flex items-center mt-2">
            <Code className="h-5 w-5 mr-1" /><span className="text-lg">Embed Code</span></Link>
        </div>
      </div>
      <div>
        <Table data={project.feedbacks} />
      </div>
    </div>
  )
}

export default page;