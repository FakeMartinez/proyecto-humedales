  //Funcion que permite ocultar cada filtro dentro de la tabla de filtros
  function DisCheck(e, cont){
    if(!e.checked){
        document.getElementById(cont).style.visibility = "hidden";
        document.getElementById(cont).style.height = "5px";
    }else{
        console.log(cont);
        document.getElementById(cont).style.visibility = "visible";
        document.getElementById(cont).style.height = "60px";
        
        if (cont == "FiltroFauna" || cont == "FiltroFlora" || cont == "FiltroPresiones")
        {
            document.getElementById(cont).style.height = "90px";
        }
        if ( cont == "FiltroInputCuenca" || cont == "FiltroComplejo" || cont == "FiltroTiempoPerma")
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

  


    $('#SelectCuenca').on('change', (event) => {
        console.log(event.target.value);
    })
    $('#SelectComplejo').on('change', (event) => {
        console.log(event.target.value);
    })
    $('#FiltroCalidadAgua').on('change', (event) => {
        console.log(event.target.value);
    })
    $('#FiltroDiversidadVegetal').on('change', (event) => {
        console.log(event.target.value);
    })
    $('#FiltroRegimenHidro').on('change', (event) => {
        console.log(event.target.value);
    })
    $('#FiltroTiempoPerma').on('change', (event) => {
        console.log(event.target.value);
    })
    $('#FiltroPresiones').on('change', (event) => {
        var ChecksPres = $('#FiltroPresiones').find('input');
        console.log("entra")
        for (var i=0; ChecksPres.length > i; i++){
            if (ChecksPres[i].checked){
                console.log("Checado", ChecksPres[i].value, ChecksPres[i].checked);
            }
        }
    })
    $('#FiltroFauna').on('change', (event) => {
        var ChecksFau = $('#FiltroFauna').find('input');
        console.log("entra")
        for (var i=0; ChecksFau.length > i; i++){
            if (ChecksFau[i].checked){
                console.log("Checado", ChecksFau[i].value, ChecksFau[i].checked);
            }
        }
    })
    $('#FiltroFlora').on('change', (event) => {
        var ChecksFlo = $('#FiltroFlora').find('input');
        console.log("entra")
        for (var i=0; ChecksFlo.length > i; i++){
            if (ChecksFlo[i].checked){
                console.log("Checado", ChecksFlo[i].value, ChecksFlo[i].checked);
            }
        }
    })
    
})
