function parseInvalidText(inputText) {
  let parsed = inputText;

  // multiple punctions
  const multiPunSyms = ["!", "?"];
  multiPunSyms.forEach((sym) => {
    const regex = new RegExp(`\\${sym}+`, "g");
    parsed = parsed.replace(regex, sym);
  });

  parsed = parsed.replace(/(\!\?)+/g, "!?");
  parsed = parsed.replace(/(\?\!)+/g, "?!");
  parsed = parsed.replace(/(\!\?\!)+/g, "!?");
  parsed = parsed.replace(/(\?\!\?)+/g, "?!");

  // space after
  const spaceAfterPunSyms = [",", ".", "!", "?", ":"];
  spaceAfterPunSyms.forEach((sym) => {
    const regex = new RegExp(`\\${sym}[a-zA-Z]`, "g");
    parsed = parsed.replace(regex, (match) => {
      // console.log(`"${match}"`);
      return `${match[0]} ${match[match.length - 1]}`;
    });
  });

  // space before
  const spaceBeforePunSyms = ["("];
  spaceBeforePunSyms.forEach((sym) => {
    const regex = new RegExp(`[a-zA-Z]\\${sym}`, "g");
    parsed = parsed.replace(regex, (match) => {
      // console.log(`"${match}"`);
      return `${match[0]} ${match[match.length - 1]}`;
    });
  });

  // space before ""
  parsed = parsed.replace(/[a-zA-Z]\".*\"/g, (match) => {
    // console.log(`"${match}"`);
    return `${match[0]} ${match.slice(1)}`;
  });

  // Sentence first letter capital
  parsed = parsed.replace(/[\.\!\?] [a-z]/g, (match) => {
    // console.log(`"${match}"`);
    const lastI = match.length - 1;
    return `${match.slice(0, lastI - 1)} ${match[lastI].toLocaleUpperCase()}`;
  });

  return parsed;
}

if (typeof window === "undefined") {
  const inputText =
    "AHOJ!!!??!!!rANDOM textik(Lebo preCO pouzivt medzeri)?!Este si skusme,ciarky a bodky.Tie su tiez dolezite!!!!!";

  console.log("INPUT");
  console.log(inputText);
  console.log("");
  console.log("FINAL");
  console.log(parseInvalidText(inputText));
  console.log("");

  module.exports = parseInvalidText;
}
