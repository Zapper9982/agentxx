'use client'

import { FloatingLabelInput } from "../../../components/form/FloatingLabelInput";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Form</h1>
      <p className="text-gray-600 mb-6">Please fill out the form below:</p>

      <FloatingLabelInput />
    </>
  );
}
