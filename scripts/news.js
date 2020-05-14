// https://news.api.gov.bc.ca/api/Newsletters
$(document).ready(function()
{
    // Current time in 24hr format
    // var today = new Date();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" 
    //     + today.getSeconds();
    // var date = today.getDate();
    // var dateTime = date + "T" + time;

    // API info
    const apiKey = "a7f71f04dd304d87b2a1d2ac8d4ab770"
    const url = "http://newsapi.org/v2/top-headlines?country=ca&category=health&apiKey=" + apiKey;

    // Fetch api data
    // var req = new Request(url);

    // fetch(req)
    // .then(function(response)
    // {
    //     console.log(response.json());
    //     response.json().then(data =>
    //         {

    //         });
    // });

    // function setup()
    // {
    //     noCanvas();
    //     loadJSON(url, gotData);
    // }

    // function gotData(data)
    // {
    //     console.log(data.articles[0].title);
    // }

    // News Article Container
    const newsList = $(".news-articles");

    // Appends news articles to container
    function appendNews(title, source, description)
    {

    }

    

    fetch(url).then((res) =>
    {
        return res.json()
    })
    .then((data) =>
    {
        console.log(data)
        data.articles.forEach(article =>
            {
                // grid for news article
                let grid = document.createElement("div");
                grid.className = "news-grid";

                // news title
                let titleDiv = document.createElement("div");
                titleDiv.className = "news-title";
                let title = document.createElement("a");
                title.setAttribute("href", article.url);
                title.setAttribute("target", "_blank");
                title.textContent = article.title;
                titleDiv.appendChild(title);
                
                // news source
                let source = document.createElement("div");
                source.className = "news-source"
                
                newsList.appendChild(li);
            })
    });

});