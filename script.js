var connToken="90935044|-31949247059926239|90903884";

var dbName="Student";
var relName="Student-Rel";

$(document).ready(function(){
    resetForm();
});

function resetForm(){

    $("#roll").prop("disabled",false);

    $("#name,#class,#birth,#address,#enroll").val("");

    $("#name,#class,#birth,#address,#enroll").prop("disabled",true);

    $("#save").prop("disabled",true);

    $("#update").prop("disabled",true);

    $("#roll").focus();

}

$("#roll").blur(function(){

    var roll=$("#roll").val();

    if(roll=="") return;

    var req=createGET_BY_KEYRequest(connToken,dbName,relName,JSON.stringify({"Roll-No":roll}));

    jQuery.ajaxSetup({async:false});

    var res=executeCommandAtGivenBaseUrl(req,"http://api.login2explore.com:5577","/api/irl");

    jQuery.ajaxSetup({async:true});

    if(res.status==400){

        $("#save").prop("disabled",false);

        $("#name,#class,#birth,#address,#enroll").prop("disabled",false);

        $("#name").focus();

    }

    else{

        var data=JSON.parse(res.data).record;

        $("#name").val(data["Full-Name"]);
        $("#class").val(data["Class"]);
        $("#birth").val(data["Birth-Date"]);
        $("#address").val(data["Address"]);
        $("#enroll").val(data["Enrollment-Date"]);

        $("#roll").prop("disabled",true);

        $("#name,#class,#birth,#address,#enroll").prop("disabled",false);

        $("#update").prop("disabled",false);

    }

});

function validate(){

    if($("#roll").val()=="") return false;
    if($("#name").val()=="") return false;
    if($("#class").val()=="") return false;
    if($("#birth").val()=="") return false;
    if($("#address").val()=="") return false;
    if($("#enroll").val()=="") return false;

    return true;

}

function saveData(){

    if(!validate()){

        alert("Fill all fields");

        return;

    }

    var jsonObj={
        "Roll-No":$("#roll").val(),
        "Full-Name":$("#name").val(),
        "Class":$("#class").val(),
        "Birth-Date":$("#birth").val(),
        "Address":$("#address").val(),
        "Enrollment-Date":$("#enroll").val()
    };

    var req=createPUTRequest(connToken,JSON.stringify(jsonObj),dbName,relName);

    jQuery.ajaxSetup({async:false});

    executeCommandAtGivenBaseUrl(req,"http://api.login2explore.com:5577","/api/iml");

    jQuery.ajaxSetup({async:true});

    alert("Saved Successfully");

    resetForm();

}

function updateData(){

    if(!validate()){

        alert("Fill all fields");

        return;

    }

    var jsonObj={
        "Roll-No":$("#roll").val(),
        "Full-Name":$("#name").val(),
        "Class":$("#class").val(),
        "Birth-Date":$("#birth").val(),
        "Address":$("#address").val(),
        "Enrollment-Date":$("#enroll").val()
    };

    var req=createUPDATERecordRequest(connToken,JSON.stringify(jsonObj),dbName,relName,$("#roll").val());

    jQuery.ajaxSetup({async:false});

    executeCommandAtGivenBaseUrl(req,"http://api.login2explore.com:5577","/api/iml");

    jQuery.ajaxSetup({async:true});

    alert("Updated Successfully");

    resetForm();

}