import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fgfhhxbmsnxdsrbqgffl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZmhoeGJtc254ZHNyYnFnZmZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTAxMDcsImV4cCI6MjA3OTQyNjEwN30.MY68FVqj-dfXC5nZVE0qr_yLPPb6uPh4r53GJqHSwjc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
