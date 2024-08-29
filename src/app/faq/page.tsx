"use client"

import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-700">{question}</span>
        <ChevronDownIcon
          className={`size-5 text-gray-500 transition-transform duration-200${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="pb-5 text-gray-600">{answer}</div>
      </div>
    </div>
  )
}

export default function Component() {
  const faqs = [
    {
      question: "¿Cómo funciona?",
      answer: "Cargas un diseño, lo colocas en la prenda y lo compras. Fácil, rápido y barato."
    },
    {
      question: "Envíos",
      answer: (
        <ul className="list-disc space-y-2 pl-5">
          <li><span className="font-medium">Cobertura:</span> Enviamos a CABA.</li>
          <li><span className="font-medium">Envíos en el Día:</span> Comprando hasta las 7 de la mañana del día en curso.</li>
        </ul>
      )
    },
    {
      question: "Pagos",
      answer: (
        <ul className="list-disc space-y-2 pl-5">
          <li><span className="font-medium">Métodos:</span>Mercado Pago, tarjetas de crédito y débito.</li>
          <li><span className="font-medium">Acreditación:</span> 6 a 48 hs hábiles, con posibles demoras debido a procesamiento manual.</li>
        </ul>
      )
    },
    {
      question: "Cuidado de tus prendas",
      answer: (
        <>
          <p className="mb-2">Optimiza la durabilidad de tus prendas, sigue nuestras pautas para el cuidado de las mismas:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><span className="font-medium">Lavar con Agua Fría:</span> Para mantener la forma y el tamaño de tus prendas de algodón cardado, opta por un ciclo de lavado suave con agua fría.</li>
            <li><span className="font-medium">Secado al Aire Libre:</span> Evita la secadora tanto como sea posible. Si necesitas usarla, elige un ciclo de aire frío.</li>
            <li><span className="font-medium">Lavar del Revés:</span> Protege los colores y la textura lavando tus prendas del revés.</li>
            <li><span className="font-medium">Usa Detergente Suave:</span> Elige un detergente suave para cuidar las fibras de tu ropa.</li>
            <li><span className="font-medium">Evita el Blanqueador:</span> Para mantener el color vibrante de tus prendas.</li>
            <li><span className="font-medium">Planchado a Baja Temperatura:</span> Si es necesario planchar, hazlo a una temperatura baja y preferentemente del revés.</li>
          </ul>
        </>
      )
    },
    {
      question: "Cambios y devoluciones",
      answer: (
        <ul className="list-disc space-y-2 pl-5">
          <li><span className="font-medium">Prendas Nuevas:</span> Tienes 30 días desde la compra para cambios o devoluciones y desde la recepción para cambios. Los costos de envío iniciales no se reembolsan.</li>
          <li>
            <span className="font-medium">Consideraciones Importantes:</span>
            <ul className="list-circle mt-2 space-y-1 pl-5">
              <li>Prendas usadas o lavadas no aplican para cambio o devolución.</li>
              <li>Ante falta de stock o fallas, se ofrece reembolso proporcional o cambio por prenda similar sin costo de envío.</li>
              <li>Guarda y revisa el comprobante incluido con tu pedido para cualquier reclamación.</li>
            </ul>
          </li>
        </ul>
      )
    }
  ]

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="p-6">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  )
}