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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Schema for matrix input validation
const FormSchema = z
  .object({
    matrixA: z.string().refine(
      (value) => {
        try {
          const rows = value
            .trim()
            .split("\n")
            .map((row) => row.trim().split(/\s+/).map(Number));
          if (rows.length === 0 || rows[0].length === 0) return false;
          const cols = rows[0].length;
          return rows.every(
            (row) => row.length === cols && row.every((num) => !isNaN(num))
          );
        } catch {
          return false;
        }
      },
      {
        message:
          "Invalid matrix format. Enter numbers separated by spaces, with each row on a new line.",
      }
    ),
    matrixB: z.string().refine(
      (value) => {
        try {
          const rows = value
            .trim()
            .split("\n")
            .map((row) => row.trim().split(/\s+/).map(Number));
          if (rows.length === 0 || rows[0].length === 0) return false;
          const cols = rows[0].length;
          return rows.every(
            (row) => row.length === cols && row.every((num) => !isNaN(num))
          );
        } catch {
          return false;
        }
      },
      {
        message:
          "Invalid matrix format. Enter numbers separated by spaces, with each row on a new line.",
      }
    ),
  })
  .refine(
    (data) => {
      const matrixA = data.matrixA
        .trim()
        .split("\n")
        .map((row) => row.trim().split(/\s+/).map(Number));
      const matrixB = data.matrixB
        .trim()
        .split("\n")
        .map((row) => row.trim().split(/\s+/).map(Number));
      return matrixA[0].length === matrixB.length;
    },
    {
      message: "Matrix A columns must equal Matrix B rows for multiplication.",
      path: ["matrixB"],
    }
  );

type FormType = z.infer<typeof FormSchema>;

// Function to multiply matrices
const multiplyMatrices = (
  matrixA: number[][],
  matrixB: number[][]
): number[][] => {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;
  const result: number[][] = Array(rowsA)
    .fill(0)
    .map(() => Array(colsB).fill(0));

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      for (let k = 0; k < colsA; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }
  return result;
};

export default function MatrixMultiplierPage() {
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      matrixA: "1 2\n3 4",
      matrixB: "5 6\n7 8",
    },
  });

  const { matrixA, matrixB } = form.watch();

  // Compute matrix product using useMemo
  const resultMatrix = useMemo(() => {
    try {
      const matrixAArray = matrixA
        .trim()
        .split("\n")
        .map((row) => row.trim().split(/\s+/).map(Number));
      const matrixBArray = matrixB
        .trim()
        .split("\n")
        .map((row) => row.trim().split(/\s+/).map(Number));
      if (matrixAArray[0].length !== matrixBArray.length) return [];
      return multiplyMatrices(matrixAArray, matrixBArray);
    } catch {
      return [];
    }
  }, [matrixA, matrixB]);

  return (
    <div className="flex flex-col h-full items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Matrix Multiplier</CardTitle>
          <CardDescription>
            Enter two matrices to compute their product.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="matrixA"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matrix A</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter matrix A (e.g., 1 2\n3 4)"
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter numbers separated by spaces, with each row on a new
                      line.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="matrixB"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Matrix B</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter matrix B (e.g., 5 6\n7 8)"
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ensure Matrix A columns match Matrix B rows.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Result Matrix</FormLabel>
                <FormControl>
                  <Textarea
                    readOnly
                    value={
                      resultMatrix.length > 0
                        ? resultMatrix.map((row) => row.join(" ")).join("\n")
                        : "Invalid input"
                    }
                    className="resize-none"
                    rows={4}
                  />
                </FormControl>
                <FormDescription>
                  The product of Matrix A and Matrix B.
                </FormDescription>
              </FormItem>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
