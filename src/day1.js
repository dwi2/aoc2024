const leftList = [];
const rightList = [];
module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    const [left, right] = line.split('  ');
    leftList.push(parseInt(left));
    rightList.push(parseInt(right));
  },
  solving: () => {
    leftList.sort();
    rightList.sort();

    let totalDistance = 0;
    for(let i = 0; i < leftList.length; i += 1) {
      totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    console.log(totalDistance);
  }
};
