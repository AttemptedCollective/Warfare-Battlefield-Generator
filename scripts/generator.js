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
let allColours;

let enemyTable;
let midgroundTable;
let allyTable;

let labelValues = ["", "Rear", "Reserve", "Center", "Vanguard"];
let columnValues = ["Empty", "Filled", "Structure"];

// Default Values
function GetTableSchema(defaultData) { 
  return {
    data: defaultData,
    layout:"fitColumns",
    movableRows: true,
    height: "30rem",
    columns:[
      {title:"Label", field:"label", headerSort:false, editor:"select", editorParams:{
        values:labelValues,
        defaultValue:""}
      },
      {title:"Column 1", field:"column1", headerSort:false, editor:"select", editorParams:{
        values: columnValues,
        defaultValue:columnValues[1]}
      },
      {title:"Column 2", field:"column2", headerSort:false, editor:"select", editorParams:{
        values: columnValues,
        defaultValue:columnValues[1]}
      },
      {title:"Column 3", field:"column3", headerSort:false, editor:"select", editorParams:{
        values: columnValues,
        defaultValue:columnValues[1]}
      },
      {title:"Column 4", field:"column4", headerSort:false, editor:"select", editorParams:{
        values: columnValues,
        defaultValue:columnValues[1]}
      },
      {title:"Column 5", field:"column5", headerSort:false, editor:"select", editorParams:{
        values: columnValues,
        defaultValue:columnValues[1]}
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
function switchWindow() {
  document.getElementsByClassName("tables")[0].classList.toggle("hideWindow");
  document.getElementsByClassName("settings")[0].classList.toggle("hideWindow");
}

function openEditor(editorName) {
  let elements = document.getElementsByClassName("tableContainer");

  for (let index = 0; index < elements.length; index++) {
    elements[index].style.display = "none";
  }

  docment.getElementById(editorName).style.display = "block";
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

function drawRow(data, row) {
  // Draw Each Label
  drawRect(offset, offset * (row + 1), offset, offset * 2, labelColour, svgArea);
  drawText(offset + offset * 0.2, offset + (row * offset) + offset * 0.6, data.label);

  // Draw Each Column
  let columns = getColumns(data);
  for (let column = 0; column < 5; column++) {
    switch (columns[column]) {
      case "Empty":
        drawRectWithBorder((offset * 2) + offset + ((3 * offset) * column), offset + (row * offset), offset, 3 * offset, 'white', borderColour, 0.25, svgArea);
        break;
    
      case "Structure":
        drawRectWithBorder((offset * 2) + offset + ((3 * offset) * column), offset + (row * offset), offset, 3 * offset, 'grey', borderColour, 0.25, svgArea);
        break;

      default:
        drawRectWithBorder((offset * 2) + offset + ((3 * offset) * column), offset + (row * offset), offset, 3 * offset, allColours[row], borderColour, 0.25, svgArea);
        break;
    }
  }

  // Draw A Border Around Each Row
  drawRectWithBorder(offset, offset + (row * offset), offset, 17 * offset, 'none', borderColour, 1, svgArea);
}

function getColumns(data) {
   return [data.column1, data.column2, data.column3, data.column4, data.column5];
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

  allColours = enemyColours.concat(midgroundColours).concat(allyColours);

  let totalRows = enemyData.length + midgroundData.length + allyData.length;
  let height = (totalRows * offset);
  let width = 20 * offset;

  let svgArea = document.getElementById('svgArea');
  svgArea.innerHTML = '';

  // Draw Background  
  drawRect(0, 0, height + (offset * 2), width + (offset * 2), '#efefef', svgArea);

  // Draw Air and Calvary
  drawRect(offset + (17 * offset), offset, offset * totalRows, 3 * offset, cavalryColour, svgArea);

  // Draw The Labels For Each Row
  let currentRow = 0;
  enemyData.forEach(data => {
    drawRow(data, currentRow);
    // drawText(offset + offset * 0.2, offset + (currentRow * offset) + offset * 0.6, data.label);
    currentRow++;
  });

  midgroundData.forEach(data => {
    drawRow(data, currentRow);
    // drawText(offset + offset * 0.2, offset + (currentRow * offset) + offset * 0.6, data.label);
    currentRow++;
  });

  allyData.forEach(data => {
    drawRow(data, currentRow);
    // drawText( offset + offset * 0.2, offset + (currentRow * offset) + offset * 0.6, data.label);
    currentRow++;
  });

  // Draw Label For Air and Calvary
  drawText((17 * offset) + (2.5 * offset) * 0.6, offset + offset * 0.6, "Air & Calvary");

  // Draw Border Around Air and Calvary
  drawRectWithBorder(offset + (17 * offset), offset, offset * totalRows, 3 * offset, 'none', borderColour, 1, svgArea);

  // Draw Border Around Entire Battlefield
  drawRectWithBorder(offset, offset, offset * totalRows, offset * 2, 'none', borderColour, 1, svgArea);
}