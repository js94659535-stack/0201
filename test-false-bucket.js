// FALSE Bucket 통합 테스트
const { insertFalseBucket } = require('./src/lib/false-bucket.ts');

// Mock D1 database
const mockDB = {
  prepare: (sql) => ({
    bind: (...params) => ({
      run: async () => {
        console.log('✅ Mock D1 INSERT executed');
        console.log('SQL:', sql);
        console.log('Params:', params);
        return { success: true };
      }
    })
  })
};

// Test insertFalseBucket
async function test() {
  console.log('🧪 Testing FALSE Bucket...');
  
  const testData = {
    source: 'summary_v4',
    reason: 'DETAIL_VALIDATION_FAIL',
    errors: ['detail text too short', 'missing core claim'],
    inputHash: 'test-hash-12345',
    inputText: 'This is a test input text that failed validation.',
    model: 'gemini-2.0-flash-exp',
    payloadJson: JSON.stringify({ brief: 'test', standard: 'test' }),
    retryCount: 1,
    meta: { phase: 'phase2', elapsedMs: 1234 }
  };
  
  try {
    await insertFalseBucket(mockDB as any, testData);
    console.log('✅ insertFalseBucket succeeded');
  } catch (err) {
    console.error('❌ insertFalseBucket failed:', err);
  }
}

test();
