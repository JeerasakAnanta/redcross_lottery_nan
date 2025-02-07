const vision = require("@google-cloud/vision");
const checkReward = require("../utils/check_reward");

/**
 * Handles the reward checking process by detecting text in an uploaded image,
 * extracting the lottery number, and checking if it is a winning number.
 *
 * @param {Object} req - The request object containing the uploaded file.
 * @param {Object} res - The response object used to send the result back to the client.
 */
const reward = async (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }

  try {
    // Convert the file buffer to a base64 string
    const base64 = req.file.buffer.toString("base64");

    // Create a new Google Cloud Vision client
    const client = new vision.ImageAnnotatorClient({
      keyFilename: "./google-api-credentials.json",
    });

    // Create a request object for text detection
    const request = { image: { content: base64 } };

    // Perform text detection on the image
    const [result] = await client.textDetection(request);

    // Extract the detected text
    const description = result.textAnnotations[0].description;

    // Use regex to find a 6-digit lottery number in the text
    const lotteryNumber = description.match(/[0-9]{6}/);

    // Check if the lottery number is a winning number
    let response = await checkReward(lotteryNumber[0]);

    // Send the result back to the client
    res.json({ result: response });
  } catch (error) {
    // Log any errors and send an error response
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error processing image" });
  }
};

/**
 * Handles requests to check if a given lottery number is a winning number.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const number_reward = async (req, res) => {
  const { lottery_no } = req.body;

  // Check if the lottery number is valid
  if (!lottery_no || lottery_no.length !== 6) {
    return res.status(400).json({ error: "Invalid lottery number" });
  }

  try {
    // Call the checkReward function to check if the number is a winning number
    let response = await checkReward(lottery_no);

    // Send the result back to the client
    res.json({ result: response });
  } catch (error) {
    // Log any errors and send an error response
    console.error("Error processing lottery number:", error);
    res.status(500).json({ error: "Error processing lottery number" });
  }
};

module.exports = {
  reward,
  number_reward,
};
