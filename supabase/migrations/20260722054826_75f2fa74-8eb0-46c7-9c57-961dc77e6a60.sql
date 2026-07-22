CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  stripe_session_id text NOT NULL UNIQUE,
  stripe_payment_intent_id text,
  stripe_product_id text,
  stripe_price_id text,
  product_name text,
  amount_total integer,
  currency text,
  status text NOT NULL DEFAULT 'pending',
  customer_email_sent boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.orders TO service_role;
GRANT SELECT, INSERT ON public.orders TO authenticated;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage orders" ON public.orders FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Users can view their own orders by email" ON public.orders FOR SELECT TO authenticated USING (email = auth.jwt() ->> 'email');

CREATE OR REPLACE FUNCTION public.update_orders_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_orders_updated_at();