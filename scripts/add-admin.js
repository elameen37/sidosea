const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Helper to load .env.local manually
function loadEnv() {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
        console.error('Error: .env.local not found');
        process.exit(1);
    }
    const envContent = fs.readFileSync(envPath, 'utf8');
    const env = {};
    envContent.split('\n').forEach(line => {
        const [key, ...value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.join('=').trim();
        }
    });
    return env;
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Connectivity Test
async function checkConnectivity() {
    try {
        console.log(`Checking connectivity to: ${supabaseUrl}...`);
        const res = await fetch(`${supabaseUrl}/rest/v1/job_applications?select=count`, {
            headers: { 'apikey': supabaseKey }
        });
        if (res.ok) {
            console.log('Connectivity: OK');
        } else {
            console.error('Connectivity: FAILED', res.status, res.statusText);
            const text = await res.text();
            console.error('Response:', text);
        }
    } catch (err) {
        console.error('Connectivity Test Error:', err.message);
        if (err.message.includes('fetch failed')) {
            console.log('\nTIP: This often indicates a network issue or DNS resolution failure. Ensure you have internet access.');
        }
    }
}

// Secure hashing using PBKDF2
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

async function addAdmin(username, password) {
    await checkConnectivity();
    console.log(`Adding admin user: ${username}...`);
    
    const hashedPassword = hashPassword(password);
    
    const { data, error } = await supabase
        .from('admins')
        .insert([
            { username, password_hash: hashedPassword }
        ])
        .select();

    if (error) {
        console.error('Error adding admin:', error.message);
        if (error.code === '42P01') {
            console.log('\nTIP: The "admins" table does not exist. Please run the SQL migration in supabase/migrations/ first.');
        }
        process.exit(1);
    }

    console.log('Successfully added admin user:', data[0].username);
}

// CLI arguments
const args = process.argv.slice(2);
if (args.length !== 2) {
    console.log('Usage: node scripts/add-admin.js <username> <password>');
    process.exit(1);
}

addAdmin(args[0], args[1]);
