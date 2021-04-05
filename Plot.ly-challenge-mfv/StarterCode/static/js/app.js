  // Use the D3 library to read in samples.json.
  d3.json("data/samples.json").then((data) => {
    //  console.log(data);
    //  let x = data.filter(element=> element.metadata[0])
    //  console.log(x)
    //  console.log(data.metadata[0].id);// get demographic info
    //  console.log(data.samples[0].sample_values[0]);
    //  console.log(data.samples[0].otu_ids[0])
    //  console.log(data.samples[0].otu_labels[0])

  
  // Create the ID options for the dropdown menu section

  let dropdown = document.getElementById('selDataset');
  dropdown.length = 0;
    
  let defaultOption = document.createElement('option');
  defaultOption.text = 'Choose a sample';
    
  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  let option;
    for (let i = 0; i < data.metadata.length; i++) {
        option = document.createElement('option');
        option.text =  data.metadata[i].id;
        dropdown.add(option);
        }

 // Display each key-value pair from the metadata JSON object somewhere on the page.
let table = d3.select("#summary-table");
let tbody = table.select("tbody");
let trow;


for (var i = 0; i < data.metadata.length; i++) {

  let id = data.metadata[i].id;
  trow = tbody.append("tr");
  trow.append("td").text(id);

  let age = data.metadata[i].age;;
  trow.append("td").text(age);

  let ethnicity = data.metadata[i].ethnicity;
  trow.append("td").text(ethnicity);

  let gender = data.metadata[i].gender;
  trow.append("td").text(gender);

  let location = data.metadata[i].location;
  trow.append("td").text(location);

  let bbtype = data.metadata[i].bbtype;
  trow.append("td").text(bbtype);

  let wfreq = data.metadata[i].wfreq;
  trow.append("td").text(wfreq);
    
}

  // Display the sample metadata, i.e., an individual's demographic information.
 // Use D3 to create an event handler

  d3.selectAll("body").on("change", updatePage);

  function updatePage() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.selectAll("#selDataset").node();
    // Assign the dropdown menu item ID to a variable
    let dropdownMenuID = data.metadata.filter(element => element.id);
    // Assign the dropdown menu option to a variable
    let selectedOption = dropdownMenu.value;
    // console.log(dropdownMenuID);
    console.log(selectedOption);

    // Display the sample metadata, i.e., an individual's demographic information.
    // Display each key-value pair from the metadata JSON object somewhere on the page.
    for (i in data.metadata){
      
       if (selectedOption == data.metadata[i].id){
        let demographicInfo = d3.selectAll("#sample-metadata").html("");
        Object.entries(data.metadata[i]).forEach(element => {
          demographicInfo.append("h5").text(`${element[0]} :  ${element[1]}`);

            
    
    //BAR CHART 
    // https://plotly.com/javascript/horizontal-bar-charts/
          let x_def1 = data.samples[0].sample_values;
          let y_def1 = data.samples[0].otu_ids;
          let label = data.samples[0].otuLabels;
          let trace1 = {
            x:x_def1,
            y:y_def1,
            text:label,
            type:"bar",
            orientation:"h",
            marker: {
              color: 'rgb(22, 122, 156)'},
              width: [0.8, 0.8, 0.8, 0.8, 0.8,0.8, 0.8, 0.8 ]
          }
          var layout = { title: '<b>Top 10 OTUs by Individual</b>',
            font:{ family: 'sans-serif'
            
            }}
          defautData1 = [trace1]
          Plotly.newPlot("bar",defautData1,layout)

          if (selectedOption == data.samples[i].id){
            let x_axis = data.samples[i].sample_values;
            let y_axis = data.samples[i].otu_ids;
            let label1 = data.samples[i].otuLabels;
            x_axis = x_axis.slice(0,10).reverse()
            y_axis =  y_axis.slice(0,10).reverse()
            y_axis =  y_axis.map(element=> '<b>OTU_</b>' + element);
            
            // Plotly.newPlot("bar",data)
            Plotly.restyle("bar", "x", [x_axis]);
            Plotly.restyle("bar", "y", [y_axis]);
            Plotly.restyle("bar", "text", [label1]);
          }
        });

      //BUBBLE CHART 
      // https://plotly.com/javascript/bubble-charts/
          let x_def2 = data.samples[0].otu_ids;
          let y_def2 = data.samples[0].sample_values;
          let markerSize = data.samples[0].sample_values;
          let markerColor = data.samples[0].otu_ids;
          let textValue = data.samples[0].otuLabels;
          let trace2 = {
            x:x_def2,
            y:y_def2,
            text:textValue,
            mode: 'markers',
             marker: { size: markerSize,
              color: markerColor
            }}
          
            let layout3 = {
              xaxis: {
                title: {
                  text: '<b>OTU ID</b>',
                  font: {
                    family: 'sans-serif',
                    size: 16,
                    color: '#7f7f7f'
                  }
                },
              },
            }
          
          defautData2 = [trace2]
          Plotly.newPlot("bubble",defautData2, layout3)

          if (selectedOption == data.samples[i].id){
          let x_axis2 = data.samples[i].otu_ids;
          let y_axis2 = data.samples[i].sample_values;
          let markerSize2 = data.samples[i].sample_values;
          let markerColor2 = data.samples[i].otu_ids;
          let textValue2 = data.samples[i].otuLabels;

            // Plotly.newPlot("bar",data)
            Plotly.restyle("bubble", "x", [x_axis2]);
            Plotly.restyle("bubble", "y", [y_axis2]);
            Plotly.restyle("bubble", "text", [textValue2]);
            Plotly.restyle("bubble", "size", [markerSize2]);
            Plotly.restyle("bubble", "color", [markerColor2]);
          }

          // Gauge Chart 
          // https://plotly.com/javascript/gauge-charts/
          // https://github.com/plotly/documentation/issues/1411

              let wfreq = data.metadata[0].wfreq;
              var data3 = [
                {
                  domain: { x: [0.0, 4], y: [0, 1] },
                  value: wfreq,
                  title: { text: "<b>Belly Button Washing Frequency</b>" },
                  type: "indicator",
                  mode: "gauge+number+delta",
                  delta: { reference: 9 },
                  text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6","6-7","7-8","8-9"],
                  // textinfo: "text",
                  textposition: "inside",
                  // showlegend: false,
                  gauge: {
                    axis: { range: [0, 9] },
                    bar: { color: "white" },
                    // bar: { color: "#167A9C" },
                    steps: [
                      { range: [0, 1], color: "#f43021"},
                      { range: [1, 2], color: "#fc6114" },
                      { range: [2, 3], color: "#ff8c00" },
                      { range: [3, 4], color: "#ffad00"},
                      { range: [4, 5], color: "#edbd02" },
                      { range: [5, 6], color: "#38A37C" },
                      { range: [6, 7], color: "#3B8975" },
                      { range: [7, 8], color: "#3B8289" },
                      { range: [8, 9], color: "#3B5B89" },
                    ],
                    threshold: {
                      line: { color: "#3B5B89", width: 4 },
                      // thickness: 0.75,
                      value:9
                    }
                  }
                }
              ];
              
          
          var layout = { width: 600, height: 500, margin: { t: 0, b: 0 },
       
        };
          Plotly.newPlot('gauge', data3, layout);

          if (selectedOption == data.samples[i].id){
          let wfreq2 = data.metadata[i].wfreq;

            Plotly.restyle("gauge", "value", [wfreq2]);
         
          }

        }}}});

        
     