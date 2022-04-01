$(function(){
    $('#Filtrador').on('click',function(){
        $('#FiltroDeHumedales').css({'visibility':'visible'});
        $('#tools_op').hide();
        VisibleTool = false;
      })
    $('#close_filtro').on('click',function(){
        $('#FiltroDeHumedales').css({'visibility':'hidden'});
    })

    //Funcion que permite ocultar cada filtro dentro de la tabla de filtros
    function DisCheck(e, cont){
        if(!e.checked){
            document.getElementById(cont).style.visibility = "hidden";
            document.getElementById(cont).style.height = "5px";
        }else{
            document.getElementById(cont).style.visibility = "visible";
            document.getElementById(cont).style.height = "60px";
            if (cont == "FiltroFauna" || cont == "FiltroFlora" || cont == "FiltroInputPresiones")
            {
                document.getElementById(cont).style.height = "90px";
            }
            if (cont == "FiltroComplejo" || cont == "FiltroInputCuenca"){
                document.getElementById(cont).style.height = "35px";
            }
        }
    }


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
    $('#FiltroInputPresiones').on('change', (event) => {
        console.log(event.input[type=checkbox]);
    })
})
