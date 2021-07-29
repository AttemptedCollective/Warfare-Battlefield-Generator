// Setup
let offset = 50;
let currentTable = "enemy";

let enemyBaseColour = "rgb(219, 58, 52)";
let allyBaseColour = "rgb(8, 76, 97)";
let cavalryColour = "rgb(104, 139, 88)";
let borderColour = "rgb(28, 2, 33)";
let labelColour = "rgb(174, 197, 235)";
let fontColour = "rgb(28, 2, 33)";

let enemyColours;
let midgroundColours;
let allyColours;

let enemyTable;
let midgroundTable;
let allyTable;

// Default Values
function GetTableSchema(defaultData) { 
  return {
    data: defaultData,
    layout:"fitColumns",
    movableRows: true,
    height: "30rem",
    columns:[
      {title:"Label", field:"label", headerSort:false, editor:"select", editorParams:{
        values:["", "Rear", "Reserve", "Center", "Vanguard"],
        defaultValue:""}
      },
      {title:"Column 1", field:"column1", headerSort:false, editor:"select", editorParams:{
        values: ["Empty","Filled"],
        defaultValue:"Filled"}
      },
      {title:"Column 2", field:"column2", headerSort:false, editor:"select", editorParams:{
        values: ["Empty","Filled"],
        defaultValue:"Filled"}
      },
      {title:"Column 3", field:"column3", headerSort:false, editor:"select", editorParams:{
        values: ["Empty","Filled"],
        defaultValue:"Filled"}
      },
      {title:"Column 4", field:"column4", headerSort:false, editor:"select", editorParams:{
        values: ["Empty","Filled"],
        defaultValue:"Filled"}
      },
      {title:"Column 5", field:"column5", headerSort:false, editor:"select", editorParams:{
        values: ["Empty","Filled"],
        defaultValue:"Filled"}
      },
      {formatter:"buttonCross", width:40, align:"center", cellClick:function(e, cell){
        cell.getRow().delete();
      }}
    ],
  };
}

