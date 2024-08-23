"use client";

import React, { useState } from "react";

import axios from "axios";
import { Product } from "../types";

const Checkout = (products:Product[]) => {
  const [contactEmail, setContactEmail] = useState("");
  const [shippingCost, setShippingCost] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: "",
    lastName: "",
    street: "",
    apartment: "",
    postalCode: "",
    city: "CABA",
    province: "CABA",
    phone: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    name: "",
    lastName: "",
    street: "",
    apartment: "",
    postalCode: "",
    city: "CABA",
    province: "CABA",
    phone: "",
  });

  const calcularEnvio = async (codigoPostalDestino: string) => {
    console.log("calcular envio")
    const codigoPostalOrigen = "1405"; // Reemplaza esto con tu código postal de origen
    const peso = 0.5; // Peso en kg
    const volumen = 0.36; // Volumen en metros cúbicos

    try {
      const response = await axios.get("https://api.oca.com.ar/epaK/envios", {
        params: {
          Peso: peso,
          Volumen: volumen,
          CodigoPostalOrigen: codigoPostalOrigen,
          CodigoPostalDestino: codigoPostalDestino,
        },
      });
      setShippingCost(response.data.precio); // Ajusta esto según la estructura de la respuesta de la API de OCA
    } catch (error) {
      console.error("Error al calcular el envío:", error);
      setShippingCost(null);
    }
  };

  const handlePostalCodeChange = (e: any) => {
    console.log("postal code change")
    handleInputChange(e);
    calcularEnvio(e.target.value);
  };



  const [selectedShipping, setSelectedShipping] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [useDifferentBillingAddress, setUseDifferentBillingAddress] = useState(false);
  const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-6 rounded shadow-md">
        {/* Header */}
        {/* Contact Information */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Contacto</h2>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="mt-2 w-full border border-gray-300 p-2 rounded"
          />
          <div className="mt-2">
            <input type="checkbox" id="newsletter" />
            <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
              Enviarme novedades y ofertas por correo electrónico
            </label>
          </div>
        </section>

        {/* Delivery Information */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Entrega</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={deliveryAddress.name}
              onChange={handleInputChange}
              placeholder="Nombre"
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              name="lastName"
              value={deliveryAddress.lastName}
              onChange={handleInputChange}
              placeholder="Apellidos"
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              name="street"
              value={deliveryAddress.street}
              onChange={handleInputChange}
              placeholder="Calle y Altura"
              className="md:col-span-2 border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              name="apartment"
              value={deliveryAddress.apartment}
              onChange={handleInputChange}
              placeholder="Departamento, casa o indicación"
              className="md:col-span-2 border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              name="postalCode"
              value={deliveryAddress.postalCode}
              onChange={handleInputChange}
              placeholder="Código Postal"
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              name="city"
              value={deliveryAddress.city}
              placeholder="Ciudad"
              className="border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              name="province"
              value={deliveryAddress.province}
              placeholder="Provincia/Estado"
              className="border border-gray-300 p-2 rounded"
              disabled
            />
            <input
              type="text"
              name="phone"
              value={deliveryAddress.phone}
              onChange={handleInputChange}
              placeholder="Teléfono"
              className="md:col-span-2 border border-gray-300 p-2 rounded"
            />
          </div>
        </section>

        {/* Shipping Methods */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Métodos de envío</h2>
          <div className="space-y-2">
            <div className="border border-gray-300 p-4 rounded">
              <label className="flex items-center">
                <input type="radio" name="shipping" className="mr-2"
                  value="privado"
                  checked={selectedShipping === "privado"}
                  onChange={(e) => setSelectedShipping(e.target.value)}
                />
                Privado - $2,500.00
              </label>
              <p className="text-sm text-gray-500">Pagas en efectivo al recibir</p>
            </div>
            {selectedPayment !== "privado" && (
              <>
                <div className="border border-gray-300 p-4 rounded">
                  <label className="flex items-center">
                    <input type="radio" name="shipping" className="mr-2"
                      value="oca1"
                      checked={selectedShipping === "oca1"}
                    />
                    Retirar en Agencia Oficial (OCA) - $3,464.31
                  </label>
                </div>
                <div className="border border-gray-300 p-4 rounded">
                  <label className="flex items-center">
                    <input type="radio" name="shipping" className="mr-2"
                      value="oca2"
                      checked={selectedShipping === "oca2"}

                    />
                    Entrega OCA a domicilio - $5,333.55
                  </label>
                </div>
              </>
            )}          </div>
        </section>

        {/* Payment Methods */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Pago</h2>
          <div className="space-y-2">
            <div className="border border-gray-300 p-4 rounded">
              <label className="flex items-center">
                <input type="radio" name="payment" className="mr-2" value="privado"
                  checked={selectedPayment === "privado"}
                  onChange={(e) => {
                    setSelectedPayment(e.target.value);
                    setSelectedShipping("privado");
                  }}
                />
                Privado - Pago contra entrega
              </label>
              <p className="text-sm text-gray-500">IMPORTANTE! Pagas en efectivo el total al recibir el pedido. Únicamente ENVÍO PRIVADO</p>
            </div>
            <div className="border border-gray-300 p-4 rounded">
              <label className="flex items-center">
                <input type="radio"
                  name="payment"
                  value="mercadopago"
                  checked={selectedPayment === "mercadopago"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="mr-2"
                />
                MercadoPago
              </label>
            </div>
          </div>
        </section>

        {/* Billing Information */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Dirección de facturación</h2>
          <div>
            <label className="flex items-center">
              <input type="radio"
                name="billing"
                checked={!useDifferentBillingAddress}
                onChange={() => setUseDifferentBillingAddress(false)}
                className="mr-2"
              />
              La misma dirección de envío
            </label>
            <label className="flex items-center mt-2">
              <input type="radio"
                name="billing"
                checked={useDifferentBillingAddress}
                onChange={() => setUseDifferentBillingAddress(true)}
                className="mr-2"
              />
              Usar una dirección de facturación distinta
            </label>
          </div>

          {useDifferentBillingAddress && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={billingAddress.name}
                onChange={handleBillingInputChange}
                placeholder="Nombre"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="lastName"
                value={billingAddress.lastName}
                onChange={handleBillingInputChange}
                placeholder="Apellidos"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="street"
                value={billingAddress.street}
                onChange={handleBillingInputChange}
                placeholder="Calle y Altura"
                className="md:col-span-2 border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="apartment"
                value={billingAddress.apartment}
                onChange={handleBillingInputChange}
                placeholder="Departamento, casa o indicación"
                className="md:col-span-2 border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="postalCode"
                value={billingAddress.postalCode}
                onChange={handleBillingInputChange}
                placeholder="Código Postal"
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="city"
                value={billingAddress.city}
                placeholder="Ciudad"
                className="border border-gray-300 p-2 rounded"
                disabled
              />
              <input
                type="text"
                name="province"
                value={billingAddress.province}
                placeholder="Provincia/Estado"
                className="border border-gray-300 p-2 rounded"
                disabled
              />
              <input
                type="text"
                name="phone"
                value={billingAddress.phone}
                onChange={handleBillingInputChange}
                placeholder="Teléfono"
                className="md:col-span-2 border border-gray-300 p-2 rounded"
              />
            </div>
          )}

        </section>

        {/* Order Summary */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Resumen de la compra</h2>
          <div className="bg-gray-50 p-4 rounded">
            <div className="flex justify-between items-center">
              <span>Remera Regular Fit - Negro</span>
              <span>$4,700.00</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Subtotal</span>
              <span>$4,700.00</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Métodos de envío</span>
              <span>$2,500.00</span>
            </div>
            <div className="flex justify-between items-center font-bold mt-4">
              <span>Total</span>
              <span>$7,200.00</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
