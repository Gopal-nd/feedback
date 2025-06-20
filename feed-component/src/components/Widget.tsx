"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { MessageCircle } from 'lucide-react';
import tailwindStyles from "../index.css?inline";
import  supabase from "../supabaseClient";

const Widget = ({projectId}: {projectId: any}) => {
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
     const formData = new FormData(e.currentTarget as HTMLFormElement);
     const data = {
       p_project_id: projectId,
       p_user_name: formData.get("name"),
       p_user_email: formData.get("email"),
       p_message: formData.get("feedback"),
       p_rating: Number(rating),
      };
      console.log(data)
    const { data: returnedData } = await supabase.rpc("add_feedback", data);
    setSubmitted(true);
    console.log(returnedData);
  };

  return (
    <>
    <style>{tailwindStyles}</style>
    <div className=" widget fixed bottom-4  right-4 z-50 flex flex-col items-end space-y-2">
      <div
      style={{border : "1px solid black" , borderRadius: "5px"}}
        className={`w-80 rounded-xl shadow-xl p-4 space-y-4   transition-all duration-300 ease-in-out transform ${
          showForm
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        }`}
      >
    <style>{tailwindStyles}</style>
       {submitted ? (
              <div>
                <h3 className="text-lg font-bold">Thank you for your feedback!</h3>
                <p className="mt-4">
                  We appreciate your feedback. It helps us improve our product and provide better
                  service to our customers.
                </p>
              </div>
            ) : (<>

        <h3 className="text-lg font-semibold text-center">Send us your feedback</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="widget "  htmlFor="name">Name</Label>
            <Input className=" border" type="text" name="name" id="name" placeholder="John Doe" required style={{boxShadow:"100px"}} />
          </div>
          <div className="space-y-2">
            <Label className="widget" htmlFor="email">Email</Label>
            <Input className=" border" type="email" name="email" id="email" placeholder="jondoe@me.com"  required/>
          </div>
          <div className="space-y-2">
            <Label className="widget">Rating</Label>
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, index) => {
                const current = index + 1;
                return (
                  <StarIcon
                    key={index}
                    filled={current <= (hovered || rating)}
                    onClick={() => setRating(current)}
                    onMouseEnter={() => setHovered(current)}
                    onMouseLeave={() => setHovered(0)}
                  />
                );
              })}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="widget" htmlFor="feedback">Feedback</Label>
            <Textarea className=" border" name="feedback" id="feedback" rows={4} placeholder="Write your feedback here" />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
        </>
        )}
      </div>


      <Button
        className="widget rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 active:scale-95"
        onClick={() => setShowForm(!showForm)}
      >
       <MessageCircle className="mr- h-10 w-10"  /> Feedback
      </Button>
    </div>
    </>

  );
};

export default Widget;

// StarIcon component
function StarIcon({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <svg
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      xmlns="http://www.w3.org/2000/svg"
      className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer transform transition duration-200 ease-in-out ${
        filled ? "text-yellow-400" : "text-gray-300"
      } hover:scale-110`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}
