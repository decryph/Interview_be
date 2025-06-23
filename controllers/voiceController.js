const fs = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

exports.processVoiceAnswer = async (req, res) => {
  try {
    const audioFile = req.files.audio; // use multer for file upload handling
    const question = req.body.question;

    const tempWebmPath = path.join(__dirname, "../uploads", audioFile.name);
    await audioFile.mv(tempWebmPath); // move to temp

    const wavPath = tempWebmPath.replace(".webm", ".wav");

    await new Promise((resolve, reject) => {
      ffmpeg(tempWebmPath)
        .toFormat("wav")
        .on("end", () => {
          console.log("✅ Converted to WAV");
          resolve();
        })
        .on("error", reject)
        .save(wavPath);
    });

    // Now send wavPath to your voicescore API
    const formData = new FormData();
    formData.append("audio", fs.createReadStream(wavPath));

    const transcriptRes = await axios.post("https://voicescore2.onrender.com/voice-to-text/", formData, {
      headers: formData.getHeaders(),
    });

    const userText = transcriptRes.data.text;

    // clean up temp files
    fs.unlinkSync(tempWebmPath);
    fs.unlinkSync(wavPath);

    res.json({ transcription: userText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Voice processing failed" });
  }
};
