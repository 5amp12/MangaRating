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
    
                const mangaTitle = data.data[0].attributes.title.en;
                console.log(mangaTitle);

                const coverIdUrl = data.data[0].id;
                console.log("Cover ID: ", coverIdUrl);

                const coverIdForFileName = data.data[0].relationships[2].id
                console.log("Cover ID needed for getting cover data: ", coverIdForFileName);

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
                    console.log("Cover fileName: ", coverFileName);
                    const baseUrl = "https://uploads.mangadex.org/covers"; // Base URL for MangaDex covers
                    const fullCoverUrl = `${baseUrl}/${coverIdUrl}/${coverFileName}.256.jpg`;
                    console.log("The cover URL: ", fullCoverUrl);
                })
                .catch(error => {
                    console.error("Error fetching cover data:", error);
                })    
            }) 
        }
    })
})