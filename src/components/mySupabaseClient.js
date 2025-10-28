import { createClient } from '@supabase/supabase-js'


const supabaseURL = "https://thncfttcsauysykhktnn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobmNmdHRjc2F1eXN5a2hrdG5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMzk0OTksImV4cCI6MjA3NjcxNTQ5OX0.n4i6kGUBghUD787zN1i9vtawLWd9D8Il8JthD8NCrCo"

export const supabase = createClient(supabaseURL, supabaseKey)
