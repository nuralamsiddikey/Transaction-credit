"use client";

import React from "react";
import useSWR, { mutate } from "swr"; // Add mutate for refreshing data
import { useAuth } from "@/context/authContext";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function page() {
  const { getToken } = useAuth();
  const token = getToken();

  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      headers: {
        authorization: `${token}`,
      },
    });
    return await res.json();
  };


  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR(`${baseURL}/api/users/self`, fetcher);

  console.log("userData", userData);

  const { data, error, isLoading } = useSWR(
    `${baseURL}/api/transactions`,
    fetcher
  );

  // Function to update transaction status
  const updateTransactionStatus = async (
    transactionId: string,
    status: string
  ) => {
    try {
      const response = await fetch(
        `${baseURL}/api/transactions/${transactionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
          },
          body: JSON.stringify({
            status: status.toLowerCase(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      mutate(`${baseURL}/api/transactions`);

      toast.success(`Transaction has been ${status.toLowerCase()}`);
    } catch (err) {
      toast.error("Could not update transaction status");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

 
  return (
    <div className="px-50 py-10">

     <div className="mb-6 p-4 border rounded shadow bg-white">
          <h2 className="text-lg font-semibold mb-1">
            Welcome, {userData.data.fullname}
          </h2>
          <p>
            <strong>Name:</strong> {userData.data.fullname}
          </p>
        </div>
      
      <h3>All transactions: </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.user.fullname}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>
                {item.status === "pending" ? (
                  <Select
                    onValueChange={(value) =>
                      updateTransactionStatus(item._id, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        className="capitalize"
                        placeholder={item.status}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="approved">Approve</SelectItem>
                      <SelectItem value="rejected">Reject</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className="capitalize" variant="outline">
                    {item.status}
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
