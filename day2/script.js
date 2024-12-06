const Answer1 = document.getElementById("answer1");
const Answer2 = document.getElementById("answer2");
const Part1Sections = document.getElementById("part1Sections");
const Part2Sections = document.getElementById("part2Sections");

const superScript = ["⁰","¹","²","³",'⁴',"⁵","⁶","⁷","⁸","⁹"]

const url = "text.txt"
fetch(url).then(response => response.text()).then(text => {
  run(text)
})

function run(text) {
  let reportsAsString = text.split(/(?:\n|\r)+/);
  // createSection(text, Part1Sections);

  let reports = reportsAsString.map(x => {
    let levelsAsString = x.split(" ");
    let level = levelsAsString.map(Number)
    return level
  })

  let text1 = "";
  let text2 = "";

  let SafeReportsCount = 0;

  reports.forEach(report => {

    let visualReport = ""
    let isReportSafe = true;
    
    let lastLevelDir = 0;

    report.forEach((level, i) => {
      if (i === 0) {
        visualReport += level
        return
      }

      function checkDistance(a, b) {
        let dist = a - b;
        if (dist < 4) return "lightgreen"
        return "pink"
      }

      function setDirection(dir) {
        if (lastLevelDir === 0) {
          lastLevelDir = dir;
          return;
        }
        
        if (dir !== lastLevelDir) {
          isReportSafe = false;
        }
      }

      let prevLevel = report[i - 1];

      let color = "pink";
      let diffChar = " ";
      if (level > prevLevel) {
        setDirection(1);
        color = checkDistance(level, prevLevel);
        diffChar = ">" + superScript[level - prevLevel];
      } else if (level < prevLevel) {
        setDirection(-1);
        color = checkDistance(prevLevel, level);
        diffChar = "<" + superScript[prevLevel - level];
      } else {
        diffChar = "=";
      }

      if (color === "pink") isReportSafe = false;
      visualReport += `<span style="color:${color}">${diffChar}</span>`
      if (isReportSafe === true) {
        visualReport += level;
      } else {
        visualReport += `<span style="color:tomato">${level}</span>`;
      }

    })

    if (isReportSafe) {
      text2 += `<span style="color:lightgreen">Safe!</span>\n`
      SafeReportsCount += 1;
    } else {
      text2 += `<span style="color:tomato">Unsafe!</span>\n`
    }

    text1 += visualReport + "\n";
  })

  createSection(text1, Part1Sections);
  createSection(text2, Part1Sections);

  Answer1.innerText = SafeReportsCount;

  // reports.forEach(_report => {
  //   let stringReport = _report.split(" ");
  //   let report = stringReport.map(Number)
  //   // report.forEach((level, i) => {
  //   //   report[i] = Number(level);
  //   // })

  //   console.log(report);
  // });
  // console.log(text);

  // Answer1.innerText += " " + text;
  // Answer2.innerText += " " + text;
}