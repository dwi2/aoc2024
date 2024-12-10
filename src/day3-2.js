// (mul\(\d{1,3},\d{1,3}\))

const instructions = [];
const enables = [];

let result = 0;
module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }

    const regex = /(mul\(\d{1,3},\d{1,3}\))/g;
    const matches = [...line.matchAll(regex)];
    matches.forEach((match) => {
      if (match && match.length > 0) {
        instructions.push({
          index: match.index,
          value: match[0],
        });
      }
    });

    const enableRegex = /(don't\(\)|do\(\))/g;
    const enableMatches = [...line.matchAll(enableRegex)];
    enableMatches.forEach((m) => {
      if (m && m.length > 0) {
        enables.push({
          index: m.index,
          value: m[0],
        });
      }
    });
  },
  solving: () => {

    const disableRegions = [];
    let start = -1;
    let end = -1;
    enables.forEach((entry) => {
      if (entry.value === "don't()") {
        end = -1;
        start = entry.index;
      } else if (entry.value === "do()") {
        if (start > -1 && end === -1) {
          end = entry.index;
          disableRegions.push([start, end]);
          start = end = -1;
        }
      }
    });
    console.log(disableRegions);
    instructions.forEach((entry) => {
      // console.log(entry);
      const regex = /(mul\((\d{1,3}),(\d{1,3})\))/;
      const [_, __, left, right] = entry.value.match(regex);
      for (let i = 0; i < disableRegions.length; i += 1) {
        const region = disableRegions[i];
        if (entry.index >= region[0] && entry.index <= region[1]) {
          console.log(`DISABLE! (${entry.index}): ${left} * ${right}`);
          return;
        }
      }
      const mul = parseInt(left) * parseInt(right);
      result += mul;
      console.log(`(${entry.index}): ${left} * ${right} = ${mul}`);
    });
    console.log(result);
  },
};
