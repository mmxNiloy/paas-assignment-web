"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  num: z.number().positive(),
});

type FormType = z.infer<typeof FormSchema>;

export default function EvenNumberGeneratorPage() {
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      num: 1,
    },
  });

  const num = form.watch("num");

  const evenNumbers = useMemo(
    () => Array.from({ length: num }, (_, index) => (index + 1) << 1),
    [num]
  );

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Even Number Generator</CardTitle>
          <CardDescription>
            Generate{" "}
            <b>
              &quot;<em>N</em>&quot; Even Numbers
            </b>{" "}
            below.
          </CardDescription>
        </CardHeader>

        <CardContent className="min-w-sm">
          <Form {...form}>
            <form className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="num"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter a number</FormLabel>
                    <FormControl>
                      <Input placeholder="1" {...field} />
                    </FormControl>

                    <FormDescription>
                      Enter a <em>positive</em> integer. For example: 1
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Generated Even Numbers</FormLabel>
                <FormControl>
                  <Textarea
                    readOnly
                    value={evenNumbers.join()}
                    className="resize-none"
                    rows={8}
                  />
                </FormControl>
              </FormItem>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
