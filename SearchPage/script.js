 
$(document).ready(function(){
    $('#searchInput').on("keyup", function(event){
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
    
                const firstMangaTitle = data.data[0].attributes.title.en;
                console.log(firstMangaTitle);

                const mangaCoverArt = data.data[0].relationships[2].id;
                console.log(mangaCoverArt);
            }) 
        } 


        //Trying to get the cover file, so we can have a cover picture.
        const coverId = "2b888ee6-eb25-4f48-86b0-f4fe898ab234"; // Example cover ID

fetch(`https://api.mangadex.org/cover/${coverId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch cover ${coverId}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Cover Data:", data);
        const coverFileName = data.data.attributes.fileName;

        // Construct URL for the cover image
        const baseUrl = "https://uploads.mangadex.org/covers"; // Base URL for MangaDex covers
        const coverUrl = `${baseUrl}/${coverFileName}`;

        console.log("Cover URL:", coverUrl);

        // Now you can use 'coverUrl' to display or process the cover image
    })
    .catch(error => {
        console.error("Error fetching cover data:", error);
    }); 
    })
    
})