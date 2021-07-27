let currentTable = "enemy";
let enemyTable;
let midgroundTable;
let allyTable;


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