 
$(document).ready(function(){
    $('#searchInput').on("keyup", function(event){
        var searchValue = $('#searchInput').val();
        if(event.keyCode === 13){
            alert(searchValue); 
        } 
    })
    
})