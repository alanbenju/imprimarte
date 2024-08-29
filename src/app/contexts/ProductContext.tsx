// ProductContext.tsx
"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { Product } from "../design/types";

// Sample product data
const sampleProducts: Product[] = [
    {
        id: "1",
        name: "Regular Fit",
        price: 10000,
        colors: [
            {
                color: "negro",
                image: "/regular-fit/black.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "black"
            },
            {
                color: "blanco",
                image: "/regular-fit/white.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "white"
            },
            {
                color: "azul-francia",
                image: "/regular-fit/azul-francia.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "#0072BB"
            },
            {
                color: "bossa-nova",
                image: "/regular-fit/bossa-nova.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "#8E4B3C"
            },
            {
                color: "cinnamon",
                image: "/regular-fit/cinnamon.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "#D2691E"
            },
            {
                color: "marron-seta",
                image: "/regular-fit/marron-seta.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "#8B4513"
            },
            {
                color: "pensamiento",
                image: "/regular-fit/pensamiento.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "#702963"
            },
            {
                color: "petroleo",
                image: "/regular-fit/petroleo.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "#005F6A"
            },
            {
                color: "rosa-w",
                image: "/regular-fit/rosa-w.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "#FFC0CB"
            },
        ],
        type: "Regular Fit",
        previewImage: "/regular-fit/black.png",
        sizeDetails: {
            "S": { "ancho": "52-54", "largo": "65-67", "hombro": "41-43", "manga": "18-19" },
            "M": { "ancho": "54-56", "largo": "67-69", "hombro": "44-45", "manga": "19-20" },
            "L": { "ancho": "56-58", "largo": "69-70", "hombro": "45-46", "manga": "20-21" },
            "XL": { "ancho": "58-60", "largo": "70-71", "hombro": "46-47", "manga": "21-22" },
            "XXL": { "ancho": "60-61", "largo": "71-72", "hombro": "47-48", "manga": "22-23" }
        }

    },
    {
        id: "2",
        name: "Remera Oversize",
        price: 12000,
        previewImage: "/remera-oversize/cinnamon.png",
        colors: [
            {
                color: "cinnamon",
                image: "/remera-oversize/cinnamon.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "#d2691e" // Example color code, adjust if necessary
            },
            /*{
                color: "menta",
                image: "/remera-oversize/menta.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "#98ff98" // Example color code, adjust if necessary
            },*/
            {
                color: "rojo",
                image: "/remera-oversize/rojo.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "red"
            },
            {
                color: "rosa",
                image: "/remera-oversize/rosa.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "pink"
            },
            {
                color: "toffee",
                image: "/remera-oversize/toffee.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "#7d5c49" // RGB(125, 92, 73) converted to hex
            },
            {
                color: "topo",
                image: "/remera-oversize/topo.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "#7b7b7b" // Example color code, adjust if necessary
            },
            {
                color: "verde-tanque",
                image: "/remera-oversize/verde-tanque.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/regular-fit/sizes.jpeg",
                background: "#556b2f" // Example color code, adjust if necessary
            },
        ],
        type: "Remera Oversize",
        sizeDetails: {
            "S": { "ancho": "53-54", "largo": "74-75", "hombro": "48-49", "manga": "23-24" },
            "M": { "ancho": "55-56", "largo": "76-77", "hombro": "50-51", "manga": "23-24" },
            "L": { "ancho": "57-58", "largo": "77-78", "hombro": "52-53", "manga": "24-25" },
            "XL": { "ancho": "59-60", "largo": "78-79", "hombro": "53-54", "manga": "24-25" },
            "XXL": { "ancho": "62-63", "largo": "79-80", "hombro": "56-57", "manga": "24-25" }
        }

    },
    {
        id: "3",
        name: "Canguro",
        price: 25000, // Adjust the price as needed
        previewImage: "/canguro/bordo.png",
        colors: [
            {
                color: "bordo",
                image: "/canguro/bordo.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/canguro/sizes.jpeg",
                background: "#800000" // Adjust this color code if needed
            },
            {
                color: "lead-gray",
                image: "/canguro/lead-gray.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/canguro/sizes.jpeg",
                background: "#505050" // Adjust this color code if needed
            },
            {
                color: "suavidad-lila",
                image: "/canguro/suavidad-lila.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/canguro/sizes.jpeg",
                background: "#E6E6FA" // Adjust this color code if needed
            }
        ],
        type: "Canguro",
        sizeDetails:{
            "S": { "ancho": "53-55", "largo": "69-70", "hombro": "46-47", "manga": "58-59" },
            "M": { "ancho": "55-57", "largo": "70-71", "hombro": "48-49", "manga": "59-60" },
            "L": { "ancho": "57-59", "largo": "71-72", "hombro": "49-51", "manga": "60-61" },
            "XL": { "ancho": "59-61", "largo": "72-73", "hombro": "52-53", "manga": "61-62" },
            "XXL": { "ancho": "61-63", "largo": "73-74", "hombro": "53-55", "manga": "62-63" }
        }
        
    },
    {
        id: "4",
        name: "Hoodie Oversize",
        price: 16000, // Adjust the price as needed
        previewImage: "/hoodie-oversize/azul-francia.png",
        colors: [
            {
                color: "azul-francia",
                image: "/hoodie-oversize/azul-francia.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/hoodie-oversize/sizes.jpeg",
                background: "#0072BB" // Same as Regular Fit azul-francia
            },
            {
                color: "negro",
                image: "/hoodie-oversize/negro.png",
                availableSizes: ["XS", "S", "M", "L", "XL"],
                sizesImages: "/hoodie-oversize/sizes.jpeg",
                background: "black"
            }
        ],
        type: "Hoodie Oversize",
        sizeDetails: {
            "S": { "ancho": "57", "largo": "73", "hombro": "50", "manga": "65" },
            "M": { "ancho": "60", "largo": "75", "hombro": "52", "manga": "67" },
            "L": { "ancho": "63", "largo": "76", "hombro": "55", "manga": "69" },
            "XL": { "ancho": "65", "largo": "77", "hombro": "56", "manga": "70" },
            "XXL": { "ancho": "66", "largo": "78", "hombro": "57", "manga": "71" }
        }

    }
];

// Define the structure of the Product Context
interface ProductContextType {
    products: Product[];
    getProducts: () => Product[]; // New function to get all products
    getProductByType: (type: string) => Product; // New function to get products by type
}

// Create the ProductContext with an empty default value
export const ProductContext = createContext<ProductContextType>({
    products: [],
    getProducts: () => [],
    getProductByType: () => sampleProducts[0],
});

interface ProductProviderProps {
    children: ReactNode;
}

// Create the ProductProvider to wrap the application
export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const products = sampleProducts;

    // Function to return all products
    const getProducts = () => {
        return products;
    };

    // Function to return products filtered by type
    const getProductByType = (type: string) => {
        return products.filter(product => product.type === type)[0];
    };

    return (
        <ProductContext.Provider value={{ products, getProducts, getProductByType }}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook to use the ProductContext
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
};
