import { createClient } from "@supabase/supabase-js";

export default createClient(
  process.env.SUPABASE_API as string,
  process.env.SUPABASE_ANON_KEY as string
);
