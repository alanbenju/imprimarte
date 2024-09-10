// components/DesignComponent.tsx

import React, { useState, useEffect, useMemo, useCallback } from "react";
import DesignStage from "./DesignStage";
import { calculateScaleFactor } from "./helpers/calculateScale";
import { productConfig } from "./helpers/config";
import { ColorOption, UploadedFile, Product } from "../types";
import { Stage } from "konva/lib/Stage";

export type ShirtComponentProps = {
    selectedColor: ColorOption;
    uploadedFileData: UploadedFile;
    setUploadedFile: (file: UploadedFile) => void;
    selectedProduct: Product;
    stageRef: React.RefObject<Stage>
}

const DesignComponent = ({ selectedColor, uploadedFileData, setUploadedFile, selectedProduct, stageRef }: ShirtComponentProps) => {
    const selectedProductConfig = useMemo(() => productConfig[selectedProduct.id as keyof typeof productConfig], [selectedProduct.id]);
    
    const [stageWidth, setStageWidth] = useState<number>(selectedProductConfig.imageSize.width);
    const [stageHeight, setStageHeight] = useState<number>(selectedProductConfig.imageSize.height);
    const [scaleFactor, setScaleFactor] = useState<number>(1);

    const { rectWidth, rectHeight } = useMemo(() => ({
        rectWidth: selectedProductConfig.rectSizePixels.width * scaleFactor,
        rectHeight: selectedProductConfig.rectSizePixels.height * scaleFactor
    }), [selectedProductConfig.rectSizePixels, scaleFactor]);

    const handleResize = useCallback(() => {
        const containerWidth = document.querySelector(".design-container")?.clientWidth || window.innerWidth;
        const scale = calculateScaleFactor(containerWidth, selectedProductConfig.imageSize.width);
        setStageWidth(selectedProductConfig.imageSize.width * scale);
        setStageHeight(selectedProductConfig.imageSize.height * scale);
        setScaleFactor(scale);
    }, [selectedProductConfig]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

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
                stageRef={stageRef}
            />
        </div>
    );
};

export default React.memo(DesignComponent);
