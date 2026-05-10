#!/usr/bin/env node

/**
 * Seed Database Script
 * 
 * Usage: node seed.js
 * 
 * This script seeds your MongoDB database with sample projects and messages.
 * Requires MONGO_URI in .env file.
 * 
 * Run once to populate your portfolio with demo content.
 * Safe to run multiple times (will create duplicates if projects exist).
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Message = require('./models/Message');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✓ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`✗ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

const sampleProjects = [
  {
    title: 'Arch Linux Dotfiles',
    description: 'Fully configured Arch Linux environment with custom keybindings, themes, and automated setup scripts. Includes configuration for Neovim, i3wm, and Zsh.',
    category: 'dev',
    tags: ['Linux', 'Arch', 'Shell', 'Configuration', 'Automation'],
    imageUrl: null,
    liveUrl: null,
    repoUrl: 'https://github.com/yourusername/dotfiles',
    featured: true,
  },
  {
    title: 'Network Security Analyzer',
    description: 'Python-based network analysis tool that scans local networks, identifies devices, and detects potential vulnerabilities. Includes port scanning and protocol analysis.',
    category: 'cybersec',
    tags: ['Python', 'Cybersecurity', 'Networking', 'Security'],
    imageUrl: null,
    liveUrl: null,
    repoUrl: 'https://github.com/yourusername/network-analyzer',
    featured: true,
  },
  {
    title: 'Neon Nights VFX Sequence',
    description: 'High-energy motion graphics sequence with neon city aesthetic. Created in Cinema 4D with volumetric lighting and particle effects. 60 seconds at 4K.',
    category: 'vfx',
    tags: ['Cinema 4D', 'Motion Graphics', 'VFX', '3D', 'Compositing'],
    imageUrl: null,
    liveUrl: 'https://vimeo.com/...',
    repoUrl: null,
    featured: false,
  },
  {
    title: 'Password Strength Validator',
    description: 'JavaScript utility library for real-time password strength validation. Supports custom rules, multilingual feedback, and accessibility features.',
    category: 'dev',
    tags: ['JavaScript', 'Security', 'Utility', 'NPM Package'],
    imageUrl: null,
    liveUrl: null,
    repoUrl: 'https://github.com/yourusername/password-validator',
    featured: false,
  },
  {
    title: 'Data Breach Animation',
    description: 'Cybersecurity awareness animation showing data theft scenario. Created with After Effects, Blender, and DaVinci Resolve. 2 minutes educational content.',
    category: 'vfx',
    tags: ['After Effects', 'Blender', 'Animation', 'Education', 'Cybersecurity'],
    imageUrl: null,
    liveUrl: 'https://youtube.com/...',
    repoUrl: null,
    featured: false,
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack Node.js + React e-commerce platform with authentication, payment processing, and admin dashboard. MongoDB for inventory management.',
    category: 'dev',
    tags: ['Node.js', 'MongoDB', 'Express', 'JavaScript', 'API'],
    imageUrl: null,
    liveUrl: 'https://ecommerce-demo.com',
    repoUrl: 'https://github.com/yourusername/ecommerce-platform',
    featured: true,
  },
];

const sampleMessages = [
  {
    name: 'Alice Chen',
    email: 'alice@techcompany.com',
    subject: 'Collaboration Opportunity',
    body: 'Hi! I was impressed by your cybersecurity projects. We are looking for a security consultant for our startup. Would you be interested in discussing opportunities?',
    read: true,
  },
  {
    name: 'Marcus Johnson',
    email: 'marcus@creativestudio.com',
    subject: 'VFX Project Request',
    body: 'Love your motion graphics work! We have a client project that needs a talented VFX artist. Your neon aesthetic is exactly what we are looking for. Let\'s talk!',
    read: false,
  },
];

const seed = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data (optional - comment out to preserve)
    console.log('\n📋 Clearing existing data...');
    await Project.deleteMany({});
    await Message.deleteMany({});
    console.log('✓ Cleared projects and messages');

    // Seed projects
    console.log('\n📦 Seeding projects...');
    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`✓ Created ${createdProjects.length} projects:`);
    createdProjects.forEach(p => console.log(`  - ${p.title}`));

    // Seed messages
    console.log('\n💬 Seeding messages...');
    const createdMessages = await Message.insertMany(sampleMessages);
    console.log(`✓ Created ${createdMessages.length} messages:`);
    createdMessages.forEach(m => console.log(`  - ${m.name} (${m.email})`));

    console.log('\n✨ Database seeding complete!');
    console.log('\n🔗 Next steps:');
    console.log('  1. Start backend: npm run dev');
    console.log('  2. Test API: curl http://localhost:3000/api/projects');
    console.log('  3. View dashboard: Open http://localhost:3000');
    console.log('\n💡 Customize sampleProjects & sampleMessages in this file to match your portfolio.');

  } catch (err) {
    console.error(`✗ Seeding error: ${err.message}`);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
  }
};

// Run seed
seed();