let enemyBattlefieldData = [
  {label:"Center", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Reserve", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Rear", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Vanguard", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
];

let midgroundBattlefieldData = [
  {label:"Vanguard", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Reserve", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Center", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Reserve", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Vanguard", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
]

let allyBattlefieldData = [
  {label:"Vanguard", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Rear", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Reserve", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Center", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
];

// Table Functions
function SetupTables() {
  enemyTable = new Tabulator("#enemy-battlefield-table", GetTableSchema(enemyBattlefieldData));
  midgroundTable = new Tabulator("#midground-battlefield-table", GetTableSchema(midgroundBattlefieldData));
  allyTable = new Tabulator("#ally-battlefield-table", GetTableSchema(allyBattlefieldData));

  document.getElementById("enemy-button").classList.add("active");
  document.getElementById("midground-battlefield").style.display = "none";
  document.getElementById("ally-battlefield").style.display = "none";
  currentTable = enemyTable;
}

function addNewRow(){
  currentTable.addRow({label:"Vanguard", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"});
}

function resetBattlefield(){
  enemyTable = new Tabulator("#enemy-battlefield-table", GetTableSchema(enemyBattlefieldData));
  midgroundTable = new Tabulator("#midground-battlefield-table", GetTableSchema(midgroundBattlefieldData));
  allyTable = new Tabulator("#ally-battlefield-table", GetTableSchema(allyBattlefieldData));
}

// CSS Functions
function openEditor(editorName) {
  let elements = document.getElementsByClassName("tableContainer");

  for (let index = 0; index < elements.length; index++) {
    elements[index].style.display = "none";
  }

  document.getElementById(editorName).style.display = "block";
  document.getElementById("enemy-button").classList.remove("active");
  document.getElementById("midground-button").classList.remove("active");
  document.getElementById("ally-button").classList.remove("active");

  switch (editorName) {
    case "enemy-battlefield":
      currentTable = enemyTable;
      document.getElementById("enemy-button").classList.add("active");
      break;
      
    case "midground-battlefield":
      currentTable = midgroundTable;
      document.getElementById("midground-button").classList.add("active");
      break;
      
    case "ally-battlefield":
      currentTable = allyTable;
      document.getElementById("ally-button").classList.add("active");
      break;
  
    default:
      break;
  }
}

function drawText(x, y, label){
  let text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
  text.setAttributeNS(null, 'x', x);
  text.setAttributeNS(null, 'y', y);
  text.setAttributeNS(null, 'text-anchor', 'right');
  text.innerHTML = label;
  svgArea.appendChild(text);
}

function drawRect(x, y, height, width, colour, svg) {
  let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  rect.setAttributeNS(null, 'x', x);
  rect.setAttributeNS(null, 'y', y);
  rect.setAttributeNS(null, 'height', height);
  rect.setAttributeNS(null, 'width', width);
  rect.setAttributeNS(null, 'fill', colour);
  svg.appendChild(rect);
}

function drawRectWithBorder(x, y, height, width, colour, stroke, strokeWidth, svg) {
  let rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  rect.setAttributeNS(null, 'x', x);
  rect.setAttributeNS(null, 'y', y);
  rect.setAttributeNS(null, 'height', height);
  rect.setAttributeNS(null, 'width', width);
  rect.setAttributeNS(null, 'fill', colour);
  rect.setAttributeNS(null, 'stroke', stroke);
  rect.setAttributeNS(null, 'stroke-width', strokeWidth);
  svg.appendChild(rect);
}

// Battlefield Generation
function generateBattlefield() {
  let enemyData = enemyTable.getData();
  let midgroundData = midgroundTable.getData();
  let allyData = allyTable.getData();

  enemyColours = enemyData.length == 1 ? [enemyBaseColour] : ColorTranslator.getTints(enemyBaseColour, enemyData.length);
  allyColours = ColorTranslator.getTints(allyBaseColour, allyData.length).reverse();
  midgroundColours = allyData.length == 1 ? [allyBaseColour] : ColorTranslator.getBlendRGB(enemyColours[enemyColours.length - 1], allyColours[0], midgroundData.length + 2);  
  midgroundColours.shift();
  midgroundColours.pop();

  let allColours = enemyColours.concat(midgroundColours).concat(allyColours);

  let totalRows = enemyData.length + midgroundData.length + allyData.length;
  let height = (totalRows * offset);
  let width = 20 * offset;

  let svgArea = document.getElementById('svgArea');
  svgArea.innerHTML = '';

  // Draw Background  
  drawRect(0, 0, height + (offset * 2), width + (offset * 2), '#efefef', svgArea);

  // Draw Air and Calvary
  drawRect(offset + (17 * offset), offset, offset * totalRows, 3 * offset, cavalryColour, svgArea);
  
  // Draw Each Row
  for (let row = 0; row < totalRows; row++) {
    // Draw Each Label
    drawRect(offset, offset * (row + 1), offset, offset * 2, labelColour, svgArea);

    // Draw Each Column
    for (let column = 1; column < 6; column++) {
      drawRectWithBorder((offset * 2) + offset + ((3 * offset) * (column - 1)), offset + (row * offset), offset, 3 * offset, allColours[row], borderColour, 0.25, svgArea);
    }

    // Draw A Border Around Each Row
    drawRectWithBorder(offset, offset + (row * offset), offset, 17 * offset, 'none', borderColour, 1, svgArea);
  }

  // Draw The Labels For Each Row
  let currentRow = 0;
  enemyData.forEach(data => {
    drawText(offset + offset * 0.2, offset + (currentRow * offset) + offset * 0.6, data.label);
    currentRow++;
  });

  midgroundData.forEach(data => {
    drawText(offset + offset * 0.2, offset + (currentRow * offset) + offset * 0.6, data.label);
    currentRow++;
  });

  allyData.forEach(data => {
    drawText( offset + offset * 0.2, offset + (currentRow * offset) + offset * 0.6, data.label);
    currentRow++;
  });

  // Draw Label For Air and Calvary
    drawText((17 * offset) + (2.5 * offset) * 0.6, offset + offset * 0.6, "Air & Calvary");

  // Draw Border Around Air and Calvary
      drawRectWithBorder(offset + (17 * offset), offset, offset * totalRows, 3 * offset, 'none', borderColour, 1, svgArea);

  // Draw Border Around Entire Battlefield
  drawRectWithBorder(offset, offset, offset * totalRows, offset * 2, 'none', borderColour, 1, svgArea);
}