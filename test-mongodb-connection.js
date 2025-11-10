/**
 * Test MongoDB Connection Script
 * 
 * Usage:
 * 1. Set MONGODB_URI in .env.local
 * 2. Run: node test-mongodb-connection.js
 */

require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  
  // Check if MONGODB_URI is set
  if (!MONGODB_URI || MONGODB_URI.trim() === "") {
    console.error('❌ MONGODB_URI is not set in .env.local')
    console.error('💡 Please add MONGODB_URI=your_connection_string to .env.local')
    process.exit(1)
  }

  // Check format
  const isValidFormat = MONGODB_URI.startsWith("mongodb://") || MONGODB_URI.startsWith("mongodb+srv://")
  if (!isValidFormat) {
    console.error('❌ MONGODB_URI format is invalid')
    console.error('💡 MONGODB_URI should start with "mongodb://" or "mongodb+srv://"')
    console.error(`   Current: ${MONGODB_URI.substring(0, 30)}...`)
    process.exit(1)
  }

  // Mask password in connection string for display
  const maskedURI = MONGODB_URI.replace(/:([^:@]+)@/, ':****@')
  console.log(`📋 Connection string: ${maskedURI}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')

  try {
    console.log('🔄 Attempting to connect...')
    
    const connection = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    })

    console.log('✅ Connected to MongoDB successfully!')
    console.log(`📊 Database: ${connection.connection.db.databaseName}`)
    console.log(`🔗 Host: ${connection.connection.host}`)
    console.log(`🔌 Port: ${connection.connection.port}`)
    console.log(`👤 User: ${connection.connection.user || 'N/A'}`)
    
    // Test basic operations
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🧪 Testing basic operations...')
    
    // List collections
    const collections = await connection.connection.db.listCollections().toArray()
    console.log(`📁 Collections found: ${collections.length}`)
    if (collections.length > 0) {
      console.log('   Collections:', collections.map(c => c.name).join(', '))
    }

    // Close connection
    await mongoose.connection.close()
    console.log('✅ Connection closed successfully')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🎉 MongoDB connection test passed!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ MongoDB connection failed!')
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('Error details:')
    console.error(`   Message: ${error.message}`)
    console.error(`   Name: ${error.name}`)
    
    if (error.message.includes('authentication failed')) {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.error('💡 Authentication failed. Possible causes:')
      console.error('   1. Incorrect username or password')
      console.error('   2. Password contains special characters that need URL encoding')
      console.error('   3. User does not have access to the database')
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT')) {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.error('💡 Network error. Possible causes:')
      console.error('   1. MongoDB Atlas Network Access not configured')
      console.error('   2. Firewall blocking connection')
      console.error('   3. Incorrect cluster hostname')
      console.error('   4. Internet connection issues')
    } else if (error.message.includes('bad auth')) {
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.error('💡 Authentication error. Possible causes:')
      console.error('   1. Incorrect credentials')
      console.error('   2. Password needs URL encoding')
    }
    
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('💡 Troubleshooting steps:')
    console.error('   1. Check .env.local file exists and has MONGODB_URI')
    console.error('   2. Verify connection string format')
    console.error('   3. URL encode password if it contains special characters')
    console.error('   4. Check MongoDB Atlas Network Access settings')
    console.error('   5. Verify database user exists and has correct permissions')
    console.error('   6. Test connection in MongoDB Compass')
    
    process.exit(1)
  }
}

testConnection()


