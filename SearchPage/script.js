 
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

                // if (data.results && data.results.length > 0) {
                    const firstManga = data.data[0];
                    console.log(firstManga);
                    // const firstMangaDescription = data.data[0].attributes.description.en; // Adjust 'en' for other languages if needed
                    // console.log("First Manga Name:", firstMangaDescription);
                    const firstMangaTitle = data.data[0].attributes.title.en;
                    console.log(firstMangaTitle);
                // } else {
                //     console.log("No manga found.");
                // }
            }) 
        } 
    })
    
})