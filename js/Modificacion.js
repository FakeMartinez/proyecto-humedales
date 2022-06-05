var CantPres= 0;
var IDp = new Array;  //Es necesario definirlo como un nuevo array, pero luego hay que limpiar cada direccion, cada contenedor del array empieza con 'undefined' como dato

function quitarPresion(IDSelect,BtnQuit,Contenedor,Pos){
  //console.log("antes de quitar CantPres:"+CantPres);
  if (CantPres == 0){
    
  }
  else{
    console.log(Contenedor.id+ " || ContBtnSelPres"+(CantPres-1));
    if (Contenedor.id == ("ContBtnSelPres"+(CantPres-1))){
      //console.log("entra");
      ButAdd = "<button id='BtnNewRelPresComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPresion("+(CantPres-1)+");'> <i class='fa-solid fa-plus'></i> </button>";
      //console.log("codifica el boton");
      //console.log(ButAdd);
      console.log("ContBtnSelPres"+(CantPres-2));
      $("#ContBtnSelPres"+(CantPres-2)).append(ButAdd);
      console.log("creó el boton");
      //console.log("#"+BtnQuit.id);
      $("#"+BtnQuit.id).remove();
      //console.log("#"+IDSelect.id);
      $("#"+IDSelect.id).remove();
      $("#"+Contenedor.id).remove();
      if (CantPres == 1){
        $("#ContPadrePres").append("<button id='BtnNewRelPresComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPresion("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>");
      }
    }else
    {
      console.log("entra a la parte de cambiar IDs");
      $("#"+BtnQuit.id).remove();
      //console.log("#"+IDSelect.id);
      $("#"+IDSelect.id).remove();
      $("#"+Contenedor.id).remove();
      for (i=Pos; i<CantPres; i++){
        $("#ContBtnSelPres"+(i+1)).attr("id","ContBtnSelPres"+i);
        $("#BtnQuitPres"+(i+1)).attr("id","BtnQuitPres"+i);
        console.log("hace el attr para cambiar la funcion");
        $("#BtnQuitPres"+(i)).attr("onclick","quitarPresion(SelModPres"+i+",BtnQuitPres"+i+",ContBtnSelPres"+i+","+i+");");
        $("#SelModPres"+(i+1)).attr("id","SelModPres"+i);
        if (i==CantPres-1){
          console.log("newButton en "+i);
          $("#BtnNewRelPresComp").remove();
          $("#ContBtnSelPres"+(i-1)).append("<button id='BtnNewRelPresComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPresion("+(i)+");'> <i class='fa-solid fa-plus'></i> </button>");
        }
      }

    }
    CantPres--;
  }

  
 console.log("despues de quitar CantPres:"+CantPres);
}

function AñadirPresion(NID){
  $("#BtnNewRelPresComp").remove();
  appendSelect = 
  "<div id='ContBtnSelPres"+NID+"' style='display:flex; margin-bottom: 15px;'>"+
    "<button id='BtnQuitPres"+NID+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarPresion(SelModPres"+NID+",BtnQuitPres"+NID+",ContBtnSelPres"+NID+","+NID+");'> X </button>"+
      "<select id='SelModPres"+NID+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
        "<option>"+IDp[NID]+" 1</option>"+
        "<option>"+IDp[NID]+" 2</option>"+
        "<option>"+IDp[NID]+" 3</option>"+
      "<select>"+
      "<button id='BtnNewRelPresComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPresion("+(NID+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
  $("#ContPadrePres").append(appendSelect);
  CantPres++;
  tempPres='';
  contpPr = new Array;
  const postData = {CargarSelectsAcc: true,}   
  $.post('php/modificar.php', postData, (response) => {
    let datos = JSON.parse(response);

    datos['presiones'].forEach(dato => {
      tempPres +=`<option>${dato.tipo_presion}</option>` 
    });
      
    for (i=0; i<CantPres;i++){
      pPr=0;
      datos['presiones'].forEach(dato => {
        if (dato.tipo_presion == IDp[i]){
          contpPr[i] = pPr;
         }else{
          pPr++;
         }
      });        
    }
    
    for (i=0; i<CantPres; i++){
      $('#SelModPres'+i).html(tempPres);
      document.getElementById('SelModPres'+i).options.item(contpPr[i]).selected = 'selected';
    }

  });
  console.log("ahora CantPres:"+CantPres);
}

function ModifData(Fil, Id, trs){
  CantPres= 0;
  IDp = new Array;
  //getElementById()
  //console.log(Fil);
  //console.log(Id);
  //console.log(parseInt(Id.innerText));
  //console.log(Id.id);
  //console.log(Id.id.substring(0,5));
  //console.log("==========");
  //console.log(trs);
  //console.log("==========");
  var tds = trs.childNodes;
  //console.log(tds)
  //console.log("==========");
  
  if (Id.id.substring(0,5) == "IDAcc"){

    var Data= 1;

    //console.log("Modificar un accidente");
    IdAcc = parseInt(Id.innerText);
    //console.log("   ID del accidente:"+IdAcc);
    NewForm = 
    "<div id='formModifData' class='modal' role='document' style='background: rgba(0,0,0,0.8);'>"+
        "<div class='modal-dialog modal-lg' style='display: inline-table;'>"+
            "<div class='modal-content' style='width: 92vmax; left: 3vmax; border: 2px solid #343a40;'>"+
                "<div class='modal-header'  style='background:#343a40; color:lightgrey;'>"+
                    "<h5 class='modal-title' style='color:lightgrey;'>Modificar accidente <a id='TitModId'class='modal-title' style='color:lightgrey;'>"+IdAcc+"</a></h5>"+
                    "<button type='button' style='color:lightgrey; background: #343a40; border: 0px;' onclick='deletesHTML(`formModifData`);' data-bs-dismiss='modal' aria-label='Close'>"+
                        "<i class='fa-solid fa-x' style='color:lightgrey;'></i>"+
                    "</button>"+
                "</div>"+
                "<div id='dataModif' class='modal-body'>"+
                "</div>"+
                "<div class='modal-body' style=' align-self: flex-end;'>"+
                    "<button id='CargarModif' type='button' class='btn btn-primary' onclick='CargarModificaciones("+Data+");'>Confirmar Modificación</button>"+
                  /*  "<button type='button' style='color:lightgrey; background: #343a40; border: 0px;' onclick='deletesHTML(`formModifData`);' data-bs-dismiss='modal' aria-label='Close'>"+
                        "Confirmar Modificación"+
                    "</button>"+*/
                "</div>"+
            "</div>"+
        "</div>"+
    "</div>";
    $("body").append(NewForm);
    $("#formModifData").show();
  
    for (i=0; i< tds.length; i++){
      if (i==0){
      }
      if (i==1){
        //console.log("ID: "+tds[i].innerText);
        var IDa = tds[i].innerText;
      }
      if (i==2){
        //console.log("Nombre: "+tds[i].innerText);
        var IDn = tds[i].innerText;
      }
      if (i==3){
        //console.log("Tipo: "+tds[i].innerText);
        var IDt = tds[i].innerText;
      }
      if (i==4){
        //console.log("Complejo: "+tds[i].innerText);
        var IDco = tds[i].innerText;
      }
      if (i==5){
        //console.log("Cuenca: "+tds[i].innerText);
        var IDcu = tds[i].innerText;
      }
      if (i==6){
        //console.log("presiones: "+tds[i].innerText);
       
        p = -1;
        var Pres = tds[i].innerText.replace(/(\r\n|\n|\r)/gm, "");
        for (j=0 ; j<Pres.length; j++){
          if (Pres[j] != "►" && Pres[j]!= ""){
            //console.log("Let:"+Pres[j]);
            //sconsole.log("IDp[p]"+IDp[p]);
            IDp[p] = IDp[p]+Pres[j];
          }else{
            j++;
            p++;
            IDp[p]=''; // Esto vacía el espacio "p" en el array "IDp" para que no contenga un dato "undefined"
          }
        }
  
      }
      if (i==7){
        //console.log("Descripcion: "+tds[i].innerText);
        var IDd = tds[i].innerText;
      }
    }
    data =  
   
    "<section style='display: flex;'>"+
    "<div style=' width: 50%; padding-left: 20px;'>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Nombre Accidente: </a>" +
            "<input type='text' id='InpModNombre' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value="+IDn+"><br><br><br>" + 
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Tipo Accidente: </a>" +
            "<input type='text' id='InpModTipo' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value="+IDt+"><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey;'>Cuenca Accidente: </a>" +
            "<select id='SelModCuen' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>" +
                "<option>"+IDcu+" 1</option>"+
                "<option>"+IDcu+" 2</option>"+
                "<option>"+IDcu+" 3</option>"+
            "</select><br><br><br>"+
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey;'>Complejo Accidente: </a>"+
            "<select id='SelModComp' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>" +
                "<option>"+IDco+" 1</option>"+
                "<option>"+IDco+" 2</option>"+
                "<option>"+IDco+" 3</option>"+
            "</select><br><br><br>" + 
        "</div>"+
    "</div>"+
        "<div id='ContPadrePres' style=' width: 50%; padding-left: 20px;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px;'>presiones: </a><br>";

    for (i=0 ; i<IDp.length; i++){
      data = data+"<div id='ContBtnSelPres"+i+"' style='display:flex; margin-bottom: 15px;'>"+
                    "<button id='BtnQuitPres"+i+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarPresion(SelModPres"+i+",BtnQuitPres"+i+",ContBtnSelPres"+i+","+i+");'> X </button>"+
                    "<select id='SelModPres"+i+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
                        "<option>"+IDp[i]+" 1</option>"+
                        "<option>"+IDp[i]+" 2</option>"+
                        "<option>"+IDp[i]+" 3</option>"+
                    "<select>";
                 
      if(i == (IDp.length-1)){
        data = data+"<button id='BtnNewRelPresComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPresion("+(i+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
      }
      data = data+"</div>";
      CantPres++;
    }
  
    data = data+"</div><br>"+
    "</section>"+
    "<div style=' text-align: -webkit-center; width: 50%; height: 200px;>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px;'>Descripcion Accidente: </a><br>" +
        "<textarea id='TextModDesc' class='form-control' style='background: #e2e2e2; color:black; width: 400px; height: 200px; min-height: 100px; max-height: 225px;''>"+IDd+"</textarea><br><br><br>"+
    "</div>";
    console.log("ahora CantPres:"+CantPres);
    $("#dataModif").html(data);
    tempCuen = '';
    tempComp = '';
    tempPres = '';
    pCu=0;
    pCo=0;
    pPr=0;
    contpPr = new Array;
    const postData = {CargarSelectsAcc: true,}   
    $.post('php/modificar.php', postData, (response) => {
      let datos = JSON.parse(response);
      datos['cuencas'].forEach(dato => {
        tempCuen +=`<option>${dato.nombre_cuenca}</option>` 
        if (dato.nombre_cuenca == IDcu){
          contpCu = pCu;
        }else{
          pCu++;
        }
      });
      datos['complejos'].forEach(dato => {
        tempComp +=`<option>${dato.nombre_complejo}</option>` 
        if (dato.nombre_complejo == IDco){
          contpCo = pCo;
        }else{
          pCo++;
        }
      });
      datos['presiones'].forEach(dato => {
        tempPres +=`<option>${dato.tipo_presion}</option>` 
  
      });
      
      for (i=0; i<IDp.length;i++){
        pPr=0;
        datos['presiones'].forEach(dato => {
          //console.log("dato.tipo_presion:| "+dato.tipo_presion);
          //console.log("IDp["+i+"]:| "+IDp[i]/*.substring(10)*/);
          if (dato.tipo_presion == IDp[i]/*.substring(10)*/){
            contpPr[i] = pPr;
            //console.log("contpPr["+i+"]"+contpPr[i]);
            //console.log("pPr"+pPr);
            //console.log("dato.tipo_presion"+dato.tipo_presion);
            //console.log("IDp["+i+"]"+IDp[i]/*.substring(10)*/);
          }else{
            pPr++;
          }
        });        
      }
  
      $('#SelModCuen').html(tempCuen);
      document.getElementById('SelModCuen').options.item(contpCu).selected = 'selected';
  
      $('#SelModComp').html(tempComp);
      document.getElementById('SelModComp').options.item(contpCo).selected = 'selected';
  
      for (i=0; i<IDp.length; i++){
        $('#SelModPres'+i).html(tempPres);
        document.getElementById('SelModPres'+i).options.item(contpPr[i]).selected = 'selected';
      }
  
    
    });
  
    
  }
  
  if (Id.id.substring(0,5) == "IDCom"){
    console.log("Modificar un complejo");
  }
  
  if (Id.id.substring(0,5) == "IDCue"){
    console.log("Modificar una cuenca");
  }
  
  if (Id.id.substring(0,5) == "IDRel"){
    console.log("Modificar un relevamiento");
  }
  
  if (Id.id.substring(0,5) == "IDFau"){
    console.log("Modificar una fauna");
  }
  
  if (Id.id.substring(0,5) == "IDFlo"){
    console.log("Modificar una flora");
  }
  
  if (Id.id.substring(0,5) == "IDPre"){
    console.log("Modificar una presion");
  }
  
  if (Id.id.substring(0,5) == "IDPer"){
    console.log("Modificar una persona");
  }
  };



function CargarModificaciones(Data){
    //console.log("ABDALULULUSSSSSS");
    warning = 
"<div id='MarcoWarning' class='modal' role='document' style='background: rgba(0,0,0,0.8);'>"+
    "<div class='modal-dialog modal-lg' style='top:30%;'>"+
        "<div class='modal-content'>"+
            "<div class='alert alert-dismissible alert-warning' style='margin:0px'>"+
                "<h4 class='alert-heading'>"+
                    "<i class='fa-solid fa-triangle-exclamation' style='color: #f49417; font-size: 30px;'></i>"+
                    "Warning!"+
                "</h4>"+
                "<p class='mb-0' style=' padding-bottom: 40px; padding-top: 10px;'>"+
                    "Se modificaran los datos registrados, esto es un cambio irreversible. Para volver los datos a como estaban antes deberá volver a hacer una modificación"+ 
                "</p>"+

                "<div style=' display: flex; align-content: space-between; flex-direction: row; justify-content: space-between; width: 104%;'>"+
                    "<div><button type='button' style=' background-color: #aa5b59;' class='btn btn-danger' onclick='CerrarAlerta();'>Rechazar Cambios</button></div>"+
                    "<div><button type='button' style=' background-color: #5b9e72;' class='btn btn-success' onclick='ConfirmarAlerta("+Data+");'>Aceptar Cambios</button></div>"+
                "</div>"+
            "</div>";
        "</div>"+
    "</div>"+
"</div>";

    $("body").append(warning);
    $("#MarcoWarning").show();
}

function CerrarAlerta(){
  $("#MarcoWarning").hide();
  $("#MarcoWarning").remove();
}

function ConfirmarAlerta(Data){
  //$("#MarcoWarning").hide();
  //$("#MarcoWarning").remove();

  //console.log("entra1");
  var Presiones = new Array();
  //console.log("entra2");
  //console.log("CantPres: "+CantPres);
  for (i=0; i<CantPres; i++){
    //console.log("entra3."+i);
    Presiones.push($('#SelModPres'+i+' option:selected').text());
    //console.log($('#SelModPres'+i+' option:selected').text());
  };
  console.log("entra4");
  console.log(Presiones);
  
  const postData = {
    IdAccidente:$('#TitModId').text(),
    NombreAccidente: $('#InpModNombre').val(),
    TipoAccidente: $('#InpModTipo').val(),
    CuencaAccidente: $('#SelModCuen').val(),
    ComplejaAccidente: $('#SelModComp').val(),
    PresionAccidente: Presiones,
    DescripcionAccidente: $('#TextModDesc').val(),
    ModiAcc : true,
 };

  console.log(postData);

  $.post('php/modificar.php', postData, (response) => {
    console.log(response);
    CerrarAlerta();
    deletesHTML("formModifData");

    if (Data == 1){
      var postData2= {
        accidente:true,
      }
    }
    
    $('#ContTable').css({'visibility':'visible'});
    
    $.post('php/modificar.php', postData2, (response) => {
      console.log(response);  
      $("#myTable").html(response);
    });
  });
  

}
