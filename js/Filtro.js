  //Funcion que permite ocultar cada filtro dentro de la tabla de filtros
  function DisCheck(e, cont){
    if(!e.checked){
        document.getElementById(cont).style.visibility = "hidden";
        document.getElementById(cont).style.height = "5px";
    }else{
        document.getElementById(cont).style.visibility = "visible";
        document.getElementById(cont).style.height = "60px";
        
        if (cont == "FiltroFauna" || cont == "FiltroFlora" || cont == "FiltroPresiones")
        {
            document.getElementById(cont).style.height = "90px";
        }
        if ( cont == "FiltroInputCuenca" || cont == "FiltroComplejo" || cont == "FiltroTiempoPerma" || cont == "FiltroFuente")
        {
            document.getElementById(cont).style.height = "35px";
        }
    }
    ObtenerDatosFiltro();
}

function DisCheckODF(e, cont){
    if(!e.checked){
        document.getElementById(cont).style.visibility = "hidden";
        document.getElementById(cont).style.height = "5px";
    }else{
        document.getElementById(cont).style.visibility = "visible";
        document.getElementById(cont).style.height = "60px";
        
        if (cont == "FiltroFauna" || cont == "FiltroFlora" || cont == "FiltroPresiones")
        {
            document.getElementById(cont).style.height = "90px";
        }
        if ( cont == "FiltroInputCuenca" || cont == "FiltroComplejo" || cont == "FiltroTiempoPerma" || cont == "FiltroFuente")
        {
            document.getElementById(cont).style.height = "35px";
        }
    }
}


