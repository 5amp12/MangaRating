$(document).ready(function(){
    let counter = 0
    $('#addButton').click(function(){

        counter++;

        const resultContainer = $('<div>')
        .addClass('result-container');

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

        $('.result-container').append(resultDiv);

        if(counter == 4){
            $('.result-Section').append(resultContainer);
        }


        // const resultContainer = $('.result-container');

        // const resultDiv = $('.result');

        // const imageContainer = $('.image-container');

        // const img = $('<img>')
        //             // .attr('id', 'image-one')
        //             .attr('src', "")
                    
        // imageContainer.append(img);

        // const informationContainer = $('.information-container');    

        // const titleContainer = $('.title-container');

        // const titleParagraph = $('.object-title')
        //             // .attr('id', 'title-one')
        //             .text("title" + counter);

        // titleContainer.append(titleParagraph);

        // informationContainer.append(titleContainer);

        // resultDiv.append(imageContainer);
        // resultDiv.append(informationContainer);

        // resultContainer.append(resultDiv);

        // $('#resultSection').append(resultContainer);

    })
})