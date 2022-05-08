// Création du plateau
function lignes() {
   let i = 0;
   let x = 0;
   var y = 0;
   var a = 0;
   $('body').prepend('<div id="plateau">');
   $('body').append('</div>');
   while (i < 17) {

      $("#plateau").append(`<div class="ligne${i}"></div>`);
      while (x < 9) {
         if (i % 2 == 0) {
            if (y == 9 || y == 19 || y == 29 || y == 39 || y == 49 || y == 59 || y == 69 || y == 79) {
               y++;
            }
            $(".ligne" + i).append(`<div class="rectangle1" data-num="${x}" data-case="${y}"></div>`);
            if (x < 8) {
               $(".ligne" + i).append(`<div class="rectangle2" data-num="${x}" data-murV="${a}"></div>`);
            }
            y++;
            a++;
         } else {
            $(".ligne" + i).append(`<div class="rectangle3" data-num="${x}" data-murH="${a}"></div>`);
            if (x < 8) {
               $(".ligne" + i).append(`<div class="rectangle4"  data-num="${x}" data-carre="${a}"></div>`);
               a++;
            };
         }
         x++;
      }
      i++;
      x = 0;
   };
}


// Placement des pions à l'aide des attributs data des cases 
function debut() {
   $('#plateau').append('<div data-position="4" class="pion1"></div> <div data-position="84" class="pion2"></div>')

   $(".pion1").offset($("[data-case=4]").offset())
   $(".pion2").offset($("[data-case=84]").offset())
}

function reserve() {
   let num = 1;
   $("#plateau").prepend('<div class="stock1"></div>');
   while (i < 22) {
      if (i % 2 == 0) {
         $('.stock1').append('<div class="reserve1"></div>')
      } else {
         if (i < 21) {
            $('.stock1').append(`<div class="reserve2 dispo" data-murstock=${num}></div>`);
            num++;
         }
      }
      i++;

   };
   i = 0;
   num = 1;
   $("#plateau").append('<div class="stock2"></div>');
   while (i < 22) {
      if (i % 2 == 0) {
         $('.stock2').append('<div class="reserve1"></div>')
      } else {
         if (i < 21) {
            $('.stock2').append(`<div class="reserve2 dispo" data-murstock=${num}></div>`);
            num++;
         }
      }
      i++;

   };
}

lignes();

i = 0;

reserve();

debut();

// tour actuel pour savoir quel joueur doit jouer
var tour = 1;
var joueur = 1;
var id = $('.pion' + joueur).data("position");

function verifjoueur() {
   if (joueur == 1) {
      joueur = 2;
   } else {
      joueur = 1;
   }
}

// Fonction pour vérifier si le joueur peut encore placer des murs
var stock1 = 10;
var stock2 = 10;

function stock() {
   if (stock1 > 0) {
      if (joueur == 1) {
         $(`.stock1 .reserve2[data-murstock="${stock1}"`).removeClass('dispo');
         stock1--;
         console.log(`Il reste ${stock1} barrières au joueur 1`);
      }
   }
   if (stock2 > 0) {
      if (joueur == 2) {
         $(`.stock2 .reserve2[data-murstock="${stock2}"`).removeClass('dispo');
         stock2--;
         console.log(`Il reste ${stock2} barrières au joueur 2`)
      }
   }
}


$('.joueur').css({'top': Number(($('.pion' + joueur).offset().top)-2)+"px", 'left': Number(($('.pion' + joueur).offset().left)-2)+"px"})
// partie des déplacements des pions
function fintour() {
   verifjoueur();
   tour++;
   id = $('.pion' + joueur).attr('data-position');
   $('.joueur').css({'top': Number(($('.pion' + joueur).offset().top)-2)+"px", 'left': Number(($('.pion' + joueur).offset().left)-2)+"px"})
}

// Fonctions pour le déplacement des pions
function bas() {
   id = Number(id) + 10;
   $('.pion' + joueur).attr('data-position', id);
   $('.pion' + joueur).offset($(`[data-case=${id}]`).offset())
}

function haut() {
   id = Number(id) - 10;
   $('.pion' + joueur).attr('data-position', id);
   $('.pion' + joueur).offset($(`[data-case=${id}]`).offset())
}

function gauche() {
   id = Number(id) - 1;
   $('.pion' + joueur).attr('data-position', id);
   $('.pion' + joueur).offset($(`[data-case=${id}]`).offset())
}

function droite() {
   id = Number(id) + 1;
   $('.pion' + joueur).attr('data-position', id);
   $('.pion' + joueur).offset($(`[data-case=${id}]`).offset())
}



