  //Funcion que permite ocultar cada filtro dentro de la tabla de filtros
  function DisCheck(e, cont, contPadre){
    if(!e.checked){
        $(contPadre).css({'visibility':'hidden'});
        $(contPadre).css({'height':'5px'});
        //document.getElementById(contPadre).style.visibility = "hidden";
        //document.getElementById(contPadre).style.height = "5px";
        document.getElementById(cont).style.visibility = "hidden";
        document.getElementById(cont).style.height = "5px";
    }else{
        $(contPadre).css({'visibility':'visible'});
        $(contPadre).css({'height':'60px'});
        //document.getElementById(contPadre).style.visibility = "visible";
        //document.getElementById(contPadre).style.height = "60px";
        document.getElementById(cont).style.visibility = "visible";
        document.getElementById(cont).style.height = "60px";
        
        if (cont == "FiltroFauna" || cont == "FiltroFlora" || cont == "FiltroPresiones")
        {
            $(contPadre).css({'height':'90px'});
            //document.getElementById(contPadre).style.height = "90px";
            document.getElementById(cont).style.height = "90px";
        }
        if ( cont == "FiltroInputCuenca" || cont == "FiltroComplejo" || cont == "FiltroTiempoPerma" || cont == "FiltroFuente")
        {
            $(contPadre).css({'height':'35px'});
            //document.getElementById(contPadre).style.height = "35px";
            document.getElementById(cont).style.height = "35px";
        }
    }
    ObtenerDatosFiltro();
}

function DisCheckODF(e, cont, contPadre){
    if(!e.checked){
        $(contPadre).css({'visibility':'hidden'});
        $(contPadre).css({'height':'5px'});
        //document.getElementById(contPadre).style.visibility = "hidden";
        //document.getElementById(contPadre).style.height = "5px";
        document.getElementById(cont).style.visibility = "hidden";
        document.getElementById(cont).style.height = "5px";
    }else{
        $(contPadre).css({'visibility':'visible'});
        $(contPadre).css({'height':'60px'});
        //document.getElementById(contPadre).style.visibility = "visible";
        //document.getElementById(contPadre).style.height = "60px";
        document.getElementById(cont).style.visibility = "visible";
        document.getElementById(cont).style.height = "60px";
        
        if (cont == "FiltroFauna" || cont == "FiltroFlora" || cont == "FiltroPresiones" || cont == "FiltroTipAcc")
        {
            $(contPadre).css({'height':'90px'});
            //document.getElementById(contPadre).style.height = "90px";
            document.getElementById(cont).style.height = "90px";
        }
        if ( cont == "FiltroInputCuenca" || cont == "FiltroComplejo" || cont == "FiltroTiempoPerma" || cont == "FiltroFuente")
        {
            $(contPadre).css({'height':'35px'});
            //document.getElementById(contPadre).style.height = "35px";
            document.getElementById(cont).style.height = "35px";
        }
    }
}


