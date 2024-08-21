export default function SizeDetails() {
    return (
      <div className="mx-auto w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Guía para Elegir el Tamaño Adecuado Comparando con Tu Prenda Favorita
        </h1>
        
        <div className="overflow-x-auto">
          <table className="mb-6 w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2"></th>
                <th className="border p-2">ANCHO</th>
                <th className="border p-2">LARGO</th>
                <th className="border p-2">HOMBRO</th>
                <th className="border p-2">MANGA</th>
              </tr>
            </thead>
            <tbody>
              {["S", "M", "L", "XL", "XXL"].map((size, index) => (
                <tr key={size}>
                  <td className="border p-2 text-center font-medium">{size}</td>
                  <td className="border p-2 text-center">{52 + index * 2}-{54 + index * 2}</td>
                  <td className="border p-2 text-center">{65 + index * 2}-{67 + index * 2}</td>
                  <td className="border p-2 text-center">{41 + index * 3}-{43 + index * 3}</td>
                  <td className="border p-2 text-center">{18 + index}-{19 + index}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Para asegurarte de elegir el tamaño más adecuado de nuestras prendas, te recomendamos tomar como referencia una prenda que ya tengas y que te guste cómo te queda. Este método te ayudará a obtener una idea más precisa de qué tamaño de nuestra colección se ajustará mejor a tus preferencias. Aquí te explicamos cómo hacerlo paso a paso:
          </p>
  
          <h3 className="text-xl font-semibold">Prendas Superiores (Camisas, Blusas, Remeras, etc.)</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>Elige una prenda superior que te quede bien y te guste cómo se ajusta.</li>
            <li>Sigue las instrucciones de medición detalladas anteriormente para medir tu prenda en las áreas de largo, ancho, sisa, hombro y manga.</li>
            <li>Compara tus medidas con nuestra tabla de tallas para encontrar el tamaño que más se asemeje a tu prenda favorita.</li>
          </ul>
  
          <div className="mt-6 flex justify-center">
            <img 
              src="/regular-fit/sizes.jpeg?height=100&width=100" 
              alt="Diagrama de medidas de camiseta" 
              className="h-auto max-w-full"
            />
          </div>
        </div>
      </div>
    )
  }