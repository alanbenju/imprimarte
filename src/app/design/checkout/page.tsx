"use client";

import React, { useState, useContext } from "react";
import Image from "next/image";
import { Product } from "../types";
import { CartContext } from "@/app/contexts/CartContext";

const Checkout = () => {
  const { getCart, getTotalPrice } = useContext(CartContext);
  const [contactEmail, setContactEmail] = useState("");
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

  const [selectedShipping, setSelectedShipping] = useState("privado");
  const [selectedPayment, setSelectedPayment] = useState("mercadopago");
  const [useDifferentBillingAddress, setUseDifferentBillingAddress] = useState(false);

  const handleBillingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
  };

  const shippingCostPrivado = 2500;
  const shippingCostOca1 = 3464.31;
  const shippingCostOca2 = 5333.55;

  let selectedShippingCost = selectedShipping == "privado" ? shippingCostPrivado : 0;
  selectedShippingCost = selectedShipping == "oca1" ? shippingCostOca1 : selectedShippingCost;
  selectedShippingCost = selectedShipping == "oca2" ? shippingCostOca2 : selectedShippingCost;



  return (
    <div className="flex min-h-screen flex-col-reverse justify-center bg-gray-100 p-8 md:flex-row">
      <div className="w-full rounded bg-white p-6 shadow-md md:w-3/5">
        {/* Header */}
        {/* Contact Information */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Contacto</h2>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="mt-2 w-full rounded border border-gray-300 p-2"
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="name"
              value={deliveryAddress.name}
              onChange={handleInputChange}
              placeholder="Nombre"
              className="rounded border border-gray-300 p-2"
            />
            <input
              type="text"
              name="lastName"
              value={deliveryAddress.lastName}
              onChange={handleInputChange}
              placeholder="Apellidos"
              className="rounded border border-gray-300 p-2"
            />
            <input
              type="text"
              name="street"
              value={deliveryAddress.street}
              onChange={handleInputChange}
              placeholder="Calle y Altura"
              className="rounded border border-gray-300 p-2 md:col-span-2"
            />
            <input
              type="text"
              name="apartment"
              value={deliveryAddress.apartment}
              onChange={handleInputChange}
              placeholder="Departamento, casa o indicación"
              className="rounded border border-gray-300 p-2 md:col-span-2"
            />
            <input
              type="text"
              name="postalCode"
              value={deliveryAddress.postalCode}
              onChange={handleInputChange}
              placeholder="Código Postal"
              className="rounded border border-gray-300 p-2"
            />
            <input
              type="text"
              name="city"
              defaultValue={deliveryAddress.city}
              placeholder="Ciudad"
              className="rounded border border-gray-300 p-2"
            />
            <input
              type="text"
              name="province"
              defaultValue={deliveryAddress.province}
              placeholder="Provincia/Estado"
              className="rounded border border-gray-300 p-2"
              disabled
            />
            <input
              type="text"
              name="phone"
              value={deliveryAddress.phone}
              onChange={handleInputChange}
              placeholder="Teléfono"
              className="rounded border border-gray-300 p-2 md:col-span-2"
            />
          </div>
        </section>

        {/* Shipping Methods */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Métodos de envío</h2>
          <div className="space-y-2">
            <div className="rounded border border-gray-300 p-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="shipping"
                  className="mr-2"
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
                <div className="rounded border border-gray-300 p-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      className="mr-2"
                      value="oca1"
                      checked={selectedShipping === "oca1"}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                    />
                    Retirar en Agencia Oficial (OCA) - $3,464.31
                  </label>
                </div>
                <div className="rounded border border-gray-300 p-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      className="mr-2"
                      value="oca2"
                      checked={selectedShipping === "oca2"}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                    />
                    Entrega OCA a domicilio - $5,333.55
                  </label>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Payment Methods */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Pago</h2>
          <div className="space-y-2">
            <div className="rounded border border-gray-300 p-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  className="mr-2"
                  value="privado"
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
            <div className="rounded border border-gray-300 p-4">
              <label className="flex items-center">
                <input
                  type="radio"
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
              <input
                type="radio"
                name="billing"
                checked={!useDifferentBillingAddress}
                onChange={() => setUseDifferentBillingAddress(false)}
                className="mr-2"
              />
              La misma dirección de envío
            </label>
            <label className="mt-2 flex items-center">
              <input
                type="radio"
                name="billing"
                checked={useDifferentBillingAddress}
                onChange={() => setUseDifferentBillingAddress(true)}
                className="mr-2"
              />
              Usar una dirección de facturación distinta
            </label>
          </div>

          {useDifferentBillingAddress && (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                name="name"
                value={billingAddress.name}
                onChange={handleBillingInputChange}
                placeholder="Nombre"
                className="rounded border border-gray-300 p-2"
              />
              <input
                type="text"
                name="lastName"
                value={billingAddress.lastName}
                onChange={handleBillingInputChange}
                placeholder="Apellidos"
                className="rounded border border-gray-300 p-2"
              />
              <input
                type="text"
                name="street"
                value={billingAddress.street}
                onChange={handleBillingInputChange}
                placeholder="Calle y Altura"
                className="rounded border border-gray-300 p-2 md:col-span-2"
              />
              <input
                type="text"
                name="apartment"
                value={billingAddress.apartment}
                onChange={handleBillingInputChange}
                placeholder="Departamento, casa o indicación"
                className="rounded border border-gray-300 p-2 md:col-span-2"
              />
              <input
                type="text"
                name="postalCode"
                value={billingAddress.postalCode}
                onChange={handleBillingInputChange}
                placeholder="Código Postal"
                className="rounded border border-gray-300 p-2"
              />
              <input
                type="text"
                name="city"
                defaultValue={billingAddress.city}
                placeholder="Ciudad"
                className="rounded border border-gray-300 p-2"
                disabled
              />
              <input
                type="text"
                name="province"
                defaultValue={billingAddress.province}
                placeholder="Provincia/Estado"
                className="rounded border border-gray-300 p-2"
                disabled
              />
              <input
                type="text"
                name="phone"
                value={billingAddress.phone}
                onChange={handleBillingInputChange}
                placeholder="Teléfono"
                className="rounded border border-gray-300 p-2 md:col-span-2"
              />
            </div>
          )}
          <div className="mt-4">
            <button
              className="w-full rounded bg-green-600 py-3 font-semibold text-white shadow-lg transition-all duration-150 hover:bg-green-700"
              onClick={() => {
                // Add your purchase logic here
                console.log("Compra realizada");
              }}
            >
              Comprar Ahora
            </button>
          </div>

        </section>
      </div>

      {/* Cart Summary Section */}
      <div className="mb-10 mt-6 w-full rounded bg-white p-6 shadow-md md:my-0 md:ml-4 md:w-2/5">
        <h2 className="text-lg font-semibold">Resumen de la compra</h2>
        {getCart().map((item, index) => (
          <div key={index} className="border-b p-2">
            <div className="flex flex-col justify-between md:flex-row md:items-center">
              <div className="mb-2 flex-1 md:mb-0">
                <p>{item.name} - {item.size}</p>
                <p>Color: {item.color.toUpperCase()}</p>
                <p>
                  {item.quantity} x {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(item.price)}
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4 md:justify-start">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt="Diseño Personalizado"
                    width={100}
                    height={100}
                    className="rounded border"
                  />
                )}
                {item.shirtImage && (
                  <Image
                    src={item.shirtImage}
                    alt={`Remera de color ${item.color}`}
                    width={100}
                    height={100}
                    className="rounded border"
                  />
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 border-t pt-4">
          <p className="text-base text-gray-600">
            Sub-Total: ARS {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(getTotalPrice())}
          </p>
          <p className="text-base text-gray-600">
            Envio: ARS {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(selectedShippingCost)}
          </p>
          <h3 className="mt-2 text-lg font-semibold">
            Total: ARS {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(getTotalPrice() + selectedShippingCost)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
