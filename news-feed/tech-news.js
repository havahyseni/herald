const RSS_URL_Tech = `https://moxie.foxnews.com/feedburner/scitech.xml`;

fetch(RSS_URL_Tech)
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
      <h2>
        <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
         <h2 class="news-title">`+ title +`</h2>
        </a>
      </h2>
    </article>
      `;
    });
    let div = document.getElementById('techNews');
    div.innerHTML += html;

  });
