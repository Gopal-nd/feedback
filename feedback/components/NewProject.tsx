'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import SubmitButton from "./SubmitButton"
import { createProject } from "@/actions/createProject"
import TurnstileWidget from "./TurnstileWidget"

const NewProjBtn = () => {
  const [token, setToken] = useState("")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>Create a new project to get started</DialogDescription>
        </DialogHeader>
        <form
          className="flex gap-4 flex-col"
          action={async (formData) => {
            if (!token) {
              alert("Please complete the Turnstile challenge.")
              return
            }
            formData.append("turnstileToken", token)
            await createProject(formData)
          }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Project Name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" name="url" placeholder="https://example.com" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea name="description" id="description" placeholder="Description (optional)" />
          </div>

          {/* ✅ Turnstile */}
          <TurnstileWidget
            siteKey="0x4AAAAAABgffkv4FqGZSbOM"
            onSuccess={(token) => setToken(token)}
          />

          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewProjBtn
