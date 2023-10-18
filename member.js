function skillsMember() {
    var skill = document.getElementById("skill").value;
    var skillList = document.getElementById("skillList");
    var skillItem = document.createElement("li");
    var skillText = document.createTextNode(skill);
    skillItem.appendChild(skillText);
    skillList.appendChild(skillItem);
    document.getElementById("skill").value = "";
}