$(function(){

    $('#Filtrador').on('click',function(){
        $('#FiltroDeHumedales').css({'visibility':'visible'});
        $('#tools_op').hide();
        VisibleTool = false;
      })
    $('#close_filtro').on('click',function(){
        $('#FiltroDeHumedales').css({'visibility':'hidden'});
        $('#CheckCuenca').prop("checked", false);
        DisCheck('CheckCuenca', 'FiltroInputCuenca');
        $('#CheckComplejo').prop("checked", false);
        DisCheck('CheckComplejo', 'FiltroComplejo');
        $('#CheckFuente').prop("checked", false);
        DisCheck('CheckFuente', 'FiltroFuente');
        $('#CheckCalidadAgua').prop("checked", false);
        DisCheck('CheckCalidadAgua', 'FiltroCalidadAgua');
        $('#CheckDiversidadVegetal').prop("checked", false);
        DisCheck('CheckDiversidadVegetal', 'FiltroDiversidadVegetal');
        $('#CheckRegimenHidrologico').prop("checked", false);
        DisCheck('CheckRegimenHidrologico', 'FiltroRegimenHidro');
        $('#CheckTiempoPerma').prop("checked", false);
        DisCheck('CheckTiempoPerma', 'FiltroTiempoPerma');
        $('#CheckPresiones').prop("checked", false);
        DisCheck('CheckPresiones', 'FiltroPresiones');
        $('#CheckFauna').prop("checked", false);
        DisCheck('CheckFauna', 'FiltroFauna');
        $('#CheckFlora').prop("checked", false);
        DisCheck('CheckFlora', 'FiltroFlora');
        
    })

    $.ajax({
        url: 'php/alta.php',
        type: 'GET',
        success: function (response) {
            if(!response.error) {
              //console.log(response);
              let datos = JSON.parse(response);
              //console.log(datos);

              // Para cuencas
              let templatecuenca = '';
              datos['cuencas'].forEach(dato => {
                templatecuenca += `<option>${dato.nombre_cuenca}</option>`});
              $('#SelectCuenca').html(templatecuenca);

              // Para complejos
              let templatecomplejo = '';
              datos['complejos'].forEach(dato => {
                templatecomplejo += `<option>${dato.nombre_complejo}</option>`});
              $('#SelectComplejo').html(templatecomplejo);

              // Para presiones
              let templatePresiones = '';
                var XP = 0;
              datos['presiones'].forEach(dato => {
                templatePresiones += `
                <div class="form-check" style="left: 5px;">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input"  id="option${XP}Pr" value="${dato.tipo_presion}"> ${dato.tipo_presion}
                    </label>
                </div>`;
                XP++;
            });
              $('#FiltroPresiones').html(templatePresiones);

              // Para Fauna
              let templateFaunas = '';
              var XFa = 0;
              datos['faunas'].forEach(dato => {
                templateFaunas += `
                <div class="form-check" style="left: 5px;">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input"  id="option${XFa}Fa" value="${dato.nom_fauna}"> ${dato.nom_fauna}
                    </label>
                </div>`;
                XFa++;});
              $('#FiltroFauna').html(templateFaunas);

              // Para Floras
              let templateFloras = '';
              var XFl = 0;
              datos['floras'].forEach(dato => {
                templateFloras += `
                <div class="form-check" style="left: 5px;">
                    <label class="form-check-label">
                        <input type="checkbox" class="form-check-input"  id="option${XFa}Fl" value="${dato.nom_flora}"> ${dato.nom_flora}
                    </label>
                </div>`;
                XFl++;});
              $('#FiltroFlora').html(templateFloras);
             }
              
        }
    });
    $('#FiltroPuntos').on('change', (event) => {
        //console.log(event.target.value);
        if ($('#CheckAcc').prop('checked') || $('#CheckHume').prop('checked')){
            $('#divCuenca').css({"visibility":"visible", "height":"60px"});
            $('#divComplejo').css({"visibility":"visible", "height":"60px"});
            $('#divPresion').css({"visibility":"visible", "height":"60px"});
        }else{            
            $('#divCuenca').css({"visibility":"hidden"});
            $('#CheckCuenca').prop("checked", false);
            DisCheckODF('CheckCuenca', 'FiltroInputCuenca');

            $('#divComplejo').css({"visibility":"hidden"});
            $('#CheckComplejo').prop("checked", false);
            DisCheckODF('CheckComplejo', 'FiltroComplejo');

            $('#divPresion').css({"visibility":"hidden"});
            $('#CheckPresiones').prop("checked", false);
            DisCheckODF('CheckPresiones', 'FiltroPresiones');
        }


        if ($('#CheckHume').prop('checked')){
            $('#divCuenca').css({"visibility":"visible", "height":"60px"});
            $('#divComplejo').css({"visibility":"visible", "height":"60px"});
            $('#divPresion').css({"visibility":"visible", "height":"60px"});
            $('#divFuente').css({"visibility":"visible", "height":"60px"});
            $('#divCalidadAgua').css({"visibility":"visible", "height":"60px"});
            $('#divDiversidadVege').css({"visibility":"visible", "height":"60px"});
            $('#divRegimenHidro').css({"visibility":"visible", "height":"60px"});
            $('#divTiempoPerma').css({"visibility":"visible", "height":"60px"});
            $('#divFauna').css({"visibility":"visible", "height":"60px"});
            $('#divFlora').css({"visibility":"visible", "height":"60px"});
        }else{            
            if (!$('#CheckAcc').prop('checked')){
                $('#divCuenca').css({"visibility":"hidden", "height":"0px"});
                $('#CheckCuenca').prop("checked", false);
                DisCheckODF('CheckCuenca', 'FiltroInputCuenca');
    
                $('#divComplejo').css({"visibility":"hidden", "height":"0px"});
                $('#CheckComplejo').prop("checked", false);
                DisCheckODF('CheckComplejo', 'FiltroComplejo');

                $('#divPresion').css({"visibility":"hidden", "height":"0px"});
                $('#CheckPresiones').prop("checked", false);
                DisCheckODF('CheckPresiones', 'FiltroPresiones');
            }
            $('#divFuente').css({"visibility":"hidden", "height":"0px"});
            $('#CheckFuente').prop("checked", false);
            DisCheckODF('CheckFuente', 'FiltroFuente');

            $('#divCalidadAgua').css({"visibility":"hidden", "height":"0px"});
            $('#CheckCalidadAgua').prop("checked", false);
            DisCheckODF('CheckCalidadAgua', 'FiltroCalidadAgua');

            $('#divDiversidadVege').css({"visibility":"hidden", "height":"0px"});
            $('#CheckDiversidadVegetal').prop("checked", false);
            DisCheckODF('CheckDiversidadVegetal', 'FiltroDiversidadVegetal');
            
            $('#divRegimenHidro').css({"visibility":"hidden", "height":"0px"});
            $('#CheckRegimenHidrologico').prop("checked", false);
            DisCheckODF('CheckRegimenHidrologico', 'FiltroRegimenHidro');
            
            $('#divTiempoPerma').css({"visibility":"hidden", "height":"0px"});
            $('#CheckTiempoPerma').prop("checked", false);
            DisCheckODF('CheckTiempoPerma', 'FiltroTiempoPerma');
            
            $('#divFauna').css({"visibility":"hidden", "height":"0px"});
            $('#CheckFauna').prop("checked", false);
            DisCheckODF('CheckFauna', 'FiltroFauna');

            $('#divFlora').css({"visibility":"hidden", "height":"0px"});
            $('#CheckFlora').prop("checked", false);
            DisCheckODF('CheckFlora', 'FiltroFlora');
        }
     

    })
    $('#FiltroPuntos').on('change', (event) => {
        //console.log(event.target.value);
        ObtenerDatosFiltro();
    })
    $('#SelectCuenca').on('change', (event) => {
        //console.log(event.target.value);
        ObtenerDatosFiltro();
    })
    $('#SelectComplejo').on('change', (event) => {
        //console.log(event.target.value);
        ObtenerDatosFiltro();
    })
    $('#FiltroFuente').on('change', (event) => {
        ObtenerDatosFiltro();
    })
    $('#FiltroCalidadAgua').on('change', (event) => {
        ObtenerDatosFiltro()
    })
    $('#FiltroDiversidadVegetal').on('change', (event) => {
        ObtenerDatosFiltro()
    })
    $('#FiltroRegimenHidro').on('change', (event) => {
        ObtenerDatosFiltro()
    })
    $('#FiltroTiempoPerma').on('change', (event) => {
        ObtenerDatosFiltro()
    })
    $('#FiltroPresiones').on('change', (event) => {
        ObtenerDatosFiltro();
    })
    $('#FiltroFauna').on('change', (event) => {
        ObtenerDatosFiltro();
    })
    $('#FiltroFlora').on('change', (event) => {
        ObtenerDatosFiltro();
    })
    
})


