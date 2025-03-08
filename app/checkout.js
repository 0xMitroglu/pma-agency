import { loadStripe } from "@stripe/stripe-js"
import { useRouter } from "next/router"
export async function checkout({ lineItems }, name) {
    let stripePromise = null
    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY)
        }
        return stripePromise
    }
    const encodedName = encodeURIComponent(name)
    const stripe = await getStripe()
    await stripe.redirectToCheckout({
        mode: "payment",
        lineItems,
        successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/celebrities/${encodedName}`,
    })
}
