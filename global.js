function createSection(text, element) {
  let section = document.createElement("div");
  section.innerHTML = text;
  section.className = "cardSection";
  element.appendChild(section);
  return section;
}