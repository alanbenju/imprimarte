import { notFound } from "next/navigation";
import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";

async function getStoreData(storeSlug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/store/public/${storeSlug}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error("Failed to fetch store data:", error);
    return null;
  }
}

export default async function CheckoutPage({
  params,
}: {
  params: { storeSlug: string };
}) {
  const store = await getStoreData(params.storeSlug);
  
  if (!store) {
    notFound();
  }
  
  return (
    <div className="mx-auto max-w-7xl">
      <h1 
        className="mb-8 text-2xl font-bold md:text-3xl"
        style={{ color: store.colorText || "#374151" }}
      >
        Finalizar Compra
      </h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm 
            storeId={store.id}
            storeColors={{
              buyButtonColor: store.buyButtonColor,
              colorText: store.colorText,
            }} 
          />
        </div>
        
        {/* Order Summary */}
        <div>
          <CheckoutSummary 
            storeColors={{
              buyButtonColor: store.buyButtonColor,
              colorText: store.colorText,
              colorPanel: store.colorPanel,
            }}
          />
        </div>
      </div>
    </div>
  );
} 