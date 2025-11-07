import renderTwickVideo from '../../core/renderer.js';

/**
 * Handler for processing video project data with files
 * 
 * Expected JSON payload:
 * {
 *   "project": { ... }, // Video project JSON object
 *   "mediaFiles": [     // Optional array of base64-encoded files
 *     {
 *       "filename": "video.mp4",
 *       "contentType": "video/mp4", 
 *       "data": "base64-encoded-content"
 *     }
 *   ]
 * }
 * 
 * Returns: Processing result with video file
 */

export const handler = async (event) => {
  console.log('Video processor function invoked');
  console.log('Event:', JSON.stringify(event));
  const projectData = event.arguments?.input || {};
  
  try {
    // Validate required fields
    if (!projectData) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Missing required field: project',
          expectedFormat: {
            project: 'Video project JSON object',
            mediaFiles: 'Optional array of base64-encoded files'
          }
        }),
      };
    }

    const mediaFiles = projectData.mediaFiles || [];
    
    // Log each media file
    mediaFiles.forEach((file, index) => {
      console.log(`Media file ${index + 1}:`, {
        filename: file.filename,
        contentType: file.contentType,
        size: file.data ? Buffer.from(file.data, 'base64').length : 0
      });
    });

    // Render the video using Twick renderer
    console.log('Starting video rendering...' );
    
    let renderedVideoPath;
    let videoBuffer;
    
    try {
      // Render the video
      renderedVideoPath = await renderTwickVideo(projectData, {
        outFile: `video-${projectData.properties?.id || Date.now()}.mp4`,
      });

      // Read the rendered video file
      const fs = await import('fs');
      videoBuffer = fs.readFileSync(renderedVideoPath);

      console.log('Video rendered successfully:', renderedVideoPath);
      console.log('Video size:', videoBuffer.length, 'bytes');

      // Clean up the temporary file
      try {
        fs.unlinkSync(renderedVideoPath);
        console.log('Temporary video file cleaned up');
      } catch (cleanupError) {
        console.warn('Failed to clean up temporary file:', cleanupError);
      }

    } catch (renderError) {
      console.error('Video rendering failed:', renderError);
      
      // Fallback to text file if rendering fails
      const errorText = `Video Processing Error
======================
Request ID: ${projectData.properties?.id || 'N/A'}
Timestamp: ${new Date().toISOString()}
Status: Rendering Failed

Error: ${renderError instanceof Error ? renderError.message : 'Unknown error'}

Media Files Received: ${mediaFiles.length}
${mediaFiles.map((file, index) => `  ${index + 1}. ${file.filename} (${file.data ? Buffer.from(file.data, 'base64').length : 0} bytes)`).join('\n')}
`;

      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': 'attachment; filename="error.txt"',
          'Access-Control-Allow-Origin': '*',
        },
        body: errorText,
      };
    }

    // Return the video file
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="processed-video.mp4"`,
        'Content-Length': videoBuffer.length,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: videoBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error processing video project:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
