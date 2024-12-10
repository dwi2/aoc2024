const allDiffs = [];
module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    const report = line.split(' ').map(n => parseInt(n));
    const diffs = [];
    report.forEach((n, i) => {
      if (i < report.length - 1) {
        diffs.push(n - report[i + 1]);
      }
    });
    allDiffs.push(diffs);
  },
  solving: () => {
    let numberOfSafeReports = 0;
    allDiffs.forEach((diffs, i) => {
      let direction = diffs[0];
      let safe = true;
      diffs.forEach(d => {
        const abs = Math.abs(d);
        if (abs < 1 || abs > 3) {
          safe = false;
        }
        if (direction * d <= 0) {
          safe = false;
        }
      });

      if (safe) {
        // console.log(i, diffs);
        numberOfSafeReports += 1;
      }
    });
    console.log(numberOfSafeReports);
  }
};