$(function(){

    $('#Filtrador').on('click',function(){
        $('#FiltroDeHumedales').css({'visibility':'visible'});
        limpiarMapaDefault(); //Ejecuta la funcion de limpiar el mapa por defecto
        limpiarMapaBackup(); //Ejecuta la funcion de limpiar el mapa con el backup de los marcadores
        $('#tools_op').hide();
        VisibleTool = false;
      })
    $('#close_filtro').on('click',function(){
        $('#FiltroDeHumedales').css({'visibility':'hidden'});
        $('#CheckInte').prop("checked", false);
        $('#CheckAcc').prop("checked", false);
        $('#CheckHume').prop("checked", false);


        $('#CheckTipoAcc').prop("checked", false);
        DisCheckODF('CheckTipoAcc', 'FiltroTipAcc');
        DisCheckODF('CheckCuenca', 'FiltroInputCuenca', '#DivTipAccidente');

        $('#CheckCuenca').prop("checked", false);
        DisCheckODF('CheckCuenca', 'FiltroInputCuenca', '#divCuenca');

        $('#CheckComplejo').prop("checked", false);
        DisCheckODF('CheckComplejo', 'FiltroComplejo', '#divComplejo');

        $('#CheckFuente').prop("checked", false);
        DisCheckODF('CheckFuente', 'FiltroFuente', '#divFuente');

        $('#CheckCalidadAgua').prop("checked", false);
        DisCheckODF('CheckCalidadAgua', 'FiltroCalidadAgua', '#divCalidadAgua');

        $('#CheckDiversidadVegetal').prop("checked", false);
        DisCheckODF('CheckDiversidadVegetal', 'FiltroDiversidadVegetal', '#divDiversidadVege');

        $('#CheckRegimenHidrologico').prop("checked", false);
        DisCheckODF('CheckRegimenHidrologico', 'FiltroRegimenHidro', '#divRegimenHidro');

        $('#CheckTiempoPerma').prop("checked", false);
        DisCheckODF('CheckTiempoPerma', 'FiltroTiempoPerma', '#divTiempoPerma');

        $('#CheckPresiones').prop("checked", false);
        DisCheckODF('CheckPresiones', 'FiltroPresiones', '#divPresion');

        $('#CheckFauna').prop("checked", false);
        DisCheckODF('CheckFauna', 'FiltroFauna', '#divFauna');

        $('#CheckFlora').prop("checked", false);
        DisCheckODF('CheckFlora', 'FiltroFlora', '#divFlora');
        
        $.ajax({
            url:   'php/cons_lug_interes.php', //Archivo PHP con los datos
            type:  'GET',
            success:  function (response) { //Funcion que se ejecuta si la solicitud sucede con exito
              console.log(response);
              var lg = JSON.parse(response);
              
              for(var key=0; key < lg.length; key++) { //para cada columna
                var single = lg[key];
                console.log(single.type);
          if(single.type=="POINT"){
            obj = L.geoJSON(JSON.parse(single.objeto), {
              id:single.id,
            }).bindPopup('<p>'+ single.nombre + '('+single.tipo+')'+ '</p>');
            marker.push(obj);
            //obj.on('mouseover', onClick3);
          
            obj.on('click', onClick2);
            myMap.addLayer(obj);
          }else{
               obj = L.geoJSON(JSON.parse(single.objeto), {
                  id:single.id,
                  style: estilo_monumentos(single.tipo),
                  onEachFeature: onEachFeature
                }).bindPopup('<p>'+ single.nombre + '('+single.tipo+')'+ '</p>');
                marker.push(obj);
                //obj.on('mouseover', onClick3);
          
                obj.on('click', onClick2);
                myMap.addLayer(obj);
                }
          
              };
              markerBackup = []; //Define como vacio al Array del backup marcadores 
              markerBackup = marker; //Guarda el los marcadores en el backup
          
            }});
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
            if($('#CheckAcc').prop('checked')){
                $('#DivTipAccidente').css({"visibility":"visible", "height":"60px"});
            }else{
                $('#DivTipAccidente').css({"visibility":"hidden"});
                $('#CheckTipoAcc').prop("checked", false);
                DisCheckODF('CheckTipoAcc', 'FiltroTipAcc');
            }
            $('#divCuenca').css({"visibility":"visible", "height":"60px"});
            $('#divComplejo').css({"visibility":"visible", "height":"60px"});
            $('#divPresion').css({"visibility":"visible", "height":"60px"});
        }else{     
            if(!$('#CheckAcc').prop('checked'))  {
                $('#DivTipAccidente').css({"visibility":"hidden"});
                $('#CheckTipoAcc').prop("checked", false);
                DisCheckODF('CheckTipoAcc', 'FiltroTipAcc');
            }     
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
                $('#DivTipAccidente').css({"visibility":"hidden", "height":"0px"});
                $('#CheckTipoAcc').prop("checked", false);
                DisCheckODF('CheckTipoAcc', 'FiltroTipAcc');

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
    $('#FiltroTipAcc').on('change', (event) => {
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
    //  TipoAcc
    if($('#CheckTipoAcc').prop('checked')){
        TipAccChecado = true;
        var CheckTiposAcc = $('#FiltroTipAcc').find('input');
        var Tipos = new Array();
        for (var i=0; CheckTiposAcc.length > i; i++){
            if (CheckTiposAcc[i].checked){
                Tipos.push(CheckTiposAcc[i].value); 
            }
        }
        //console.log(Tipos);
        $('#DivTipAccidente').css({"height":"165px"});
        $('#FiltroTipAcc').css({"height":"90px"});
    }else{
        TipAccChecado = false;
        if ($('#CheckAcc').prop('checked')){
            $('#DivTipAccidente').css({"height":"60px"});
            $('#FiltroTipAcc').css({"height":"90px"});
        }else{
            $('#DivTipAccidente').css({"height":"0px"});
            $('#FiltroTipAcc').css({"height":"0px"});
        }
    }

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

        OBTipAcc : Tipos,
        OBTipAccChecado : TipAccChecado,
    }

    console.log(postData);  
    limpiarMapaDefault(); //Ejecuta la funcion de limpiar el mapa por defecto
    limpiarMapaBackup(); //Ejecuta la funcion de limpiar el mapa con el backup de los marcadores
    //add_geo();
    $.post('php/ConsulFiltro.php', postData, (response) => {
        info = JSON.parse(response);

        info['Interes'].forEach(element => {
            console.log(element);
        });
        info['Humedal'].forEach(element => {
            console.log(element);
        });
        info['Accidente'].forEach(element => {
            console.log(element);
            //console.log(element['Id_acc']);
            //console.log(element['objeto']);
        });

        if(!response.error) {
            let template = '';
            info['Interes'].forEach(info => {
                var obj = L.geoJSON(JSON.parse(info.objeto), {
                  id:info.id,
                }).bindPopup('<p>'+ info.id + '</p>');
   
                marker.push(obj);
                obj.on('click', onClick2);
                myMap.addLayer(obj);
   
                template += `<a href="#" class="task-item ${info.id}"></a>`
            });
            info['Accidente'].forEach(info => {
                var obj = L.geoJSON(JSON.parse(info.objeto), {
                  id:info.id,
                  style: estilo_monumentos(info.tipo),
                  onEachFeature: onEachFeature,
                }).bindPopup('<p>'+ info.nombre+'('+info.tipo+')'  + '</p>');
   
                marker.push(obj);
                obj.on('click', onClick2);
                myMap.addLayer(obj);
   
                template += `<a href="#" class="task-item ${info.id}"></a>`
            });
            info['Humedal'].forEach(info => {
             var obj = L.geoJSON(JSON.parse(info.objeto), {
               id:info.id,
             }).bindPopup('<p>'+ info.id + '</p>');

             marker.push(obj);
             obj.on('click', onClick2);
             myMap.addLayer(obj);

             template += `<a href="#" class="task-item ${info.id}"></a>`
            });
            

         $('#task-result').show();
         $('#task-result').html(template);
           
        }
    });
}