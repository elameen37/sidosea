const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function loadEnv() {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value) env[key.trim()] = value.join('=').trim();
    });
    return env;
}

const env = loadEnv();
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function listAdmins() {
    const { data, error } = await supabase.from('admins').select('username, created_at');
    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('--- Admin Users ---');
        data.forEach(a => console.log(`- ${a.username} (Created: ${a.created_at})`));
    }
}

listAdmins();
