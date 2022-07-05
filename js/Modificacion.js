var CantPres= 0;
var CantProp= 0;
var CantReles= 0;
var CantFau= 0;
var CantFlo= 0;
var IDp = new Array;  //Es necesario definirlo como un nuevo array, pero luego hay que limpiar cada direccion, cada contenedor del array empieza con 'undefined' como dato
var IDFau = new Array;
var IDFlo = new Array;
var IDRels = new Array;
var CantRol = 0;
var CantPropie = 0;
var Propies = new Array;
var Rol = new Array;



function MostrarFormulario(op){
  console.log(op);
  switch (op){
    case 1: //cuenca
      $('#form_cuenca_add').show();
      //document.getElementById("form_presion_add").style.zIndex=1000;
      document.getElementById("formModifData").style.zIndex=100;
      document.getElementById("form_modif").style.zIndex=10;
    break;
    case 2: //complejo
      $('#form_complejo_add').show();
      //document.getElementById("form_presion_add").style.zIndex=1000;
      document.getElementById("formModifData").style.zIndex=100;
      document.getElementById("form_modif").style.zIndex=10;
    break;
    case 3: //presiones
      $('#form_presion_add').show();
      //document.getElementById("form_presion_add").style.zIndex=1000;
      document.getElementById("formModifData").style.zIndex=100;
      document.getElementById("form_modif").style.zIndex=10;

      break;
    case 4: //fauna
      $('#form_fauna_add').show();
      //document.getElementById("form_presion_add").style.zIndex=1000;
      document.getElementById("formModifData").style.zIndex=100;
      document.getElementById("form_modif").style.zIndex=10;
      break;
    case 5: //flora
      $('#form_flora_add').show();
      //document.getElementById("form_presion_add").style.zIndex=1000;
      document.getElementById("formModifData").style.zIndex=100;
      document.getElementById("form_modif").style.zIndex=10;
      break;

  }
  
}


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
//================================================
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
//================================================