$("[class^='rectangle']").click(function () {
   let clic = $(this).data('case');
   let actuel = Number(id);
   let actnum = $(this).data('num');

   

   if (clic == (actuel + 10) && 
   $(this).parent().prev().children(`.rectangle3[data-num=${actnum}]`).attr("style") != "background-color: white;") {
      if (clic == $('.pion2').attr('data-position') || 
      clic == $('.pion1').attr('data-position')) {
         if ($(this).parent().next().children(`.rectangle3[data-num=${actnum}]`).attr("style") != "background-color: white;") {
            bas();
            bas();
            fintour();
         } else {}
      } else {
         bas();
         fintour();
      };

   }
   if (clic == (actuel + 1) && 
   $(this).prev('.rectangle2').attr("style") != "background-color: white;") {
      if (clic == $('.pion2').attr('data-position') || 
      clic == $('.pion1').attr('data-position')) {
         if ($(this).next().attr("style") != "background-color: white;") {
            droite();
            droite();
            fintour()
         } else {

         }

      } else {
         droite();
         fintour();
      }
   };
   if (clic == actuel - 10 && 
      $(this).parent().next().children(`.rectangle3[data-num=${actnum}]`).attr("style") != "background-color: white;") {
      if (clic == $('.pion2').attr('data-position') || clic == $('.pion1').attr('data-position')) {
         if ($(this).parent().prev().children(`.rectangle3[data-num=${actnum}]`).attr("style") != "background-color: white;") {
            haut();
            haut();
            fintour();
         } else {

         }

      } else {
         haut();
         fintour();
      }
   };
   if (clic == actuel - 1 && $(this).next('.rectangle2').attr("style") != "background-color: white;") {
      if (clic == $('.pion2').attr('data-position') || clic == $('.pion1').attr('data-position')) {
         if ($(this).prev(`.rectangle3[data-num=${actnum}]`).attr("style") != "background-color: white;") {
            gauche();
            gauche();
            fintour()
         } else {

         }

      } else {
         gauche();
         fintour();
      }

   };

   // Création d'un mur d'une longueur de 2 cases à l'endroit où le joueur a cliqué
   let murV = $(this).data('murv');
   let murH = $(this).data('murh');
   var stockj = stock1;
   if (joueur == 2) {
      stockj = stock2;
   } else {
      stockj = stock1;
   }
   if (stockj > 0) {
      if ($(this).attr("style") != "background-color: white;" && 
      $(`div[data-murv=${(Number(murV) + 17)}]`).attr("style") != "background-color: white;" && 
      $(`div[data-carre=${(Number(murV) + 9)}]`).attr("style") != "background-color: white;") {
         if ($(this).hasClass("rectangle2") || 
         $(this).hasClass("rectangle3") || 
         $(this).hasClass("rectangle4") == true) {
            if ($(this).hasClass("rectangle2") == true) {
               ($(this)).css("background-color", "white");
               ($(`div[data-murv=${(Number(murV) + 17)}]`)).css("background-color", "white");
               ($(`div[data-carre=${(Number(murV) + 9)}]`)).css("background-color", "white");
               stock();
               fintour();
            }
         }
      }
      if ($(this).attr("style") != "background-color: white;" && 
      $(`div[data-murh=${(Number(murH) + 1)}]`).attr("style") != "background-color: white;" && 
      $(`div[data-carre=${Number(murH)}]`).attr("style") != "background-color: white;") {
         if ($(this).hasClass("rectangle3") == true) {
            ($(this)).css("background-color", "white");
            ($(`div[data-murh=${(Number(murH) + 1)}]`)).css("background-color", "white");
            ($(`div[data-carre=${Number(murH)}]`)).css("background-color", "white");
            stock();
            fintour();
         }
      }
   }
   if ($('.pion1').offset().top == 873) {
      $('h1').append('Le joueur 1 a gagné la partie !')
      $('.end').css('display', 'initial')
   }
   if ($('.pion2').offset().top == 193) {
      $('h1').append('Le joueur 2 a gagné la partie !')
      $('.end').css('display', 'initial')
   }

   console.log("Tour " + tour);
});

$('.rectangle1').mouseover(function () {
   $(this).css('background-color', '#FFF4A3')
})

$('.rectangle1').mouseleave(function () {
   $(this).css('background-color', '#FCF6CD')
})

$('.rectangle2').mouseover(function () {
   let murV = $(this).data('murv');
   if ($(this).attr('style') != "background-color: white;" && $(`div[data-murv=${(Number(murV) + 17)}]`).attr('style') != "background-color: white;" && $(`div[data-carre=${(Number(murV) + 9)}]`).attr('style') != "background-color: white;") {
      $(this).css('background-color', '#f0f0f0')
      $(`div[data-murv=${(Number(murV) + 17)}]`).css('background-color', '#f0f0f0')
      $(`div[data-carre=${(Number(murV) + 9)}]`).css('background-color', '#f0f0f0')
   }
})

$('.rectangle2').mouseleave(function () {
   let murV = $(this).data('murv');
   if ($(this).attr('style') == 'background-color: rgb(240, 240, 240);') {
      $(this).css('background-color', 'rgb(237, 168, 90)')
      $(`div[data-murv=${(Number(murV) + 17)}]`).css('background-color', 'rgb(237, 168, 90)')
      $(`div[data-carre=${(Number(murV) + 9)}]`).css('background-color', 'rgb(237, 168, 90)')
   }
})

$('.rectangle3').mouseover(function () {
   let murH = $(this).data('murh');
   if ($(this).attr('style') != "background-color: white;" && $(`div[data-murh=${(Number(murH) + 1)}]`).attr('style') != "background-color: white;" && $(`div[data-carre=${Number(murH)}]`).attr('style') != "background-color: white;") {
      $(this).css('background-color', '#f0f0f0')
      $(`div[data-murh=${(Number(murH) + 1)}]`).css('background-color', '#f0f0f0')
      $(`div[data-carre=${Number(murH)}]`).css('background-color', '#f0f0f0')
   }
})

$('.rectangle3').mouseleave(function () {
   let murH = $(this).data('murh');
   if ($(this).attr('style') == 'background-color: rgb(240, 240, 240);') {
      $(this).css('background-color', 'rgb(237, 168, 90)')
      $(`div[data-murh=${(Number(murH) + 1)}]`).css('background-color', 'rgb(237, 168, 90)')
      $(`div[data-carre=${Number(murH)}]`).css('background-color', 'rgb(237, 168, 90)')
   }
})

function resetGame() {
   document.location.reload();
}