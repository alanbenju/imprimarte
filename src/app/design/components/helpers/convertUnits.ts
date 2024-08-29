export const cmToPixel = (cm: number, dpi = 96): number => {
    return cm * (dpi / 5.6); // Convert cm to pixels based on DPI
};
