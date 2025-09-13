import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, filters } = await req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    let queryBuilder = supabase
      .from('profiles')
      .select('id, username, full_name, profile_pic_url, year_of_study, branch, skills, bio')
      .ilike('full_name', `%${query}%`);

    if (filters?.branch) {
      queryBuilder = queryBuilder.eq('branch', filters.branch);
    }

    if (filters?.year_of_study) {
      queryBuilder = queryBuilder.eq('year_of_study', filters.year_of_study);
    }

    if (filters?.skills && filters.skills.length > 0) {
      queryBuilder = queryBuilder.contains('skills', filters.skills);
    }

    const { data, error } = await queryBuilder.limit(20);

    if (error) {
      console.error('Search error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    return new Response(
      JSON.stringify({ data, error: null }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});