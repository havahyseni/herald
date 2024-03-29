const RSS_URL_Sport = `https://moxie.foxnews.com/feedburner/sports.xml`;

fetch(RSS_URL_Sport)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");
    let html = ``;
    items.forEach(el => {
        let img = $(el).find('media\\:group').find('media\\:content').attr('url');
        let title = el.querySelector("title").innerHTML;
        let myRegexp = /<!\[CDATA\[(.*)]]>/;
        let titleNew = myRegexp.exec(title);
        // title = titleNew[1];

        

      html += `
      <article>
      <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener"><img class="news-image" src=`+ img +`></a>
      <div class="description-div">
        <h2>
          <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
          <h2 class="news-title">`+ title +`</h2>
          </a>
        </h2>
      </div>
    </article>
      `;
    });
    let div = document.getElementById('news-feed');
    div.innerHTML += html;

  });
