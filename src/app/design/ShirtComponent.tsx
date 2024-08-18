import React, { useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage, Transformer, Rect } from "react-konva";
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
    const [tShirtImageBlack] = useImage("/remera-regular-black.png");
    const [tShirtImageWhite] = useImage("/remera-regular-white.png");
    const [selectedImage] = useImage(uploadedFile.url || "");

    const tShirtImage = selectedColor === "Negro" ? tShirtImageBlack : tShirtImageWhite;

    // Original shirt image dimensions and scaling
    const shirtWidth = 1267;
    const shirtHeight = 1900;
    const scaleFactor = 0.4;
    const stageWidth = shirtWidth * scaleFactor;
    const stageHeight = shirtHeight * scaleFactor;

    // Calculate the rect size and position
    const rectX = 170;
    const rectY = 230;
    const rectW = stageWidth - 330;
    const rectH = stageHeight - 420;

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

    React.useEffect(() => {
        if (imageRef.current && trRef.current) {
            trRef.current.nodes([imageRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    });

    return (
        <div className="max-w-2xl flex-1 p-8">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <Stage width={stageWidth} height={stageHeight}>
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
                            stroke={selectedColor === "Black" ? "white" : "black"}
                            strokeWidth={2}
                            dash={[10, 5]}
                            ref={rectRef}  // Attach the ref here
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
                                        // transformer is changing scale of the node
                                        // and NOT its width or height
                                        // but in the store we have only width and height
                                        // to match the data better we will reset scale on transform end
                                        const node = imageRef.current;
                                        const scaleX = node?.scaleX();
                                        const scaleY = node?.scaleY();

                                        // we will reset it back
                                        node?.scaleX(1);
                                        node?.scaleY(1);
                                        console.log({
                                            x: node?.x(),
                                            y: node?.y(),
                                            w: node?.width(),
                                            h: node?.height(),
                                            // set minimal value
                                            width: Math.max(5, node?.width() || 1 * (scaleX || 1)),
                                            height: Math.max(node?.height() || 1 * (scaleY || 1)),
                                        });
                                        setUploadedFile({
                                            ...uploadedFile,
                                            //x: node?.x(),
                                            //y: node?.y(),
                                            // set minimal value
                                            width: Math.max(5, node?.width() || 1 * (scaleX || 1)),
                                            height: Math.max(node?.height() || 1 * (scaleY || 1)),                                        });

                                    }}
                                    dragBoundFunc={(pos) => {
                                        if (rectRef.current) {
                                            const rect = rectRef.current;
                                            const minX = rect.x();
                                            const maxX = rect.x() + rect.width() - width; // 100 is the width of the draggable image
                                            const minY = rect.y();
                                            const maxY = rect.y() + rect.height() - height; // 100 is the height of the draggable image

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
                                    keepRatio={true}  // Maintain aspect ratio during scaling
                                    enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
                                    boundBoxFunc={(oldBox, newBox) => {
                                        // limit resize
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
