"use client";

import React, { useContext, useState } from "react";
import { ColorOption, Product, UploadedFile } from "./types";
import ShirtComponent from "./ShirtComponent";
import ShirtInputs from "./ShirtInputs";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";
import { v4 as uuidv4 } from "uuid";
import Loader from "./Loader"; // Importa el componente Loader
import DesignComponent from "./components/DesignComponent";

const initialUploadedFileData: UploadedFile = {
  url: "",
  width: 100,
  height: 100,
  id: "1",
  x: 1,
  y: 1,
  isDragging: false
}


const DesignPage = () => {

  const { getProductByType, getProducts } = useContext(ProductContext)
  const products = getProducts();
  const product = products[0]

  const [uploadedFileData, setUploadedFile] = useState<UploadedFile>(initialUploadedFileData);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.colors[0].availableSizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedProduct, setProduct] = useState<Product>(product);
  const [loading, setLoading] = useState(false); // Estado para manejar el loader


  const [file, setFile] = useState<File | null>(null);


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const img = new Image();
      const selectedFile = event.target.files[0];
      const url = URL.createObjectURL(event.target.files[0]);

      img.onload = () => {
        setUploadedFile({ ...uploadedFileData, width: img.width, height: img.height, url })
        setFile(selectedFile); // Store the selected file for later use
      };
      img.src = url;
    }
  };

  const setNewProduct = (product: Product) => {
    setProduct(product)
    setSelectedColor(product.colors[0])
    setSelectedSize(product.colors[0].availableSizes[0])
  }

  const { addToCart } = useContext(CartContext);

  const addItemToCart = async (): Promise<any> => {
    if (!file) {
      console.error("No file selected for upload");
      return;
    }

    setLoading(true); // Mostrar loader al iniciar la operación


    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        const url = data.downloadURL;

        addToCart({
          id: uuidv4() as string,
          name: selectedProduct.name,
          color: selectedColor.color,
          price: selectedProduct.price,
          size: selectedSize,
          quantity,
          productId: selectedProduct.id,
          imageUrl: url,
          shirtImage: selectedColor.image
        })

        return Promise.resolve()

        // Do something with the data
      } else {
        console.error("Upload failed:", response.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    finally {
      setLoading(false); // Ocultar loader después de completar la operación
    }
  };



  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {loading && <Loader />} {/* Mostrar el loader si está cargando */}

      <div className="w-full p-4 md:w-1/2 md:min-w-[500px]">
        <DesignComponent
          selectedColor={selectedColor}
          uploadedFileData={uploadedFileData}
          setUploadedFile={setUploadedFile}
          selectedProduct={selectedProduct}
        ></DesignComponent>
      </div>

      <div className="w-full p-4 md:w-1/2 md:min-w-[500px]">
        <ShirtInputs
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
          handleFileUpload={handleFileUpload}
          selectedProduct={selectedProduct}
          addToCart={addItemToCart}
          products={products}
          setProduct={setNewProduct}
        />
      </div>
    </div>
  );
};

export default DesignPage;
/*
<ShirtComponent
            selectedColor={selectedColor}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            selectedProduct={selectedProduct}
          />
          */