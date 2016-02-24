import '../components/nav.tag';
import '../components/roma.tag';
import '../components/works.tag';

<projects>
  <header class="clearfix">
    <roma/>
  </header>
  <div class='content'>
    <div class="projects">
      <h2><span onclick={goHome}>&larr;</span>&nbsp;Projects</h2>

      <div class={ code: true, 'minify' : this.codeMinify, 'hide' : this.codeHide }>
        <p><span class="vars">Projects</span>.filter&nbsp;=&nbsp;()&nbsp;<span class="fn">=></span>&nbsp;&#123;</p>

        <p><span class="tabs"></span><span class="vars">this</span>.projectsAmount&nbsp;=&nbsp;<span class="fn">Math</span>.<span class="vars">random</span>()<span class="value">&nbsp;*&nbsp;30&nbsp;+&nbsp;20</span>;</p>
        <p><span class="tabs"></span><span class="vars">this</span>.experience&nbsp;=&nbsp;new&nbsp;<span class="fn">Date()</span>.<span class="vars">getFullYear</span>()<span class="value">&nbsp;-&nbsp;2012</span>;</p>
        <p><span class="tabs"></span><span class="vars">this</span>.companiesToShow&nbsp;=&nbsp&#123;</p>
        <div class="json">
          <p each={ name, value in companiesToShow }>
            <span class="tabs two"></span>
            <span class="vars">{ name }</span>:
            <span onclick={toggle} class="state">{ value }</span>,
          </p>
        </div>

        <p><span class="tabs"></span>}</p>

        <p>}</p>
      </div>

      <div onclick={companiesShow} class={ button: true, 'hide' : this.codeMinify }>Run Projects.filter()</div>

      <works filter = {this.companiesToShow}/>

    </div>
  </div>

  <style scoped>
    .content{
          height: 100%;
    }
    .projects{
      background: black;
      padding: 3% 10% 2%;
      min-height: 100%;
      color: #ccc;
      width: 100%;
    }
    .code{
      max-height: 100%;
      transition: all .5s ease-in-out;
    }
    .code.minify{
      margin-bottom: -270px;
      max-height: 100%;
      overflow: hidden;
    }

    .code.minify > p{
      opacity: 0;
      transition: all .5s ease-in-out;
    }
    .code.minify.hide > p{
      position: relative;
      z-index: -1;
    }

    .code.minify.hide .json{
      transform: translate3d(-60px, -130px, 0);
      transition: all .6s ease-in-out;
      position: relative;
      font-size: 80%;
      z-index: 999;
    }

  </style>

  <script>
    let self = this;
    this.companiesToShow = {
        ArtLebedevStudio: true,
        Personal: true,
        Burobaka: true,
        Tupolev: true
    }

    this.toggle = (evt) => {
      for(var i in self.companiesToShow){
        if(evt.item.name  === i)
          self.companiesToShow[i] = !self.companiesToShow[i];
          self.update();
        
      }
    };

    this.goHome = (evt) => {
      riot.route('home')
    };

    this.companiesShow  = (evt) => {
      self.codeMinify = true;
      setTimeout(function(){
        self.codeHide = true;
        self.update()
      },400)
    };

  </script>

</projects>
