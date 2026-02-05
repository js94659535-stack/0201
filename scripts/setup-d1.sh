#!/bin/bash
# D1 Database Setup Script for FALSE Bucket

set -e

echo "🗄️  FALSE Bucket D1 Setup"
echo "========================="
echo ""

# Check if D1 database exists
echo "1️⃣  Checking existing D1 databases..."
wrangler d1 list

echo ""
echo "2️⃣  Creating/Using D1 database: webapp-db"
echo ""
echo "📝 Run this command manually to create D1 database:"
echo "   wrangler d1 create webapp-db"
echo ""
echo "   Then copy the database_id and update wrangler.jsonc:"
echo "   [[d1_databases]]"
echo "   binding = \"DB\""
echo "   database_name = \"webapp-db\""
echo "   database_id = \"<your-database-id>\""
echo ""
echo "3️⃣  After updating wrangler.jsonc, run migrations:"
echo "   wrangler d1 execute webapp-db --file=migrations/0002_summaries.sql"
echo "   wrangler d1 execute webapp-db --file=migrations/0002_learning_items.sql"
echo "   wrangler d1 execute webapp-db --file=migrations/0003_false_bucket.sql"
echo ""
echo "4️⃣  Verify table creation:"
echo "   wrangler d1 execute webapp-db --command=\"SELECT name FROM sqlite_master WHERE type='table';\""
echo ""
echo "5️⃣  Query FALSE Bucket:"
echo "   wrangler d1 execute webapp-db --command=\"SELECT * FROM ms_false_bucket LIMIT 5;\""
echo ""
echo "✅ Setup instructions complete!"
