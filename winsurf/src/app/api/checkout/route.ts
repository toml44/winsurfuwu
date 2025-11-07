import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY as string | undefined;
    if (!secret) {
      return NextResponse.json({ error: "Stripe non configuré" }, { status: 400 });
    }
    const stripe = new Stripe(secret);
    const { items, successUrl, cancelUrl } = await req.json();

    if (!Array.isArray(items) || !items.length) {
      return NextResponse.json({ error: "items requis" }, { status: 400 });
    }

    const line_items = items.map((i: any) => ({
      quantity: Number(i.qty) || 1,
      price_data: {
        currency: "eur",
        product_data: { name: String(i.name || "Article") },
        unit_amount: Number(i.priceCents) || 0,
      },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: successUrl || `${req.nextUrl.origin}/orders?success=1`,
      cancel_url: cancelUrl || `${req.nextUrl.origin}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erreur" }, { status: 500 });
  }
}
