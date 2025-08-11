// Simple test script for the render server
import fetch from 'node-fetch';

const API_URL = 'http://localhost:3001';

const sample = {
    "input": {
      "properties": {
        "width": 720,
        "height": 1280
      },
      "tracks": [
        {
          "id": "t-track-1",
          "type": "element",
          "elements": [
            {
              "id": "e-244f8d5a3baa",
              "trackId": "t-track-1",
              "type": "rect",
              "s": 0,
              "e": 5,
              "props": {
                "width": 720,
                "height": 1280,
                "fill": "#fff000"
              }
            }
          ],
          "name": "element"
        },
        {
          "id": "t-track-2",
          "type": "element",
          "elements": [
            {
              "id": "e-244f8d5a3bba",
              "trackId": "t-track-2",
              "type": "text",
              "s": 0,
              "e": 1,
              "props": {
                "text": "Hello Guys!",
                "fontSize": 100,
                "fill": "#FF0000"
              }
            },
            {
              "id": "e-244f8d5a3bbb",
              "trackId": "t-track-2",
              "type": "text",
              "s": 1,
              "e": 4,
              "props": {
                "text": "Welcome to the world of Twick!",
                "fontSize": 100,
                "fill": "#FF0000",
                "maxWidth": 500,
                "textAlign": "center",
                "textWrap": true
              }
            },
            {
              "id": "e-244f8d5a3bbc",
              "trackId": "t-track-2",
              "type": "text",
              "s": 4,
              "e": 5,
              "props": {
                "text": "Thank You !",
                "fontSize": 100,
                "fill": "#FF0000"
              }
            }
          ],
          "name": "element"
        },
        {
          "id": "t-track-3",
          "type": "element",
          "elements": [
            {
              "id": "e-244f8d5aabaa",
              "trackId": "t-track-3",
              "type": "audio",
              "s": 0,
              "e": 5,
              "props": {
                "src": "https://cdn.pixabay.com/audio/2024/09/15/audio_e00d39651a.mp3",
                "play": true,
                "volume": 1
              }
            }
          ],
          "name": "audio"
        }
      ],
      "version": 1
    }
  }


async function testHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    const result = await response.json();
    console.log('✅ Health check passed:', result);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
}

async function testRender() {
  try {
    console.log('🔄 Testing video render...');
    
    const response = await fetch(`${API_URL}/api/render-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variables: sample,
        settings: {
          outFile: `test-${Date.now()}.mp4`,          
        }
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Render test passed!');
      console.log('📁 Output:', result.downloadUrl);
      return true;
    } else {
      console.error('❌ Render test failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Render test failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🧪 Running render server tests...\n');
  
  const healthPassed = await testHealth();
  console.log('');
  
  if (healthPassed) {
    await testRender();
  } else {
    console.log('❌ Skipping render test due to health check failure');
  }
  
  console.log('\n🏁 Tests completed');
}

runTests().catch(console.error); 