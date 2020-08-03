import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title: string;
  public aboutme: string;
  public skills: string;
  public question: string;
  
  constructor() {
    this.title = "Me llamo Agustín Lipchak";
    this.aboutme = "Mi pasión es el desarrollo, las tecnologías y la creatividad en las soluciones mas complejas.";
    this.skills = "Habilidades";
    this.question = "Y vos qué buscas?"
  }

  ngOnInit(){
    /* animacion de tipado automatico */
    function autoType(elementClass, typingSpeed){
      var thhis = $(elementClass);
      thhis.css({
        "position": "relative",
        "display": "inline-block",
        "font-family": "titilium bold",
        "font-size": "32px"
      });
      thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
      thhis = thhis.find(".title-about");
      var text = thhis.text().trim().split('');
      var amntOfChars = text.length;
      var newString = "";
      thhis.text("|");
      setTimeout(function(){
        thhis.css("opacity",1);
        thhis.prev().removeAttr("style");
        thhis.text("");
        for(var i = 0; i < amntOfChars; i++){
          (function(i,char){
            setTimeout(function() {        
              newString += char;
              thhis.text(newString);
            },i*typingSpeed);
          })(i+1,text[i]);
        }
      },1500);
    }
    
    /* ocultar animacion autotipado */
    function deactType(elementClass){
      setTimeout(function(){
        var cursor = $(elementClass); 
        cursor.hide();
      }, 9100);
    }

    /* animacion fade */
    function fadeSpan(elementId){
      setTimeout(function(){
        var fspan = $(elementId);
        fspan.hide(function(){
          fspan.delay(1500).show('slow',function(){
            fspan.addClass('animate__fadeIn');
          });
        });
      }, 13800);
    }

    /* animacion texto cascada */
    var words = document.getElementsByClassName('word');
    var wordArray = [];
    var currentWord = 0;

    $(words[currentWord]).css("opacity", 1);
    for(var i = 0; i < words.length; i++){
      splitLetters(words[i]);
    }

    function changeWord(){
      var cw = wordArray[currentWord];
      var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
      for(var i = 0; i < cw.length; i++){
        animateLetterOut(cw, i);
      }

      for(var i = 0; i < nw.length; i++){
        nw[i].className = 'letter behind';
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, i);
      }

      currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
    }

    function animateLetterOut(cw, i){
      setTimeout(function(){
        cw[i].className = 'letter out';
      }, i*80);
    }

    function animateLetterIn(nw, i){
      setTimeout(function(){
        nw[i].className = 'letter in';
      }, 340+(i*80));
    }

    function splitLetters(word){
      var content = word.innerHTML;
      word.innerHTML = '';
      var letters = [];
      for(var i = 0; i < content.length; i++){
        var letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }
      wordArray.push(letters);
    }
    
    $(document).ready(function(){
      autoType(".title-about", 100);
      deactType(".cursor");
      fadeSpan("h3 span");
      changeWord();
      setInterval(changeWord, 4000);

      $('.bxslider').bxSlider({
        auto: true,
        autoControls: false,
        stopAutoOnClick: false,
        pager: false,
        controls: false,
        slideWidth: 1200,
        slideMargin: 0
      });
    });
  }
}
