"use client";

import React, { useState } from "react";
import { UploadedFile } from "./types";
import ShirtComponent from "./ShirtComponent";
import ShirtInputs from "./ShirtInputs";
import SizeDetails from "./SizeDetails";

const initialUploadedFile: UploadedFile = {
  url: "",
  width: 100,
  height: 100,
  id: "1",
  x: 1,
  y: 1,
  isDragging: false
}

const DesignPage = () => {

  const [uploadedFile, setUploadedFile] = useState<UploadedFile>(initialUploadedFile);

  const [selectedColor, setSelectedColor] = useState<string>("Negro");
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const img = new Image();
      const url = URL.createObjectURL(event.target.files[0]);

      img.onload = () => {
        setUploadedFile({ ...uploadedFile, width: img.width, height: img.height, url })
      };
      img.src = url;
    }
  };

  return (
<div className="flex min-h-screen w-full">
  <div className="flex w-full flex-col items-center justify-center md:flex-row">
    <ShirtComponent
      selectedColor={selectedColor}
      uploadedFile={uploadedFile}
      setUploadedFile={setUploadedFile}
    />

    <ShirtInputs
      selectedColor={selectedColor}
      setSelectedColor={setSelectedColor}
      selectedSize={selectedSize}
      setSelectedSize={setSelectedSize}
      quantity={quantity}
      setQuantity={setQuantity}
      handleFileUpload={handleFileUpload}
    />
  </div>
</div>
  );
};

export default DesignPage;
