// components/DesignComponent.tsx

import React, { useState, useEffect } from "react";
import DesignStage from "./DesignStage";
import { calculateScaleFactor } from "./helpers/calculateScale";
import { productConfig } from "./helpers/config";
import { cmToPixel } from "./helpers/convertUnits";
import { ColorOption, UploadedFile, Product } from "../types";

export type ShirtComponentProps = {
    selectedColor: ColorOption;
    uploadedFileData: UploadedFile;
    setUploadedFile: (file: UploadedFile) => void;
    selectedProduct: Product
}


const DesignComponent = ({ selectedColor, uploadedFileData, setUploadedFile, selectedProduct }: ShirtComponentProps) => {
    const [stageWidth, setStageWidth] = useState<number>(productConfig[1].imageSize.width);
    const [stageHeight, setStageHeight] = useState<number>(productConfig[1].imageSize.height);
    const [scaleFactor, setScaleFactor] = useState<number>(1);

    const rectWidth = cmToPixel(productConfig[selectedProduct.id as keyof typeof productConfig].rectSizeCM.width) * scaleFactor;
    const rectHeight = cmToPixel(productConfig[selectedProduct.id as keyof typeof productConfig].rectSizeCM.height) * scaleFactor;
    

    useEffect(() => {
        const handleResize = () => {
            const containerWidth = document.querySelector(".design-container")?.clientWidth || window.innerWidth;
            const scale = calculateScaleFactor(containerWidth, productConfig[1].imageSize.width);
            console.log({scale, containerWidth, imageWid: productConfig[1].imageSize.width})
            setStageWidth(productConfig[1].imageSize.width * scale);
            setStageHeight(productConfig[1].imageSize.height * scale);
            setScaleFactor(scale);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    

    return (
        <div className="design-container mx-auto w-full p-4 md:max-w-2xl">
        <DesignStage
                selectedColor={selectedColor}
                stageWidth={stageWidth}
                stageHeight={stageHeight}
                rectWidth={rectWidth}
                rectHeight={rectHeight}
                scaleFactor={scaleFactor}
                uploadedFileData={uploadedFileData}
                setUploadedFile={setUploadedFile}
                selectedProduct={selectedProduct}

            />
        </div>
    );
};

export default DesignComponent;
