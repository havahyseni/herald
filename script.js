const App = new Vue({

    el : '#app',
    data : {
        CORS_PROXY : "https://api.allorigins.win/get?url=",
        news : {
            fr : JSON.parse(localStorage.getItem('news.fr')) || [],
            en : JSON.parse(localStorage.getItem('news.en')) || []
        }
    },
    methods : {

        rss : function() {

            let parser = new RSSParser();

            fetch(`${this.CORS_PROXY}${encodeURIComponent('https://www.france24.com/fr/rss')}`)
                .then(response => {
                    if (response.ok) return response.json()
                    throw new Error('Network response was not ok.')
                })
                .then(data => {

                    parser.parseString(data.contents, (err, feed) => {
                        if (err) {
                            this.news.fr = [err]
                        } else {
                            this.news.fr = feed.items;
                            localStorage.setItem('news.fr', JSON.stringify(this.news.fr));
                        }
                    })
                });

            window.setTimeout(() => {

                fetch(`${this.CORS_PROXY}${encodeURIComponent('https://www.france24.com/en/rss')}`)
                    .then(response => {
                        if (response.ok) return response.json()
                        throw new Error('Network response was not ok.')
                    })
                    .then(data => {

                        parser.parseString(data.contents, (err, feed) => {
                            if (err) {
                                this.news.en = [err]
                            } else {
                                this.news.en = feed.items;
                                localStorage.setItem('news.en', JSON.stringify(this.news.en));
                            }
                        })
                    });

            }, 250);

        }
    },
    created: function () {
        this.rss();
    }

});

const RSS_URL_SPORT_NEWS = `https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU`;

fetch(RSS_URL_SPORT_NEWS)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    const items = data.querySelectorAll("item");
    let html = ``;
    items.forEach(el => {
        let img = $(el).find('enclosure').attr('url');
        let title = el.querySelector("title").innerHTML;
        let myRegexp = /<!\[CDATA\[(.*)]]>/;
        let titleNew = myRegexp.exec(title);
        title = titleNew[1];

        

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
    let div = document.getElementById('sport-news');
    div.innerHTML += html;

  });


// News Live
function rssticker(t){for(var a=0;a<numeroposts;a++){entradas=t.feed.entry[a],titulosposts[a]=entradas.title.$t;for(var e=0;e<entradas.link.length;e++)if("alternate"==entradas.link[e].rel){enlaceposts[a]=entradas.link[e].href;break}}startrssticker()}function startrssticker(){postactual=-1,largoactual=0,enlaces=document.getElementById("enlace"),runticker()}function runticker(){var t;0==largoactual&&(postactual++,postactual%=numeroposts,titulo=titulosposts[postactual].replace(/&quot;/g,'"'),enlace=enlaceposts[postactual],enlaces.href=enlace),enlaces.innerHTML=titulo.substring(0,largoactual),largoactual!=titulo.length?(largoactual++,t=retardocaracter):(largoactual=0,t=retardopost),setTimeout("runticker()",t)}
var numeroposts = 6; //Entradas a mostrar
var retardocaracter = 30; //Cadencia entre caracteres
var retardopost = 4000; //Cadencia entre entradas
var titulosposts = new Array();
var enlaceposts = new Array();
var entradas =  "";
