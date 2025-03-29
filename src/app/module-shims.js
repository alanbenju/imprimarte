// This file creates mock implementations for modules that may cause build issues

/**
 * Mock Canvas implementation
 * This avoids build errors when the canvas native module has compatibility issues
 */
class MockCanvas {
  constructor(width, height) {
    this.width = width || 300;
    this.height = height || 150;
  }

  getContext() {
    return {
      fillRect: () => {},
      clearRect: () => {},
      getImageData: () => ({ data: new Uint8Array(0) }),
      putImageData: () => {},
      createImageData: () => ({ data: new Uint8Array(0) }),
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      restore: () => {},
      scale: () => {},
      rotate: () => {},
      translate: () => {},
      transform: () => {},
      fillText: () => {},
      measureText: () => ({ width: 0 }),
      createLinearGradient: () => ({
        addColorStop: () => {}
      }),
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      bezierCurveTo: () => {},
      arc: () => {},
      fill: () => {},
      stroke: () => {},
      clip: () => {}
    };
  }

  toDataURL() {
    return "";
  }

  toBuffer() {
    return Buffer.from([]);
  }
}

module.exports = {
  Canvas: MockCanvas,
  createCanvas: (width, height) => new MockCanvas(width, height),
  loadImage: () => Promise.resolve({}),
  Image: class {
    get src() { return this._src; }
    set src(value) { this._src = value; }
  }
}; 