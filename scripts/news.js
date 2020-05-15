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


    // News Article Container
    const newsList = document.querySelector(".news-articles");

    // Appends news articles components to the news section of news.html
    function appendNews(grid, title, source, desc)
    {
        grid.appendChild(title);
        grid.appendChild(source);
        grid.appendChild(desc);
        
        newsList.appendChild(grid);
    }

    // create a grid for the news article
    function createGrid()
    {
        let grid = document.createElement("div");
        grid.className = "news-grid";

        return grid;
    }

    // create a title and put it in a div
    function createTitle(titleText, url)
    {
        let titleDiv = document.createElement("div");
        titleDiv.className = "news-title";
        let title = document.createElement("a");
        title.setAttribute("href", url);
        title.setAttribute("target", "_blank");
        title.textContent = titleText;
        titleDiv.appendChild(title);

        return titleDiv;
    }

    // create a source and put it in a div
    function createSource(sourceText)
    {
        let sourceDiv = document.createElement("div");
        sourceDiv.className = "news-source";
        let source = document.createElement("p");
        source.textContent = "(" + sourceText + ")" ;
        sourceDiv.appendChild(source);

        return sourceDiv;
    }

    // create a description and put it in a div
    function createDesc(descText)
    {
        let descDiv = document.createElement("div");
        descDiv.className = "news-desc";
        let desc = document.createElement("p");
        desc.textContent = descText;
        descDiv.appendChild(desc);

        return descDiv;
    }

    // Fetches 
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
                let grid = createGrid();

                // news title
                let titleText = article.title;
                let url = article.url;
                let title = createTitle(titleText, url);
                
                // news source
                let sourceText = article.source.name;
                let source = createSource(sourceText);

                // news description
                let descText = article.description;
                let desc = createDesc(descText);

                appendNews(grid, title, source, desc);
            })
    })
    .catch(error =>
    {
        console.log(error);
    });
})