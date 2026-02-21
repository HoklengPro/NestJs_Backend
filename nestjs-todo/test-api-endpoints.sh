#!/bin/sh
# API Endpoint Test Script
# Can be run from inside or outside the container

echo "========================================="
echo "🚀 NestJS TODO API - Endpoint Testing"
echo "========================================="
echo ""

BASE_URL="http://localhost:3100"

echo "📍 Base URL: $BASE_URL"
echo ""
echo "========================================="
echo "📋 ALL AVAILABLE ENDPOINTS:"
echo "========================================="
echo ""
echo "🏠 ROOT:"
echo "  GET    /                         - Hello World"
echo ""
echo "👥 USERS:"
echo "  POST   /users                    - Create user"
echo "  GET    /users                    - List all users"
echo "  GET    /users/:id                - Get user by ID"
echo "  PUT    /users/:id                - Update user"
echo "  DELETE /users/:id                - Delete user"
echo ""
echo "📝 TASKS:"
echo "  POST   /tasks                    - Create task"
echo "  GET    /tasks                    - List all tasks"
echo "  GET    /tasks/:id                - Get task by ID"
echo "  PUT    /tasks/:id                - Update task"
echo "  PATCH  /tasks/:id/complete       - Complete task"
echo "  DELETE /tasks/:id                - Delete task"
echo ""
echo "========================================="
echo "🧪 TESTING ENDPOINTS..."
echo "========================================="
echo ""

# Test 1: Root endpoint
echo "1️⃣  Testing: GET /"
curl -s $BASE_URL/
echo ""
echo ""

# Test 2: Get all users
echo "2️⃣  Testing: GET /users"
curl -s $BASE_URL/users | head -c 500
echo ""
echo ""

# Test 3: Get all tasks
echo "3️⃣  Testing: GET /tasks"
curl -s $BASE_URL/tasks | head -c 500
echo ""
echo ""

# Test 4: Create a new user
echo "4️⃣  Testing: POST /users"
curl -s -X POST $BASE_URL/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}'
echo ""
echo ""

# Test 5: Create a new task
echo "5️⃣  Testing: POST /tasks"
curl -s -X POST $BASE_URL/tasks \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Task","description":"Testing from script","user":{"id":1}}'
echo ""
echo ""

# Test 6: Get specific task
echo "6️⃣  Testing: GET /tasks/1"
curl -s $BASE_URL/tasks/1
echo ""
echo ""

# Test 7: Complete a task
echo "7️⃣  Testing: PATCH /tasks/1/complete"
curl -s -X PATCH $BASE_URL/tasks/1/complete
echo ""
echo ""

# Test 8: Update a task
echo "8️⃣  Testing: PUT /tasks/1"
curl -s -X PUT $BASE_URL/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"description":"Updated description"}'
echo ""
echo ""

echo "========================================="
echo "✅ Testing Complete!"
echo "========================================="
echo ""
echo "💡 To run this script:"
echo "   - From host: ./test-api-endpoints.sh"
echo "   - Inside container: sh /app/test-api-endpoints.sh"
echo ""
