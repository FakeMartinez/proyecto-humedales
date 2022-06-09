var CantPres= 0;
var CantProp= 0;
var IDp = new Array;  //Es necesario definirlo como un nuevo array, pero luego hay que limpiar cada direccion, cada contenedor del array empieza con 'undefined' como dato
var CantRol = 0;
var CantPropie = 0;
var Propies = new Array;
var Rol = new Array;

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
  const postData = {CargarSelects: true,}   
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

//================================================
function quitarProp(IDSelect,BtnQuit,Contenedor,Pos){
  //console.log("antes de quitar CantPres:"+CantPres);
  if (CantProp == 0){
    
  }
  else{
    //console.log(Contenedor.id+ " || ContBtnSelProp"+(CantProp-1));
    if (Contenedor.id == ("ContBtnSelProp"+(CantProp-1))){
      ButAdd = "<button id='BtnNewRelPropComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPropietario("+(CantProp-1)+");'> <i class='fa-solid fa-plus'></i> </button>";
      //console.log("ContBtnSelProp"+(CantProp-2));
      $("#ContBtnSelProp"+(CantProp-2)).append(ButAdd);
      //console.log("creó el boton");
      //console.log("#"+BtnQuit.id);
      $("#"+BtnQuit.id).remove();
      //console.log("#"+IDSelect.id);
      $("#"+IDSelect.id).remove();
      $("#"+Contenedor.id).remove();
      if (CantProp == 1){
        $("#ContPadreProp").append("<button id='BtnNewRelPropComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPropietario("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>");
      }
    }else
    {
      //console.log("entra a la parte de cambiar IDs");
      $("#"+BtnQuit.id).remove();
      //console.log("#"+IDSelect.id);
      $("#"+IDSelect.id).remove();
      $("#"+Contenedor.id).remove();
      for (i=Pos; i<CantProp; i++){
        $("#ContBtnSelProp"+(i+1)).attr("id","ContBtnSelProp"+i);
        $("#BtnQuitProp"+(i+1)).attr("id","BtnQuitProp"+i);
        //console.log("hace el attr para cambiar la funcion");
        $("#BtnQuitProp"+(i)).attr("onclick","quitarProp(SelModProp"+i+",BtnQuitProp"+i+",ContBtnSelProp"+i+","+i+");");
        $("#SelModProp"+(i+1)).attr("id","SelModProp"+i);
        if (i==CantProp-1){
          //console.log("newButton en "+i);
          $("#BtnNewRelPropComp").remove();
          $("#ContBtnSelProp"+(i-1)).append("<button id='BtnNewRelPropComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPropietario("+(i)+");'> <i class='fa-solid fa-plus'></i> </button>");
        }
      }
    }
    CantProp--;
  }
 console.log("despues de quitar CantProp:"+CantProp);
}

function AñadirPropietario(NID){
  $("#BtnNewRelPropComp").remove();
  appendSelect = 
  "<div id='ContBtnSelProp"+NID+"' style='display:flex; margin-bottom: 15px;'>"+
    "<button id='BtnQuitProp"+NID+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarProp(SelModProp"+NID+",BtnQuitProp"+NID+",ContBtnSelProp"+NID+","+NID+");'> X </button>"+
      "<select id='SelModProp"+NID+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
        "<option>"+IDp[NID]+" 1</option>"+
        "<option>"+IDp[NID]+" 2</option>"+
        "<option>"+IDp[NID]+" 3</option>"+
      "<select>"+
      "<button id='BtnNewRelPropComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPropietario("+(NID+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
  $("#ContPadreProp").append(appendSelect);
  CantProp++;
  tempProp='';
  contpPr = new Array;
  const postData = {CargarSelects: true,}   
  $.post('php/modificar.php', postData, (response) => {
    let datos= JSON.parse(response);
    datos['personas'].forEach(dato => {
      tempProp +=`<option>${dato.nom_prop}</option>` 
    });
    for (i=0; i<CantProp;i++){
      pPr=0;
      datos['personas'].forEach(dato => {
        if (dato.nom_prop == IDp[i]){
          contpPr[i] = pPr;
        }else{
          pPr++;
        }
      });        
    }
    for (i=0; i<CantProp; i++){
      $('#SelModProp'+i).html(tempProp);
      document.getElementById('SelModProp'+i).options.item(contpPr[i]).selected = 'selected';
    }
  });
  console.log("ahora CantProp:"+CantProp);
}

function quitarPropiedad(IDSelect,BtnQuit,Contenedor,Pos){
  //console.log("antes de quitar CantPres:"+CantPres);
  if (CantPropie == 0){
    
  }
  else{
    //console.log(Contenedor.id+ " || ContBtnSelProp"+(CantPres-1));
    if (Contenedor.id == ("ContBtnSelProp"+(CantPropie-1))){
      //console.log("entra");
      ButAdd = "<button id='BtnNewRelProp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPropiedad("+(CantPropie-1)+");'> <i class='fa-solid fa-plus'></i> </button>";
      //console.log("codifica el boton");
      //console.log(ButAdd);
      console.log("ContBtnSelProp"+(CantPropie-2));
      $("#ContBtnSelProp"+(CantPropie-2)).append(ButAdd);
      console.log("creó el boton");
      //console.log("#"+BtnQuit.id);
      $("#"+BtnQuit.id).remove();
      //console.log("#"+IDSelect.id);
      $("#"+IDSelect.id).remove();
      $("#"+Contenedor.id).remove();
      if (CantPropie == 1){
        $("#ContPadreProp").append("<button id='BtnNewRelProp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPropiedad("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>");
      }
    }else
    {
      console.log("entra a la parte de cambiar IDs");
      $("#"+BtnQuit.id).remove();
      //console.log("#"+IDSelect.id);
      $("#"+IDSelect.id).remove();
      $("#"+Contenedor.id).remove();
      for (i=Pos; i<CantPropie; i++){
        $("#ContBtnSelProp"+(i+1)).attr("id","ContBtnSelProp"+i);
        $("#BtnQuitProp"+(i+1)).attr("id","BtnQuitProp"+i);
        console.log("hace el attr para cambiar la funcion");
        $("#BtnQuitProp"+(i)).attr("onclick","quitarPropiedad(SelModProp"+i+",BtnQuitProp"+i+",ContBtnSelProp"+i+","+i+");");
        $("#SelModProp"+(i+1)).attr("id","SelModProp"+i);
        if (i==CantPropie-1){
          console.log("newButton en "+i);
          $("#BtnNewRelProp").remove();
          $("#ContBtnSelProp"+(i-1)).append("<button id='BtnNewRelProp' type='button' class='btn btn-success' style='height: 20px; width: 20px; padding: 0px;' onclick='AñadirPropiedad("+(i)+");'> <i class='fa-solid fa-plus'></i> </button>");
        }
      }

    }
    CantPropie--;
  }
 console.log("despues de quitar CantPropie:"+CantPropie);
}

function AñadirPropiedad(NID){
  $("#BtnNewRelProp").remove();
  appendSelect = 
  "<div id='ContBtnSelProp"+NID+"' style='display:flex; margin-bottom: 15px;'>"+
    "<button id='BtnQuitProp"+NID+"' type='button' class='btn btn-danger' style='height: 20px; width: 20px; padding: 0px;' onclick='quitarPropiedad(SelModProp"+NID+",BtnQuitProp"+NID+",ContBtnSelProp"+NID+","+NID+");'> X </button>"+
      "<select id='SelModProp"+NID+"' class='form-select' style='height: 20px; font-size: 12px; background: #e2e2e2; color:black; width: 300px;; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
        "<option>"+IDp[NID]+" 1</option>"+
        "<option>"+IDp[NID]+" 2</option>"+
        "<option>"+IDp[NID]+" 3</option>"+
      "<select>"+
      "<button id='BtnNewRelProp' type='button' class='btn btn-success' style='height: 20px; width: 20px; padding: 0px;' onclick='AñadirPropiedad("+(NID+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
  $("#ContPadreProp").append(appendSelect);
  CantPropie++;
  tempProp='';
  contPropie = new Array;
  const postData = {CargarSelects: true,}   
  $.post('php/modificar.php', postData, (response) => {
    let datos = JSON.parse(response);

    datos['complejos'].forEach(dato => {
      tempProp +=`<option>${dato.nombre_complejo}</option>` 
    });
      
    for (i=0; i<CantPropie;i++){
      pPr=0;
      datos['complejos'].forEach(dato => {
        if (dato.nombre_complejo == Propies[i]){
          contPropie[i] = pPr;
         }else{
          pPr++;
         }
      });        
    }
    
    for (i=0; i<CantPropie; i++){
      $('#SelModProp'+i).html(tempProp);
      document.getElementById('SelModProp'+i).options.item(contPropie[i]).selected = 'selected';
    }

  });

  console.log("ahora CantProp:"+CantPropie);
}


function ModifData(Fil, Id, trs){
  CantPres= 0;
  CantProp= 0;
  IDp = new Array;

console.log(trs);

  var tds = trs.childNodes;

  // SE VAN A MODIFICAR ACCIDENTES GEOGRAFICOS
  if (Id.id.substring(0,5) == "IDAcc"){
    /* Datas = (Significado)
    Data=1 : Accidentes geograficos
    Data=2 Complejos
    Data=3 Cuencas
    Data=4 Relevamientos
    Data=5 Fauna
    Data=6 Flora
    Data=7 Presiones
    Data=8 Personas */
    var Data= 1;

    //console.log("Modificar un accidente");
    IdAcc = parseInt(Id.innerText);
    //console.log("   ID del accidente:"+IdAcc);
    // _________CREA TODA LA VENTANA DONDE SE MOSTRARAN LOS CAMPOS A MODIFICAR_________
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
  
     // _________EXTRAE EN VARIABLES LOS DISTINTOS CAMPOS DE DATOS_________
    for (i=0; i< tds.length; i++){
      if (i==0){ //Contiene el botón
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

// ______________ SE CREAN TODOS LSO CAMPOS DE DATOS QUE SE PERMITIRAN MODIFICAR SOBRE ESTE OBJETO A MODIFICAR _____________________
    data =  
    "<section style='display: flex;'>"+
    "<div style=' width: 50%; padding-left: 20px;'>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Nombre del Accidente Geográfico: </a>" +
            "<input type='text' id='InpModNombre' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value="+IDn+"><br><br><br>" + 
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Tipo de Accidente Geográfico: </a>" +
            "<input type='text' id='InpModTipo' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value="+IDt+"><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey;'>Cuenca del Accidente Geográfico: </a>" +
            "<select id='SelModCuen' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>" +
                "<option>"+IDcu+" 1</option>"+
                "<option>"+IDcu+" 2</option>"+
                "<option>"+IDcu+" 3</option>"+
            "</select><br><br><br>"+
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey;'>Complejo del Accidente Geográfico: </a>"+
            "<select id='SelModComp' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>" +
                "<option>"+IDco+" 1</option>"+
                "<option>"+IDco+" 2</option>"+
                "<option>"+IDco+" 3</option>"+
            "</select><br><br><br>" + 
        "</div>"+
    "</div>"+
        "<div id='ContPadrePres' style=' width: 50%; padding-left: 20px; height: 280px; overflow-x: auto;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px;'>Presiones del Accidente Geográfico: </a><br>";

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
        "<a style='font-weight: bold; color: grey; font-size: 20px;'>Descripcion del Accidente Geográfico: </a><br>" +
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

    // _____________ SE CARGAN TODAS LAS OPCIONES DE DATOS DESDE LA BASE DE DATOS EN LOS SELECTS DE LA VENTANA DE MODIFICACION _____________________
    const postData = {CargarSelects: true,}   
    $.post('php/modificar.php', postData, (response) => {
      let datosAcc = JSON.parse(response);
      datosAcc['cuencas'].forEach(dato => {
        tempCuen +=`<option>${dato.nombre_cuenca}</option>` 
        if (dato.nombre_cuenca == IDcu){
          contpCu = pCu;
        }else{
          pCu++;
        }
      });
      datosAcc['complejos'].forEach(dato => {
        tempComp +=`<option>${dato.nombre_complejo}</option>` 
        if (dato.nombre_complejo == IDco){
          contpCo = pCo;
        }else{
          pCo++;
        }
      });
      datosAcc['presiones'].forEach(dato => {
        tempPres +=`<option>${dato.tipo_presion}</option>` 
  
      });
      
      for (i=0; i<IDp.length;i++){
        pPr=0;
        datosAcc['presiones'].forEach(dato => {
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
  
    //__________ TERMINA LA CREACION DE TODA LA VENTANA DE MODIFICACION DE DATOS DE ESTE OBJETO (Accidentes) _________________
  }

//======================================================================================
  // SE VAN A MODIFICAR COMPLEJOS
  if (Id.id.substring(0,5) == "IDCom"){
    /* Datas = (Significado)
    Data=1 : Accidentes geograficos
    Data=2 Complejos
    Data=3 Cuencas
    Data=4 Relevamientos
    Data=5 Fauna
    Data=6 Flora
    Data=7 Presiones
    Data=8 Personas */
    var Data= 2;
    
    IdCom = parseInt(Id.innerText);
    //console.log("   ID del accidente:"+IdAcc);
    // _________CREA TODA LA VENTANA DONDE SE MOSTRARAN LOS CAMPOS A MODIFICAR_________
    NewForm = 
    "<div id='formModifData' class='modal' role='document' style='background: rgba(0,0,0,0.8);'>"+
        "<div class='modal-dialog modal-lg' style='display: inline-table;'>"+
            "<div class='modal-content' style='width: 92vmax; left: 3vmax; border: 2px solid #343a40;'>"+
                "<div class='modal-header'  style='background:#343a40; color:lightgrey;'>"+
                    "<h5 class='modal-title' style='color:lightgrey;'>Modificar Complejo <a id='TitModId'class='modal-title' style='color:lightgrey;'>"+IdCom+"</a></h5>"+
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
  
     // _________EXTRAE EN VARIABLES LOS DISTINTOS CAMPOS DE DATOS_________
    for (i=0; i< tds.length; i++){
      if (i==0){// Esto es el boton de mofidicar de la tabla, no se necesita
      }
      if (i==1){
        //console.log("ID: "+tds[i].innerText);
        var IDComp = tds[i].innerText;
      }
      if (i==2){
        //console.log("Nombre: "+tds[i].innerText);
        var IDnomb = tds[i].innerText;
      }
      if (i==3){
        p = -1;
        var Prop = tds[i].innerText.replace(/(\r\n|\n|\r)/gm, "");
        for (j=0 ; j<Prop.length; j++){
          if (Prop[j] != "►" && Prop[j]!= ""){
            //console.log("Let:"+Pres[j]);
            //sconsole.log("IDp[p]"+IDp[p]);
            IDp[p] = IDp[p]+Prop[j];
          }else{
            j++;
            p++;
            IDp[p]=''; // Esto vacía el espacio "p" en el array "IDp" para que no contenga un dato "undefined"
          }
        }
  
      }
    }

// ______________ SE CREAN TODOS LOS CAMPOS DE DATOS QUE SE PERMITIRAN MODIFICAR SOBRE ESTE OBJETO A MODIFICAR _____________________
    data =  
    "<section style='display: flex;'>"+
    "<div style=' width: 50%; padding-left: 20px;'>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Nombre del Complejo: </a>" +
            "<input type='text' id='InpModNombre' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value="+IDnomb+"><br><br><br>" + 
        "</div>"+
    "</div>"+
        "<div id='ContPadreProp' style=' width: 50%; padding-left: 20px; height: 280px; overflow-x: auto;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px;'>Propietarios: </a><br>";

    for (i=0 ; i<IDp.length; i++){
      data = data+"<div id='ContBtnSelProp"+i+"' style='display:flex; margin-bottom: 15px;'>"+
                    "<button id='BtnQuitProp"+i+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarProp(SelModProp"+i+",BtnQuitProp"+i+",ContBtnSelProp"+i+","+i+");'> X </button>"+
                    "<select id='SelModProp"+i+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
                        "<option>"+IDp[i]+" 1</option>"+
                        "<option>"+IDp[i]+" 2</option>"+
                        "<option>"+IDp[i]+" 3</option>"+
                    "<select>";
                 
      if(i == (IDp.length-1)){
        data = data+"<button id='BtnNewRelPropComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPropietario("+(i+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
      }
      data = data+"</div>";
      CantProp++;
    }
  
   
    console.log("ahora CantProp:"+CantProp);
    $("#dataModif").html(data);
    tempProp = '';
    pPr=0;
    contpPr = new Array;

    // _____________ SE CARGAN TODAS LAS OPCIONES DE DATOS DESDE LA BASE DE DATOS EN LOS SELECTS DE LA VENTANA DE MODIFICACION _____________________
    const postData = {CargarSelects: true,}   
    $.post('php/modificar.php', postData, (response) => {
      //console.log(response);
      let datos= JSON.parse(response);
      //console.log(datos);
      datos['personas'].forEach(dato => {
        //console.log(dato.nom_prop);
        tempProp +=`<option>${dato.nom_prop}</option>` 
  
      });
      
      for (i=0; i<IDp.length;i++){
        pPr=0;
        datos['personas'].forEach(dato => {
          if (dato.nom_prop == IDp[i]){
            contpPr[i] = pPr;
          }else{
            pPr++;
          }
        });        
      }
      for (i=0; i<IDp.length; i++){
        $('#SelModProp'+i).html(tempProp);
        document.getElementById('SelModProp'+i).options.item(contpPr[i]).selected = 'selected';
      }
    });
    //__________ TERMINA LA CREACION DE TODA LA VENTANA DE MODIFICACION DE DATOS DE ESTE OBJETO (Accidentes) _________________
  }
 
//======================================================================================
  // SE VAN A MODIFICAR CUENCAS
  if (Id.id.substring(0,5) == "IDCue"){
   /* Datas = (Significado)
    Data=1 : Accidentes geograficos
    Data=2 Complejos
    Data=3 Cuencas
    Data=4 Relevamientos
    Data=5 Fauna
    Data=6 Flora
    Data=7 Presiones
    Data=8 Personas */
    var Data= 3;

    IdCue = parseInt(Id.innerText);
    // _________CREA TODA LA VENTANA DONDE SE MOSTRARAN LOS CAMPOS A MODIFICAR_________
    NewForm = 
    "<div id='formModifData' class='modal' role='document' style='background: rgba(0,0,0,0.8);'>"+
        "<div class='modal-dialog modal-lg' style='display: inline-table;'>"+
            "<div class='modal-content' style='width: 92vmax; left: 3vmax; border: 2px solid #343a40;'>"+
                "<div class='modal-header'  style='background:#343a40; color:lightgrey;'>"+
                    "<h5 class='modal-title' style='color:lightgrey;'>Modificar Cuenca <a id='TitModId'class='modal-title' style='color:lightgrey;'>"+IdCue+"</a></h5>"+
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
  
     // _________EXTRAE EN VARIABLES LOS DISTINTOS CAMPOS DE DATOS_________
    for (i=0; i< tds.length; i++){
      if (i==0){ //Contiene el botón
      }
      if (i==1){
        //console.log("ID: "+tds[i].innerText);
        var IDCue = tds[i].innerText;
      }
      if (i==2){
        //console.log("Nombre: "+tds[i].innerText);
        var IDNom = tds[i].innerText;
      }
      if (i==3){
        //console.log("Tipo: "+tds[i].innerText);
        var IDSup = tds[i].innerText;
      }
      if (i==4){
        //console.log("Complejo: "+tds[i].innerText);
        var IDTip = tds[i].innerText;
      }
       
    }

// ______________ SE CREAN TODOS LSO CAMPOS DE DATOS QUE SE PERMITIRAN MODIFICAR SOBRE ESTE OBJETO A MODIFICAR _____________________
    data =  
    "<section style='display: flex;'>"+
      "<div style=' width: 50%; padding-left: 20px;'>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Nombre de Cuenca: </a>" +
            "<input type='text' id='InpModNombre' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value="+IDNom+"><br><br><br>" + 
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Superficie de Cuenca: </a>" +
            "<input type='text' id='InpModSup' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value="+IDSup+"><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Tipo de Cuenca: </a>" +
            "<input type='text' id='InpModTipo' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value="+IDTip+"><br><br><br>" +
        "</div>"+
      "</div>"+
    "</section>";
    
    $("#dataModif").html(data);
  
    //__________ TERMINA LA CREACION DE TODA LA VENTANA DE MODIFICACION DE DATOS DE ESTE OBJETO (Accidentes) _________________
  }

//======================================================================================
  // SE VAN A MODIFICAR RELEVAMIENTOS
  if (Id.id.substring(0,5) == "IDRel"){
    console.log("Modificar un relevamiento");
  }
  
//======================================================================================
  // SE VAN A MODIFICAR FAUNA
  if (Id.id.substring(0,5) == "IDFau"){
    /* Datas = (Significado)
    Data=1 : Accidentes geograficos
    Data=2 Complejos
    Data=3 Cuencas
    Data=4 Relevamientos
    Data=5 Fauna
    Data=6 Flora
    Data=7 Presiones
    Data=8 Personas */
    var Data= 5;

    //console.log("Modificar un accidente");
    IdFau = parseInt(Id.innerText);
    //console.log("   ID del accidente:"+IdAcc);
    // _________CREA TODA LA VENTANA DONDE SE MOSTRARAN LOS CAMPOS A MODIFICAR_________
    NewForm = 
    "<div id='formModifData' class='modal' role='document' style='background: rgba(0,0,0,0.8);'>"+
        "<div class='modal-dialog modal-lg' style='display: inline-table;'>"+
            "<div class='modal-content' style='width: 92vmax; left: 3vmax; border: 2px solid #343a40;'>"+
                "<div class='modal-header'  style='background:#343a40; color:lightgrey;'>"+
                    "<h5 class='modal-title' style='color:lightgrey;'>Modificar Fauna <a id='TitModId'class='modal-title' style='color:lightgrey;'>"+IdFau+"</a></h5>"+
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
  
     // _________EXTRAE EN VARIABLES LOS DISTINTOS CAMPOS DE DATOS_________
    for (i=0; i< tds.length; i++){
      if (i==0){ //Contiene el botón
      }
      if (i==1){ //contiene la Id
        var IDFa = tds[i].innerText;
      }
      if (i==2){ //contiene el nombre coloquial
        var IDNomCol = tds[i].innerText;
      }
      if (i==3){ //contiene el nombre cientifico
        var IDNomCie  = tds[i].innerText;
      }
      if (i==4){ //contiene la descripcion
        var IDDes = tds[i].innerText;
      }

    }

// ______________ SE CREAN TODOS LSO CAMPOS DE DATOS QUE SE PERMITIRAN MODIFICAR SOBRE ESTE OBJETO A MODIFICAR _____________________
    data =  
    "<section style='display: flex;'>"+
      "<div style=' width: 300px; padding-left: 20px;'>"+
          "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
              "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Nombre Coloquial: </a>" +
              "<input type='text' id='InpModNombreCol' class='form-control' style='background: #e2e2e2; color:black; width: 250px; height: 25px;' value="+IDNomCol+"><br><br><br>" + 
          "</div>"+
          "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
              "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Nombre Científico: </a>" +
              "<input type='text' id='InpModNombreCien' class='form-control' style='background: #e2e2e2; color:black; width: 250px; height: 25px;' value="+IDNomCie+"><br><br><br>" +
          "</div>"+
      "</div>"+
      "<div style=' text-align: -webkit-center; width: 50%; height: 200px;>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px;'>Descripcion: </a><br>" +
          "<textarea id='TextModDesc' class='form-control' style='background: #e2e2e2; color:black; width: 400px; height: 200px; min-height: 100px; max-height: 225px;''>"+IDDes+"</textarea><br><br><br>"+
      "</div>"+
    "</section>";
    

    $("#dataModif").html(data);
    //__________ TERMINA LA CREACION DE TODA LA VENTANA DE MODIFICACION DE DATOS DE ESTE OBJETO (Accidentes) _________________
  }
  
//======================================================================================
  // SE VAN A MODIFICAR FLORA
  if (Id.id.substring(0,5) == "IDFlo"){
    /* Datas = (Significado)
    Data=1 : Accidentes geograficos
    Data=2 Complejos
    Data=3 Cuencas
    Data=4 Relevamientos
    Data=5 Fauna
    Data=6 Flora
    Data=7 Presiones
    Data=8 Personas */
    var Data= 6;

    //console.log("Modificar un accidente");
    IdFlo = parseInt(Id.innerText);
    //console.log("   ID del accidente:"+IdAcc);
    // _________CREA TODA LA VENTANA DONDE SE MOSTRARAN LOS CAMPOS A MODIFICAR_________
    NewForm = 
    "<div id='formModifData' class='modal' role='document' style='background: rgba(0,0,0,0.8);'>"+
        "<div class='modal-dialog modal-lg' style='display: inline-table;'>"+
            "<div class='modal-content' style='width: 92vmax; left: 3vmax; border: 2px solid #343a40;'>"+
                "<div class='modal-header'  style='background:#343a40; color:lightgrey;'>"+
                    "<h5 class='modal-title' style='color:lightgrey;'>Modificar Flora <a id='TitModId'class='modal-title' style='color:lightgrey;'>"+IdFlo+"</a></h5>"+
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
  
     // _________EXTRAE EN VARIABLES LOS DISTINTOS CAMPOS DE DATOS_________
    for (i=0; i< tds.length; i++){
      if (i==0){ //Contiene el botón
      }
      if (i==1){ //contiene la Id
        var IDFl = tds[i].innerText;
      }
      if (i==2){ //contiene el nombre coloquial
        var IDNomCol = tds[i].innerText;
      }
      if (i==3){ //contiene el nombre cientifico
        var IDNomCie  = tds[i].innerText;
      }
      if (i==4){ //contiene la descripcion
        var IDDes = tds[i].innerText;
      }

    }
// ______________ SE CREAN TODOS LSO CAMPOS DE DATOS QUE SE PERMITIRAN MODIFICAR SOBRE ESTE OBJETO A MODIFICAR _____________________
    data =  
    "<section style='display: flex;'>"+
      "<div style=' width: 300px; padding-left: 20px;'>"+
          "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
              "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Nombre Coloquial: </a>" +
              "<input type='text' id='InpModNombreCol' class='form-control' style='background: #e2e2e2; color:black; width: 250px; height: 25px;' value="+IDNomCol+"><br><br><br>" + 
          "</div>"+
          "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
              "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Nombre Científico: </a>" +
              "<input type='text' id='InpModNombreCien' class='form-control' style='background: #e2e2e2; color:black; width: 250px; height: 25px;' value="+IDNomCie+"><br><br><br>" +
          "</div>"+
      "</div>"+
      "<div style=' text-align: -webkit-center; width: 50%; height: 200px;>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px;'>Descripcion: </a><br>" +
          "<textarea id='TextModDesc' class='form-control' style='background: #e2e2e2; color:black; width: 400px; height: 200px; min-height: 100px; max-height: 225px;''>"+IDDes+"</textarea><br><br><br>"+
      "</div>"+
    "</section>";

    $("#dataModif").html(data);
    //__________ TERMINA LA CREACION DE TODA LA VENTANA DE MODIFICACION DE DATOS DE ESTE OBJETO (Accidentes) _________________
  }

//======================================================================================
  // SE VAN A MODIFICAR PRESIONES
  if (Id.id.substring(0,5) == "IDPre"){
    /* Datas = (Significado)
    Data=1 : Accidentes geograficos
    Data=2 Complejos
    Data=3 Cuencas
    Data=4 Relevamientos
    Data=5 Fauna
    Data=6 Flora
    Data=7 Presiones
    Data=8 Personas */
    var Data= 7;

    IdPre = parseInt(Id.innerText);
    // _________CREA TODA LA VENTANA DONDE SE MOSTRARAN LOS CAMPOS A MODIFICAR_________
    NewForm = 
    "<div id='formModifData' class='modal' role='document' style='background: rgba(0,0,0,0.8);'>"+
        "<div class='modal-dialog modal-lg' style='display: inline-table;'>"+
            "<div class='modal-content' style='width: 92vmax; left: 3vmax; border: 2px solid #343a40;'>"+
                "<div class='modal-header'  style='background:#343a40; color:lightgrey;'>"+
                    "<h5 class='modal-title' style='color:lightgrey;'>Modificar Presión <a id='TitModId'class='modal-title' style='color:lightgrey;'>"+IdPre+"</a></h5>"+
                    "<button type='button' style='color:lightgrey; background: #343a40; border: 0px;' onclick='deletesHTML(`formModifData`);' data-bs-dismiss='modal' aria-label='Close'>"+
                        "<i class='fa-solid fa-x' style='color:lightgrey;'></i>"+
                    "</button>"+
                "</div>"+
                "<div id='dataModif' class='modal-body'>"+
                "</div>"+
                "<div class='modal-body' style=' align-self: flex-end;'>"+
                    "<button id='CargarModif' type='button' class='btn btn-primary' onclick='CargarModificaciones("+Data+");'>Confirmar Modificación</button>"+
                "</div>"+
            "</div>"+
        "</div>"+
    "</div>";
    $("body").append(NewForm);
    $("#formModifData").show();
  
     // _________EXTRAE EN VARIABLES LOS DISTINTOS CAMPOS DE DATOS_________
    for (i=0; i< tds.length; i++){
      if (i==0){ //Contiene el botón
      }
      if (i==1){ //contiene la Id
        var IDPr = tds[i].innerText;
      }
      if (i==2){ //contiene el nombre coloquial
        var IDTipo = tds[i].innerText;
      }
      if (i==3){ //contiene el nombre cientifico
        var IDObs  = tds[i].innerText;
      }
    }
// ______________ SE CREAN TODOS LSO CAMPOS DE DATOS QUE SE PERMITIRAN MODIFICAR SOBRE ESTE OBJETO A MODIFICAR _____________________
    data =  
    "<section style='display: flex;'>"+
      "<div style=' width: 300px; padding-left: 20px;'>"+
          "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
              "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Tipo de presión: </a>" +
              "<input type='text' id='InpModTipo' class='form-control' style='background: #e2e2e2; color:black; width: 250px; height: 25px;' value="+IDTipo+"><br><br><br>" + 
          "</div>"+
      "</div>"+
      "<div style=' text-align: -webkit-center; width: 50%; height: 200px;>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px;'>Observación: </a><br>" +
          "<textarea id='TextModObs' class='form-control' style='background: #e2e2e2; color:black; width: 400px; height: 200px; min-height: 100px; max-height: 225px;''>"+IDObs+"</textarea><br><br><br>"+
      "</div>"+
    "</section>";

    $("#dataModif").html(data);
    //__________ TERMINA LA CREACION DE TODA LA VENTANA DE MODIFICACION DE DATOS DE ESTE OBJETO (Accidentes) _________________
  }
  
//======================================================================================
  // SE VAN A MODIFICAR PERSONAS
  if (Id.id.substring(0,5) == "IDPer"){
    /* Datas = (Significado)
    Data=1 : Accidentes geograficos
    Data=2 Complejos
    Data=3 Cuencas
    Data=4 Relevamientos
    Data=5 Fauna
    Data=6 Flora
    Data=7 Presiones
    Data=8 Personas */
    var Data= 8;

    IdPer = parseInt(Id.innerText);

    // _________CREA TODA LA VENTANA DONDE SE MOSTRARAN LOS CAMPOS A MODIFICAR_________
    NewForm = 
    "<div id='formModifData' class='modal' role='document' style='background: rgba(0,0,0,0.8);'>"+
        "<div class='modal-dialog modal-lg' style='display: inline-table;'>"+
            "<div class='modal-content' style='width: 92vmax; left: 3vmax; border: 2px solid #343a40;'>"+
                "<div class='modal-header'  style='background:#343a40; color:lightgrey;'>"+
                    "<h5 class='modal-title' style='color:lightgrey;'>Modificar Información de la Persona <a id='TitModId'class='modal-title' style='color:lightgrey;'>"+IdPer+"</a></h5>"+
                    "<button type='button' style='color:lightgrey; background: #343a40; border: 0px;' onclick='deletesHTML(`formModifData`);' data-bs-dismiss='modal' aria-label='Close'>"+
                        "<i class='fa-solid fa-x' style='color:lightgrey;'></i>"+
                    "</button>"+
                "</div>"+
                "<div id='dataModif' class='modal-body'>"+
                "</div>"+
                "<div class='modal-body' style=' align-self: flex-end;'>"+
                    "<button id='CargarModif' type='button' class='btn btn-primary' onclick='CargarModificaciones("+Data+");'>Confirmar Modificación</button>"+
                "</div>"+
            "</div>"+
        "</div>"+
    "</div>";
    $("body").append(NewForm);
    $("#formModifData").show();
  
     // _________EXTRAE EN VARIABLES LOS DISTINTOS CAMPOS DE DATOS_________
    for (i=0; i< tds.length; i++){
      if (i==0){ //Contiene el botón
      }
      if (i==1){
        var IDper = tds[i].innerText;
      }
      if (i==2){
        var IDnom = tds[i].innerText;
      }
      if (i==3){
        //console.log("Tipo: "+tds[i].innerText);
        var IDCorr = tds[i].innerText;
      }
      if (i==4){
        //console.log("Complejo: "+tds[i].innerText);
        var IDTel = tds[i].innerText;
      }
      if (i==5){
        //console.log("Cuenca: "+tds[i].innerText);
        var IDDir = tds[i].innerText;
      }
      if (i==6){
        var EsMiem = false;
        var EsProp = false;
        Propies = new Array;
        Rol = new Array;
        CantRol = 0;
        CantPropie = 0;
        var Act = tds[i].innerText.split("\n"); //Divide toda la cadena de texto en un array donde cada salto de linea es un dato en el array
        //console.log("Act.length: "+Act.length);
        for (j=0 ; j<Act.length; j++){
          //console.log(Act[j]);
          if (Act[j] == "Miembro del proyecto"){
            EsMiem = true;
            continue;
          }
          if (Act[j] == "Propietario"){
            EsProp = true;
            continue;
          }
          if (Act[j]==""){
            continue;
          }
          if (EsProp){
            Propies[CantPropie] = Act[j].substring(2);
            CantPropie++;
          }else{
           if (EsMiem){
             Rol[CantRol] = Act[j].substring(2);
             CantRol++;
           } 
          }
        }
      }
    }
  
    console.log(Rol);
    console.log(Propies);
   
    

// ______________ SE CREAN TODOS LOS CAMPOS DE DATOS QUE SE PERMITIRAN MODIFICAR SOBRE ESTE OBJETO A MODIFICAR _____________________
    data =  
    "<section style='display: flex;'>"+
    "<div style=' width: 40%; padding-left: 20px;'>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Nombre de la persona: </a>" +
            "<input type='text' id='InpModNombre' class='form-control' style='background: #e2e2e2; color:black; width: 90%; height: 25px;' value="+IDnom+"><br><br><br>" + 
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Correo: </a>" +
            "<input type='text' id='InpModCorreo' class='form-control' style='background: #e2e2e2; color:black; width: 90%; height: 25px;' value="+IDCorr+"><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Teléfono: </a>" +
            "<input type='text' id='InpModTelefono' class='form-control' style='background: #e2e2e2; color:black; width: 90%; height: 25px;' value="+IDTel+"><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Teléfono: </a>" +
            "<input type='text' id='InpModDireccion' class='form-control' style='background: #e2e2e2; color:black; width: 90%; height: 25px;' value="+IDDir+"><br><br><br>" +
        "</div>"+
    "</div>"+
    "<div id='ContPadreRol' style=' width: 20%; padding: 0px; height: 280px;'>"+
      
    "</div>";
 

    var data2 = "";
    var roling = "";
    const postDataCheck = {CargarSelects: true,}   
    $.post('php/modificar.php', postDataCheck, (response) => {
      var check=false;
      let datos = JSON.parse(response);
      data2= data2+"<a style='font-weight: bold; color: grey; font-size: 15px;'>Rol en el proyecto: </a><br>";
      for (i=0;i<datos['roles'].length;i++){
        check= false;
        roling=datos['roles'][i].tipo;
        data2 = data2 + 
        "<div class='form-check'>";
        for(j=0;j<Rol.length;j++){
          //console.log(roling+ "=="+ Rol[j]);
          if (roling == Rol[j]){
            check =true;
          };
        }
        if (check){
          data2 = data2 + 
          "<input class='form-check-input' type='checkbox' value='' id='Check"+i+"' checked=''>";
        }else{
          data2 = data2 + 
          "<input class='form-check-input' type='checkbox' value='' id='Check"+i+"'>";
        }
        data2 = data2 + 
          "<label  id='labelCheck"+i+"' class='form-check-label' style='font-size: 12px;' for='Check"+i+"'>"+
            roling+
          "</label>"+
        "</div>";
      }
      $("#ContPadreRol").html(data2);

    });
  
    
    
    data = data + 
    "</div>"+
    "<div id='ContPadreProp' style=' width: 40%; padding-left: 20px; height: 280px; overflow-x: auto;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 15px;'>Propiedades: </a><br>";

    if (Propies.length==0){
      data = data+"<button id='BtnNewRelProp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPropiedad("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>";
    };
    for (i=0 ; i<Propies.length; i++){
      data = data+"<div id='ContBtnSelProp"+i+"' style='display:flex; margin-bottom: 15px;'>"+
                    "<button id='BtnQuitProp"+i+"' type='button' class='btn btn-danger' style='height: 20px; width: 20px; padding: 0px;' onclick='quitarPropiedad(SelModProp"+i+",BtnQuitProp"+i+",ContBtnSelProp"+i+","+i+");'> X </button>"+
                    "<select id='SelModProp"+i+"' class='form-select' style='background: #e2e2e2; color:black; width: 300px; min-width: 230px; padding: 0px; padding-left: 24px;font-size: 12px; height: 20px;'>"+
                        "<option>"+Propies[i]+" 1</option>"+
                        "<option>"+Propies[i]+" 2</option>"+
                        "<option>"+Propies[i]+" 3</option>"+
                    "<select>";
                 
      if(i == (Propies.length-1)){
        data = data+"<button id='BtnNewRelProp' type='button' class='btn btn-success' style='height: 20px; width: 20px; padding: 0px;' onclick='AñadirPropiedad("+(i+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
      }
      data = data+"</div>";
    }
    "</section>";
    $("#dataModif").html(data);




    tempComp = '';
    contPropie = new Array;

    const postData = {CargarSelects: true,}   
    $.post('php/modificar.php', postData, (response) => {
      let datos = JSON.parse(response);
     
      datos['complejos'].forEach(dato => {
        tempComp +=`<option>${dato.nombre_complejo}</option>` 
  
      });
      for (i=0; i<Propies.length;i++){
        pPr=0;
        datos['complejos'].forEach(dato => {
          if (dato.nombre_complejo == Propies[i]){
            contPropie[i] = pPr;
          }else{
            pPr++;
          }
        });        
      }

      for (i=0; i<Propies.length; i++){
        $('#SelModProp'+i).html(tempComp);
        document.getElementById('SelModProp'+i).options.item(contPropie[i]).selected = 'selected';
      }

    });
    //__________ TERMINA LA CREACION DE TODA LA VENTANA DE MODIFICACION DE DATOS DE ESTE OBJETO (personas) _________________
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
                    "Se modificaran los datos registrados, esto es un cambio irreversible. Para volver los datos a como estaban antes deberá hacer una nueva modificación"+ 
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

  switch (Data){ 
    case 1: //Accidentes
      var Presiones = new Array();
      for (i=0; i<CantPres; i++){
        Presiones.push($('#SelModPres'+i+' option:selected').text());
      };
     // console.log("entra4");
      //console.log(Presiones);
      
      const postData1 = {
        IdAccidente:$('#TitModId').text(),
        NombreAccidente: $('#InpModNombre').val(),
        TipoAccidente: $('#InpModTipo').val(),
        CuencaAccidente: $('#SelModCuen').val(),
        ComplejaAccidente: $('#SelModComp').val(),
        PresionAccidente: Presiones,
        DescripcionAccidente: $('#TextModDesc').val(),
        ModiAcc : true,
      };

      console.log(postData1);

      $.post('php/modificar.php', postData1, (response) => {
        console.log(response);
        CerrarAlerta();
        deletesHTML("formModifData");

        var postData1_2= {
          accidente:true,
        }
        
        $('#ContTable').css({'visibility':'visible'});
        
        $.post('php/modificar.php', postData1_2, (response) => {
          console.log(response);  
          $("#myTable").html(response);
        });
      });
      break;

    case 2: //Complejos
      var Propietarios = new Array();

      for (i=0; i<CantProp; i++){
        Propietarios.push($('#SelModProp'+i+' option:selected').text());
      };
      
      const postData2 = {
        IdComplejo:$('#TitModId').text(),
        NombreComplejo: $('#InpModNombre').val(),
        PropietariosComplejo: Propietarios,
        ModiComp : true,
      };

      console.log(postData2);

      $.post('php/modificar.php', postData2, (response) => {
        console.log(response);
        CerrarAlerta();
        deletesHTML("formModifData");

        var postData2_2= {
          complejo:true,
        }
        
        $('#ContTable').css({'visibility':'visible'});
        
        $.post('php/modificar.php', postData2_2, (response) => {
          console.log(response);  
          $("#myTable").html(response);
        });
      });
      break;

    case 3: //Cuencas
      const postData3 = {
        IdCuenca:$('#TitModId').text(),
        NombreCuenca: $('#InpModNombre').val(),
        SuperficieCuenca: $('#InpModSup').val(),
        TipoCuenca: $('#InpModTipo').val(),
        ModiCue : true,
      };

      console.log(postData3);

      $.post('php/modificar.php', postData3, (response) => {
        console.log(response);
        CerrarAlerta();
        deletesHTML("formModifData");

        var postData3_2= {
          cuenca:true,
        }
        
        $('#ContTable').css({'visibility':'visible'});
        
        $.post('php/modificar.php', postData3_2, (response) => {
          console.log(response);  
          $("#myTable").html(response);
        });
      });
      break;

    case 4: //relevamientos
      break;

    case 5: //Faunas     
      const postData5 = {
        IdFau:$('#TitModId').text(),
        NombreColFau: $('#InpModNombreCol').val(),
        NombreCienFau: $('#InpModNombreCien').val(),
        DescripcionFau: $('#TextModDesc').val(),
        ModiFau : true,
      };

      console.log(postData5);

      $.post('php/modificar.php', postData5, (response) => {
        console.log(response);
        CerrarAlerta();
        deletesHTML("formModifData");

        var postData5_2= {
          fauna:true,
        }
        
        $('#ContTable').css({'visibility':'visible'});
        
        $.post('php/modificar.php', postData5_2, (response) => {
          console.log(response);  
          $("#myTable").html(response);
        });
      });
      break;
    
    case 6: //Floras
      const postData6 = {
        IdFlo:$('#TitModId').text(),
        NombreColFlo: $('#InpModNombreCol').val(),
        NombreCienFlo: $('#InpModNombreCien').val(),
        DescripcionFlo: $('#TextModDesc').val(),
        ModiFlo : true,
      };

      console.log(postData6);

      $.post('php/modificar.php', postData6, (response) => {
        console.log(response);
        CerrarAlerta();
        deletesHTML("formModifData");

        var postData6_2= {
          flora:true,
        }
        
        $('#ContTable').css({'visibility':'visible'});
        
        $.post('php/modificar.php', postData6_2, (response) => {
          console.log(response);  
          $("#myTable").html(response);
        });
      });
      break;
    
    case 7: //Presiones
      const postData7 = {
        IdPres:$('#TitModId').text(),
        TipoPres: $('#InpModTipo').val(),
        ObservacionPres: $('#TextModObs').val(),
        ModiPres : true,
      };

      console.log(postData7);

      $.post('php/modificar.php', postData7, (response) => {
        console.log(response);
        CerrarAlerta();
        deletesHTML("formModifData");

        var postData7_2= {
          presion:true,
        }
        
        $('#ContTable').css({'visibility':'visible'});
        
        $.post('php/modificar.php', postData7_2, (response) => {
          console.log(response);  
          $("#myTable").html(response);
        });
      });
      break;

    case 8: //Personas
      var Roles = new Array();
      var count = 0;
      var Test = true;
      while (Test){
        Test=!!document.getElementById("Check"+count);
        if (Test){
          count++;
        }
      }
      for (i=0; i<count; i++){
        if (document.getElementById('Check'+i).checked){
          Roles.push($('#labelCheck'+i).text());
        }
      };
     
      var Propiedades = new Array();
      for (i=0;i<CantPropie;i++){
        Propiedades.push($('#SelModProp'+i+' option:selected').text());
      }
      
  
    
      const postData8 = {
        IdPersona:$('#TitModId').text(),
        NombrePersona: $('#InpModNombre').val(),
        CorreoPersona: $('#InpModCorreo').val(),
        telefonoPersona: $('#InpModTelefono').val(),
        direccionPersona: $('#InpModDireccion').val(),
        RolesPersona: Roles,
        PropiedadesPersona: Propiedades,
        ModiPers : true,
      };

      console.log(postData8);

      $.post('php/modificar.php', postData8, (response) => {
        console.log(response);
        /*
        CerrarAlerta();
        deletesHTML("formModifData");

        var postData8_2= {
          persona:true,
        }
      
        $('#ContTable').css({'visibility':'visible'});
      
        $.post('php/modificar.php', postData8_2, (response) => {
          console.log(response);  
          $("#myTable").html(response);
        });*/
      });
    break;
  }
  
}
