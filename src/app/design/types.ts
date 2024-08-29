export type UploadedFile = {
    url: string;
    width: number;
    height: number;
    id: string;
    x: number;
    y: number;
    isDragging: boolean
  }

  export interface ColorOption {
    color: string;
    image: string;
    availableSizes: string[];
    sizesImages: string;
    background: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    colors: ColorOption[];
    type: string;
    previewImage: string;
    sizeDetails: {
        [key: string]: {
            ancho: string;
            largo: string;
            hombro: string;
            manga: string;
        };
    };
}
