import React, { useRef, useEffect } from "react";
import { Image as KonvaImage, Transformer, Text, Group } from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import { UploadedFile } from "../types";

interface DraggableImageProps {
    uploadedFileData: UploadedFile;
    rectX: number;
    rectY: number;
    rectWidth: number;
    rectHeight: number;
    setUploadedFile: (file: UploadedFile) => void;
}

const DraggableImage: React.FC<DraggableImageProps> = ({
    uploadedFileData,
    rectX,
    rectY,
    rectWidth,
    rectHeight,
    setUploadedFile
}) => {
    const [selectedImage] = useImage(uploadedFileData.url || "");
    const imageRef = useRef<Konva.Image>(null);
    const trRef = useRef<Konva.Transformer>(null);

    const adjustImageSize = () => {
        console.log("adjust image size")
        if (!selectedImage || !uploadedFileData) return;

        let width = selectedImage.width;
        let height = selectedImage.height;

        // Calculate aspect ratio
        const aspectRatio = width / height;

        // Maximum allowed dimensions (in pixels)
        const maxLongSide = (30 / 29) * rectWidth; // 30cm converted to pixels
        const maxShortSide = (20 / 29) * rectWidth; // 20cm converted to pixels

        // Adjust dimensions to fit within max allowed size while maintaining aspect ratio
        if (width > height) {
            // Landscape orientation
            if (width > maxLongSide) {
                width = maxLongSide;
                height = width / aspectRatio;
            }
            if (height > maxShortSide) {
                height = maxShortSide;
                width = height * aspectRatio;
            }
        } else {
            // Portrait orientation
            if (height > maxLongSide) {
                height = maxLongSide;
                width = height * aspectRatio;
            }
            if (width > maxShortSide) {
                width = maxShortSide;
                height = width / aspectRatio;
            }
        }

        // Scale to fit within the rectangle if necessary
        const widthScale = rectWidth / width;
        const heightScale = rectHeight / height;
        const scaleFactor = Math.min(widthScale, heightScale, 1);

        width *= scaleFactor;
        height *= scaleFactor;

        console.log("DraggableImage")
        console.log(rectX + (rectWidth - width) / 2,rectY + (rectHeight - height) / 2)
        setUploadedFile({
            ...uploadedFileData,
            width: width,
            height: height,
            x: rectX + (rectWidth - width) / 2,
            y: rectY + (rectHeight - height) / 2,
        });
    };

    useEffect(() => {
        console.log("Drag image useEffect 1")
        if (selectedImage) {
            adjustImageSize();
        }
    }, [selectedImage, rectX]);

    useEffect(() => {
        console.log("Drag image: use effect")
        if (imageRef.current && trRef.current) {
            trRef.current.nodes([imageRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [uploadedFileData.width, uploadedFileData.height]);

    const rectWidthCM = 29;
    const rectHeightCM = rectHeight > rectWidth ? 42 : 25;
    const imageWidthCM = (uploadedFileData.width * rectWidthCM / rectWidth).toFixed(2);
    const imageHeightCM = (uploadedFileData.height * rectHeightCM / rectHeight).toFixed(2);

    console.log("DRagable image",{
        uploadedFileW: uploadedFileData.width,
        UploadedFileH: uploadedFileData.height,
        rectWidth,
        rectHeight,
        imageWidthCM,
        imageHeightCM})

    return (
        <>
            <KonvaImage
                image={selectedImage}
                width={uploadedFileData.width}
                height={uploadedFileData.height}
                x={uploadedFileData.x}
                y={uploadedFileData.y}
                ref={imageRef}
                draggable
                onDragStart={() => setUploadedFile({ ...uploadedFileData, isDragging: true })}
                onDragEnd={(e) => {
                    setUploadedFile({
                        ...uploadedFileData,
                        x: e.target.x(),
                        y: e.target.y(),
                        isDragging: false,
                    });
                }}
                dragBoundFunc={(pos) => {
                    const newX = Math.max(rectX, Math.min(pos.x, rectX + rectWidth - imageRef.current!.width()));
                    const newY = Math.max(rectY, Math.min(pos.y, rectY + rectHeight - imageRef.current!.height()));
                    return { x: newX, y: newY };
                }}
                onTransformEnd={(e) => {
                    const node = imageRef.current;
                    if (node) {
                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();

                        const rectWidthCM = 29;
                        const rectHeightCM = rectHeight > rectWidth ? 42 : 25;
                        const maxLongSideCM = 30;
                        const maxShortSideCM = 20;

                        let newWidth = Math.max(5, node.width() * scaleX);
                        let newHeight = Math.max(5, node.height() * scaleY);

                        const aspectRatio = newWidth / newHeight;

                        let newWidthCM = (newWidth * rectWidthCM / rectWidth);
                        let newHeightCM = (newHeight * rectHeightCM / rectHeight);

                        if (newWidthCM > maxLongSideCM || newHeightCM > maxLongSideCM || 
                            (newWidthCM > maxShortSideCM && newHeightCM > maxShortSideCM)) {
                            if (newWidthCM > newHeightCM) {
                                if (newWidthCM > maxLongSideCM) {
                                    newWidth = (maxLongSideCM * rectWidth) / rectWidthCM;
                                    newHeight = newWidth / aspectRatio;
                                }
                                if (newHeight > (maxShortSideCM * rectHeight) / rectHeightCM) {
                                    newHeight = (maxShortSideCM * rectHeight) / rectHeightCM;
                                    newWidth = newHeight * aspectRatio;
                                }
                            } else {
                                if (newHeightCM > maxLongSideCM) {
                                    newHeight = (maxLongSideCM * rectHeight) / rectHeightCM;
                                    newWidth = newHeight * aspectRatio;
                                }
                                if (newWidth > (maxShortSideCM * rectWidth) / rectWidthCM) {
                                    newWidth = (maxShortSideCM * rectWidth) / rectWidthCM;
                                    newHeight = newWidth / aspectRatio;
                                }
                            }
                        }

                        node.scaleX(1);
                        node.scaleY(1);

                        let newX = node.x();
                        let newY = node.y();

                        if (newX + newWidth > rectX + rectWidth) {
                            newX = rectX + rectWidth - newWidth;
                        }
                        if (newX < rectX) {
                            newX = rectX;
                        }
                        if (newY + newHeight > rectY + rectHeight) {
                            newY = rectY + rectHeight - newHeight;
                        }
                        if (newY < rectY) {
                            newY = rectY;
                        }

                        setUploadedFile({
                            ...uploadedFileData,
                            width: newWidth,
                            height: newHeight,
                            x: newX,
                            y: newY,
                        });

                        node.position({ x: newX, y: newY });
                    }
                }}
            />
            <Text
                text={`${imageWidthCM}cm`}
                x={uploadedFileData.x + uploadedFileData.width / 2}
                y={uploadedFileData.y + uploadedFileData.height + 5}
                fontSize={12}
                fill="white"
                align="center"
            />
            <Text
                text={`${imageHeightCM}cm`}
                x={uploadedFileData.x - 5}
                y={uploadedFileData.y + uploadedFileData.height / 2}
                fontSize={12}
                fill="white"
                align="left"
                rotation={-90}
            />

            <Transformer
                ref={trRef}
                flipEnabled={false}
                rotateEnabled={false}
                rotateLineVisible={false}
                keepRatio={true}
                enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
                boundBoxFunc={(oldBox, newBox) => {
                    const aspectRatio = oldBox.width / oldBox.height;

                    if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                        return oldBox;
                    }
                    if (newBox.width / newBox.height !== aspectRatio) {
                        newBox.width = newBox.height * aspectRatio;
                    }

                    return newBox;
                }}
            /></>
    );
};

export default DraggableImage;
