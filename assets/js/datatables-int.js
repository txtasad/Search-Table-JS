/**
 * this table data and json related file
 * * */

var mjsondata;
var mstatus = [];
var mclient = [];

const filterGlobal = (cval) => {
  console.log("filter", cval);
  $("#dataTable")
    .DataTable()
    .search(
      cval,
      $("#global_regex").prop("checked"),
      $("#global_smart").prop("checked")
    )
    .draw();
};

const filterColumn = (cval) => {
  $("#dataTable")
    .DataTable()
    .column(cval.key)
    .search(
      cval.val,
      $("#col" + i + "_regex").prop("checked"),
      $("#col" + i + "_smart").prop("checked")
    )
    .draw();
};

$(() => {
  // Fetching API or JSON File Data
  console.log("json file reading...");
  $.getJSON("apidata.json", (data) => {
    var invoicedata = "";
    mjsondata = data.data;
    $.each(data, (key, value) => {
      mclient.push(value.client);
      mstatus.push(value.status);
      // DATA FROM JSON OBJECT
      // invoicedata += "<tr>";
      // invoicedata += "<td>" + value.inv + "</td>";
      // invoicedata += "<td>" + value.client + "</td>";
      // invoicedata += "<td>" + value.date + "</td>";
      // invoicedata += "<td>" + value.duedate + "</td>";
      // invoicedata += "<td>" + value.total + "</td>";
      // invoicedata += "<td>" + value.balance + "</td>";
      // invoicedata += "<td>" + value.status + "</td>";
      // invoicedata += "</tr>";
    });

    //INSERTING ROWS INTO TABLE
    // $("#dataTable").append(invoicedata);
    $("#dataTable").DataTable({
      dom: "lrt",
      stateSave: true,
      data: data.data,
      columns: [
        { data: "inv" },
        { data: "client" },
        { data: "date" },
        { data: "duedate" },
        { data: "total" },
        { data: "balance" },
        { data: "status" }
      ],
      columnDefs: [
        {
          targets: [-1],
          render: function (a, b, data, d) {
            var ret;
            data.status.toLowerCase() == "draft"
              ? (ret = `<button type='button' class='btn btn-danger c3 afh' id='draft'> ${data.status} </button>`)
              : data.status.toLowerCase() == "paid"
              ? (ret = `<button type='button' class='btn btn-primary c2 afh' id='paid'> ${data.status} </button>`)
              : data.status.toLowerCase() == "partial payment"
              ? (ret = `<button type='button' class='btn btn-info c1 afh'  id='pp'> ${data.status} </button>`)
              : (ret = "null");
            return ret;
          }
        }
      ]
    });
  }).done(() => {
    console.log("client", mclient);
    console.log("status", mstatus);
  });

  $("#draft").on("keyup click", () => {
    console.log("filter d");
    filterColumn({ key: "status", val: "Draft" });
  });
  $("#paid").on("keyup click", () => {
    console.log("filter p");
    filterGlobal("Paid");
  });
});
