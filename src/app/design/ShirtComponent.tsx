import React, { useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Transformer, Rect, Text } from "react-konva";
import useImage from "use-image";
import { UploadedFile } from "./types";
import Konva from "konva";

export type ShirtComponentProps = {
    selectedColor: string;
    uploadedFile: UploadedFile;
    setUploadedFile: (file: UploadedFile) => void;
}

function adjustImageSize(fileW: number, fileH: number, rectWidth: number, rectHeight: number) {
    if (fileW > rectWidth || fileH > rectHeight) {
        const widthScale = rectWidth / fileW;
        const heightScale = rectHeight / fileH;
        const scaleFactor = Math.min(widthScale, heightScale);

        // Apply the scale factor
        fileW *= scaleFactor;
        fileH *= scaleFactor;
    }
    return { width: fileW, height: fileH };
}

const ShirtComponent = ({ selectedColor, uploadedFile, setUploadedFile }: ShirtComponentProps) => {
    const [tShirtImageBlack] = useImage("/regular-fit/remera-regular-black.png");
    const [tShirtImageWhite] = useImage("/regular-fit/remera-regular-white.png");
    const [selectedImage] = useImage(uploadedFile.url || "");

    const tShirtImage = selectedColor === "Negro" ? tShirtImageBlack : tShirtImageWhite;

    // Original shirt image dimensions and scaling
    const shirtWidth = 1267;
    const shirtHeight = 1900;
    const scaleFactor = 0.4;
    const stageWidth = shirtWidth * scaleFactor;
    const stageHeight = shirtHeight * scaleFactor;
    
    const currentRectW = 32;
    const currentRectH = 60;
    const newRectW = 30;
    const newRectH = 42;
    
    const rectX = 176;
    const rectY = 260;
    const rectW = (stageWidth - 330) * (newRectW / currentRectW); // Calculate new width
    const rectH = (stageHeight - 420) * (newRectH / currentRectH); // Calculate new height    
    // Adjust image size
    const { width, height } = adjustImageSize(uploadedFile.width, uploadedFile.height, rectW, rectH);

    const handleDragEnd = (e: any) => {
        setUploadedFile({
            ...uploadedFile,
            isDragging: false,
        });
    };

    const handleDragStart = () => {
        setUploadedFile({
            ...uploadedFile,
            isDragging: true,
        });
    };

    const rectRef = useRef<Konva.Rect>(null);
    const imageRef = useRef<Konva.Image>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const stageRef = useRef<Konva.Stage>(null);

    const exportToImage = () => {
        if (trRef.current) {
            // Hide transformer before exporting
            trRef.current.nodes([]);
        }

        if (stageRef.current) {
            const dataURL = stageRef.current.toDataURL({
                x: rectRef.current?.x(),
                y: rectRef.current?.y(),
                width: rectRef.current?.width(),
                height: rectRef.current?.height(),
                pixelRatio: 2, // Increase pixel ratio for better quality
            });
            downloadURI(dataURL, "shirt-design.png");
        }

        // Restore transformer
        setTimeout(() => {
            if (imageRef.current) {
                trRef.current?.nodes([imageRef.current]);
            }
        }, 50);
    };

    const downloadURI = (uri: string, name: string) => {
        const link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    React.useEffect(() => {
        if (imageRef.current && trRef.current) {
            trRef.current.nodes([imageRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    });

    return (
        <div className="max-w-2xl flex-1 p-8">
            <div className="rounded-lg border bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-4 shadow-lg">
                <button
                    onClick={exportToImage}
                    className="mt-4 rounded bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 text-white shadow transition-transform hover:scale-105"
                >
                    Export Image
                </button>
                <Stage width={stageWidth} height={stageHeight} ref={stageRef}>
                    <Layer>
                        <KonvaImage
                            image={tShirtImage}
                            x={0}
                            y={0}
                            width={stageWidth}
                            height={stageHeight}
                        />
                        <Rect
                            x={rectX}
                            y={rectY}
                            width={rectW}
                            height={rectH}
                            stroke={selectedColor === "Negro" ? "white" : "black"}
                            strokeWidth={2}
                            dash={[10, 5]}
                            ref={rectRef}  // Attach the ref here
                        />
                        <Text
                            x={rectX + rectW / 2 - 20}
                            y={rectY - 20}
                            text={"30 cm"}
                            fontSize={16}
                            fill={selectedColor === "Negro" ? "white" : "black"}
                        />
                        <Text
                            x={rectX - 20}
                            y={rectY + rectH / 1.7 }
                            text={"42 cm"}
                            fontSize={16}
                            fill={selectedColor === "Negro" ? "white" : "black"}
                            rotation={-90}
                        />
                        {selectedImage && (
                            <>
                                <KonvaImage
                                    ref={imageRef}
                                    key={uploadedFile.id}
                                    id={uploadedFile.id}
                                    x={rectRef.current?.x()}
                                    y={rectRef.current?.y()}
                                    draggable
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    image={selectedImage}
                                    width={width}
                                    height={height}
                                    isSelected
                                    onTransformEnd={(e) => {
                                        const node = imageRef.current;
                                        if (node) {
                                            const scaleX = node.scaleX();
                                            const scaleY = node.scaleY();
    
                                            const newWidth = Math.max(5, node.width() * scaleX);
                                            const newHeight = Math.max(5, node.height() * scaleY);
    
                                            node.scaleX(1);
                                            node.scaleY(1);
    
                                            let newX = node.x();
                                            let newY = node.y();
    
                                            if (newX + newWidth > rectX + rectW) {
                                                newX = rectX + rectW - newWidth;
                                            }
                                            if (newX < rectX) {
                                                newX = rectX;
                                            }
                                            if (newY + newHeight > rectY + rectH) {
                                                newY = rectY + rectH - newHeight;
                                            }
                                            if (newY < rectY) {
                                                newY = rectY;
                                            }
    
                                            setUploadedFile({
                                                ...uploadedFile,
                                                width: newWidth,
                                                height: newHeight,
                                                x: newX,
                                                y: newY,
                                            });
    
                                            node.position({ x: newX, y: newY });
                                        }
                                    }}
                                    dragBoundFunc={(pos) => {
                                        if (rectRef.current) {
                                            const rect = rectRef.current;
                                            const minX = rect.x();
                                            const maxX = rect.x() + rect.width() - width;
                                            const minY = rect.y();
                                            const maxY = rect.y() + rect.height() - height;
    
                                            const newX = Math.max(minX, Math.min(pos.x, maxX));
                                            const newY = Math.max(minY, Math.min(pos.y, maxY));
    
                                            return {
                                                x: newX,
                                                y: newY,
                                            };
                                        }
                                        return pos;
                                    }}
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
                                />
                            </>
                        )}
    
                    </Layer>
                </Stage>
            </div>
        </div>
    );
    };

export default ShirtComponent;
