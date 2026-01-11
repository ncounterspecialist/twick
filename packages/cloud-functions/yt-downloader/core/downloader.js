import { exec } from "child_process";
import { promisify } from "util";
import { unlink, existsSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";

const execAsync = promisify(exec);
const unlinkAsync = promisify(unlink);

/**
 * Downloads a video from YouTube or other supported platforms using yt-dlp.
 * 
 * @param {Object} options - Download options
 * @param {string} options.url - Video URL (YouTube, Vimeo, etc.)
 * @param {string} [options.format] - Video format preference (default: "bestvideo+bestaudio/best")
 * @param {string} [options.outputPath] - Optional output path (default: temporary file)
 * @param {boolean} [options.mergeVideoAudio] - Whether to merge video and audio with ffmpeg (default: true)
 * @param {Object} [options.ytdlpOptions] - Additional yt-dlp options as key-value pairs
 * @returns {Promise<Object>} Object with { filePath, format, duration, title, etc. }
 */
export async function downloadVideo({
  url,
  format = "bestvideo+bestaudio/best",
  outputPath,
  mergeVideoAudio = true,
  ytdlpOptions = {},
}) {
  if (!url) {
    throw new Error("URL is required");
  }

  const outputFile = outputPath || join(tmpdir(), `yt-download-${Date.now()}.%(ext)s`);
  const finalOutputPath = outputPath || join(tmpdir(), `yt-download-${Date.now()}.mp4`);

  // Build yt-dlp command
  const ytdlpPath = process.env.YTDLP_PATH || "/usr/local/bin/yt-dlp";
  
  let command = `${ytdlpPath} "${url}"`;
  
  // Set format
  command += ` -f "${format}"`;
  
  // Set output path
  command += ` -o "${outputFile}"`;
  
  // Get video info as JSON (for metadata)
  command += " --print-json";
  
  // Additional options
  if (mergeVideoAudio) {
    command += " --merge-output-format mp4";
  }
  
  // Default options for better YouTube compatibility
  // Use android client for YouTube to avoid bot detection when possible
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  if (isYouTube && !ytdlpOptions['extractor-args']) {
    // Try using Android client first (less likely to trigger bot detection)
    command += ` --extractor-args "youtube:player_client=android"`;
  }
  
  // Add user-agent to help avoid detection
  if (isYouTube && !ytdlpOptions['user-agent']) {
    command += ` --user-agent "Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36"`;
  }
  
  // Add custom yt-dlp options (these override defaults if specified)
  for (const [key, value] of Object.entries(ytdlpOptions)) {
    if (value === true || value === "") {
      command += ` --${key}`;
    } else if (value !== false && value !== null && value !== undefined) {
      // Escape quotes in values
      const escapedValue = String(value).replace(/"/g, '\\"');
      command += ` --${key} "${escapedValue}"`;
    }
  }

  console.log(`Executing yt-dlp command: ${command}`);
  
  try {
    // Execute yt-dlp and capture both stdout (JSON) and stderr
    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      encoding: "utf8",
    });

    // yt-dlp prints JSON to stderr, not stdout in some versions
    // Try to parse JSON from either stdout or stderr
    let videoInfo = null;
    try {
      const jsonOutput = stdout.trim() || stderr.trim();
      const jsonMatch = jsonOutput.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        videoInfo = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.warn("Could not parse video info JSON:", parseError);
    }

    // Find the actual output file (yt-dlp replaces %(ext)s with actual extension)
    let actualOutputFile = null;
    if (outputPath) {
      actualOutputFile = outputPath;
    } else {
      // Try to find the file by pattern
      const basePattern = outputFile.replace(/\.%\(ext\)s$/, "");
      const possibleExtensions = ["mp4", "webm", "mkv", "m4a", "mp3"];
      
      for (const ext of possibleExtensions) {
        const candidate = `${basePattern}.${ext}`;
        if (existsSync(candidate)) {
          actualOutputFile = candidate;
          break;
        }
      }
      
      // If we still don't have a file, check if outputFile exists as-is
      if (!actualOutputFile && existsSync(outputFile)) {
        actualOutputFile = outputFile;
      }
      
      // If mergeVideoAudio and we have separate video/audio files, we need to merge them
      if (!actualOutputFile && mergeVideoAudio) {
        // Look for video and audio files separately
        const videoFile = `${basePattern}.video`;
        const audioFile = `${basePattern}.audio`;
        
        if (existsSync(videoFile) || existsSync(audioFile)) {
          // Merge with ffmpeg
          actualOutputFile = await mergeVideoAudioFiles(
            videoFile,
            audioFile,
            finalOutputPath
          );
          
          // Clean up temp files
          if (existsSync(videoFile)) await unlinkAsync(videoFile).catch(() => {});
          if (existsSync(audioFile)) await unlinkAsync(audioFile).catch(() => {});
        }
      }
    }

    if (!actualOutputFile || !existsSync(actualOutputFile)) {
      throw new Error(
        `Download completed but output file not found. Expected: ${outputFile}, Found in: ${tmpdir()}`
      );
    }

    return {
      filePath: actualOutputFile,
      url,
      format: videoInfo?.format || format,
      duration: videoInfo?.duration,
      title: videoInfo?.title,
      uploader: videoInfo?.uploader,
      width: videoInfo?.width,
      height: videoInfo?.height,
      fps: videoInfo?.fps,
      filesize: videoInfo?.filesize,
      info: videoInfo,
    };
  } catch (error) {
    console.error("Error downloading video:", error);
    
    // Parse error message for helpful hints
    const errorMessage = error.message || error.stderr || String(error);
    
    // Check for specific YouTube errors
    if (errorMessage.includes("Sign in to confirm you're not a bot") || 
        errorMessage.includes("bot") ||
        errorMessage.includes("cookies")) {
      throw new Error(
        `YouTube requires authentication/cookies. This video may be protected or YouTube is blocking automated access. ` +
        `Try using cookies: pass cookies via --cookies-file option in ytdlpOptions, or use a different video URL. ` +
        `Original error: ${errorMessage}`
      );
    }
    
    // Check for JavaScript runtime warning
    if (errorMessage.includes("JavaScript runtime") || errorMessage.includes("js-runtimes")) {
      // This is usually just a warning, but if it causes failure, handle it
      console.warn("JavaScript runtime warning (this is usually non-fatal):", errorMessage);
    }
    
    throw new Error(
      `Failed to download video: ${errorMessage}`
    );
  }
}

