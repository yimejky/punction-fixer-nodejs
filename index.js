function parseInvalidText(inputText) {
  let parsed = inputText;

  // remove multiple spaces
  parsed = parsed.replace(/ +/g, " ");

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
    const regex = new RegExp(`\\${sym}[a-zA-Z0-9]`, "g");
    parsed = parsed.replace(regex, (match) => {
      // console.log(`"${match}"`);
      return `${match[0]} ${match[match.length - 1]}`;
    });
  });

  // remove additional space
  spaceAfterPunSyms.forEach((sym) => {
    const regex = new RegExp(`[a-zA-Z0-9._] \\${sym}`, "g");
    parsed = parsed.replace(regex, (match) => {
      // console.log(`"${match}"`);
      return `${match[0]}${match[match.length - 1]}`;
    });
  });

  // space before
  const spaceBeforePunSyms = ["("];
  spaceBeforePunSyms.forEach((sym) => {
    const regex = new RegExp(`[a-zA-Z0-9._]\\${sym}`, "g");
    parsed = parsed.replace(regex, (match) => {
      // console.log(`"${match}"`);
      return `${match[0]} ${match[match.length - 1]}`;
    });
  });

  // space before ""
  parsed = parsed.replace(/[a-zA-Z0-9._]\".*\"/g, (match) => {
    // console.log(`"${match}"`);
    return `${match[0]} ${match.slice(1)}`;
  });

  // space and punction after ""
  parsed = parsed.replace(/\"[a-zA-Z0-9 ]*\" [,.!]/g, (match) => {
    // console.log(`"${match}"`);
    return `${match.slice(0, match.length - 2)}${match[match.length - 1]}`;
  });

  // bracket ending
  parsed = parsed.replace(/\([a-zA-Z0-9._ ]*\)[a-zA-Z]/g, (match) => {
    // console.log(`"${match}"`);
    const lastI = match.length - 1;
    return `${match.slice(0, lastI)} ${match[lastI]}`;
  });

  // multiple dots
  parsed = parsed.replace(/\.{4,}/g, "...");

  // sentence first letter capital
  parsed = parsed.replace(/[!?] [a-z]/g, (match) => {
    //console.log(`"${match}"`);
    const lastI = match.length - 1;
    return `${match.slice(0, lastI - 1)} ${match[lastI].toLocaleUpperCase()}`;
  });

  // sentence preventing multiple dot
  parsed = parsed.replace(/\.+ [a-z]/g, (match) => {
    if (match.search(/\.{2,} [a-z]/g) > -1) {
      // console.error("invalid", match);
      return match;
    }
    //console.log(`"${match}"`);
    const lastI = match.length - 1;
    return `${match.slice(0, lastI - 1)} ${match[lastI].toLocaleUpperCase()}`;
  });

  return parsed;
}

if (typeof window === "undefined") {
  // const inputText =
  //  'AHOJ!!!??!!!rANDOM textik(Lebo preCO pouzivt medzeri)?!Este si skusme,ciarky a bodky.Tie su tiez dolezite!!!!! Este si skusme medzeri    navyse   :    lebo aj to treba riesit , zjavne   . Aj "UVODZOVKY" , treba skusit  . dalej som zabudol na ........ viete bodky agian.Zatvorky(taketo)su tiez nieco co treba riesit!!!';
  const inputText =
    'Pan kolega Miro,mate na to nejake dokazy?Pretoze s vami absolutne nesuhlasim a odmietam taketo tvrdenia. A pochvalili ste sa vy ako ste ziskavali podpisy na peticiu proti dekanovi od studentov okrem ineho? A je velmi kratkozrake "nebrat tuto vyzvu vazne" , tymto tvrdenim ste vlastne ukazali totalny egocentrizmus a presvedcenie o vlastnej dokonalosti a neomylnosti.';

  console.log("INPUT");
  console.log(inputText);
  console.log("");
  console.log("FINAL");
  console.log(parseInvalidText(inputText));
  console.log("");

  module.exports = parseInvalidText;
}
