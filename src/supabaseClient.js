import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qqfifruhwzalcibkbzcu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZmlmcnVod3phbGNpYmtiemN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NDU2OTAsImV4cCI6MjA2OTQyMTY5MH0.6uoAZEdsNeAsuQghuB7Q5hl-KRvvViYmVrYtR2TomZ8'

export const supabase = createClient(supabaseUrl, supabaseKey)