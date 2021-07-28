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
  {label:"Vanguard", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Rear", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Reserve", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Center", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
];

let midgroundBattlefieldData = [
  {label:"Vanguard", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Reserve", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Center", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Reserve", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Vanguard", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
]

let allyBattlefieldData = [
  {label:"Center", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Reserve", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Rear", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Vanguard", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
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

// Battlefield Generation
function generateBattlefield() {
  let enemyData = enemyTable.getData();  
  let midgroundData = midgroundTable.getData();
  let allyData = allyTable.getData();

  enemyColours = ColorTranslator.getTints(enemyBaseColour, enemyData.length);  
  allyColours = ColorTranslator.getTints(allyBaseColour, allyData.length).reverse();
  midgroundColours = ColorTranslator.getBlendRGB(enemyColours[enemyColours.length - 1], allyColours[0], midgroundData.length + 2);  
  midgroundColours.shift();
  midgroundColours.pop();

  let allColours = enemyColours.concat(midgroundColours).concat(allyColours);

  let totalRows = enemyData.length + midgroundData.length + allyData.length;
  let height = totalRows * (2 * offset);
  let width = 20 * offset;

  let svgArea = document.getElementById('svgArea');
  svgArea.innerHTML = '';
  
  let background = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  background.setAttributeNS(null, 'x', 0);
  background.setAttributeNS(null, 'y', 0);
  background.setAttributeNS(null, 'height', height + (offset * 2));
  background.setAttributeNS(null, 'width', width + (offset * 2));
  background.setAttributeNS(null, 'fill','#efefef');
  svgArea.appendChild(background);
  
  //Draw Each Row
  for (let row = 0; row < totalRows; row++) {
    // Draw Each Label
    let labelSquare = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    labelSquare.setAttributeNS(null, 'x', offset);
    labelSquare.setAttributeNS(null, 'y', offset + (row * offset));
    labelSquare.setAttributeNS(null, 'height', offset);
    labelSquare.setAttributeNS(null, 'width', offset * 2);
    labelSquare.setAttributeNS(null, 'fill', labelColour);
    svgArea.appendChild(labelSquare);

    let labelText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    labelText.setAttributeNS(null, 'x', offset + offset*0.6);
    labelText.setAttributeNS(null, 'y', offset + (row * offset) + offset*0.6);
    labelText.setAttributeNS(null, 'text-anchor', 'right');
    labelText.innerHTML = "Test";
    svgArea.appendChild(labelText);
    
    // Draw Each Column
    for (let column = 1; column < 6; column++) {
      var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
      rect.setAttributeNS(null, 'x', (offset * 2) + offset + ((3 * offset) * (column - 1)));
      rect.setAttributeNS(null, 'y', offset + (row * offset));
      rect.setAttributeNS(null, 'height', offset);
      rect.setAttributeNS(null, 'width', 3 * offset);
      rect.setAttributeNS(null, 'fill', allColours[row]);
      rect.setAttributeNS(null, 'stroke', borderColour);
      rect.setAttributeNS(null, 'stroke-width', 0.25);
      svgArea.appendChild(rect); 
    }

    // Draw A Border Around Each Row
    let border = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    border.setAttributeNS(null, 'x', offset);
    border.setAttributeNS(null, 'y', offset + (row * offset));
    border.setAttributeNS(null, 'height', offset);
    border.setAttributeNS(null, 'width', 17 * offset);
    border.setAttributeNS(null, 'fill', 'none');
    border.setAttributeNS(null, 'stroke', borderColour);
    border.setAttributeNS(null, 'stroke-width', 1);
    svgArea.appendChild(border); 
  }

  // Draw Border Around Entire Battlefield
  let border = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  border.setAttributeNS(null, 'x', offset);
  border.setAttributeNS(null, 'y', offset);
  border.setAttributeNS(null, 'height', offset * totalRows);
  border.setAttributeNS(null, 'width', offset * 2);
  border.setAttributeNS(null, 'fill', 'none');
  border.setAttributeNS(null, 'stroke', borderColour);
  border.setAttributeNS(null, 'stroke-width', 1);
  svgArea.appendChild(border); 

  // Draw Air and Calvary
  var airAndCalvarySquare = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  airAndCalvarySquare.setAttributeNS(null, 'x', offset + (17 * offset));
  airAndCalvarySquare.setAttributeNS(null, 'y', offset);
  airAndCalvarySquare.setAttributeNS(null, 'height', offset * totalRows);
  airAndCalvarySquare.setAttributeNS(null, 'width', 3 * offset);
  airAndCalvarySquare.setAttributeNS(null, 'fill', cavalryColour);
  svgArea.appendChild(airAndCalvarySquare);

  // Draw Label For Air and Calvary
  let calvaryLabelText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
  calvaryLabelText.setAttributeNS(null, 'x', (17*offset) + (2.5*offset)*0.6);
  calvaryLabelText.setAttributeNS(null, 'y', offset + offset*0.6);
  calvaryLabelText.setAttributeNS(null, 'text-anchor', 'right');
  calvaryLabelText.innerHTML = "Air & Calvary";
  svgArea.appendChild(calvaryLabelText);

  // Draw Border Around Air and Calvary
  let cavalryBorder = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  cavalryBorder.setAttributeNS(null, 'x', offset + (17 * offset));
  cavalryBorder.setAttributeNS(null, 'y', offset);
  cavalryBorder.setAttributeNS(null, 'height', offset * totalRows);
  cavalryBorder.setAttributeNS(null, 'width', 3 * offset);
  cavalryBorder.setAttributeNS(null, 'fill', 'none');
  cavalryBorder.setAttributeNS(null, 'stroke', borderColour);
  cavalryBorder.setAttributeNS(null, 'stroke-width', 1);
  svgArea.appendChild(cavalryBorder); 
}