// fetch("https://pokeapi.co/api/v2/pokemon/ditto")
//     .then(response => {
//         if (!response.ok){
//             throw new Error("Could not fetch resource");
//         }
//         return response.json();
//     })
//     .then(data => console.log(data.name))          //doing . after, will get the certain bit of data you want
//     .catch(error => console.error(error));


console.log("hello")

// const baseUrl = "'https://api.mangadex.org/manga";
// const title = 'Kanojyo to Himitsu to Koimoyou';
// fetch(baseUrl, {
//     method: 'GET',
//     params: {
//         title: title
//     }
    
// });  
const baseUrl = "https://api.mangadex.org/manga";
const title = 'Kanojyo to Himitsu to Koimoyou';
const url = `${baseUrl}?title=${encodeURIComponent(title)}`;
fetch(baseUrl, { 
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
})


document.getElementById('fetchMessage').addEventListener('click', () => {
    console.log("clicked")
    fetch('http://localhost:3000/getMessage')
      .then(response => response.text())
      .then(data => {
        document.getElementById('message').innerText = data;
      })
      .catch(error => {
        console.error('Error fetching message:', error);
      });
  });