"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

// Function to generate random alphanumeric string
const generateMemberNumber = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

interface FormData {
  createdAt: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  zone: string;
  serviceUnit: string;
  conferenceShirt: string;
  feePayment: string;
  paid: boolean;
}

interface Errors {
  name?: string;
  email?: string;
}

export function AddDetailsDialog() {
  const [open, setOpen] = useState(false);
  const [memberNumber, setMemberNumber] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    createdAt: "",
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    zone: "",
    serviceUnit: "",
    conferenceShirt: "",
    feePayment: "",
    paid: false,
  });
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    // Generate a new member number when the component mounts
    setMemberNumber(generateMemberNumber());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSwitchChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      paid: !prevData.paid,
    }));
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    // Email format validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const dataToSubmit = {
      member_number: memberNumber,
      created_at: formData.createdAt,
      name: formData.name,
      email: formData.email,
      phone_number: formData.phoneNumber,
      gender: formData.gender,
      zone: formData.zone,
      service_unit: formData.serviceUnit,
      conference_shirt: formData.conferenceShirt,
      fee_payment: formData.feePayment,
      paid: formData.paid,
    };

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json();
      setOpen(false); // Close the dialog
      setMemberNumber(generateMemberNumber()); // Generate a new member number

      // Clear all fields
      setFormData({
        createdAt: "",
        name: "",
        email: "",
        phoneNumber: "",
        gender: "",
        zone: "",
        serviceUnit: "",
        conferenceShirt: "",
        feePayment: "",
        paid: false,
      });
      setErrors({}); // Clear validation errors
      toast({
        title: "Success!!",
        description: result.message,
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to save user details",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Add New User Info
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User Info</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="member_number" className="text-right">
                  Member Number
                </Label>
                <Input
                  id="member_number"
                  value={memberNumber}
                  disabled
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="createdAt" className="text-right">
                  Created At
                </Label>
                <Input
                  id="createdAt"
                  type="date"
                  value={formData.createdAt}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="col-span-3"
                />
                {errors.name && (
                  <span className="col-span-4 text-red-600 text-right">
                    {errors.name}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="col-span-3"
                />
                {errors.email && (
                  <span className="col-span-4 text-red-600 text-right">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">
                  Gender
                </Label>
                <Input
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="zone" className="text-right">
                  Zone
                </Label>
                <Input
                  id="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serviceUnit" className="text-right">
                  Service Unit
                </Label>
                <Input
                  id="serviceUnit"
                  value={formData.serviceUnit}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="conferenceShirt" className="text-right">
                  Conference Shirt
                </Label>
                <Input
                  id="conferenceShirt"
                  value={formData.conferenceShirt}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="feePayment" className="text-right">
                  Fee Payment
                </Label>
                <Input
                  id="feePayment"
                  value={formData.feePayment}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="flex items-center gap-4">
                <Label htmlFor="paid" className="text-right">
                  Paid
                </Label>
                <Switch
                  id="paid"
                  checked={formData.paid}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
