const leftList = [];
const rightList = new Map();
module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    const [left, right] = line.split('  ').map(n => parseInt(n));

    leftList.push(left);
    if(rightList.has(right)) {
      const count = rightList.get(right);
      rightList.set(right, count + 1);
    } else {
      rightList.set(right, 1);
    }
  },
  solving: () => {
    let similarityScore = 0;
    leftList.forEach(left => {
      if (rightList.has(left)) {
        const count = rightList.get(left);
        similarityScore += left * count;
      }
    });

    console.log(similarityScore);
  }
};
