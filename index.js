import { readFileSync, writeFileSync } from "fs";
import { urlSVG } from "./src/urls-svg-map.js";

const data = readFileSync("readme.md", {
  encoding: "utf-8",
}).split("\n");

const regex = /\[.+\]\(.+\)/;
const regexImg = /\!\[.+\]\(.+\)/;

const arr = [];
// const arr2 = [];

const dataNew = data.map((el) => {
  if (!regex.test(el)) return el;
  if (regexImg.test(el)) return el;

  const url = el?.match(regex)[0];

  const text = url
    .slice(0, url.indexOf("]("))
    .slice(1, url.indexOf(")"))
    .replaceAll("`", "");

  const temp = url.slice(url.indexOf("](") + 2);

  const newUrl = temp.slice(0, temp.indexOf(")"));

  if (arr.includes(newUrl)) {
    // arr2.push(newUrl);
    return "";
  }

  arr.push(newUrl);

  return el.replace(
    url,
    `<img src="${urlSVG.get(
      newUrl
    )}" width="15" height="15" alt="${text}" /> ` + url
  );
});

writeFileSync("README.md", dataNew.join("\n"), {
  encoding: "utf-8",
});
