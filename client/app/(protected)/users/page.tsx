"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Page() {
  const { getToken } = useAuth();
  const token = getToken();
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  };

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR(`${baseURL}/api/users/self`, fetcher);

  const { data, error, isLoading, mutate } = useSWR(
    `${baseURL}/api/transactions/self`,
    fetcher
  );

  const handleSubmit = async () => {
    if (!amount) return toast.error("Amount is required");
    setSubmitting(true);
    try {
      const res = await fetch(`${baseURL}/api/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Transaction created successfully");
        setAmount("");
        mutate(); 
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Failed to create transaction");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-10 py-10">
      {/* User Info */}
      {userLoading ? (
        <div>Loading user info...</div>
      ) : userError ? (
        <div>Error loading user</div>
      ) : (
        <div className="mb-6 p-4 border rounded shadow bg-white">
          <h2 className="text-lg font-semibold mb-1">
            Welcome, {userData.data.fullname}
          </h2>
          <p>
            <strong>Username:</strong> {userData.data.username}
          </p>
          <p>
            <strong>Balance:</strong> ${userData.data.balance}
          </p>
          <p>
            <strong>Account Created:</strong>{" "}
            {userData.data.createdAt.slice(0, 10)}
          </p>
        </div>
      )}

      {/* Transaction Creation Form */}
      <div className="mb-8 p-4 border rounded shadow bg-white max-w-md space-y-3">
        <h3 className="text-lg font-semibold">Create Transaction</h3>
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={submitting} className="cursor-pointer">
          {submitting ? "Submitting..." : "Create Transaction"}
        </Button>
      </div>

      {/* Transactions Table */}
      <h3 className="pb-3 mt-20">Transaction History</h3>
      {isLoading ? (
        <div>Loading transactions...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SL</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>${item.amount}</TableCell>
                <TableCell>{item.date.slice(0, 10)}</TableCell>
                <TableCell>
                  <Badge
                    className={`capitalize ${
                      item.status === "pending"
                        ? "bg-yellow-500"
                        : item.status === "approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
