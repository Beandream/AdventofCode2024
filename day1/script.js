const Answer1 = document.getElementById("answer1");
const Answer2 = document.getElementById("answer2");
const Part1Sections = document.getElementById("part1Sections");
const Part2Sections = document.getElementById("part2Sections");


const url = "text.txt"
fetch(url).then(response => response.text()).then(text => {
  run(text)
})



function run(text) {
  let left = [];
  let right = [];


  let lines = text.split("\n");
  let text1 = ""
  lines.forEach(line => {
    text1 += line + "\n"
    let numbers = line.split("   ")
    left.push(numbers[0]);
    right.push(numbers[1]);
  })

  createSection(text1, Part1Sections);

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);


  let differences = [];
  let total = 0;
  let text2 = "";
  let text3 = "";
  let text5 = "";
  for (let i = 0; i < left.length; i++) {
    text2 += left[i] + " " + right[i] + "\n";
    text5 += left[i] + "\n";


    let diff = left[i] - right[i];
    total += Math.abs(diff);
    text3 += Math.abs(diff) + "\n";
    differences.push(Math.abs(diff))
  }

  createSection(text2, Part1Sections);
  createSection(text3, Part1Sections);

  Answer1.innerHTML = total;

  createSection(text5, Part2Sections);
  let text4 = "";
  let text6 = "";

  let total2 = 0;
  left.forEach(num => {
    let same = 0;
    right.forEach(num2 => {
      if (num2 === num) {
        same += 1;
      }
    })
    text4 += same + "\n";
    text6 += (same * num) + "\n";
    total2 += same * num;
  })

  createSection(text4, Part2Sections);
  createSection(text6, Part2Sections);

  Answer2.innerHTML = total2;
}
