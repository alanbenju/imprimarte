// components/DesignStage.tsx

import React, { useRef, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Rect, Text, Line } from "react-konva";
import useImage from "use-image";
import { productConfig } from "./helpers/config";
import { ColorOption, Product, UploadedFile } from "../types";
import DraggableImage from "./DraggableImage";
import { Stage as StageType } from "konva/lib/Stage";

// Add a new prop for the upload function
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
    stageRef: React.RefObject<StageType>
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
    selectedProduct,
    stageRef
}) => {
    const [tShirtImage] = useImage(selectedColor.image);
    const [selectedImage] = useImage(uploadedFileData.url || "");

    const rectX = productConfig[selectedProduct.id as keyof typeof productConfig].rectPosition.x * scaleFactor;
    const rectY = productConfig[selectedProduct.id as keyof typeof productConfig].rectPosition.y * scaleFactor;
    const selectedProductConfig = productConfig[selectedProduct.id as keyof typeof productConfig];
    const rectWidthCM = selectedProductConfig.rectSizeCM.width;
    const rectHeightCM = selectedProductConfig.rectSizeCM.height;
    useEffect(()=>{
        console.log("DesignStage")
        console.log(uploadedFileData.x, uploadedFileData.y)
        setUploadedFile({
            ...uploadedFileData,
            x: rectX,
            y: rectY
        })
        console.log(rectX, rectY)
    }, [selectedProduct])

    return (
        <>
            <Stage width={stageWidth} height={stageHeight} ref={stageRef}>
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
                    <Text
                        x={rectX}
                        y={rectY - 30}
                        text={`${rectWidthCM}cm`}
                        fontSize={18}
                        fill={selectedColor.background === "black" ? "white" : "black"}
                    />
                    <Text
                        x={rectX + rectWidth + 10}
                        y={rectY + rectHeight / 2}
                        text={`${rectHeightCM}cm`}
                        fontSize={18}
                        fill={selectedColor.background === "black" ? "white" : "black"}
                        rotation={-90}
                    />
                </Layer>
            </Stage>
        </>
    );
};

export default DesignStage;
