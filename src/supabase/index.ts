import { createClient } from '@supabase/supabase-js'

export default createClient(
  process.env.REACT_APP_SUPABASE_API as string,
  process.env.REACT_APP_SUPABASE_ANON_KEY as string
)
