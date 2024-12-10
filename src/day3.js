// (mul\(\d{1,3},\d{1,3}\))

const instructions = [];
module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }

    const regex = /(mul\(\d{1,3},\d{1,3}\))/g;
    const matches = [...line.matchAll(regex)];
    matches.forEach(match => {
      if (match && match.length > 0) {
        instructions.push(match[0]);
      }
    });
  },
  solving: () => {
    let result = 0;
    instructions.forEach(entry => {
      // console.log(entry);
      const regex = /(mul\((\d{1,3}),(\d{1,3})\))/;
      const [_, __, left, right] = entry.match(regex);
      result += parseInt(left) * parseInt(right);
      console.log(`${left} * ${right} = ${result}`);
    });
    console.log(result);
  }
};
