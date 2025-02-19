const axios = require("axios");
const fs = require("fs");

const getQuote = async () => {
  try {
     const { data } = await axios.get("https://api.quotable.io/quotes/random", {
      httpsAgent: new (require('https').Agent)({  
        rejectUnauthorized: false
      })
    });
    let quote = "Do what you Love, Love what you do";
    let author = "Roy T. Bennett";
    if (data) {
      quote = data[0].content;
      author = data[0].author;
    }
    else return {
      quote, author,
    }
    console.log("new quote", `"${quote}"`);

    return {
      quote,
      author,
    };
  } catch (err) {
    console.error(err);
    return {};
  }
};

const generate = async () => {
  const { quote, author } = await getQuote();

  if (!quote) return;

  fs.appendFileSync("README.md", `\n_**${quote}**_\n\n${author}\n`);
};

generate();