function ObtenerDatosFiltro(){
    if ($('#CheckInte').prop('checked')){
        var Interes = true;
    }

    if ($('#CheckAcc').prop('checked')){
        var Accidente = true;
    }

    if ($('#CheckHume').prop('checked')){
        var Humedal = true;
    }

    console.log("==============")
    //  Cuenca
    if ($('#CheckCuenca').prop('checked')){
        //console.log('Cuenca ',$('#FiltroInputCuenca option:selected').text());
        var Cuenca = $('#FiltroInputCuenca option:selected').text();
        $('#divCuenca').css({"height":"120px"});
    }else{
        $('#divCuenca').css({"height":"60px"});
    }

    //  Complejo
    if ($('#CheckComplejo').prop('checked')){
        //console.log('Complejo ',$('#FiltroComplejo option:selected').text());
        var Complejo = $('#FiltroComplejo option:selected').text();
        $('#divComplejo').css({"height":"120px"});
    }else{
        $('#divComplejo').css({"height":"60px"});
    }
        
    

    //  Fuente
    if ($('#CheckFuente').prop('checked')){
        var radioF = document.getElementsByName("OptionFuente1");
        for (var i = 0; i < radioF.length; i++){
            if (radioF[i].checked){
                //console.log("Fuente ", radioF[i].value);
                var Fuente = radioF[i].value;
            }
        }
        $('#divFuente').css({"height":"120px"});
    }else
    {
        if ($('#CheckHume').prop('checked')){
            $('#divFuente').css({"height":"60px"});
        }else{
            $('#divFuente').css({"height":"0px"});
        }
    }

 

    //  Calidad de Agua
    if ($('#CheckCalidadAgua').prop('checked')){
        var radioCA = document.getElementsByName("OptionCalidadAgua");
        for (var i = 0; i < radioCA.length; i++){
            if (radioCA[i].checked){
              //console.log("Calidad de agua ", radioCA[i].value);
              var CalidadAgua = radioCA[i].value;
            }
        }
        $('#divCalidadAgua').css({"height":"150px"});
    }else{
        if ($('#CheckHume').prop('checked')){
            $('#divCalidadAgua').css({"height":"60px"});
        }else{
            $('#divCalidadAgua').css({"height":"0px"});
        }
    }

    //  Diversidad Vegetal
    if ($('#CheckDiversidadVegetal').prop('checked')){
        var radioD = document.getElementsByName("OptionDiversidad");
        for (var i = 0; i < radioD.length; i++){
            if (radioD[i].checked){
              //console.log("Diversidad Vegetal ", radioD[i].value);
              var DivVegetal = radioD[i].value;
            }
        }
        $('#divDiversidadVege').css({"height":"150px"});
    }else{
        if ($('#CheckHume').prop('checked')){
            $('#divDiversidadVege').css({"height":"60px"});
        }else{
            $('#divDiversidadVege').css({"height":"0px"});
        }
    }

    //  Diversidad Regimen Hidrologico
    if ($('#CheckRegimenHidrologico').prop('checked')){
        var radioRH = document.getElementsByName("OptionRegimen");
        for (var i = 0; i < radioRH.length; i++){
            if (radioRH[i].checked){
              //console.log("Regimen Hidrologico ", radioRH[i].value);
              var RegiHidro = radioRH[i].value;
            }
        }
        $('#divRegimenHidro').css({"height":"150px"});
    }else{
        if ($('#CheckHume').prop('checked')){
            $('#divRegimenHidro').css({"height":"60px"});
        }else{
            $('#divRegimenHidro').css({"height":"0px"});
        }
    }

    //  Tiempo de permanencia
    if ($('#CheckTiempoPerma').prop('checked')){
        var radioTP = document.getElementsByName("OptionTiempo");
        for (var i = 0; i < radioTP.length; i++){
            if (radioTP[i].checked){
              //console.log("Tiempo de Permanencia ", radioTP[i].value);
              var TiempoPerma = radioTP[i].value;
            }
        }
        $('#divTiempoPerma').css({"height":"120px"});
    }else{
        if ($('#CheckHume').prop('checked')){
            $('#divTiempoPerma').css({"height":"60px"});
        }else{
            $('#divTiempoPerma').css({"height":"0px"});
        }
    }

    //  Presiones
    if($('#CheckPresiones').prop('checked')){
        var CheckPresiones = $('#FiltroPresiones').find('input');
        var Presiones = new Array();
        for (var i=0; CheckPresiones.length > i; i++){
            if (CheckPresiones[i].checked){
                Presiones.push(CheckPresiones[i].value); 
            }
        }
        //console.log(Presiones);
        $('#divPresion').css({"height":"165px"});
    }else{
        if ($('#CheckAcc').prop('checked') || $('#CheckHume').prop('checked')){
            $('#divPresion').css({"height":"60px"});
        }else{
            $('#divPresion').css({"height":"0px"});
        }
    }

    //  Fauna
    if($('#CheckFauna').prop('checked')){
        var CheckFaunas = $('#FiltroFauna').find('input');
        var Faunas = new Array();
        for (var i=0; CheckFaunas.length > i; i++){
            if (CheckFaunas[i].checked){
                Faunas.push(CheckFaunas[i].value); 
            }
        }
        $('#divFauna').css({"height":"165px"});
        //console.log(Faunas);
    }else{
        if ($('#CheckHume').prop('checked')){
            $('#divFauna').css({"height":"60px"});
        }else{
            $('#divFauna').css({"height":"0px"});
        }
    }

    //  Flora
    if($('#CheckFlora').prop('checked')){
        var CheckFlora = $('#FiltroFlora').find('input');
        var Floras = new Array();
        for (var i=0; CheckFlora.length > i; i++){
            if (CheckFlora[i].checked){
                Floras.push(CheckFlora[i].value); 
            }
        }
        $('#divFlora').css({"height":"165px"});
        //console.log(Floras);
    }else{
        if ($('#CheckHume').prop('checked')){
            $('#divFlora').css({"height":"60px"});
        }else{
            $('#divFlora').css({"height":"0px"});
        }
    }

    var postData = {
        OBInteres : Interes,
        OBAccidente : Accidente,
        OBHumedal : Humedal,
        OBCuenca :  Cuenca,
        OBComplejo : Complejo,
        OBFuente : Fuente,
        OBCalidadAgua : CalidadAgua,
        OBDivVegetal : DivVegetal,
        OBRegiHidro : RegiHidro,
        OBTiempoPerma : TiempoPerma,
        OBPresiones : Presiones,
        OBFaunas : Faunas,
        OBFloras : Floras,
    }

    console.log(postData);  

    $.post('php/ConsulFiltro.php', postData, (response) => {
        console.log(response);
        
      });
}