/**
 * this table data and json related file
 * ^[A-Fa-f]+$,
 * * */

var mjsondata;
var mstatus = [];
var mclient = [];

const filterGlobal = (cval, reg = false, sm = true) => {
  console.log("filter", cval);
  $("#dataTable").DataTable().search(cval, reg, sm).draw();
};

const filterColumn = (cval, reg = false, sm = true) => {
  $("#dataTable").DataTable().column(cval.key).search(cval.val, reg, sm).draw();
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
        { data: "type" },
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
              ? (ret = `<button type='button' class='btn btn-danger c3 afh draft'> ${data.status} </button>`)
              : data.status.toLowerCase() == "paid"
              ? (ret = `<button type='button' class='btn btn-primary c2 afh paid'> ${data.status} </button>`)
              : data.status.toLowerCase() == "partial payment"
              ? (ret = `<button type='button' class='btn btn-info c1 afh pp'> ${data.status} </button>`)
              : (ret = "null");
            return ret;
          }
        }
      ]
    });
    // these below are cta action function reducers or cta logic
    $(".draft").on("keyup click", () => {
      filterGlobal("Draft");
      $("#statusMenuButton span").text("Draft");
    });

    $(".paid").on("keyup click", () => {
      filterGlobal("Paid");
      $("#statusMenuButton span").text("Paid");
    });

    $(".pp").on("keyup click", () => {
      filterGlobal("Partial Payment");
      $("#statusMenuButton span").text("Partial");
    });

    $(".any").on("keyup click", () => {
      console.log("filter ay");
      filterGlobal("", false, true);
      $("#clientMenuButton span").text("Any");
      $("#statusMenuButton span").text("Any");
    });

    $("#in,#out").on("keyup click", (e) => {
      filterGlobal(e.target.id == "in" ? "in-state" : "out-state", false, true);
      $("#clientMenuButton span").text(
        e.target.id == "in" ? "In-State" : "Out-State"
      );
    });

    $("#date,#ddate").on("keyup click", (e) => {
      filterGlobal(
        e.target.id == "date" ? "05/11/2019" : "12/11/2019",
        false,
        true
      );
    });

    $("#in,#cn,#ct,#da,#dd,#to,#ba,#ps").on("keyup click", (e) => {
      const myi =
        e.target.id == "in"
          ? 1
          : e.target.id == "cn"
          ? 2
          : e.target.id == "ct"
          ? 3
          : e.target.id == "da"
          ? 4
          : e.target.id == "dd"
          ? 5
          : e.target.id == "to"
          ? 6
          : e.target.id == "ba"
          ? 7
          : 8;
      $(".active").removeClass("active");
      $(".ici" + myi).addClass("active");
      $("#dataTable")
        .DataTable()
        .order([myi - 1, "desc"])
        .draw();
    });
  }).done(() => {
    // console.log("client", mclient);
    // console.log("status", mstatus);
  });
});
