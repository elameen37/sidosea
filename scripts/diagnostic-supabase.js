const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ggzcwnuqbbulbiuxiohy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnemN3enVxYmJ1bGJpdXhpb2h5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjgzODM2OSwiZXhwIjoyMDg4NDE0MzY5fQ.Glvdu5y0noK2NglNqDvZgV7dhsT-gElIPqCYyWGL4vM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnostic() {
    console.log('Checking Supabase connection...');
    
    // 1. Check Tables
    console.log('\n--- Checking Tables ---');
    try {
        const { data, error: tablesError } = await supabase
            .from('job_applications')
            .select('*')
            .limit(1);
        
        if (tablesError) {
            console.error('❌ Error checking table:', tablesError.code, tablesError.message);
        } else {
            console.log('✅ Table "job_applications" exists.');
            console.log('Sample data:', data);
        }
    } catch (e) {
        console.error('❌ Unexpected error:', e.message);
    }

    // 2. Check Storage
    console.log('\n--- Checking Storage ---');
    try {
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
        if (bucketsError) {
            console.error('❌ Error listing buckets:', bucketsError.message);
        } else {
            console.log('Available buckets:', buckets.map(b => b.name));
        }
    } catch (e) {
        console.error('❌ Unexpected error storage:', e.message);
    }
}

diagnostic();
