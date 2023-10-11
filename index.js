const axios = require("axios");
const fs = require("fs");

const getQuote = async () => {
  try {
    const { data } = await fetch.get("https://quotes.rest/qod?language=en");
    if (data) {
    const quote = data.contents.quotes[0].quote;
    const author = data.contents.quotes[0].author;
    }
    else return {
      qoute: "Do what you Love, Love what you do",
      author: "Roy T. Bennett",
    }
    console.log("new quote", `"${quote}"`);

    return {
      quote,
      author,
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

const generate = async () => {
  const { quote, author } = await getQuote();

  if (!quote) return;

  fs.appendFileSync("README.md", `\n_**${quote}**_\n\n${author}\n`);
};

generate();
