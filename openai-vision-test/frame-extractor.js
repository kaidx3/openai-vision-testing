// Import the fluent-ffmpeg module
import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath("C:/FFMpeg/bin/ffmpeg.exe");
ffmpeg.setFfprobePath("C:/FFMpeg/bin/ffprobe.exe");

// Set the path of the video file
const videoPath = "./test_with_people.mp4";

// Set the output directory for the images
const outputDir = "./images";

// Set the frame rate for the extraction
const frameRate = 1;

// Create a command to read the video file
const command = ffmpeg(videoPath);

// Get the metadata of the video file
command.ffprobe((err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Get the duration of the video in seconds
    const duration = data.format.duration;

    // Loop through each second of the video
    for (let i = 0; i < duration; i++) {
        // Set the output file name for the image
        const outputName = `${outputDir}/image-${i}.jpg`;

        // Clone the command and set the options for the extraction
        command
            .clone()
            .on("error", (err) => {
                console.error(err);
            })
            .on("end", () => {
                console.log(`Saved image: ${outputName}`);
            })
            .outputOptions([
                `-ss ${i}`, // Seek to the i-th second
                "-frames:v 1", // Extract one frame
                `-r ${frameRate}`, // Set the frame rate
                "-f image2", // Set the output format to image
            ])
            .output(outputName) // Set the output file name
            .run(); // Run the command
    }
});
