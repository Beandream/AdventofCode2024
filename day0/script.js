const Answer1 = document.getElementById("answer1");
const Answer2 = document.getElementById("answer2");
const Part1Sections = document.getElementById("part1Sections");
const Part2Sections = document.getElementById("part2Sections");


const url = "text.txt"
fetch(url).then(response => response.text()).then(text => {
  run(text)
})

function run(text) {
  console.log(text);
  createSection(text, Part1Sections);
  Answer1.innerText += " " + text;
  Answer2.innerText += " " + text;
}