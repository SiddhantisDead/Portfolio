# Makefile for Portfolio Website

.PHONY: help install dev seed frontend test clean

help:
	@echo "📋 Portfolio Website Commands"
	@echo ""
	@echo "Setup & Installation:"
	@echo "  make install        Install backend dependencies"
	@echo "  make seed           Populate database with sample data"
	@echo ""
	@echo "Development:"
	@echo "  make dev            Start backend server (auto-restart on changes)"
	@echo "  make frontend       Serve frontend on http://localhost:3000"
	@echo ""
	@echo "Utility:"
	@echo "  make test           Test API endpoints"
	@echo "  make clean          Remove node_modules"
	@echo "  make help           Show this help menu"
	@echo ""
	@echo "🚀 Quick Start:"
	@echo "  1. make install"
	@echo "  2. Update backend/.env with your MongoDB URI"
	@echo "  3. make seed"
	@echo "  4. make dev (in one terminal)"
	@echo "  5. make frontend (in another terminal)"
	@echo "  6. Open http://localhost:3000"

install:
	@echo "📦 Installing dependencies..."
	cd backend && npm install
	@echo "✅ Dependencies installed!"

dev:
	@echo "🚀 Starting backend (development mode)..."
	cd backend && npm run dev

seed:
	@echo "🌱 Seeding database..."
	cd backend && npm run seed

frontend:
	@echo "🎨 Serving frontend on http://localhost:3000..."
	cd frontend && python3 -m http.server 3000

test:
	@echo "🧪 Testing API endpoints..."
	@echo ""
	@echo "1. Testing GET /api/projects"
	curl -s http://localhost:3000/api/projects | python3 -m json.tool
	@echo ""
	@echo "2. Testing POST /api/messages"
	curl -s -X POST http://localhost:3000/api/messages \
		-H "Content-Type: application/json" \
		-d '{"name":"Test","email":"test@example.com","body":"Test message"}' | python3 -m json.tool
	@echo ""
	@echo "✅ API tests complete!"

clean:
	@echo "🧹 Cleaning up..."
	rm -rf backend/node_modules
	@echo "✅ Cleaned!"

.DEFAULT_GOAL := help
