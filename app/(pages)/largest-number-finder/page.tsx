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

// Schema for input validation
const FormSchema = z
  .object({
    numbers: z.string().refine(
      (value) => {
        try {
          const nums = value.trim().split(/\s+/).map(Number);
          return nums.length > 0 && nums.every((num) => !isNaN(num));
        } catch {
          return false;
        }
      },
      { message: "Enter a valid list of numbers separated by spaces." }
    ),
    n: z.string().refine(
      (value) => {
        const num = Number(value);
        return !isNaN(num) && Number.isInteger(num) && num >= 1;
      },
      { message: "N must be a positive integer." }
    ),
  })
  .refine(
    (data) => {
      const nums = data.numbers.trim().split(/\s+/).map(Number);
      const n = Number(data.n);
      return n <= nums.length;
    },
    { message: "N is out of range for the given list.", path: ["n"] }
  );

type FormType = z.infer<typeof FormSchema>;

// Function to find the N-th largest number (1-based index)
const findNthLargest = (numbers: number[], n: number): number | null => {
  if (n < 1 || n > numbers.length) return null;
  const sorted = [...numbers].sort((a, b) => b - a); // Sort in descending order
  return sorted[n - 1]; // 1-based index
};

export default function LargestNumberFinderPage() {
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      numbers: "5 2 8 1 9",
      n: "2",
    },
  });

  const { numbers, n } = form.watch();

  // Compute the N-th largest number using useMemo
  const result = useMemo(() => {
    try {
      const numArray = numbers.trim().split(/\s+/).map(Number);
      const nValue = Number(n);
      const result = findNthLargest(numArray, nValue);
      return result !== null ? result.toString() : "N is out of range";
    } catch {
      return "Invalid input";
    }
  }, [numbers, n]);

  return (
    <div className="flex flex-col h-full items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>N-th Largest Number Finder</CardTitle>
          <CardDescription>
            Find the N-th largest number in a list (1-based index).
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="numbers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>List of Numbers</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter numbers (e.g., 5 2 8 1 9)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter numbers separated by spaces.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="n"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>N (1-based index)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter N (e.g., 2)" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a positive integer not larger than the list length.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>N-th Largest Number</FormLabel>
                <FormControl>
                  <Textarea
                    readOnly
                    value={result}
                    className="resize-none"
                    rows={1}
                  />
                </FormControl>
                <FormDescription>
                  The N-th largest number in the list.
                </FormDescription>
              </FormItem>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
