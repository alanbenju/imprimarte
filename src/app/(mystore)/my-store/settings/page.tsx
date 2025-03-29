/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { FiSave, FiUpload, FiShoppingBag, FiMenu } from "react-icons/fi";
import { storeService, StoreDetails, UpdateStoreParams } from "@/services/store.service";

export default function StoreSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [store, setStore] = useState<StoreDetails | null>(null);
  const [formData, setFormData] = useState<UpdateStoreParams>({
    name: "",
    colorPanel: "#0077FF", // Left sidebar color
    colorText: "#FFFFFF", // Left sidebar text color
    backgroundColor: "#F0F9FF", // Products section background
    productTextColor: "#333333", // Products section text color
    buyButtonColor: "#FF5500",
    showStoreName: true, // Show store name next to logo
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  useEffect(() => {
    loadStoreData();
  }, []);

  async function loadStoreData() {
    setIsLoading(true);
    try {
      // Get the user's store data
      const storeData = await storeService.getMyStore();
      setStore(storeData);
      
      setFormData({
        name: storeData.name,
        colorPanel: storeData.colorPanel,
        colorText: storeData.colorText,
        backgroundColor: storeData.backgroundColor,
        productTextColor: storeData.productTextColor || "#333333", // Default if not set
        buyButtonColor: storeData.buyButtonColor,
        showStoreName: storeData.showStoreName !== undefined ? storeData.showStoreName : true,
      });
      
      if (storeData.logoImage) {
        setLogoPreview(storeData.logoImage);
      }
      
      if (storeData.bannerImage) {
        setBannerPreview(storeData.bannerImage);
      }
    } catch (error) {
      console.error("Error loading store data:", error);
      setErrorMessage("No se pudo cargar la información de la tienda");
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      if (name === "logo") {
        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
      } else if (name === "banner") {
        setBannerFile(file);
        setBannerPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!store) return;
    
    setIsSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    
    try {
      const updateData: UpdateStoreParams = {
        ...formData
      };
      
      if (logoFile) {
        updateData.logo = logoFile;
      }
      
      if (bannerFile) {
        updateData.banner = bannerFile;
      }
      
      await storeService.updateStore(updateData);
      setSuccessMessage("¡Cambios guardados con éxito!");
      
      // Refresh store data
      await loadStoreData();
    } catch (error) {
      console.error("Error updating store:", error);
      setErrorMessage("No se pudieron guardar los cambios");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mb-2 size-6 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Configuración de la Tienda</h1>
        <p className="text-gray-600">Personaliza la apariencia y detalles de tu tienda</p>
      </div>
      
      {successMessage && (
        <div className="rounded-md bg-green-50 p-4 text-green-800">
          <p>{successMessage}</p>
        </div>
      )}
      
      {errorMessage && (
        <div className="rounded-md bg-red-50 p-4 text-red-800">
          <p>{errorMessage}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Information */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Información General</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                Nombre de la Tienda
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showStoreName"
                name="showStoreName"
                checked={formData.showStoreName === true}
                onChange={handleInputChange}
                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="showStoreName" className="text-sm font-medium text-gray-700">
                Mostrar nombre de la tienda junto al logo
              </label>
            </div>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="logo" className="mb-1 block text-sm font-medium text-gray-700">
                  Logo
                </label>
                {logoPreview && (
                  <div className="mb-2">
                    <img 
                      src={logoPreview}
                      alt="Logo preview" 
                      className="size-24 rounded-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center">
                  <label className="flex cursor-pointer items-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                    <FiUpload className="mr-2" />
                    <span>Subir Logo</span>
                    <input
                      type="file"
                      name="logo"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="banner" className="mb-1 block text-sm font-medium text-gray-700">
                  Banner
                </label>
                {bannerPreview && (
                  <div className="mb-2">
                    <img 
                      src={bannerPreview}
                      alt="Banner preview" 
                      className="size-full rounded-md object-cover" 
                      style={{ height: "100px" }}
                    />
                  </div>
                )}
                <div className="flex items-center">
                  <label className="flex cursor-pointer items-center rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                    <FiUpload className="mr-2" />
                    <span>Subir Banner</span>
                    <input
                      type="file"
                      name="banner"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Color Settings */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Personalización de Colores</h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label htmlFor="colorPanel" className="mb-1 block text-sm font-medium text-gray-700">
                  Color Barra Lateral
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    id="colorPanel"
                    name="colorPanel"
                    value={formData.colorPanel}
                    onChange={handleInputChange}
                    className="size-10"
                  />
                  <input
                    type="text"
                    name="colorPanel"
                    value={formData.colorPanel}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="colorText" className="mb-1 block text-sm font-medium text-gray-700">
                  Color Texto Barra Lateral
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    id="colorText"
                    name="colorText"
                    value={formData.colorText}
                    onChange={handleInputChange}
                    className="size-10"
                  />
                  <input
                    type="text"
                    name="colorText"
                    value={formData.colorText}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="backgroundColor" className="mb-1 block text-sm font-medium text-gray-700">
                  Color Fondo Productos
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    id="backgroundColor"
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleInputChange}
                    className="size-10"
                  />
                  <input
                    type="text"
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="productTextColor" className="mb-1 block text-sm font-medium text-gray-700">
                  Color Texto Productos
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    id="productTextColor"
                    name="productTextColor"
                    value={formData.productTextColor || "#333333"}
                    onChange={handleInputChange}
                    className="size-10"
                  />
                  <input
                    type="text"
                    name="productTextColor"
                    value={formData.productTextColor || "#333333"}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="buyButtonColor" className="mb-1 block text-sm font-medium text-gray-700">
                  Color Botón de Compra
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    id="buyButtonColor"
                    name="buyButtonColor"
                    value={formData.buyButtonColor}
                    onChange={handleInputChange}
                    className="size-10"
                  />
                  <input
                    type="text"
                    name="buyButtonColor"
                    value={formData.buyButtonColor}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>
            </div>
            
            <div className="relative rounded-md bg-gray-50 p-4">
              <h3 className="mb-4 text-sm font-medium text-gray-700">Vista Previa</h3>
              
              {/* Store Preview */}
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 bg-white p-3">
                  <div className="text-sm font-medium text-gray-600">Customia</div>
                  <div className="flex items-center space-x-2">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo" className="size-6 rounded-full object-cover" />
                    ) : (
                      <div className="size-6 rounded-full bg-gray-200"></div>
                    )}
                    {formData.showStoreName && (
                      <span className="text-sm font-medium">{formData.name || "Mi Tienda"}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600"><FiShoppingBag size={16} /></div>
                </div>
                
                {/* Banner */}
                <div className="h-24 w-full bg-gray-200">
                  {bannerPreview ? (
                    <img src={bannerPreview} alt="Banner" className="size-full object-cover" />
                  ) : (
                    <div className="flex size-full items-center justify-center text-sm text-gray-500">
                      Banner de la tienda
                    </div>
                  )}
                </div>
                
                {/* Store Content */}
                <div className="flex">
                  {/* Left Panel - Categories */}
                  <div className="w-1/4 p-3" style={{ backgroundColor: formData.colorPanel }}>
                    <h4 className="mb-2 text-xs font-medium" style={{ color: formData.colorText }}>
                      CATEGORÍAS
                    </h4>
                    <ul className="space-y-2">
                      <li className="text-xs" style={{ color: formData.colorText }}>Remera Oversize</li>
                      <li className="text-xs" style={{ color: formData.colorText }}>Remera Regular Fit</li>
                      <li className="text-xs" style={{ color: formData.colorText }}>Buzos</li>
                      <li className="text-xs" style={{ color: formData.colorText }}>Tazas</li>
                    </ul>
                  </div>
                  
                  {/* Right Panel - Products */}
                  <div 
                    className="flex-1 p-3" 
                    style={{ backgroundColor: formData.backgroundColor }}
                  >
                    <h4 className="mb-3 text-sm font-medium" style={{ color: formData.productTextColor }}>
                      Productos Destacados
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {/* Product 1 */}
                      <div className="rounded bg-white p-2 shadow-sm">
                        <div className="mb-2 h-16 w-full bg-gray-200"></div>
                        <p className="text-xs font-medium" style={{ color: formData.productTextColor }}>
                          Producto Ejemplo
                        </p>
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-xs" style={{ color: formData.productTextColor }}>$24.99</p>
                          <button 
                            className="rounded px-2 py-1 text-xs text-white" 
                            style={{ backgroundColor: formData.buyButtonColor }}
                          >
                            Comprar
                          </button>
                        </div>
                      </div>
                      
                      {/* Product 2 */}
                      <div className="rounded bg-white p-2 shadow-sm">
                        <div className="mb-2 h-16 w-full bg-gray-200"></div>
                        <p className="text-xs font-medium" style={{ color: formData.productTextColor }}>
                          Producto Ejemplo
                        </p>
                        <div className="mt-1 flex items-center justify-between">
                          <p className="text-xs" style={{ color: formData.productTextColor }}>$34.99</p>
                          <button 
                            className="rounded px-2 py-1 text-xs text-white" 
                            style={{ backgroundColor: formData.buyButtonColor }}
                          >
                            Comprar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75"
          >
            {isSaving ? (
              <>
                <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Guardando...
              </>
            ) : (
              <>
                <FiSave className="mr-2" />
                Guardar cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 