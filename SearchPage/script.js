$(document).ready(function(){

    $('#searchInput').on("keyup", function(event){
        mainSection();
        function mainSection(){
            var searchValue = $('#searchInput').val();       //the search value
            if(event.keyCode === 13){   //if Enter is pressed 
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

                    tagsSection(data);
                    titleSection(data);        //getting the titles for each object
                    descriptionSection(data)
                    // console.log(mangaTitle);

                    const coverIdUrl = data.data[0].id;
                    coverSection(data, coverIdUrl, 0, 0);
                    // console.log("Cover ID: ", coverIdUrl);
                }) 
            }
        }
        function coverSection(data, coverIdUrl, counter, mangaNumber){
            console.log(coverIdUrl);
            for (let i=mangaNumber; i<3; i++){
                let callingCount = 0; 
                for (let x=counter; x<5; x++){
                    console.log("the counter: ",counter);
                    console.log(data.data[i].relationships[x].type)
                    if ((data.data[i].relationships[x].type) = "cover_art"){
                        console.log("found");
                        callingCount = x;
                        break;
                    }
                }
                coverIdForFileName = data.data[i].relationships[counter].id;
                //console.log("Cover ID needed for getting cover data: ", coverIdForFileName);
                console.log("THE MANGA SECTION", i);
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
                    if (i==0){
                        console.log("working 1");
                        $('#image-one').attr('src', fullCoverUrl);
                    }
                    else if (i==1){
                        console.log("working 2");
                        $('#image-two').attr('src', fullCoverUrl);
                    }
                    else if (i==2){
                        $('#image-three').attr('src', fullCoverUrl);
                    }
                    
                })
                .catch(error => {
                    if (counter != 5){
                        console.log("calling count: ", callingCount);
                        coverSection(data, coverIdUrl, (callingCount+1), i);
                    }
                    else{
                        console.error("Error fetching cover data:", error);
                    } 
                })    
            }
        }

        function tagsSection(data){
            const container = $('.tags-container');
                container.empty();
            const className = 'tags';
            for (let i=0; i<3; i++){
                let tagsName = data.data[0].attributes.tags[i].attributes.name.en;

                const $p = $('<p></p>');
                $p.addClass(className);
                $p.text(tagsName);
                container.append($p);
                
            }
        }

        function titleSection(data){
                const mangaTitle = data.data[0].attributes.title.en;
                
                console.log("working 1");
                $('#title-one').text(mangaTitle);
                
        }

        function descriptionSection(data){
            const description = data.data[0].attributes.description.en;
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
            $('#description-one').text(shortenedDescription);
        }
    })
})