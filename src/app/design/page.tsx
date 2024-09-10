"use client";

import React, { useContext, useRef, useState } from "react";
import { ColorOption, Product, UploadedFile } from "./types";
import ShirtInputs from "./ShirtInputs";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";
import { v4 as uuidv4 } from "uuid";
import Loader from "./Loader";
import DesignComponent from "./components/DesignComponent";
import Konva from "konva";
import { Stage } from "konva/lib/Stage";
import { uploadFile } from "./components/helpers/uploadFile";

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
  const [selectedProduct, setProduct] = useState<Product>(product);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false); // Estado para manejar el loader
  const stageref = useRef<Konva.Stage>(null);
  const [stageRef, setStageRef] = useState<React.RefObject<Stage>>(stageref)
  console.log({uploadedFileData})


  const [file, setFile] = useState<File | null>(null);


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const img = new Image();
      const selectedFile = event.target.files[0];
      const url = URL.createObjectURL(selectedFile);

      img.onload = () => {
        setUploadedFile({ ...uploadedFileData, width: img.width, height: img.height, url })
        console.log("Page.tsx")
        console.log(uploadedFileData.x,uploadedFileData.y)
        setFile(selectedFile);
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

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file, uuidv4());

    const shirtWithImageFormData = new FormData();
    let blob;
    if (stageRef.current) {
      stageRef.current?.find("Transformer").forEach((transformer) => {
        transformer.hide();
      });
      stageRef.current?.find("Rect").forEach((rect) => {
        rect.hide();
      });
      stageRef.current?.find("Text").forEach((text) => {
        text.hide();
      });
      const dataUrl = stageRef.current?.toDataURL();
      blob = await (await fetch(dataUrl)).blob();
      shirtWithImageFormData.append("file", blob, uuidv4());

    }

    try {
      const [imageUrl, shirtWithImageUrl] = await Promise.all([uploadFile(formData), uploadFile(shirtWithImageFormData)])
      addToCart({
        id: uuidv4(),
        name: selectedProduct.name,
        color: selectedColor.color,
        price: selectedProduct.price,
        size: selectedSize,
        quantity,
        productId: selectedProduct.id,
        imageUrl,
        shirtImage: selectedColor.image,
        shirtWithImageUrl
      })

      return Promise.resolve()
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    finally {
      stageRef.current?.find("Transformer").forEach((transformer) => {
        transformer.show();
      });
      stageRef.current?.find("Rect").forEach((transformer) => {
        transformer.show();
      });
      stageRef.current?.find("Text").forEach((transformer) => {
        transformer.show();
      });
      setLoading(false); // Ocultar loader después de completar la operación
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500">
      {loading && <Loader />}

      <div className="w-full p-4 md:w-1/2 md:min-w-[500px]">
        <DesignComponent
          selectedColor={selectedColor}
          uploadedFileData={uploadedFileData}
          setUploadedFile={setUploadedFile}
          selectedProduct={selectedProduct}
          stageRef={stageRef}
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