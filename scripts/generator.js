let currentTable = "enemy";
let enemyTable;
let midgroundTable;
let allyTable;

function GetTableSchema(defaultData) { 
  return {
    data: defaultData,
    layout:"fitColumns",
    movableRows: true,
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

let defaultEnemyBattlefieldData = [
  {label:"Vanguard", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Rear", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Reserve", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
  {label:"Center", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"},
];

function SetupTables() {
  enemyTable = new Tabulator("#enemy-battlefield-table", GetTableSchema(defaultEnemyBattlefieldData));
  midgroundTable = new Tabulator("#midground-battlefield-table", GetTableSchema(defaultEnemyBattlefieldData));
  allyTable = new Tabulator("#ally-battlefield-table", GetTableSchema(defaultEnemyBattlefieldData));

  currentTable = enemyTable;
}

function addNewRow(){
  currentTable.addRow({label:"Vanguard", column1:"Filled", column2:"Filled", column3:"Filled", column4:"Filled", column5:"Filled"});
  console.log(currentTable.getData())
}

function updateBattlefield(){
  console.log(table.getData())
}

function resetBattlefield(){
  enemyTable = new Tabulator("#enemy-battlefield-table", GetTableSchema(defaultEnemyBattlefieldData));
  midgroundTable = new Tabulator("#midground-battlefield-table", GetTableSchema(defaultEnemyBattlefieldData));
  allyTable = new Tabulator("#ally-battlefield-table", GetTableSchema(defaultEnemyBattlefieldData));
}

function openEditor(editorName) {
  let elements = document.getElementsByClassName("tableContainer");

  for (let index = 0; index < elements.length; index++) {
    elements[index].style.display = "none";;
  }

  document.getElementById(editorName).style.display = "block";

  switch (editorName) {
    case "enemy-battlefield":
      currentTable = enemyTable;
      break;
      
    case "midground-battlefield":
      currentTable = midgroundTable;
      break;
      
    case "ally-battlefield":
      currentTable = allyTable;
      break;
  
    default:
      break;
  }
}