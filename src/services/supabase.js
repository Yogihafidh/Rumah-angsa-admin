import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xxpmmoxzkidnhdnaeivs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4cG1tb3h6a2lkbmhkbmFlaXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMTQxNjUsImV4cCI6MjA1MjU5MDE2NX0.IQFkC4nZ0DLKMLe4xO1Gcdl6S2OdsjbUuOHooz4ZDqg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
