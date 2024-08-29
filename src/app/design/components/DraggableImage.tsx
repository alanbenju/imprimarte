import React, { useRef, useEffect } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
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

    // Adjust image size to maintain aspect ratio and fit within the rectangle
    const adjustImageSize = () => {
        if (!imageRef.current || !uploadedFileData) return;

        let width = uploadedFileData.width;
        let height = uploadedFileData.height;

        const widthScale = rectWidth / width;
        const heightScale = rectHeight / height;
        const scaleFactor = Math.min(widthScale, heightScale);

        width *= scaleFactor;
        height *= scaleFactor;

        uploadedFileData.width = width
        uploadedFileData.height = height
    };

    const resizeImage = (fileW: number, fileH: number) => {
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

    const { width, height } = resizeImage(uploadedFileData.width, uploadedFileData.height);


    useEffect(() => {
        adjustImageSize();
        if (imageRef.current && trRef.current) {
            trRef.current.nodes([imageRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedImage, rectWidth, rectHeight]);



    return (
        <>

            <KonvaImage
                image={selectedImage}
                width={width}
                height={height}
                x={rectX}
                y={rectY}
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

                        const newWidth = Math.max(5, node.width() * scaleX);
                        const newHeight = Math.max(5, node.height() * scaleY);

                        console.log({newWidth, newHeight})

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
