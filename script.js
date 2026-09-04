var connToken = "90935044|-31949247059926239|90903884";

var dbName = "Student";
var relName = "Student-Rel";

$(document).ready(function () {
    resetForm();
});

function resetForm() {

    $("#roll").val("").prop("disabled", false);

    $("#name, #class, #birth, #address, #enroll")
        .val("")
        .prop("disabled", true);

    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);

    $("#roll").focus();
}


$("#roll").blur(function () {

    var roll = $("#roll").val().trim();

    if (roll === "") {
        return;
    }

    var req = createGET_BY_KEYRequest(
        connToken,
        dbName,
        relName,
        JSON.stringify({
            "Roll-No": roll
        })
    );

    jQuery.ajaxSetup({
        async: false
    });

    var res = executeCommandAtGivenBaseUrl(
        req,
        "http://api.login2explore.com:5577",
        "/api/irl"
    );

    jQuery.ajaxSetup({
        async: true
    });


    // Record does not exist
    if (res.status == 400) {

        $("#name, #class, #birth, #address, #enroll")
            .prop("disabled", false);

        $("#save").prop("disabled", false);
        $("#update").prop("disabled", true);

        $("#name").focus();
    }

    // Record already exists
    else {

        var data = JSON.parse(res.data).record;

        $("#name").val(data["Full-Name"]);
        $("#class").val(data["Class"]);
        $("#birth").val(data["Birth-Date"]);
        $("#address").val(data["Address"]);
        $("#enroll").val(data["Enrollment-Date"]);

        $("#roll").prop("disabled", true);

        $("#name, #class, #birth, #address, #enroll")
            .prop("disabled", false);

        $("#save").prop("disabled", true);
        $("#update").prop("disabled", false);

        $("#name").focus();
    }
});


function validate() {

    if ($("#roll").val().trim() === "") {
        alert("Enter Roll No");
        $("#roll").focus();
        return false;
    }

    if ($("#name").val().trim() === "") {
        alert("Enter Full Name");
        $("#name").focus();
        return false;
    }

    if ($("#class").val().trim() === "") {
        alert("Enter Class");
        $("#class").focus();
        return false;
    }

    if ($("#birth").val() === "") {
        alert("Select Birth Date");
        $("#birth").focus();
        return false;
    }

    if ($("#address").val().trim() === "") {
        alert("Enter Address");
        $("#address").focus();
        return false;
    }

    if ($("#enroll").val() === "") {
        alert("Select Enrollment Date");
        $("#enroll").focus();
        return false;
    }

    return true;
}


function getStudentData() {

    return {
        "Roll-No": $("#roll").val().trim(),
        "Full-Name": $("#name").val().trim(),
        "Class": $("#class").val().trim(),
        "Birth-Date": $("#birth").val(),
        "Address": $("#address").val().trim(),
        "Enrollment-Date": $("#enroll").val()
    };
}


function saveData() {

    if (!validate()) {
        return;
    }

    var jsonObj = getStudentData();

    var req = createPUTRequest(
        connToken,
        JSON.stringify(jsonObj),
        dbName,
        relName
    );

    jQuery.ajaxSetup({
        async: false
    });

    var res = executeCommandAtGivenBaseUrl(
        req,
        "http://api.login2explore.com:5577",
        "/api/iml"
    );

    jQuery.ajaxSetup({
        async: true
    });

    if (res.status == 200) {
        alert("Student record saved successfully.");
        resetForm();
    } else {
        alert("Error while saving record.");
    }
}


function updateData() {

    if (!validate()) {
        return;
    }

    var jsonObj = getStudentData();

    var req = createUPDATERecordRequest(
        connToken,
        JSON.stringify(jsonObj),
        dbName,
        relName,
        $("#roll").val().trim()
    );

    jQuery.ajaxSetup({
        async: false
    });

    var res = executeCommandAtGivenBaseUrl(
        req,
        "http://api.login2explore.com:5577",
        "/api/iml"
    );

    jQuery.ajaxSetup({
        async: true
    });

    if (res.status == 200) {
        alert("Student record updated successfully.");
        resetForm();
    } else {
        alert("Error while updating record.");
    }
}