function quitarRelevadores(IDSelect,BtnQuit,Contenedor,Pos){
//console.log("antes de quitar CantPres:"+CantPres);
if (CantReles == 0){
    
}
else{
  //console.log(Contenedor.id+ " || ContBtnSelProp"+(CantReles-1));
  if (Contenedor.id == ("ContBtnSelRele"+(CantReles-1))){
    ButAdd = "<button id='BtnNewRele' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirRelevadores("+(CantReles-1)+");'> <i class='fa-solid fa-plus'></i> </button>";
    //console.log("ContBtnSelProp"+(CantReles-2));
    $("#ContBtnSelRele"+(CantReles-2)).append(ButAdd);
    //console.log("creó el boton");
    //console.log("#"+BtnQuit.id);
    $("#"+BtnQuit.id).remove();
    //console.log("#"+IDSelect.id);
    $("#"+IDSelect.id).remove();
    $("#"+Contenedor.id).remove();
    if (CantReles == 1){
      $("#ContPadreReles").append("<button id='BtnNewRele' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirRelevadores("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>");
    }
  }else
  {
    //console.log("entra a la parte de cambiar IDs");
    $("#"+BtnQuit.id).remove();
    //console.log("#"+IDSelect.id);
    $("#"+IDSelect.id).remove();
    $("#"+Contenedor.id).remove();
    for (i=Pos; i<CantReles; i++){
      $("#ContBtnSelRele"+(i+1)).attr("id","ContBtnSelRele"+i);
      $("#BtnQuitRele"+(i+1)).attr("id","BtnQuitRele"+i);
      //console.log("hace el attr para cambiar la funcion");
      $("#BtnQuitRele"+(i)).attr("onclick","quitarRelevadores(SelModRele"+i+",BtnQuitRele"+i+",ContBtnSelRele"+i+","+i+");");
      $("#SelModRele"+(i+1)).attr("id","SelModRele"+i);
      if (i==CantReles-1){
        //console.log("newButton en "+i);
        $("#BtnNewRele").remove();
        $("#ContBtnSelRele"+(i-1)).append("<button id='BtnNewRele' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirRelevadores("+(i)+");'> <i class='fa-solid fa-plus'></i> </button>");
      }
    }
  }
  CantReles--;
}
console.log("despues de quitar CantReles:"+CantReles);
}

function AñadirRelevadores(NID){
  $("#BtnNewRele").remove();
  appendSelect = 
  "<div id='ContBtnSelRele"+NID+"' style='display:flex; margin-bottom: 15px;'>"+
    "<button id='BtnQuitRele"+NID+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarRelevadores(SelModRele"+NID+",BtnQuitRele"+NID+",ContBtnSelRele"+NID+","+NID+");'> X </button>"+
      "<select id='SelModRele"+NID+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
        "<option>"+IDRels[NID]+" 1</option>"+
        "<option>"+IDRels[NID]+" 2</option>"+
        "<option>"+IDRels[NID]+" 3</option>"+
      "<select>"+
      "<button id='BtnNewRele' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirRelevadores("+(NID+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
  $("#ContPadreReles").append(appendSelect);
  CantReles++;
  tempRel='';
  contpPr = new Array;
  const postData = {CargarSelects: true,}   
  $.post('php/modificar.php', postData, (response) => {
    let datos= JSON.parse(response);
    datos['miembros'].forEach(dato => {
      tempRel +=`<option>${dato.miembro}</option>` 
    });
    for (i=0; i<CantReles;i++){
      pRel=0;
      datos['miembros'].forEach(dato => {
        if (dato.miembro == IDRels[i]){
          contpRel[i] = pRel;
        }else{
          pRel++;
        }
      });        
    }
    for (i=0; i<CantReles; i++){
      $('#SelModRele'+i).html(tempRel);
      document.getElementById('SelModRele'+i).options.item(contpRel[i]).selected = 'selected';
    }
  });
  console.log("ahora CantReles:"+CantReles);
}
//================================================

function quitarFauna(IDSelect,BtnQuit,Contenedor,Pos){
  //console.log("antes de quitar CantPres:"+CantPres);
  if (CantFau == 0){
      
  }
  else{
    //console.log(Contenedor.id+ " || ContBtnSelProp"+(CantFau-1));
    if (Contenedor.id == ("ContBtnSelFau"+(CantFau-1))){
      ButAdd = "<button id='BtnNewFau' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFauna("+(CantFau-1)+");'> <i class='fa-solid fa-plus'></i> </button>";
      $("#ContBtnSelFau"+(CantFau-2)).append(ButAdd);
      $("#"+BtnQuit.id).remove();
      $("#"+IDSelect.id).remove();
      $("#"+Contenedor.id).remove();
      if (CantFau == 1){
        $("#ContPadreFau").append("<button id='BtnNewFau' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFauna("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>");
      }
    }else
    {
      $("#"+BtnQuit.id).remove();
      $("#"+IDSelect.id).remove();
      $("#"+Contenedor.id).remove();
      for (i=Pos; i<CantFau; i++){
        $("#ContBtnSelFau"+(i+1)).attr("id","ContBtnSelFau"+i);
        $("#BtnQuitFau"+(i+1)).attr("id","BtnQuitFau"+i);
        $("#BtnQuitFau"+(i)).attr("onclick","quitarFauna(SelModFau"+i+",BtnQuitFau"+i+",ContBtnSelFau"+i+","+i+");");
        $("#SelModFau"+(i+1)).attr("id","SelModFau"+i);
        if (i==CantFau-1){
          $("#BtnNewFau").remove();
          $("#ContBtnSelFau"+(i-1)).append("<button id='BtnNewFau' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFauna("+(i)+");'> <i class='fa-solid fa-plus'></i> </button>");
        }
      }
    }
    CantFau--;
  }
  console.log("despues de quitar CantFau:"+CantFau);
  }
  
function AñadirFauna(NID){
    $("#BtnNewFau").remove();
    appendSelect = 
    "<div id='ContBtnSelFau"+NID+"' style='display:flex; margin-bottom: 15px;'>"+
      "<button id='BtnQuitFau"+NID+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarFauna(SelModFau"+NID+",BtnQuitFau"+NID+",ContBtnSelFau"+NID+","+NID+");'> X </button>"+
        "<select id='SelModFau"+NID+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
          "<option>"+IDFau[NID]+" 1</option>"+
          "<option>"+IDFau[NID]+" 2</option>"+
          "<option>"+IDFau[NID]+" 3</option>"+
        "<select>"+
        "<button id='BtnNewFau' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFauna("+(NID+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
    $("#ContPadreFau").append(appendSelect);
    CantFau++;
    tempFau='';
    contpFau = new Array;
    const postData = {CargarSelects: true,}   
    $.post('php/modificar.php', postData, (response) => {
      let datos= JSON.parse(response);
      datos['fauna'].forEach(dato => {
        tempFau +=`<option>${dato.fauna}</option>` 
      });
      for (i=0; i< CantFau;i++){
        pPr=0;
        datos['fauna'].forEach(dato => {
          if (dato.fauna == IDFau[i]){
            contpFau[i] = pPr;
          }else{
            pPr++;
          }
        });        
      }
      for (i=0; i< CantFau; i++){
        $('#SelModFau'+i).html(tempFau);
        document.getElementById('SelModFau'+i).options.item(contpFau[i]).selected = 'selected';
      }
    });
    console.log("ahora CantFau:"+ CantFau);
  }
  
//================================================

function quitarFlora(IDSelect,BtnQuit,Contenedor,Pos){
  //console.log("antes de quitar CantFlo:"+CantFlo);
  if (CantFlo == 0){
      
  }
  else{
    //console.log(Contenedor.id+ " || ContBtnSelProp"+(CantFlo-1));
    if (Contenedor.id == ("ContBtnSelFlo"+(CantFlo-1))){
      ButAdd = "<button id='BtnNewFlo' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFlora("+(CantFlo-1)+");'> <i class='fa-solid fa-plus'></i> </button>";
      $("#ContBtnSelFlo"+(CantFlo-2)).append(ButAdd);
      $("#"+BtnQuit.id).remove();
      $("#"+IDSelect.id).remove();
      $("#"+Contenedor.id).remove();
      if (CantFlo == 1){
        $("#ContPadreFlo").append("<button id='BtnNewFlo' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFlora("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>");
      }
    }else
    {
      $("#"+BtnQuit.id).remove();
      $("#"+IDSelect.id).remove();
      $("#"+Contenedor.id).remove();
      for (i=Pos; i<CantFlo; i++){
        $("#ContBtnSelFlo"+(i+1)).attr("id","ContBtnSelFlo"+i);
        $("#BtnQuitFlo"+(i+1)).attr("id","BtnQuitFlo"+i);
        $("#BtnQuitFlo"+(i)).attr("onclick","quitarFlora(SelModFlo"+i+",BtnQuitFlo"+i+",ContBtnSelFlo"+i+","+i+");");
        $("#SelModFlo"+(i+1)).attr("id","SelModFlo"+i);
        if (i==CantFlo-1){
          $("#BtnNewFlo").remove();
          $("#ContBtnSelFlo"+(i-1)).append("<button id='BtnNewFlo' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFlora("+(i)+");'> <i class='fa-solid fa-plus'></i> </button>");
        }
      }
    }
    CantFlo--;
  }
  console.log("despues de quitar CantFlo:"+CantFlo);
  }
  
  function AñadirFlora(NID){
    $("#BtnNewFlo").remove();
    appendSelect = 
    "<div id='ContBtnSelFlo"+NID+"' style='display:flex; margin-bottom: 15px;'>"+
      "<button id='BtnQuitFlo"+NID+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarFlora(SelModFlo"+NID+",BtnQuitFlo"+NID+",ContBtnSelFlo"+NID+","+NID+");'> X </button>"+
        "<select id='SelModFlo"+NID+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
          "<option>"+IDFlo[NID]+" 1</option>"+
          "<option>"+IDFlo[NID]+" 2</option>"+
          "<option>"+IDFlo[NID]+" 3</option>"+
        "<select>"+
        "<button id='BtnNewFlo' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFlora("+(NID+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
    $("#ContPadreFlo").append(appendSelect);
    CantFlo++;
    tempFlo='';
    contpFlo = new Array;
    const postData = {CargarSelects: true,}   
    $.post('php/modificar.php', postData, (response) => {
      let datos= JSON.parse(response);
      datos['flora'].forEach(dato => {
        tempFlo +=`<option>${dato.flora}</option>` 
      });
      for (i=0; i< CantFlo;i++){
        pPr=0;
        datos['flora'].forEach(dato => {
          if (dato.flora == IDFlo[i]){
            contpFlo[i] = pPr;
          }else{
            pPr++;
          }
        });        
      }
      for (i=0; i< CantFlo; i++){
        $('#SelModFlo'+i).html(tempFlo);
        document.getElementById('SelModFlo'+i).options.item(contpFlo[i]).selected = 'selected';
      }
    });
    console.log("ahora CantFlo:"+ CantFlo);
  }



function ModifData(Fil, Id, trs){
  CantPres= 0;
  CantProp= 0;
  CantReles = 0;
  CantFau= 0;
  CantFlo= 0;
  IDp = new Array;
  IDFlo = new Array;
  IDFau = new Array;
  IDRels = new Array;
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
    var mod=1;

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
            "<input type='text' id='InpModNombre' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDn+"'><br><br><br>" + 
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey;'>Tipo de Accidente Geográfico: </a>" +
            "<select id='InpModTipo' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>" +
                "<option>Humedal</option>"+
                "<option>Lago</option>"+
                "<option>Pantano</option>"+
                "<option>Río</option>"+
                "<option>Arroyo</option>"+
                "<option>Cascada</option>"+
                "<option>Laguna</option>"+
                "<option>Manantial</option>"+
            "</select><br><br><br>"+
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey;'>Cuenca del Accidente Geográfico: <button id='Mper$F' class='btn btn-success' onclick='MostrarFormulario("+1+");' type='button' style=' height: 25px; width: 25px; padding: 0px; font-size: 15px; color: #343a40; border-radius: 25px;'><i class='fa-solid fa-pen'></i></button></a>" +
            "<select id='SelModCuen' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>" +
                "<option>"+IDcu+" 1</option>"+
                "<option>"+IDcu+" 2</option>"+
                "<option>"+IDcu+" 3</option>"+
            "</select><br><br><br>"+
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey;'>Complejo del Accidente Geográfico: <button id='Mper$F' class='btn btn-success' onclick='MostrarFormulario("+2+");' type='button' style=' height: 25px; width: 25px; padding: 0px; font-size: 15px; color: #343a40; border-radius: 25px;'><i class='fa-solid fa-pen'></i></button></a>"+
            "<select id='SelModComp' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>" +
                "<option>"+IDco+" 1</option>"+
                "<option>"+IDco+" 2</option>"+
                "<option>"+IDco+" 3</option>"+
            "</select><br><br><br>" + 
        "</div>"+
    "</div>"+
        "<div id='ContPadrePres' style=' width: 50%; padding-left: 20px; height: 280px; overflow-x: auto;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px;'>Presiones del Accidente Geográfico: <button id='Mper$F' class='btn btn-success' onclick='MostrarFormulario("+3+");' type='button' style=' height: 25px; width: 25px; padding: 0px; font-size: 15px; color: #343a40; border-radius: 25px;'><i class='fa-solid fa-pen'></i></button></a>";

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
    if(IDp.length ==0){
      data = data+"<br><button id='BtnNewRelPresComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPresion("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>";
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
    contpCu = -10;
    contpCo = -10;
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
          if (dato.tipo_presion == IDp[i]){
            contpPr[i] = pPr;
          }else{
            pPr++;
          }
        });        
      }
  
      switch (IDt)
      {
        case "Humedal":
          document.getElementById('InpModTipo').options.item(0).selected = 'selected';
          break;
        case "Lago":
          document.getElementById('InpModTipo').options.item(1).selected = 'selected';
          break;
        case "Pantano":
          document.getElementById('InpModTipo').options.item(2).selected = 'selected';
          break;
        case "Río":
          document.getElementById('InpModTipo').options.item(3).selected = 'selected';
          break;
        case "Arroyo":
          document.getElementById('InpModTipo').options.item(4).selected = 'selected';
          break;
        case "Cascada":
          document.getElementById('InpModTipo').options.item(5).selected = 'selected';
          break;
        case "Laguna":
          document.getElementById('InpModTipo').options.item(6).selected = 'selected';
          break;
        case "Manantial":
          document.getElementById('InpModTipo').options.item(7).selected = 'selected';
          break;
      }

      
      if (contpCu ==-10){
        tempCuen = "<option>... Seleccione una cuenca ...</option>"+ tempCuen;
        contpCu=0;
      }
      $('#SelModCuen').html(tempCuen);
      document.getElementById('SelModCuen').options.item(contpCu).selected = 'selected';
     
      if (contpCo ==-10){
        tempComp = "<option>... Seleccione un complejo ...</option>"+ tempComp;
        contpCo=0;
      }
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
        console.log("Nombre: "+tds[i].innerText);
        var IDnomb = tds[i].innerText;
        console.log("IDnomb: "+IDnomb);
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
            "<input type='text' id='InpModNombre' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDnomb+"'><br><br><br>" + 
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
    if(IDp.length == 0){
      data = data+"<button id='BtnNewRelPropComp' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirPropietario("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>";
     
    }
  
   console.log(data);
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
            "<input type='text' id='InpModNombre' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDNom+"'><br><br><br>" + 
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Superficie de Cuenca: </a>" +
            "<input type='text' id='InpModSup' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDSup+"'><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Tipo de Cuenca: </a>" +
            "<input type='text' id='InpModTipo' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDTip+"'><br><br><br>" +
        "</div>"+
      "</div>"+
    "</section>";
    
    $("#dataModif").html(data);
  
    //__________ TERMINA LA CREACION DE TODA LA VENTANA DE MODIFICACION DE DATOS DE ESTE OBJETO (Accidentes) _________________
  }

//======================================================================================
  // SE VAN A MODIFICAR RELEVAMIENTOS
  if (Id.id.substring(0,5) == "IDRel"){
    /* Datas = (Significado)
    Data=1 : Accidentes geograficos
    Data=2 Complejos
    Data=3 Cuencas
    Data=4 Relevamientos
    Data=5 Fauna
    Data=6 Flora
    Data=7 Presiones
    Data=8 Personas */
    var Data= 4;

    IdRel = parseInt(Id.innerText);
    // _________CREA TODA LA VENTANA DONDE SE MOSTRARAN LOS CAMPOS A MODIFICAR_________
    NewForm = 
    "<div id='formModifData' class='modal' role='document' style='background: rgba(0,0,0,0.8);'>"+
        "<div class='modal-dialog modal-lg' style='display: inline-table;'>"+
            "<div class='modal-content' style='width: 92vmax; left: 3vmax; border: 2px solid #343a40;'>"+
                "<div class='modal-header'  style='background:#343a40; color:lightgrey;'>"+
                    "<h5 class='modal-title' style='color:lightgrey;'>Modificar relevamiento <a id='TitModId'class='modal-title' style='color:lightgrey;'>"+IdRel+"</a></h5>"+
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
        var IDr = tds[i].innerText;
      }
      if (i==2){ //relevamiento del Accidente 
        var IDAcc = tds[i].innerText;
      }
      if (i==3){ // Fecha del relevamiento
        var IDFecha = tds[i].innerText;
      }
      if (i==4){ //Conductividad
        var IDConduc = tds[i].innerText;
      }
      if (i==5){ //Ancho
        var IDAnch = tds[i].innerText;
      }
      if (i==6){ // Oxigeno Disuelto
        var IDOxgD = tds[i].innerText;
      }
      if (i==7){ // Calidad del Agua
        var IDCalAg = tds[i].innerText;
      }
      if (i==8){ // Diversidad Vegetal
        var IDDivVeg = tds[i].innerText;
      }
      if (i==9){ // Regimen hidrologico
        var IDRegHid = tds[i].innerText;
      }
      if (i==10){ //Turbides del agua
        var IDTurbAgua = tds[i].innerText;
      }
      if (i==11){ //Largo
        var IDLar = tds[i].innerText;
      }
      if (i==12){
        var IDPH = tds[i].innerText;
      }
      if (i==13){
        var IDCol = tds[i].innerText;
      }
      if (i==14){
        var IDFuen = tds[i].innerText;
      }
      if (i==15){
        var IDTiemPer = tds[i].innerText;
      }
      if (i==16){
        var IDSup= tds[i].innerText;
      }
      if (i==17){
        var IDTempAg = tds[i].innerText;
      }
      if (i==18){//Relevadores
        p = -1;
        var Relevads = tds[i].innerText.replace(/(\r\n|\n|\r)/gm, "");
        for (j=0 ; j<Relevads.length; j++){
          if (Relevads[j] != "►" && Relevads[j]!= ""){
            IDRels[p] =IDRels[p]+Relevads[j];
          }else{
            j++;
            p++;
            IDRels[p]=''; // Esto vacía el espacio "p" en el array "IDRels" para que no contenga un dato "undefined"
          }
        }
        console.log(IDRels);
      }
      if (i==19){ //Observaciones
        var IDObs = tds[i].innerText;
      }
      if (i==20){ // Fauna
        p = -1;
        var Faunas = tds[i].innerText.replace(/(\r\n|\n|\r)/gm, "");
        for (j=0 ; j<Faunas.length; j++){
          if (Faunas[j] != "►" && Faunas[j]!= ""){
            IDFau[p] = IDFau[p]+Faunas[j];
          }else{
            j++;
            p++;
            IDFau[p]=''; // Esto vacía el espacio "p" en el array "IDFau" para que no contenga un dato "undefined"
          }
        }
      }
      if (i==21){ //Flora
        p = -1;
        var Floras = tds[i].innerText.replace(/(\r\n|\n|\r)/gm, "");
        for (j=0 ; j<Floras.length; j++){
          if (Floras[j] != "►" && Floras[j]!= ""){
            IDFlo[p] = IDFlo[p]+Floras[j];
          }else{
            j++;
            p++;
            IDFlo[p]=''; // Esto vacía el espacio "p" en el array "IDFau" para que no contenga un dato "undefined"
          }
        }
      }
     
    }

// ______________ SE CREAN TODOS LSO CAMPOS DE DATOS QUE SE PERMITIRAN MODIFICAR SOBRE ESTE OBJETO A MODIFICAR _____________________
    data =  
    "<section style='display: flex;'>"+
          "<div style=' height: 50px; font-size: 20px; margin-left: 100px; margin-bottom: 20px; width: 50%;'>"+
              "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Accidente Geográfico: </a>" +
              "<div style='background: #e2e2e2; color:black; width: 50%; max-width: 250px; height: 25px; text-align: center;'>"+IDAcc+"</div><br><br><br>" + 
          "</div>"+
          "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px; width: 50%;'>"+
              "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Fecha del relevamiento: </a>" +
              "<input type='date' id='InpModFecha' class='form-control' style='background: #e2e2e2; color:black; width: 175px; height: 25px;' value='"+IDFecha+"' min='2018-01-01' max='2022-12-31'><br><br><br>" + 
          "</div>"+
    "</section><br><br>"+
    "<section style='display: flex;'>"+
      "<div style=' width: 37%; padding-left: 50px;'>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Conductividad: </a>" +
            "<input type='text' id='InpModConductividad' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDConduc+"'><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Ancho: </a>" +
            "<input type='text' id='InpModAncho' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDAnch+"'><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Largo: </a>" +
            "<input type='text' id='InpModLargo' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDLar+"'><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Superficie: </a>" +
            "<input type='text' id='InpModSuper' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDSup+"'><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Oxigeno Disuelto: </a>" +
            "<input type='text' id='InpModOxigDis' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDOxgD+"'><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Turbidez del agua: </a>" +
            "<input type='text' id='InpModTurbAgua' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDTurbAgua+"'><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>PH del agua: </a>" +
            "<input type='text' id='InpModPH' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDPH+"'><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Color del agua: </a>" +
            "<input type='text' id='InpModColor' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDCol+"'><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Temperatura del agua: </a>" +
            "<input type='text' id='InpModTempAg' class='form-control' style='background: #e2e2e2; color:black; width: 50%; height: 25px;' value='"+IDTempAg+"'><br><br><br>" +
        "</div>"+
      "</div>"+
      "<div style=' width: 37%; padding-left: 20px;'>"+
        "<div  id='RadioModCaliAgua style='height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Calidad del Agua: </a>" +
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              ///console.log("IDCalAg: "+IDCalAg);
              if(IDCalAg=="Conservado"){
                //console.log("Checked1");
                data = data + "<input type='radio' class='form-check-input' name='opAgua' id='agua_op0' value='Conservado' checked=''>";
              }else{
                //console.log("UnChecked1");
                data = data + "<input type='radio' class='form-check-input' name='opAgua' id='agua_op0' value='Conservado'>";
              }
              data = data + 
                "Conservado"+
              "</label>"+
            "</div>"+
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              if(IDCalAg=="Alterado"){
                //console.log("Checked2");
                data = data + "<input type='radio' class='form-check-input' name='opAgua' id='agua_op1' value='Alterado' checked=''>";
              }else{
                ///console.log("UnChecked2");
                data = data + "<input type='radio' class='form-check-input' name='opAgua' id='agua_op1' value='Alterado'>";
              }
              data = data + 
                "Alterado"+
              "</label>"+
            "</div>"+
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              if(IDCalAg=="Muy Alterado"){
                //console.log("Checked3");
                data = data + "<input type='radio' class='form-check-input' name='opAgua' id='agua_op2' value='Muy Alterado' checked=''>";
              }else{
                //console.log("UnChecked3");
                data = data + "<input type='radio' class='form-check-input' name='opAgua' id='agua_op2' value='Muy Alterado'>";
              }
              data = data + 
                "Muy Alterado"+
              "</label>"+
            "</div>"+
        "</div>"+
        "<div  id='RadioModDivVeg style='height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Diversidad Vegetal: </a>" +
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              //console.log("IDDivVeg: "+IDDivVeg);
              if(IDDivVeg=="Conservado"){
                //console.log("Checked1");
                data = data + "<input type='radio' class='form-check-input' name='opDivVeg' id='Veg_op0' value='Conservado' checked=''>";
              }else{
                //console.log("UnChecked1");
                data = data + "<input type='radio' class='form-check-input' name='opDivVeg' id='Veg_op0' value='Conservado'>";
              }
              data = data + 
                "Conservado"+
              "</label>"+
            "</div>"+
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              if(IDDivVeg=="Alterado"){
                //console.log("Checked2");
                data = data + "<input type='radio' class='form-check-input' name='opDivVeg' id='Veg_op1' value='Alterado' checked=''>";
              }else{
                //console.log("UnChecked2");
                data = data + "<input type='radio' class='form-check-input' name='opDivVeg' id='Veg_op1' value='Alterado'>";
              }
              data = data + 
                "Alterado"+
              "</label>"+
            "</div>"+
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              if(IDDivVeg=="Muy Alterado"){
                //console.log("Checked3");
                data = data + "<input type='radio' class='form-check-input' name='opDivVeg' id='Veg_op2' value='Muy Alterado' checked=''>";
              }else{
                //console.log("UnChecked3");
                data = data + "<input type='radio' class='form-check-input' name='opDivVeg' id='Veg_op2' value='Muy Alterado'>";
              }
              data = data + 
                "Muy Alterado"+
              "</label>"+
            "</div>"+
        "</div>"+
        "<div  id='RadioModRegHid style='height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Régimen Hidrológico: </a>" +
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              //console.log("IDRegHid: "+IDRegHid);
              if(IDRegHid=="Conservado"){
                //console.log("Checked1");
                data = data + "<input type='radio' class='form-check-input' name='opRegHid' id='RegHid_op0' value='Conservado' checked=''>";
              }else{
                //console.log("UnChecked1");
                data = data + "<input type='radio' class='form-check-input' name='opRegHid' id='RegHid_op0' value='Conservado'>";
              }
              data = data + 
                "Conservado"+
              "</label>"+
            "</div>"+
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              if(IDRegHid=="Alterado"){
                //console.log("Checked2");
                data = data + "<input type='radio' class='form-check-input' name='opRegHid' id='RegHid_op1' value='Alterado' checked=''>";
              }else{
                //console.log("UnChecked2");
                data = data + "<input type='radio' class='form-check-input' name='opRegHid' id='RegHid_op1' value='Alterado'>";
              }
              data = data + 
                "Alterado"+
              "</label>"+
            "</div>"+
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              if(IDRegHid=="Muy Alterado"){
                //console.log("Checked3");
                data = data + "<input type='radio' class='form-check-input' name='opRegHid' id='RegHid_op2' value='Muy Alterado' checked=''>";
              }else{
                //console.log("UnChecked3");
                data = data + "<input type='radio' class='form-check-input' name='opRegHid' id='RegHid_op2' value='Muy Alterado'>";
              }
              data = data + 
                "Muy Alterado"+
              "</label>"+
            "</div>"+
        "</div>"+
        "<div  id='RadioModTiemPer style='height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Tiempo de permanencia: </a>" +
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              //console.log("IDTiemPer: "+IDTiemPer);
              if(IDTiemPer=="Permanente"){
                //console.log("Checked1");
                data = data + "<input type='radio' class='form-check-input' name='opTiemPer' id='TiemPer_op0' value='Permanente' checked=''>";
              }else{
                //console.log("UnChecked1");
                data = data + "<input type='radio' class='form-check-input' name='opTiemPer' id='TiemPer_op0' value='Permanente'>";
              }
              data = data + 
                "Permanente"+
              "</label>"+
            "</div>"+
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              if(IDTiemPer=="Temporal"){
                //console.log("Checked2");
                data = data + "<input type='radio' class='form-check-input' name='opTiemPer' id='TiemPer_op1' value='Temporal' checked=''>";
              }else{
                //console.log("UnChecked2");
                data = data + "<input type='radio' class='form-check-input' name='opTiemPer' id='TiemPer_op1' value='Temporal'>";
              }
              data = data + 
                "Temporal"+
              "</label>"+
            "</div>"+
        "</div>"+
        "<div  id='RadioModFuente style='height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
          "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Fuente: </a>" +
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              //console.log("IDFuen: "+IDFuen);
              if(IDFuen=="Natural"){
                //console.log("Checked1");
                data = data + "<input type='radio' class='form-check-input' name='opFuente' id='Fuente_op0' value='Natural' checked=''>";
              }else{
                //console.log("UnChecked1");
                data = data + "<input type='radio' class='form-check-input' name='opFuente' id='Fuente_op0' value='Natural'>";
              }
              data = data + 
                "Natural"+
              "</label>"+
            "</div>"+
            "<div class='form-check'>"+
              "<label class='form-check-label'>";
              if(IDFuen=="Artificial"){
                //console.log("Checked2");
                data = data + "<input type='radio' class='form-check-input' name='opFuente' id='Fuente_op1' value='Artificial' checked=''>";
              }else{
                //console.log("UnChecked2");
                data = data + "<input type='radio' class='form-check-input' name='opFuente' id='Fuente_op1' value='Artificial'>";
              }
              data = data + 
                "Artificial"+
              "</label>"+
            "</div>"+
        "</div>"+
    "</div>"+
    "<div>"+
      "<div id='ContPadreReles' style=' width: 100%; padding-left: 20px; height: 165px; overflow-x: auto;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px;'>Relevadores: </a><br>";

    for (i=0 ; i<IDRels.length; i++){
      data = data+"<div id='ContBtnSelRele"+i+"' style='display:flex; margin-bottom: 15px;'>"+
                    "<button id='BtnQuitRele"+i+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarRelevadores(SelModRele"+i+",BtnQuitRele"+i+",ContBtnSelRele"+i+","+i+");'> X </button>"+
                    "<select id='SelModRele"+i+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
                        "<option>"+IDRels[i]+" 1</option>"+
                        "<option>"+IDRels[i]+" 2</option>"+
                        "<option>"+IDRels[i]+" 3</option>"+
                    "<select>";
                 
      if(i == (IDRels.length-1)){
        data = data+"<button id='BtnNewRele' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirRelevadores("+(i+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
      }
      data = data+"</div>";
      CantReles++;
    }
    if(IDRels.length ==0){
      data = data+"<button id='BtnNewRele' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirRelevadores("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>";
    }
    data = data+"</div><br>"+
    "<div id='ContPadreFau' style=' width: 100%; padding-left: 20px; height: 165px; overflow-x: auto;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px;'>Fauna: <button id='Mper$F' class='btn btn-success' onclick='MostrarFormulario("+4+");' type='button' style=' height: 25px; width: 25px; padding: 0px; font-size: 15px; color: #343a40; border-radius: 25px;'><i class='fa-solid fa-pen'></i></button></a><br>";
    for (i=0 ; i<IDFau.length; i++){
      data = data+"<div id='ContBtnSelFau"+i+"' style='display:flex; margin-bottom: 15px;'>"+
                    "<button id='BtnQuitFau"+i+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarFauna(SelModFau"+i+",BtnQuitFau"+i+",ContBtnSelFau"+i+","+i+");'> X </button>"+
                    "<select id='SelModFau"+i+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
                        "<option>"+IDFau[i]+" 1</option>"+
                        "<option>"+IDFau[i]+" 2</option>"+
                        "<option>"+IDFau[i]+" 3</option>"+
                    "<select>";
                 
      if(i == (IDFau.length-1)){
        data = data+"<button id='BtnNewFau' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFauna("+(i+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
      }
      data = data+"</div>";
      CantFau++;
    }
    if(IDFau.length ==0){
      data = data+"<button id='BtnNewFau' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFauna("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>";
    }
    data = data+"</div><br>"+
    "<div id='ContPadreFlo' style=' width: 100%; padding-left: 20px; height: 165px; overflow-x: auto;'>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px;'>Flora: <button id='Mper$F' class='btn btn-success' onclick='MostrarFormulario("+5+");' type='button' style=' height: 25px; width: 25px; padding: 0px; font-size: 15px; color: #343a40; border-radius: 25px;'><i class='fa-solid fa-pen'></i></button></a><br>";
    for (i=0 ; i<IDFlo.length; i++){
      data = data+"<div id='ContBtnSelFlo"+i+"' style='display:flex; margin-bottom: 15px;'>"+
                    "<button id='BtnQuitFlo"+i+"' type='button' class='btn btn-danger' style='height: 25px; width: 25px; padding: 0px;' onclick='quitarFlora(SelModFlo"+i+",BtnQuitFlo"+i+",ContBtnSelFlo"+i+","+i+");'> X </button>"+
                    "<select id='SelModFlo"+i+"' class='form-select' style='background: #e2e2e2; color:black; width: 50%; min-width: 230px; padding: 0px; padding-left: 24px;'>"+
                        "<option>"+IDFlo[i]+" 1</option>"+
                        "<option>"+IDFlo[i]+" 2</option>"+
                        "<option>"+IDFlo[i]+" 3</option>"+
                    "<select>";
                 
      if(i == (IDFlo.length-1)){
        data = data+"<button id='BtnNewFlo' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFlora("+(i+1)+");'> <i class='fa-solid fa-plus'></i> </button>";
      }
      data = data+"</div>";
      CantFlo++;
    }
    if(IDFlo.length ==0){
      data = data+"<button id='BtnNewFlo' type='button' class='btn btn-success' style='height: 25px; width: 25px; padding: 0px;' onclick='AñadirFlora("+(0)+");'> <i class='fa-solid fa-plus'></i> </button>";
    }
 
    
  
    data = data+"</div></div><br>"+
    "</section>"+
    "<div style=' text-align: -webkit-center; width: 50%; height: 200px;>"+
        "<a style='font-weight: bold; color: grey; font-size: 20px;'>Observaciones: </a><br>" +
        "<textarea id='TextModObser' class='form-control' style='background: #e2e2e2; color:black; width: 400px; height: 200px; min-height: 100px; max-height: 225px;''>"+IDObs+"</textarea><br><br><br>"+
    "</div>";
    console.log("ahora CantReles:"+CantReles);
    $("#dataModif").html(data);
   
    // _____________ SE CARGAN TODAS LAS OPCIONES DE DATOS DESDE LA BASE DE DATOS EN LOS SELECTS DE LA VENTANA DE MODIFICACION _____________________
    tempRel = '';
    tempFau = '';
    tempFlo = '';
    pRel=0;
    pFau=0;
    pFlo=0;
    contpRel = new Array;
    contpFau = new Array;
    contpFlo = new Array;
    contpPr = new Array;

    // _____________ SE CARGAN TODAS LAS OPCIONES DE DATOS DESDE LA BASE DE DATOS EN LOS SELECTS DE LA VENTANA DE MODIFICACION _____________________
    const postData = {CargarSelects: true,}   
    $.post('php/modificar.php', postData, (response) => {
      let datos = JSON.parse(response);

      datos['miembros'].forEach(dato => {
        tempRel +=`<option>${dato.miembro}</option>` 
      });
      for (i=0; i<IDRels.length;i++){
        pRel=0;
        datos['miembros'].forEach(dato => {
          if (dato.miembro == IDRels[i]){
            contpRel[i] = pRel;
          }else{
            pRel++;
          }
        });        
      }

      datos['fauna'].forEach(dato => {
        tempFau +=`<option>${dato.fauna}</option>` 
      });
      for (i=0; i<IDFau.length;i++){
        pFau=0;
        datos['fauna'].forEach(dato => {
          if (dato.fauna == IDFau[i]){
            contpFau[i] = pFau;
          }else{
            pFau++;
          }
        });        
      }
  
      datos['flora'].forEach(dato => {
        tempFlo +=`<option>${dato.flora}</option>` 
      });
      for (i=0; i<IDFlo.length;i++){
        pFlo=0;
        datos['flora'].forEach(dato => {
          if (dato.flora == IDFlo[i]){
            contpFlo[i] = pFlo;
          }else{
            pFlo++;
          }
        });        
      }

      for (i=0; i<IDRels.length; i++){
        $('#SelModRele'+i).html(tempRel);
        document.getElementById('SelModRele'+i).options.item(contpRel[i]).selected = 'selected';
      }

      for (i=0; i<IDFau.length; i++){
        $('#SelModFau'+i).html(tempFau);
        document.getElementById('SelModFau'+i).options.item(contpFau[i]).selected = 'selected';
      }

      for (i=0; i<IDFlo.length; i++){
        $('#SelModFlo'+i).html(tempFlo);
        document.getElementById('SelModFlo'+i).options.item(contpFlo[i]).selected = 'selected';
      }

      
  
    });
  
    //__________ TERMINA LA CREACION DE TODA LA VENTANA DE MODIFICACION DE DATOS DE ESTE OBJETO (Accidentes) _________________
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
              "<input type='text' id='InpModNombreCol' class='form-control' style='background: #e2e2e2; color:black; width: 250px; height: 25px;' value='"+IDNomCol+"'><br><br><br>" + 
          "</div>"+
          "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
              "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Nombre Científico: </a>" +
              "<input type='text' id='InpModNombreCien' class='form-control' style='background: #e2e2e2; color:black; width: 250px; height: 25px;' value='"+IDNomCie+"'><br><br><br>" +
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
              "<input type='text' id='InpModNombreCol' class='form-control' style='background: #e2e2e2; color:black; width: 250px; height: 25px;' value='"+IDNomCol+"'><br><br><br>" + 
          "</div>"+
          "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
              "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Nombre Científico: </a>" +
              "<input type='text' id='InpModNombreCien' class='form-control' style='background: #e2e2e2; color:black; width: 250px; height: 25px;' value='"+IDNomCie+"'><br><br><br>" +
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
              "<input type='text' id='InpModTipo' class='form-control' style='background: #e2e2e2; color:black; width: 250px; height: 25px;' value='"+IDTipo+"'><br><br><br>" + 
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
            "<input type='text' id='InpModNombre' class='form-control' style='background: #e2e2e2; color:black; width: 90%; height: 25px;' value='"+IDnom+"'><br><br><br>" + 
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Correo: </a>" +
            "<input type='text' id='InpModCorreo' class='form-control' style='background: #e2e2e2; color:black; width: 90%; height: 25px;' value='"+IDCorr+"'><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Teléfono: </a>" +
            "<input type='text' id='InpModTelefono' class='form-control' style='background: #e2e2e2; color:black; width: 90%; height: 25px;' value='"+IDTel+"'><br><br><br>" +
        "</div>"+
        "<div style=' height: 50px; font-size: 20px; margin-bottom: 20px;'>"+
            "<a style='font-weight: bold; color: grey; font-size: 20px; height: 25px;'>Dirección: </a>" +
            "<input type='text' id='InpModDireccion' class='form-control' style='background: #e2e2e2; color:black; width: 90%; height: 25px;' value='"+IDDir+"'><br><br><br>" +
        "</div>"+
    "</div>"+
    "<div id='ContPadreRol' style=' width: 20%; padding: 0px; height: 280px;'>"+
      
    "</div>";
 
/*
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
  
    */
    
    data = data + 
    "</div>"+/*
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
    }*/
    "</section>";
    $("#dataModif").html(data);



/*
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

    });*/
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
      var Relev = new Array();
      var Faun = new Array();
      var Flor = new Array();
      var count = 0;
     
      for (i=0; i<CantReles; i++){
        Relev.push($('#SelModRele'+i+' option:selected').text());
      };
      for (i=0; i<CantFau; i++){
        Faun.push($('#SelModFau'+i+' option:selected').text());
      };
      for (i=0; i<CantFlo; i++){
        Flor.push($('#SelModFlo'+i+' option:selected').text());
      };


      for (i=0; i<3; i++){
        console.log(document.getElementById('agua_op'+i));
        if (document.getElementById('agua_op'+i).checked){
          CaliAgua=document.getElementById('agua_op'+i).value;
        }
        if (document.getElementById('Veg_op'+i).checked){
          DivVeg=document.getElementById('Veg_op'+i).value;
        }
        if (document.getElementById('RegHid_op'+i).checked){
          RegHid=document.getElementById('RegHid_op'+i).value;
        }
      };
     
      for (i=0; i<2; i++){
        if (document.getElementById('Fuente_op'+i).checked){
          Fue=document.getElementById('Fuente_op'+i).value;
        }
        if (document.getElementById('TiemPer_op'+i).checked){
          TiemPer=document.getElementById('TiemPer_op'+i).value;
        }
      };
      
    
      const postData4 = {
        IdRel:$('#TitModId').text(),
        FechaRel: $('#InpModFecha').val(),
        ConductividadRel: $('#InpModConductividad').val(),
        AnchoRel: $('#InpModAncho').val(),
        LargoRel: $('#InpModLargo').val(),
        SuperficieRel: $('#InpModSuper').val(),
        OxigenoDisueltoRel: $('#InpModOxigDis').val(),
        TurvidesAguaRel: $('#InpModTurbAgua').val(),
        PHRel: $('#InpModPH').val(),
        ColorAguaRel: $('#InpModColor').val(),
        TemperaturaAguaRel: $('#InpModTempAg').val(),
        ObservacionRel: $('#TextModObser').val(),
        
        CalidadAgua: CaliAgua,
        DiversidadVegetal: DivVeg,
        RegimenHidro: RegHid,
        TiempoPermanencia: TiemPer,
        Fuente: Fue,
        
        Relevadores:Relev,
        Fauna:Faun,
        Flora:Flor,

        ModiRele: true,
      };

      console.log(postData4);

      $.post('php/modificar.php', postData4, (response) => {
        console.log(response);
        
        CerrarAlerta();
        deletesHTML("formModifData");

        var postData4_2= {
          relevamiento:true,
        }
      
        $('#ContTable').css({'visibility':'visible'});
      
        $.post('php/modificar.php', postData4_2, (response) => {
          console.log(response);  
          $("#myTable").html(response);
        });
      });
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
      /*var Roles = new Array();
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
      */
  
    
      const postData8 = {
        IdPersona:$('#TitModId').text(),
        NombrePersona: $('#InpModNombre').val(),
        CorreoPersona: $('#InpModCorreo').val(),
        telefonoPersona: $('#InpModTelefono').val(),
        direccionPersona: $('#InpModDireccion').val(),
        //RolesPersona: Roles,
        //PropiedadesPersona: Propiedades,
        ModiPers : true,
      };

      console.log(postData8);

      $.post('php/modificar.php', postData8, (response) => {
        console.log(response);
        
        CerrarAlerta();
        deletesHTML("formModifData");

        var postData8_2= {
          persona:true,
        }
      
        $('#ContTable').css({'visibility':'visible'});
      
        $.post('php/modificar.php', postData8_2, (response) => {
          console.log(response);  
          $("#myTable").html(response);
        });
      });
    break;
    case 9:
      var Presiones = new Array();
      for (i=0; i<CantPres; i++){
        Presiones.push($('#SelModPres'+i+' option:selected').text());
      };
     // console.log("entra4");
      //console.log(Presiones);
      
      const postData9 = {
        IdAccidente:$('#TitModId').text(),
        NombreAccidente: $('#InpModNombre').val(),
        TipoAccidente: $('#InpModTipo').val(),
        CuencaAccidente: $('#SelModCuen').val(),
        ComplejaAccidente: $('#SelModComp').val(),
        PresionAccidente: Presiones,
        DescripcionAccidente: $('#TextModDesc').val(),
        ModiAcc : true,
      };

      console.log(postData9);

      $.post('php/modificar.php', postData9, (response) => {
        console.log(response);

        console.log("oculta info");
        $('#info').hide();
        console.log("ejecuta php");
        console.log("data es = "+ $('#TitModId').text());
        $.ajax({
          url:   'php/busq_sel.php', 
          type:  'GET',
          data:{Id_acc:$('#TitModId').text()},
          success:  function (response) 
          { 
            console.log("php exitoso");
            console.log("=_=_=_=_=_=_=_=_=_=_=_=_=_=");
            console.log(response);
            if(response=="[]")
            {
              console.log('Sin Relevamiento')
            } 
            else
            {
              var data = JSON.parse(response);
              Info = data;
              capa(data);
              $('#info').show();
              $('#myMap').css({'width': '75%'});
              $('#myMap').css({'min-width': '75%'});
            };
            CerrarAlerta();
            deletesHTML("formModifData");
            RefrescarMapa();
          }
        });
       

        var postData9_2= {
          accidente:true,
        }
        
        $('#ContTable').css({'visibility':'visible'});
        
        $.post('php/modificar.php', postData9_2, (response) => {
          console.log(response);  
          $("#myTable").html(response);
        });
      });
      break;
    case 10:
        var Relev = new Array();
        var Faun = new Array();
        var Flor = new Array();
        var count = 0;
       
        for (i=0; i<CantReles; i++){
          Relev.push($('#SelModRele'+i+' option:selected').text());
        };
        for (i=0; i<CantFau; i++){
          Faun.push($('#SelModFau'+i+' option:selected').text());
        };
        for (i=0; i<CantFlo; i++){
          Flor.push($('#SelModFlo'+i+' option:selected').text());
        };
  
  
        for (i=0; i<3; i++){
          console.log(document.getElementById('agua_op'+i));
          if (document.getElementById('agua_op'+i).checked){
            CaliAgua=document.getElementById('agua_op'+i).value;
          }
          if (document.getElementById('Veg_op'+i).checked){
            DivVeg=document.getElementById('Veg_op'+i).value;
          }
          if (document.getElementById('RegHid_op'+i).checked){
            RegHid=document.getElementById('RegHid_op'+i).value;
          }
        };
       
        for (i=0; i<2; i++){
          if (document.getElementById('Fuente_op'+i).checked){
            Fue=document.getElementById('Fuente_op'+i).value;
          }
          if (document.getElementById('TiemPer_op'+i).checked){
            TiemPer=document.getElementById('TiemPer_op'+i).value;
          }
        };
        
      
        const postData10 = {
          IdRel:$('#TitModId').text(),
          FechaRel: $('#InpModFecha').val(),
          ConductividadRel: $('#InpModConductividad').val(),
          AnchoRel: $('#InpModAncho').val(),
          LargoRel: $('#InpModLargo').val(),
          SuperficieRel: $('#InpModSuper').val(),
          OxigenoDisueltoRel: $('#InpModOxigDis').val(),
          TurvidesAguaRel: $('#InpModTurbAgua').val(),
          PHRel: $('#InpModPH').val(),
          ColorAguaRel: $('#InpModColor').val(),
          TemperaturaAguaRel: $('#InpModTempAg').val(),
          ObservacionRel: $('#TextModObser').val(),
          
          CalidadAgua: CaliAgua,
          DiversidadVegetal: DivVeg,
          RegimenHidro: RegHid,
          TiempoPermanencia: TiemPer,
          Fuente: Fue,
          
          Relevadores:Relev,
          Fauna:Faun,
          Flora:Flor,
  
          ModiRele: true,
        };
  
        console.log(postData10);
  
        $.post('php/modificar.php', postData10, (response) => {
          console.log(response);
          console.log("_____________________________________");
          console.log("=====================================");
          console.log("Info['Id_acc']: "+Info['Id_acc']);
          console.log("=====================================");
          console.log("_____________________________________");
          $.ajax({
            url:   'php/busq_sel.php', 
            type:  'GET',
            data:{Id_acc: IdAccMod_Rel_o_acc,},
            success:  function (response) 
            { 
              console.log(response);
              if(response=="[]")
              {
                console.log('Sin Relevamiento')
              } 
              else
              {
                var data = JSON.parse(response);
                Info = data;
                capa(data);
                $('#info').show();
                $('#myMap').css({'width': '75%'});
                $('#myMap').css({'min-width': '75%'});
              };
              CerrarAlerta();
              deletesHTML("formModifData");
              RefrescarMapa();
            }
          });


          var postData10_2= {
            relevamiento:true,
          }
        
          $('#ContTable').css({'visibility':'visible'});
        
          $.post('php/modificar.php', postData10_2, (response) => {
            console.log(response);  
            $("#myTable").html(response);
          });
        });
        break;
  }
  RefrescarMapa();
}
