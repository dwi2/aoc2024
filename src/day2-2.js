const reports = [];

const countUnsafety = (report) => {
  let unsafety = 0;
  let prevDiff = undefined;
  report.forEach((level, i) => {
    if (i === level.length - 1) {
      // check what?
    } else {
      const diff = level - report[i + 1];
      const absDiff = Math.abs(diff);
      if (absDiff < 1 || absDiff > 3) {
        unsafety += 1;
      }
      if (prevDiff !== undefined && diff * prevDiff <= 0) {
        unsafety += 1;
      }
      prevDiff = diff;
    }
  });
  return unsafety;
};

module.exports = {
  reading: (line) => {
    if (line.length === 0) {
      return;
    }
    const report = line.split(' ').map(n => parseInt(n));
    reports.push(report);
  },
  solving: () => {
    let numberOfSafeReports = 0;
    let numberOfSafeReportsWithProblemDampener = 0;
    reports.forEach(report => {
      const unsafety = countUnsafety(report);

      if (unsafety < 1) {
        numberOfSafeReports += 1;
        numberOfSafeReportsWithProblemDampener += 1;
      } else {
        // another try
        for (let i = 0; i < report.length; i += 1) {
          const unsafetyWithProblemDampener = countUnsafety(report.toSpliced(i, 1));
          if (unsafetyWithProblemDampener < 1) {
            numberOfSafeReportsWithProblemDampener += 1;
            break;
          }
        }
      }
    });

    console.log(numberOfSafeReports);
    console.log(numberOfSafeReportsWithProblemDampener);
  }
};
