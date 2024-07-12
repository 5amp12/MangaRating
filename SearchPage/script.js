$(document).ready(function(){

    $('#searchInput').on("keyup", function(event){
        mainSection();
        function mainSection(){
            
            var searchValue = $('#searchInput').val();       //the search value
            if(event.keyCode === 13){   //if Enter is pressed 
                $('.image-container').css('visibility' ,'visible');   //making divs visible
                $('.information-container').css('visibility' ,'visible');
                //API based code here:
                const baseUrl = "https://api.mangadex.org/manga";
                const params = new URLSearchParams({
                    title: searchValue
                }).toString();
                const url = `${baseUrl}?${params}`;
                fetch(url, { 
                    method: 'GET'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`); 
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(url);
                    console.log(data);

                    const firstManga = data.data[0];
                    console.log(firstManga);


                    //****THIS SECTION IS MAKING SURE THE TOP RESULT IS WHAT THE USER SEARCHED
                    let checkingSearchVal = searchValue.replaceAll(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');
                    checkingSearchVal = checkingSearchVal.replaceAll(" ", "");
                    checkingSearchVal = checkingSearchVal.toLowerCase();
                    //code above getting rid of punctuation and spaces for search
                    let found = false;
                    for(let i=0; i<data.data.length; i++){
                        let checkingResultValues = (data.data[i].attributes.title.en).replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');
                        checkingResultValues = checkingResultValues.replaceAll(" ", "");    
                        checkingResultValues = checkingResultValues.toLowerCase();
                        //code above getting rid of punctuation and spaces for search RESULTS

                        if (checkingSearchVal == checkingResultValues){
                            console.log("hitting"); 

                            getMangaDetails(data.data[i]);
                            tagsSection(data.data[i]);                     //the data.data[i] is getting that specific result, so the data can be used in the other functions
                            titleSection(data.data[i], searchValue);        //getting the titles for each object
                            descriptionSection(data.data[i])
                        
                            const coverIdUrl = data.data[i].id;
                            coverSection(data.data[i], coverIdUrl, 0, 0);
                            found = true;
                            break;
                        }
                        //If the search is equal to one of the results, use that certain result
                    }
                    //if there is no match between search and result - use api's search guessing
                    console.log(found);
                    if (found != true){ 
                        console.log("hitting"); 
                        getMangaDetails(data.data[0]);
                        tagsSection(data.data[0]);
                        titleSection(data.data[0], searchValue);        //getting the titles for each object
                        descriptionSection(data.data[0])

                        const coverIdUrl = data.data[0].id;
                        coverSection(data.data[0], coverIdUrl, 0, 0);
                    }
                    //-----------------------
                }) 
            }
        }

        function coverSection(data, coverIdUrl, counter, mangaNumber){
            console.log(coverIdUrl); 
            for (let x=counter; x<5; x++){
                if ((data.relationships[x].type) = "cover_art"){
                    callingCount = x;
                    break;
                }
            }
            coverIdForFileName = data.relationships[counter].id;
            //console.log("Cover ID needed for getting cover data: ", coverIdForFileName);
            
            //GETTING THE COVER ART
            fetch(`https://api.mangadex.org/cover/${coverIdForFileName}`, {
                method: 'GET'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch cover ${coverId}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Cover Data:", data);
                const coverFileName = data.data.attributes.fileName;
                //console.log("Cover fileName: ", coverFileName);
                const baseUrl = "https://uploads.mangadex.org/covers"; // Base URL for MangaDex covers
                const fullCoverUrl = `${baseUrl}/${coverIdUrl}/${coverFileName}.512.jpg`;
                //console.log("The cover URL: ", fullCoverUrl);
                $('#image-one').attr('src', fullCoverUrl);
                
                
            })
            .catch(error => {
                if (counter != 5){
                    console.log("calling count: ", callingCount);
                    coverSection(data, coverIdUrl, (callingCount+1), 0);
                }
                else{
                    console.error("Error fetching cover data:", error);
                } 
            })    
            
        }

        function tagsSection(data){
            const container = $('.tags-container');
            container.empty();
            const className = 'tags';
            for (let i=0; i<3; i++){
                let tagsName = data.attributes.tags[i].attributes.name.en;

                const $p = $('<p></p>');
                $p.addClass(className);
                $p.text(tagsName);
                container.append($p);
                
            }
        }

        function titleSection(data){
            const container = $('.title-container');
            container.empty();

            const mangaTitle = data.attributes.title.en;

            const $p = $('<p></p>');
            $p.addClass("object-title");
            $p.text(mangaTitle);
            container.append($p);
        }

        function descriptionSection(data){
            const description = data.attributes.description.en;
            console.log(description);
            let shortenedDescription = "";
            for (let i=0; i<description.length; i++){
                if(description.charAt(i) == '-' && description.charAt(i+1) == '-'){
                    break;
                }
                else{
                    shortenedDescription += description.charAt(i) + "";
                    if(i == 500){
                        break;
                    }
                }
            }

            const container = $('.description-container');
            container.empty();  

            const $p = $('<p></p>');
            $p.text(shortenedDescription);
            container.append($p);


            // $('#description-one').text(shortenedDescription);
        }
        
        function getMangaDetails(data){

            $('#result-id').on("click", function(){
                const Getid = data.id;
                window.location.href = `../MangaDetails/index.html?id=${Getid}`;

            })

            
        }
        
        
    })
    
    
})