$(function(){
  // Accordion configuration
  $("#accordion").wijaccordion({
    header: "h2",
    expandDirection: "bottom",
    event: "click"
  });
  $('#calendar').wijcalendar();
  $('#checkbox').wijcheckbox();
  $('#combo').wijcombobox();
  $('#dialog').wijdialog({ autoOpen: false });
  $('#dropdowncb').multiselect();
  $('#evtcal').wijevcal();
  $('#expander').wijexpander({ expanded: false});
  $('#expander2').wijexpander({ expanded: false});
  $('#expander3').wijexpander({ expanded: false});
  $('#dtpicker').wijinputdate({ dateFormat: 'd' });
  $('#numinput').wijinputnumber({ decimalPlaces: 2, showSpinner: true });
  $("#txtinput").wijinputtext({
    format: "a",
    pickers: {
      list: [
          { label: 'red', value: "red" },
          { label: 'green', value: "green" },
          { label: 'blue', value: "blue" },
          { label: 'yellow', value: "yellow" }
      ]
    },
    showDropDownButton: true
  });
  $("#gauge").wijlineargauge({
    height: 37,
    width: 400,
    value: 25,
    max: 100,
    min: 0,
    xAxisLocation: 0.01,
    xAxisLength: 1.0,
    orientation: "horizontal",
    animation: {
      enabled: true,
      duration: 400,
      easing: ">"
    },
    labels: {
      visible: false
    },
    tickMajor: {
      visible: false
    },
    tickMinor: {
      visible: false
    },
    pointer: {
      shape: "tri",
      length: 1.2,
      style: {
        fill: "#444",
        stroke: "#000"
      }
    },
    face: {
      style: {
        fill: "none",
        stroke: "none"
      }
    },
    ranges: [{
      startWidth: 0.05,
      endWidth: 0.1,
      startValue: 0,
      endValue: 10,
      startDistance: 0.8,
      endDistance: 0.8,
      style: {
        fill: "90-rgb(214,224,230)-rgb(210,220,226)",
        stroke: "#f1f1f1",
        "stroke-width": 0.5
      }
    }, {
      startWidth: 0.10,
      endWidth: 0.2,
      startValue: 10,
      endValue: 20,
      startDistance: 0.8,
      endDistance: 0.8,
      style: {
        fill: "90-rgb(206,216,222)-rgb(202,212,218)",
        stroke: "#f1f1f1",
        "stroke-width": 0.5
      }
    }, {
      startWidth: 0.2,
      endWidth: 0.3,
      startValue: 20,
      endValue: 30,
      startDistance: 0.8,
      endDistance: 0.8,
      style: {
        fill: "90-rgb(198,208,214)-rgb(194,204,210)",
        stroke: "#f1f1f1",
        "stroke-width": 0.5
      }
    }, {
      startWidth: 0.3,
      endWidth: 0.4,
      startValue: 30,
      endValue: 40,
      startDistance: 0.8,
      endDistance: 0.8,
      style: {
        fill: "90-rgb(190,200,206)-rgb(186,196,202)",
        stroke: "#f1f1f1",
        "stroke-width": 0.5
      }
    }, {
      startWidth: 0.4,
      endWidth: 0.5,
      startValue: 40,
      endValue: 50,
      startDistance: 0.8,
      endDistance: 0.8,
      style: {
        fill: "90-rgb(182,192,198)-rgb(178,188,194)",
        stroke: "#f1f1f1",
        "stroke-width": 0.5
      }
    }, {
      startWidth: 0.5,
      endWidth: 0.6,
      startValue: 50,
      endValue: 60,
      startDistance: 0.8,
      endDistance: 0.8,
      style: {
        fill: "90-rgb(174,184,190)-rgb(170,180,186)",
        stroke: "#f1f1f1",
        "stroke-width": 0.5
      }
    }, {
      startWidth: 0.6,
      endWidth: 0.7,
      startValue: 60,
      endValue: 70,
      startDistance: 0.8,
      endDistance: 0.8,
      style: {
        fill: "90-rgb(166,176,182)-rgb(162,172,178)",
        stroke: "#f1f1f1",
        "stroke-width": 0.5
      }
    }, {
      startWidth: 0.7,
      endWidth: 0.8,
      startValue: 70,
      endValue: 80,
      startDistance: 0.8,
      endDistance: 0.8,
      style: {
        fill: "90-rgb(158,168,174)-rgb(154,164,170)",
        stroke: "#f1f1f1",
        "stroke-width": 0.5
      }
    }, {
      startWidth: 0.8,
      endWidth: 0.9,
      startValue: 80,
      endValue: 90,
      startDistance: 0.8,
      endDistance: 0.8,
      style: {
        fill: "90-rgb(9,165,216)-rgb(25,163,208)",
        stroke: "#f1f1f1",
        "stroke-width": 0.5
      }
    }, {
      startWidth: 0.9,
      endWidth: 1,
      startValue: 90,
      endValue: 100,
      startDistance: 0.8,
      endDistance: 0.8,
      style: {
        fill: "90-rgb(24,145,201)-rgb(23,137,190)",
        stroke: "#f1f1f1",
        "stroke-width": 0.5
      }
    }]
  });
  $("#slider").slider({
    value: $("#gauge").wijlineargauge("option", "value"),
    change: function (event, ui) {
      $("#gauge").wijlineargauge("option", "value", ui.value);
    }
  });
  $('#list').wijlist({ selectionMode: 'multiple', listItems: [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }, { label: 'Option 3', value: '3' }] });
  $("#hProgBar").wijprogressbar({ value: 75    });
  //$('#vProgBar').wijprogressbar({ value: 50, fillDirection: 'north' });
  $('#rating').wijrating();
  $("#hslider").wijslider({ orientation: "horizontal", range: false, dragFill: true, min: 0, max: 10, step: 1, values: [9] });
  $("#rangeslider").wijslider({ orientation: "horizontal", range: true, dragFill: true, min: 0, max: 10, step: 1, values: [0] });
  $('#tabs').wijtabs();
  $("#tooltip>a").wijtooltip();
  $("#closeBehavior").change(function () {
    $("#tooltip>a").wijtooltip("option", "closeBehavior", this.value);
  });
  $("#tree").wijtree({
    showCheckBoxes: true,
    //Allows the node content tobe edited. 
    allowEdit: true
  });
  $('#vid1').wijvideo({ showControlsOnHover: true });
});