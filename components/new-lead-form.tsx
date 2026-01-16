 "use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { leadSchema, leadStatusOptions, leadSourceOptions } from "@/lib/validators";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select } from "./ui/select";

const formSchema = leadSchema.pick({
  name: true,
  email: true,
  phone: true,
  company: true,
  message: true,
  status: true,
  source: true,
  tags: true
});

type FormValues = z.infer<typeof formSchema>;

export function NewLeadForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "new",
      source: "Website Form"
    }
  });

  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setStatus(null);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        tags:
          data.tags
            ?.toString()
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean) ?? []
      })
    });

    if (response.ok) {
      reset();
      setStatus("Lead created successfully");
    } else {
      setStatus("Failed to create lead");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-900">
          Add a lead manually
        </h2>
        <p className="text-sm text-slate-500">
          Useful for leads captured via phone or events.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-600">
            Name
          </label>
          <Input placeholder="Jane Doe" {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-600">
            Email
          </label>
          <Input
            type="email"
            placeholder="jane@company.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-600">
            Phone
          </label>
          <Input placeholder="+1 555 123 4567" {...register("phone")} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-600">
            Company
          </label>
          <Input placeholder="Acme Inc." {...register("company")} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-600">
          Message
        </label>
        <Textarea
          rows={4}
          placeholder="Notes about the opportunity"
          {...register("message")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-600">
            Status
          </label>
          <Select {...register("status")}>
            {leadStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-600">
            Source
          </label>
          <Select {...register("source")}>
            {leadSourceOptions.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-slate-600">
          Tags
        </label>
        <Input placeholder="vip, enterprise" {...register("tags")} />
        <p className="mt-1 text-xs text-slate-400">
          Separate tags with commas
        </p>
      </div>

      <div className="flex items-center justify-between">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save lead"}
        </Button>
        {status && <p className="text-sm text-slate-500">{status}</p>}
      </div>
    </form>
  );
}
