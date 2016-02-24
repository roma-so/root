<works>

  <div class={works: true, filtered: parent.codeHide}>
    <div each={ work in works } class={
      work: true,
      hidden: !this.filter[Object.keys(this.filter)[work.companyId - 1]]
      }>
      <a href={ work.url }>
        <h3 class="external">{ work.name }</h3>
        <p><img src={'/works/' + work.cover}/></p>
      </a>
        <p>
          <span each={ tag in work.role } class={
            tag: true,
            'support' : tag === 'support',
            'tech' : tag === 'technologist',
            'content' : tag === 'content',
          }>{ tag }</span>

        </p>

    </div>
  </div>

  <style scoped>

    .works{
      opacity: 0;
      height: 0;
      max-height: 0;
      overflow: hidden;
      transition: all 1s ease-in-out;
      transition-delay: 1s;
      position: relative;
    }

    .works.filtered{
      max-height: 10000px;
      height: initial;
      display: block;
      opacity: 1;
    }
      .work {
        vertical-align: top;
        display: inline-block;
        margin: 7% 3% 2% 0;
        text-align: center;
        width: 30%;
      }
      .work img{
        margin: 15px auto;
        max-height: 60px;
        max-width: 80px;
        height: auto;
      }

      .work a{
        text-decoration: none;
      }

      .works a p {
        height: 100px;
      }

      .work.hidden{
        display: none;
      }

      .work a > *:first-child {
        border-bottom: solid 1px rgba(45, 114, 156, 0.3);
        font-weight: normal;
        line-height: 1.5;
        display: inline;
        color: #2D72B9;
      }

      .work a:hover > *:first-child{
        color: #B2D1F1;
        transition: all .3s ease-in-out;
        border-bottom-color: rgba(178, 209, 241, 0.3);
      }
  </style>

  <script>

  // console.log(this.parent.companiesToShow[ Object.keys(this.parent.companiesToShow)[0] ])

  this.filter = opts.filter;
  this.works = [
      {
        name: 'Gazprom',
        company: 'Art. Lebedev Studio',
        companyId: 1,
        url: 'http://www.artlebedev.com/everything/gazprom/site2/',
        tech: ['Imprimatur I', 'jQuery'],
        role: ['technologist','support', 'content'],
        cover: 'gazprom.png'
      },
      {
        name: 'Central Bank',
        company: 'Art. Lebedev Studio',
        companyId: 1,
        url: 'http://www.artlebedev.com/everything/cbr/site3/',
        tech: ['Imprimatur I', 'jQuery'],
        role: ['technologist','support'],
        cover: 'cbr.png'
      },
      {
        name: 'Turk Stream',
        company: 'Art. Lebedev Studio',
        companyId: 1,
        url: 'http://www.artlebedev.com/everything/turkstream/site/',
        tech: ['Imprimatur I', 'jQuery'],
        role: ['technologist'],
        cover: 'ts.png'
      },
      {
        name: 'SG-Trans',
        company: 'Art. Lebedev Studio',
        companyId: 1,
        url: 'http://www.artlebedev.com/everything/sgt/site/',
        tech: ['Imprimatur I', 'jQuery'],
        role: ['technologist', 'support'],
        cover: 'sgt.png'
      },
      {
        name: 'Alfa Bank website 5.0',
        company: 'Art. Lebedev Studio',
        companyId: 1,
        url: 'http://www.artlebedev.com/everything/alfabank/site5/',
        role: ['content'],
        cover: 'alpha.png'
      },
      {
        name: 'Mega',
        company: 'Art. Lebedev Studio',
        companyId: 1,
        url: 'http://www.artlebedev.com/everything/mega/b2b/',
        role: ['content'],
        cover: 'mega.png'
      },
      {
        name: 'Our Victory. My Story',
        company: 'Art. Lebedev Studio',
        companyId: 1,
        url: 'http://www.artlebedev.com/everything/gazprom/myvistory/',
        tech: ['Imprimatur I', 'jQuery'],
        role: ['technologist','support'],
        cover: 'myvistory.png'
      },
      {
        name: 'OSK',
        company: 'Art. Lebedev Studio',
        companyId: 1,
        url: 'http://www.artlebedev.com/everything/osk/',
        role: ['content'],
        cover: 'osk.jpg'
      },
      {
        name: 'Chetyre Stihii',
        company: 'Art. Lebedev Studio',
        companyId: 1,
        url: 'http://www.artlebedev.com/everything/4stihii/',
        tech: ['Imprimatur I','jQuery'],
        role: ['technologist'],
        cover: '4stihii.png'
      },
      {
        name: 'AK Proekt',
        company: 'Personal',
        companyId: 2,
        url: 'http://www.akproekt.ru/',
        tech: ['Joomla','jQuery'],
        role: ['technologist'],
        cover: 'ak-proekt.png'
      },
      {
        name: 'Romanenko - Photographer',
        company: 'Personal',
        companyId: 2,
        url: 'http://andreyromanenko.ru/',
        tech: ['Python'],
        role: ['technologist'],
        cover: 'romanenko.png'
      },
      {
        name: 'Phonic (dev)',
        company: 'Personal',
        companyId: 2,
        url: 'http://phonic.space/',
        tech: ['Python'],
        role: ['technologist'],
        cover: 'phonic.png'
      },

      {
        name: 'Best Foods',
        company: 'Burobaka',
        companyId: 3,
        url: 'http://bfoods.ru/',
        tech: ['WordPress', 'jQuery'],
        role: ['technologist'],
        cover: 'best-food.png'

      },
      {
        name: 'Art Design Pro',
        company: 'Burobaka',
        companyId: 3,
        url: 'http://artdiz-pro.ru/',
        tech: ['WordPress', 'jQuery'],
        role: ['technologist'],
        cover: 'art-diz.png'
      },

      {
        name: 'Tupolev',
        company: 'OAO Tupolev',
        companyId: 4,
        url: 'http://tupolev.ru/',
        tech: ['YII', 'SharePoint', 'jQuery'],
        role: ['technologist', 'support'],
        cover: 'OAK.png'
      },

    ]
  </script>

</works>
