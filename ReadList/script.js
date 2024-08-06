$(document).ready(function(){
    let counter = 0
    let id = "one";
    $('#addButton').click(function(){

        counter++;

        const resultContainer = $('<div>')
        .addClass('result-container')

        const resultContainer1 = $('<div>')
        .addClass('result-container')

        const resultDiv = $('<div>')
        .addClass('result');

        const imageContainer = $('<div>')
        .addClass('image-container');

        const img = $('<img>')
        .attr('src', "");

        imageContainer.append(img);

        const informationContainer = $('<div>')
            .addClass('information-container');
        const titleContainer = $('<div>')
            .addClass('title-container');
        const titleParagraph = $('<p>')
            .addClass('object-title')
            .text("title" + counter);

        titleContainer.append(titleParagraph);
        informationContainer.append(titleContainer);

        resultDiv.append(imageContainer);
        resultDiv.append(informationContainer);

        $('.result-container').last().append(resultDiv);

        if(counter == 4){
            $('.result-Section').append(resultContainer);
            counter = 0;
        }

        

    })
})