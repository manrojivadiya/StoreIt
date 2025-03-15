"use client";

import { useState, useEffect } from "react";
import { updateUserFullName } from "@/lib/actions/user.actions";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

const Profile = () => {
  const { user, setUser } = useUser();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setFullName(user?.fullName || "");
  }, [user]);

  const handleUpdate = async () => {
    if (!user || updating) return;

    setUpdating(true);
    try {
      await updateUserFullName(user.$id, fullName);

      // ✅ Update user context so Sidebar updates automatically
      setUser({ ...user, fullName });
    } catch (error) {
      alert("Failed to update name");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-6">
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">Profile</h2>

        {/* Full Name Field */}
        <div className="mb-4">
          <label className="font-bold text-black block text-sm ">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={updating}
          />
        </div>

        {/* Email Field (Disabled) */}
        <div className="mb-4">
          <label className="font-bold text-black block text-sm">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-200 cursor-not-allowed"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full text-black py-2 rounded-md bg-red flex items-center justify-center"
          disabled={updating}
        >
          {updating ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></span>
              Updating...
            </div>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </div>
  );
};

export default Profile;
