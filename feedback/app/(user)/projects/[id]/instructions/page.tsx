'use client'
import CopyBtn from "@/components/CopyBtn";
import { useParams } from "next/navigation";
import { use } from "react";

const Page = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
 
  if (!id) return (<div>Invalid Project ID</div>);
  if (!process.env.NEXT_PUBLIC_URL) return (<div>Missing WIDGET_URL</div>);

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Start Collecting Feedback</h1>
      <p className="text-lg text-secondary-foreground">Embed the code in your site</p>
      <div className="bg-blue-950 p-6 rounded-md mt-6 relative">
        <code className=" text-white">
          {`<my-widget project-id="${id}"></my-widget>`}
          <br />
          {`<script src="${process.env.NEXT_PUBLIC_URL}/widget.umd.js"></script>`}
        </code>
        <CopyBtn text={`<my-widget project-id="${id}"></my-widget>\n<script src="${process.env.NEXT_PUBLIC_URL}/widget.umd.js"></script>`} />
      </div>
    </div>
  );
};

export default Page;