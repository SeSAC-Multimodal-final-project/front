import React from "react";

export function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-3 py-2 border rounded w-full"
    />
  );
}
