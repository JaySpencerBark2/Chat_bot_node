const express = require("express");
const bodyParser = require("body-parser");
const openai = require("./config/openai.js");
const colours = require("colors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/page.html");
});

app.post("/chat", async (req, res) => {
  const userInput = req.body.userInput;

  try {
    // chatgbt API and user input processing

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: userInput },
      ],
    });

    const botAnswer = chatCompletion.data.choices[0].message.content;

    res.send({ botAnswer });
  } catch (error) {
    console.error(colours.red(error));
    res.status(500).send({ error: "An error occurred" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});