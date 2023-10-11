/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIML="/api/iml";
var jpdbIRL="/api/irl";
var StdDBName="School-DB";
var StdRelationName="Student-Table";
var connToken="90931629|-31949332881277434|90961816";

$('#rollno').focus();

function saveRecNo2LS(jsonObj){
    var lvdata=JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvdata.rec_no);
}
function getRollNoasJsonObj(){
    var rollno=$('#rollno').val();
    var JsonStr={
        id:rollno
    };
    return JSON.stringify(JsonStr);
}
function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record=JSON.parse(jsonObj.data).record;
    $('#name').val(record.name);
    $('#class').val(record.Class);    
    $('#dob').val(record.birthDate);    
    $('#adr').val(record.address);    
    $('#enrdate').val(record.enrollmentDate);    

}
function resetform(){
    $('#rollno').val("");
    $('#name').val("");
    $('#class').val("");    
    $('#dob').val("");    
    $('#adr').val("");    
    $('#enrdate').val(""); 
    $('#rollno').prop('disabled',false);
    $('#save').prop('disabled',true);
    $('#update').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#rollno').focus();
}
function validateData() {
    var rollno = $("#rollno").val();
    if (rollno === "") {
    alert("Roll No. Required Value");
    $("#rollno").focus();
    return "";
    }
    var name = $("#name").val();
    if (name === "") {
    alert("Student Name is Required Value");
    $("#name").focus();
    return "";
    }
    var Class = $("#class").val();
    if (Class === "") {
    alert("Class is Required Value");
    $("#class").focus();
    return "";
    }
    var birthDate = $("#dob").val();
    if (birthDate === "") {
    alert("Birth Date is Required Value");
    $("#dob").focus();
    return "";
    }
    var address = $("#adr").val();
    if (address === "") {
    alert("Address is Required Value");
    $("#adr").focus();
    return "";
    }
    var enrollmentDate = $("#enrdate").val();
    if (enrollmentDate === "") {
    alert("Enrollment Date is Required Value");
    $("#enrdate").focus();
    return "";
    }
    var jsonStrObj = {
    rollno: rollno,
    name: name,
    Class: Class,
    birthDate: birthDate,
    address: address,
    enrollmentDate: enrollmentDate
    };
    return JSON.stringify(jsonStrObj);
    }
function getStd(){
    var rollnoJsonObj=getRollNoasJsonObj();
    var getRequest=createGET_BY_KEYrequest(connToken,StdDBName,StdRelationName,rollnoJsonObj);
    $.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    $.ajaxSetup({async:true});
    if(resJsonObj.status===400){
        $('#save').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#rollno').focus();
    }
    else if(resJsonObj.status===200){
        $('#rollno').prop('disabled',true);
        fillData(resJsonObj);
        $('#update').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#rollno').focus();
    }
}

function saveData(){
    var jsonStrObj=validateData();
    if(jsonStrObj===""){
        return "";
    }
    var putRequest=createPUTRequest(connToken,jsonStrObj,StdDBName,StdRelationName);
    $.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    $.ajaxSetup({async:true});
    resetform();
    $('#rollno').focus();
}
function updateData(){
    $('#update').prop('disabled',true);
    jsonChg=validateData();
    var updateRequest=createUPDATERecordReuest(connToken,jsonChg,StdDBName,StdRelationName,localStorage.getItem('recno'));
    $.ajaxSetup({async:false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    $.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetform();
    $('#rollno').focus();
}