/**
 * Merges separate video and audio files using ffmpeg.
 * 
 * @param {string} videoPath - Path to video file
 * @param {string} audioPath - Path to audio file
 * @param {string} outputPath - Output path for merged file
 * @returns {Promise<string>} Path to merged file
 */
async function mergeVideoAudioFiles(videoPath, audioPath, outputPath) {
  const ffmpegPath = process.env.FFMPEG_PATH || "ffmpeg";
  
  // Check if files exist
  const hasVideo = existsSync(videoPath);
  const hasAudio = existsSync(audioPath);
  
  if (!hasVideo && !hasAudio) {
    throw new Error("Neither video nor audio file found for merging");
  }
  
  let command = `${ffmpegPath} -y`; // -y to overwrite output
  
  if (hasVideo) {
    command += ` -i "${videoPath}"`;
  }
  if (hasAudio) {
    command += ` -i "${audioPath}"`;
  }
  
  // Merge using codec copy when possible, or re-encode
  if (hasVideo && hasAudio) {
    command += " -c:v copy -c:a copy";
  } else if (hasVideo) {
    command += " -c:v copy";
  } else {
    command += " -c:a copy";
  }
  
  command += ` "${outputPath}"`;
  
  console.log(`Merging with ffmpeg: ${command}`);
  
  try {
    const { stdout, stderr } = await execAsync(command, {
      maxBuffer: 10 * 1024 * 1024,
    });
    
    if (!existsSync(outputPath)) {
      throw new Error("ffmpeg merge completed but output file not found");
    }
    
    return outputPath;
  } catch (error) {
    console.error("Error merging files:", error);
    throw new Error(`Failed to merge video/audio: ${error.message || error}`);
  }
}
