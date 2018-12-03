/* 
// WRITE YOUR JAVASCRIPT BELOW THIS COMMENT 

Your name : 
Date :  
Contact information : 

What does this script do ? 
...

*/

// Your scripting goes here...

function inlineData (idContent, idTable, idGraph, data){
    //création de la div pour le graphique
    let divGraphique = document.createElement('div');
    let content = document.getElementById(`${idContent}`);
    let table = document.getElementById(`${idTable}`);
    content.insertBefore(divGraphique,table);
    divGraphique.setAttribute('id', `${idGraph}`);

    //récupération des données
    let tbody = table.getElementsByTagName('tbody');
    let tr = tbody[0].getElementsByTagName('tr');
    
    for(let i=1; i<tr.length; i++){
        let pays = [];
        let th = tr[i].getElementsByTagName('th');
        let div = th[0].getElementsByTagName('div');
        let number = div[0].innerHTML;
        pays.push(number);
        let td = tr[i].getElementsByTagName('td');
        for(let y=0; y<td.length; y++){
            let content = td[y].innerHTML;
            pays.push(content);
        }
        data.push(pays);
    }
}
//first data table
let firstDataTab=[];
inlineData("mw-content-text","table1","divTable1", firstDataTab);

//second data table
let secondDataTab=[];
inlineData("mw-content-text","table2","divTable2", secondDataTab);

//draw dimple
let drawDimple = (x, y, series, chart) => {
    chart.addCategoryAxis("x", x);
    chart.addMeasureAxis("y", y);
    chart.addSeries(series, dimple.plot.line);
    chart.addLegend(60, 10, 500, 120, "right");
    chart.setBounds('20px', "150px", "80%", "70%"); 
    chart.draw();   
}

//create first dimple
let svg1 = dimple.newSvg("#divTable1", 640, 600);
let dataFirstDimple = [];
for (i=0;i<firstDataTab.length;i++){
    for (let y=2002;y<2013;y++){
        let dataDetail = {"Année":y, "Infractions":firstDataTab[i][y-2000], "Pays":firstDataTab[i][1]};
        if(dataDetail.Infractions != ':'){
            dataFirstDimple.push(dataDetail);
        }
    }
}
let chart1 = new dimple.chart(svg1, dataFirstDimple);
drawDimple("Année", "Infractions", "Pays", chart1);

//create second dimple
let svg2 = dimple.newSvg("#divTable2", 640, 600);
let dataSecondDimple = [];
for (i=0;i<secondDataTab.length;i++){
    for (let y=2;y<4;y++){
        let dataDetail = {"Année":y, "Population":secondDataTab[i][y], "Pays":secondDataTab[i][1]};
        if(dataDetail.Année == 2){
            dataDetail.Année = "2007-09";
        }else if (dataDetail.Année == 3){
            dataDetail.Année = "2010-12";
        }
        dataSecondDimple.push(dataDetail);
    }
}
let chart2 = new dimple.chart(svg2, dataSecondDimple);
drawDimple("Année", "Population", "Pays", chart2);