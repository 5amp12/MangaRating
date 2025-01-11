//**** THIS SECTION IS A BIT MORE MESSY, BASICALLY I DIDNT KNOW THAT NORMALLY JAVASCRIPT IS ASYNCHRONOUS */
//***** MEANING IT DOESNT RUN THINGS IN ORDER, SO IN ORDER TO COMBAT THIS WHILST WORKING WITH MULTIPLE OBJECTS */
//****  I HAD TO CHANGE UP THE CODE AS YOU SEE, USING 'async' and 'await' */


$(document).ready(async function() {
    let overallCounter = -1;
    await popularManga();
    const container = $('.result-Section')
    const titlePopNow = $('<h1></h1>');
    titlePopNow.text("Popular Mangas Now")
    container.append(titlePopNow);
    await popularNow(); 

    $('.result-' + overallCounter).on("click", async function(){

        console.log("CLICK");

        const baseUrl = "https://api.mangadex.org/manga";
        const params = new URLSearchParams({
            "limit": 10,
            "order[rating]": "desc"
        }).toString();
        const url = `${baseUrl}?${params}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();

        const Getid = data.data[overallCounter].id
        window.location.href = `../MangaDetails/index.html?id=${Getid}`;

    })
    
    async function popularManga(){

    
        
        await mangaRecommendation();

        async function mangaRecommendation() {
            let counter = -1;
            for (let i = 0; i < 10; i++) {
                counter++;
                overallCounter++;

                
                let title = await mainMangaSection(overallCounter, "title");
                
                    
                
                // console.log(mangaid);
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
                const ratingContainer = $('<div>')
                    .addClass('ratingContainer-' + overallCounter)
                    .addClass('ratingContainer');
                    console.log(overallCounter);
                const starIcon = $('<img>')
                    .attr('src', '../icons/star-icon.png')
                    .addClass('star-image');
                const ratingP = $('<p>')
                    .addClass('ratingText')
                    .addClass('ratingText-' + overallCounter);  
                
                    // .text(rating);

                // Fetch cover and title data
                // let mangaid = await mainMangaSection(overallCounter, "MangaID");
                // await ratingSection(mangaid);  
                

                await mainMangaSection(overallCounter, "cover"); 
                
                
                
                titleContainer.append(titleParagraph);
                ratingContainer.append(starIcon);
                // ratingContainer.append(ratingP);
                // console.log("hello")
                informationContainer.append(titleContainer);
                informationContainer.append(ratingContainer);   
                resultDiv.append(imageContainer);
                resultDiv.append(informationContainer);

                


                $('.result-container').last().append(resultDiv);

                if (counter == 4) {
                    $('.result-Section').append(resultContainer);
                    counter = -1;
                }
            }
            
            //**This deals with the rating section */
            for(let i=0; i<(overallCounter+1); i++){         
                let mangaid = await mainMangaSection(i, "MangaID");
                await ratingSection(mangaid, i);
            }
        }

        

        async function mainMangaSection(overallCounter, dataNeeded) {
            const baseUrl = "https://api.mangadex.org/manga";
            const params = new URLSearchParams({
                "limit": 10,
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
                if(dataNeeded === "MangaID"){
                    // console.log(data.data[overallCounter].id);
                    return data.data[overallCounter].id;
                }
            }
        }

        async function coverSection(data, coverIdUrl, coverCounter, overallCounter) {
            // console.log("COVER COUNTER " + coverCounter);
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
            // console.log("The cover URL: ", fullCoverUrl);
            $('.image-' + overallCounter).attr('src', fullCoverUrl);
        }

        async function ratingSection(mangaID, count){
            // console.log(mangaID);
            const url = `https://api.mangadex.org/statistics/manga/${mangaID}`
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const Ratingdata = await response.json();

            const avgRating = (Ratingdata.statistics[mangaID].rating.average);  

            const container = $('.ratingContainer-'+count);
            
            const ratingP = $('<p></p>');
            ratingP.addClass('ratingText')
            
            ratingP.text(avgRating);
            container.append(ratingP);
            // console.log(avgRating);
        }
    }

    async function popularNow(){
        let overallCounter = 9;
        await mangaRecommendation2();

        async function mangaRecommendation2() {
            

            let counter = -1;
            for (let i = 0; i < 10; i++) {
                counter++;
                overallCounter++;

                // if(i=0){
                //     const resultSection = $('<div>')
                //         .addClass('result-Section')

                //     const titleNow = $('<h1>')
                //         .text("Popular Mangas Now");
                    
                //     resultSection.append(titleNow);
                // }
                
                let title = await mainMangaSection2(overallCounter, "title");
                
                    
                
                // console.log(mangaid);
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
                const ratingContainer = $('<div>')
                    .addClass('ratingContainer-' + overallCounter)
                    .addClass('ratingContainer');
                    console.log(overallCounter);
                const starIcon = $('<img>')
                    .attr('src', '../icons/star-icon.png')
                    .addClass('star-image');
                const ratingP = $('<p>')
                    .addClass('ratingText')
                    .addClass('ratingText-' + overallCounter);  
 
                await mainMangaSection2(overallCounter, "cover"); 
                console.log("hello?")
                
                titleContainer.append(titleParagraph);
                ratingContainer.append(starIcon);
                // ratingContainer.append(ratingP);
                // console.log("hello")
                informationContainer.append(titleContainer);
                informationContainer.append(ratingContainer);   
                resultDiv.append(imageContainer);
                resultDiv.append(informationContainer);

                


                $('.result-container').last().append(resultDiv);

                if (counter == 4) {
                    $('.result-Section').append(resultContainer);
                    counter = -1;
                }
            }
            
            //**This deals with the rating section */
            // for(let i=10; i<(overallCounter+1); i++){         
            //     let mangaid = await mainMangaSection2(i, "MangaID");
            //     await ratingSection2(mangaid, i);
            // }
            
        }

        async function mainMangaSection2(overallCounter, dataNeeded) {
            const baseUrl = "https://api.mangadex.org/manga";
            const params = new URLSearchParams({
                "limit": 10,
                "order[followedCount]": "desc"
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
                    console.log(coverIdUrl);    
                    coverSection2(data.data[overallCounter], coverIdUrl, 0, overallCounter);
                }
                if(dataNeeded === "MangaID"){
                    // console.log(data.data[overallCounter].id);
                    return data.data[overallCounter].id;
                }
            }
        }

        async function coverSection2(data, coverIdUrl, coverCounter, overallCounter) {
            // console.log("COVER COUNTER " + coverCounter);
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
            // console.log("The cover URL: ", fullCoverUrl);
            $('.image-' + overallCounter).attr('src', fullCoverUrl);
        }

        async function ratingSection2(mangaID, count){
            // console.log(mangaID);
            const url = `https://api.mangadex.org/statistics/manga/${mangaID}`
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const Ratingdata = await response.json();

            const avgRating = (Ratingdata.statistics[mangaID].rating.average);  

            const container = $('.ratingContainer-'+count);
            
            const ratingP = $('<p></p>');
            ratingP.addClass('ratingText')
            
            ratingP.text(avgRating);
            container.append(ratingP);
            // console.log(avgRating);
        }

    }
});

