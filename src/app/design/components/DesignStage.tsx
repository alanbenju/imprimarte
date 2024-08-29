// components/DesignStage.tsx

import React from "react";
import { Stage, Layer, Image as KonvaImage, Rect } from "react-konva";
import useImage from "use-image";
import { productConfig } from "./helpers/config";
import { ColorOption, Product, UploadedFile } from "../types";
import DraggableImage from "./DraggableImage";

type DesignStageProps = {
    selectedColor: ColorOption;
    stageWidth: number;
    stageHeight: number;
    rectWidth: number;
    rectHeight: number;
    scaleFactor: number;
    uploadedFileData: UploadedFile
    setUploadedFile: (file: UploadedFile) => void;
    selectedProduct: Product
};

const DesignStage: React.FC<DesignStageProps> = ({
    selectedColor,
    stageWidth,
    stageHeight,
    rectWidth,
    rectHeight,
    scaleFactor,
    uploadedFileData,
    setUploadedFile,
    selectedProduct
}) => {
    const [tShirtImage] = useImage(selectedColor.image); // Use prop for the shirt image path
    const [selectedImage] = useImage(uploadedFileData.url || "");

    const rectX = productConfig[selectedProduct.id as keyof typeof productConfig].rectPosition.x * scaleFactor;
    const rectY = productConfig[selectedProduct.id as keyof typeof productConfig].rectPosition.y * scaleFactor;

    console.log({ selectedColor })

    const handleDragEnd = (e: any) => {
        setUploadedFile({
            ...uploadedFileData,
            isDragging: false,
        });
    };

    const handleDragStart = () => {
        setUploadedFile({
            ...uploadedFileData,
            isDragging: true,
        });
    };

    return (
        <Stage width={stageWidth} height={stageHeight}>
            <Layer>
                {tShirtImage && (
                    <KonvaImage
                        image={tShirtImage}
                        width={stageWidth}
                        height={stageHeight}
                    />
                )}
                <Rect
                    x={rectX}
                    y={rectY}
                    width={rectWidth}
                    height={rectHeight}
                    stroke={selectedColor.background === "black" ? "white" : "black"}
                    strokeWidth={2}
                    dash={[10, 5]}
                />
                {selectedImage && (
                    <DraggableImage 
                    uploadedFileData={uploadedFileData} 
                    rectX={rectX} rectY={rectY} 
                    rectWidth={rectWidth} rectHeight={rectHeight} 
                    setUploadedFile={setUploadedFile}></DraggableImage>
                )}
            </Layer>
        </Stage>
    );
};

export default DesignStage;
