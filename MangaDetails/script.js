
$(document).ready(function(){

    //getting the id from the URL
    const parameter = new URLSearchParams(window.location.search);
    const mangaId = parameter.get('id');
    console.log(mangaId);

    const url = `https://api.mangadex.org/manga/${mangaId}`
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
        console.log(data);
        tagsSection(data);
        titleSection(data);
        descriptionSection(data);
        const coverId = data.data.id;
        coverSection(data, coverId, 0);
        gettingStatistics();
        gettingChapters(data);

    })

    function coverSection(data, coverIdUrl, counter){
        for (let x=counter; x<5; x++){
            if ((data.data.relationships[x].type) = "cover_art"){
                callingCount = x;
                break;
            }
        }
        coverIdForFileName = data.data.relationships[counter].id;
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
            const coverFileName = data.data.attributes.fileName;
            const baseUrl = "https://uploads.mangadex.org/covers"; // Base URL for MangaDex covers
            const fullCoverUrl = `${baseUrl}/${coverIdUrl}/${coverFileName}.512.jpg`;
            $('#image-one').attr('src', fullCoverUrl);
        })
        .catch(error => {
            if (counter != 5){  
                coverSection(data, coverIdUrl, (callingCount+1));
            }
            else{
                console.error("Error fetching cover data:", error);
            } 
        })

    }

    function tagsSection(data){
        console.log("tagsSection"); 
        const container = $('.tags-container');
        container.empty();
        const className = 'tags';
        for (let i=0; i<5; i++){
            let tagsName = data.data.attributes.tags[i].attributes.name.en;
            // console.log(tagsName);
            const $p = $('<p></p>');
            $p.addClass(className);
            $p.text(tagsName);
            container.append($p);
        }
    }

    function titleSection(data){
        const container = $('.title-container');
        container.empty();

        const mangaTitle = data.data.attributes.title.en;

        const $p = $('<p></p>');
        $p.addClass("object-title");
        $p.text(mangaTitle);
        container.append($p);
    }

    function descriptionSection(data){
        const description = data.data.attributes.description.en;

        let newDescription = "";
        for (let i=0; i<description.length; i++){
            if(description.charAt(i) == '-' && description.charAt(i+1) == '-'){
                break;
            }
            else{
                newDescription += description.charAt(i) + "";
            }
        }

        const container = $('.description-container');
        container.empty();

        const $p = $('<p></p>');
        $p.text(newDescription);
        container.append($p);


        // $('#description-one').text(shortenedDescription);
    }

    function gettingStatistics(){
        const url = `https://api.mangadex.org/statistics/manga/${mangaId}`
        fetch(url, { 
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`); 
            }
            return response.json();
        })
        .then(statData => {
            console.log(statData);  
            const avgRating = (statData.statistics[mangaId].rating.average);//rating.average);    

            const container = $('.rating-container');
            container.empty();

            const $p = $('<p></p>');
            $p.attr('id', 'rating-text');
            $p.text("Average Rating: " + avgRating);
            container.append($p);

        })
    }

    function gettingChapters(data){
        
        const languages = ['en']

        const baseUrl = "https://api.mangadex.org/manga";
        const params = new URLSearchParams({
            translatedLanguage: "en"
        }).toString();
        const url = `${baseUrl}/${mangaId}/feed?${params    }`;
        fetch(url, { 
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`); 
            }
            return response.json();
        })
        .then(ChapterData => {
            // for(let i=0;i<ChapterData.data.length; i++){
            //     if(ChapterData.data[i].attributes.translatedLanguage = "en"){
            //         console.log(ChapterData.data[i])
            //     }
            // }
            console.log(ChapterData);
        })
    }



})
