"use client";
import {  useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { toast } from 'sonner'; // Import Sonner toast
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { cn } from "../lib/utils";
import { useRouter } from "next/navigation";
// Updated form schema
const formSchema =  z.object({
  Title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  Description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  Link: z
    .string()
    .min(1, "Link is required")
    .url("Must be a valid URL")
    .optional(),
});

function FormAddNews({ createpublication }: { createpublication:({ Title, Description, Link }: {
  Title: string;
  Description: string;
  Link?: string | undefined;
}) => Promise<string | undefined>}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      Description: "",
      Link: "",
          },
  });


  return (
    <section className="mt-10 flex flex-col w-[50%] min-h-screen">
      <h1 className='text-xl font-bold text-white-1'>Create Publication</h1>
      <Form {...form}>
        <form
         onSubmit={form.handleSubmit(async (data) => {
          setIsLoading(true);
          const toastId = toast.loading("Entrain d'ajouter l'Item...");
          try {
            const newCours = await createpublication(data);

            if (!newCours) throw new Error("No Cours returned");
            
            // Success feedback
            toast.success("Item submitted successfully!");
            form.reset(); // Reset the form

          } catch (error) {
            // Error feedback
            toast.error("An error occurred while submitting the Cours.");
            console.error("Submission error:", error); // Log the error for debugging
          } finally {
            // Reset loading state
            toast.dismiss(toastId); // Dismiss the loading toast
            setIsLoading(false);
            router.push("/");

          }
          
        })}
          className="space-y-8 mt-12 flex flex-col w-full"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="Title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-white-1">Title </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onBlur={() => form.trigger("Title")} // Validate on blur
                      className="input-class focus-visible:ring-offset-white"
                      placeholder="Enter Cours title"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
              
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-white-1">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      onBlur={() => form.trigger("Description")} // Validate on blur
                      className="input-class focus-visible:ring-offset-white"
                      placeholder="Enter Cours description"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
         <FormField
              control={form.control}
              name="Link"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-base font-bold text-white-1">Link to content </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onBlur={() => form.trigger("Link")} // Validate on blur
                      className="input-class focus-visible:ring-offset-white"
                      placeholder="Enter Cours URL"
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
         
          <div className="flex flex-col">
            <div className="">
              <Button
                type="submit"
                className="text-base w-full bg-white py-4 font-extrabold text-black transition-all duration-500 "
              >
                {isLoading ? (
                  <>
                    <Loader size={20} className="animate-spin ml-2" /> Submitting
                  </>
                ) : (
                  "Submit & Publish "
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
export default FormAddNews;