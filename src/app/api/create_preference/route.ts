import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MERCADOPAGO_ACCESS_TOKEN as string,
});

// API Route handler for POST requests
export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const { items, payer } = body; // Assuming the request contains `items` and `payer` in the body

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: "Mi producto",
            quantity: 1,
            unit_price: 2000,
            id: "1",
          },
        ],
      },
    });

    // Return the preference ID as a JSON response
    return NextResponse.json({ id: response.id });
  } catch (error) {
    console.error("Error creating preference:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
