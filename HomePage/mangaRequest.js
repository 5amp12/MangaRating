
// var title = ""; 
// $(document).ready(async function(){
//     let overallCounter = -1;
//     await mangaRecommendation();



//     async function mangaRecommendation(){
//         let counter = -1;
//         for(let i=0; i<8; i++){
//             counter++;
//             overallCounter++;
//             // console.log(overallCounter);

//             const resultContainer = $('<div>')
//             .addClass('result-container')

//             const resultDiv = $('<div>')
//             .addClass('result')
//             .addClass('result-' + overallCounter);

//             const imageContainer = $('<div>')
//             .addClass('image-container')
//             .addClass('image-container-' + overallCounter);

//             const img = $('<img>')
//             // .addClass('image-one');
//                 .addClass('image-' + overallCounter);
//                 await mainMangaSection(overallCounter, "cover");

//             imageContainer.append(img);

//             const informationContainer = $('<div>')
//                 .addClass('information-container');
//             const titleContainer = $('<div>')
//                 .addClass('title-container')
//                 .addClass('title-container-' + overallCounter);
//             const titleParagraph = $('<p>')
//                 .addClass('object-title')
//                 // .text("title" + counter);
//                 .text(await mainMangaSection(overallCounter, "title"))   ;

//             titleContainer.append(titleParagraph);
//             informationContainer.append(titleContainer);

//             resultDiv.append(imageContainer);
//             resultDiv.append(informationContainer);

//             $('.result-container').last().append(resultDiv);

//             if(counter == 3){
//                 $('.result-Section').append(resultContainer);
//                 counter = -1;
//             }
            
//         }
//     }
    
//     async function mainMangaSection(overallCounter, dataNeeded){
//         const baseUrl = "https://api.mangadex.org/manga";
//         const params = new URLSearchParams({
//             "limit": 4,
//             "order[rating]": "desc"
//         }).toString();
//         const url = `${baseUrl}?${params}`;
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Network response was not ok: ${response.statusText}`); 
//         }
//         const data = await response.json();
//         if (dataNeeded === "title"){
//             titleSection(data.data[overallCounter], overallCounter);
//         }
//         if (dataNeeded === "cover"){
//             let coverIdUrl = data.data[overallCounter].id;
//             // console.log("COVER ID URL HERE: ", coverIdUrl);
//             // console.log(data.data[overallCounter]);
//             coverSection(data.data[overallCounter], coverIdUrl, 0, overallCounter);
//             // console.log("COVER SECTION GETTING HIT");
//         }
    
//     }

//     async function coverSection(data, coverIdUrl, coverCounter, overallCounter){
        
//         console.log("COVER COUNTER " + coverCounter  + "  ,"); 
//         console.log(data);
//         let callingCount;
//         for (let x=coverCounter; x<5; x++){
//             if ((data.relationships[x].type) === "cover_art"){
//                 callingCount = x;
//                 break;
//             }
//         }
//         coverIdForFileName = data.relationships[coverCounter].id;
//         // console.log("Cover ID needed for getting cover data: ", coverIdForFileName);
        
//         //GETTING THE COVER ART
//         const response = await fetch(`https://api.mangadex.org/cover/${coverIdForFileName}`);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch cover ${coverIdForFileName}: ${response.statusText}`);
//         }
//         data = await response.json();
        
//         // console.log("Cover Data:", data);
//         const coverFileName = data.data.attributes.fileName;
//         //console.log("Cover fileName: ", coverFileName);
//         const baseUrl = "https://uploads.mangadex.org/covers"; // Base URL for MangaDex covers
//         const fullCoverUrl = `${baseUrl}/${coverIdUrl}/${coverFileName}.512.jpg`;
//         console.log("The cover URL: ", fullCoverUrl);
//         $('.image-' + overallCounter).attr('src', fullCoverUrl);
            
            
        
//         // .catch(error => {
//         //     if (coverCounter != 5){
//         //         // console.log("calling count: ", callingCount);
//         //         coverSection(data, coverIdUrl, (callingCount+1), overallCounter);
//         //     }
//         //     else{
//         //         console.error("Error fetching cover data at :", overallCounter, error);
//         //     } 
//         // })    
        
//     }

//     function titleSection(data, overallCounter){
//         const container = $('.title-container-' + overallCounter);
//         container.empty();

//         const mangaTitle = data.attributes.title.en;

//         console.log(mangaTitle);

//         const $p = $('<p></p>');
//         $p.addClass("object-title");
//         $p.text(mangaTitle);
//         container.append($p);
//     }
// });



$(document).ready(async function() {
    let overallCounter = -1;
    await mangaRecommendation();

    async function mangaRecommendation() {
        let counter = -1;
        for (let i = 0; i < 8; i++) {
            counter++;
            overallCounter++;

            let title = await mainMangaSection(overallCounter, "title")
            // console.log(title);
            const resultContainer = $('<div>').addClass('result-container');

            const resultDiv = $('<div>')
                .addClass('result')
                .addClass('result-' + overallCounter);

            const imageContainer = $('<div>')
                .addClass('image-container')
                .addClass('image-container-' + overallCounter);

            const img = $('<img>')
                .addClass('image-' + overallCounter);
                
            imageContainer.append(img);

            const informationContainer = $('<div>')
                .addClass('information-container');
            const titleContainer = $('<div>')
                .addClass('title-container')
                .addClass('title-container-' + overallCounter);
            const titleParagraph = $('<p>')
                .addClass('object-title')
                .text(title);

            // Fetch cover and title data
            await mainMangaSection(overallCounter, "cover");        
            
            titleContainer.append(titleParagraph);
            informationContainer.append(titleContainer);
            resultDiv.append(imageContainer);
            resultDiv.append(informationContainer);

            $('.result-container').last().append(resultDiv);

            if (counter == 4) {
                $('.result-Section').append(resultContainer);
                counter = -1;
            }
        }
    }

    async function mainMangaSection(overallCounter, dataNeeded) {
        const baseUrl = "https://api.mangadex.org/manga";
        const params = new URLSearchParams({
            "limit": 8,
            "order[rating]": "desc"
        }).toString();
        const url = `${baseUrl}?${params}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        
        if (data.data && data.data.length > overallCounter){
            if (dataNeeded === "title") {
                // console.log(titleSection(data.data[overallCounter], overallCounter));
                return data.data[overallCounter].attributes.title.en;
            }
            if (dataNeeded === "cover") {
                let coverIdUrl = data.data[overallCounter].id;
                coverSection(data.data[overallCounter], coverIdUrl, 0, overallCounter);
            }
        }
    }

    async function coverSection(data, coverIdUrl, coverCounter, overallCounter) {
        console.log("COVER COUNTER " + coverCounter);
        let callingCount;
        for (let x = coverCounter; x < data.relationships.length; x++) {
            if (data.relationships[x].type === "cover_art") {
                callingCount = x;
                break;
            }
        }
        const coverIdForFileName = data.relationships[callingCount].id;

        const response = await fetch(`https://api.mangadex.org/cover/${coverIdForFileName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch cover ${coverIdForFileName}: ${response.statusText}`);
        }
        const coverData = await response.json();
        const coverFileName = coverData.data.attributes.fileName;
        const baseUrl = "https://uploads.mangadex.org/covers";
        const fullCoverUrl = `${baseUrl}/${coverIdUrl}/${coverFileName}.512.jpg`;
        console.log("The cover URL: ", fullCoverUrl);
        $('.image-' + overallCounter).attr('src', fullCoverUrl);
    }
});

