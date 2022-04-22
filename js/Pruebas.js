$(function(){
    console.log("Inicia");
    $("#Btn").on("click", function(){
        console.log("Inicia");
        var postData= {
        accidente:false,
        cuenca:false,
        complejo:false
        }
    
        $.post('php/Prueba.php', postData, (response) => {
            console.log(response);  
            
            $("#Contenedor").html(response);
        });
    })
})