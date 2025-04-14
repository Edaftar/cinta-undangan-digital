
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  updating: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  updating,
  onChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="flex-1 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            placeholder="First Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            placeholder="Last Name"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          readOnly
          className="bg-gray-100"
          placeholder="Email"
        />
        <p className="text-xs text-gray-500">Email cannot be changed</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="Phone Number"
        />
      </div>
      
      <Button 
        type="submit" 
        className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold"
        disabled={updating}
      >
        {updating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Save Changes
      </Button>
    </form>
  );
};

export default ProfileForm;
