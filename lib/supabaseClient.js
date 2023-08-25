import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://gjqfklagaeqtqgcbewmp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqcWZrbGFnYWVxdHFnY2Jld21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAyNDYwOTMsImV4cCI6MTk5NTgyMjA5M30.FAggcXpKDisEx-vrx6S9IL42IQ9Xo73dxXIwobcZ-YA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
