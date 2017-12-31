$(document).ready(function(){
 
  //main variables
  var strictMode=false;
  var actualSequence=[];
  var started=false;
  var displaying=false;
  var i=0;
  var count=0;
  var audio0= new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
  var audio1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
  var audio2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
  var audio3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
  
  //arrays containing the colors of the cells
  var colorsOff=["#FFA8A8","#FFCFA8","#6BA3A3","#8AD18A"];
  var colorsOn=["#FF5858","#FFA458","#53F1F1","#55F855"];
  var colorGlow=["0 0 50px #FF0000","0 0 50px #FF7400","0 0 50px #009999","0 0 50px #00CC00"];
  
  //aux functions
  function lightUp(x){
    if (x==0){
      audio0.play();
    }else if (x==1){
      audio1.play();
    }else if (x==2){
      audio2.play();
    }else if (x==3){
      audio3.play();
    }
    setTimeout(function(){
      $(target).css("background-color",colorsOff[x]);
      $(target).css("box-shadow","none");
    },500);
    var target="#cell"+x;
    $(target).css("background-color",colorsOn[x]);
    $(target).css("box-shadow",colorGlow[x]);
  }
  
  function addNewStep(){
    var newStep = Math.floor(Math.random()*4);
    console.log("newStep es:",newStep);
    actualSequence.push(newStep);
    count++; 
    $("#count").html(count);
    if (count==11){
      $("#winningSign").modal('show');
      $("body").css("background-color","#FCD222");
      started=false;
      $("#start").removeClass("disabled");
      actualSequence=[];
      count=0;
      $("#count").html("-");
     }
  }
  
  function display(){
    displaying=true;
    i=0;//reseting the variable used to check if you are right
    var j=0;
    var repeater = setInterval(function(){
      console.log("Displaying?:",displaying);
      console.log("entramo al repeater");
      if (j<actualSequence.length){
        lightUp(actualSequence[j]);
        j++;
      }else{
        clearInterval(repeater);
        displaying=false;
      }      
    },1000);
  }
  
  function loseSign(){
    setTimeout(function(){
       $("body").css("background-color","#FFF");
    },750);
    $("body").css("background-color","#CB424E");
    if (strictMode){
      started=false;
      count=0;
      actualSequence=[];
      $("#count").html("!!").css("color","#ab1323").addClass("animated flash");
      setTimeout(function(){
        $("#count").html("-").css("color","#212529").removeClass("flash");
        $("#start").removeClass("disabled");
      },1500);
    }else{
      i=0;
      display();
      $("#count").html("!!").css("color","#ab1323").addClass("animated flash");
      setTimeout(function(){
        $("#count").html(count).css("color","#212529").removeClass("flash");
      },1500);
    }
  }
  
                        
  //activate stric mode
  $("#strictMode").click(function(){
    if (strictMode) {
      strictMode=false;
      $("#strict").html("OFF");
      $("#strictMode").css("background-color","#555C5C");
    }else{
      strictMode=true;
      $("#strict").html("ON");
      $("#strictMode").css("background-color","#FCD222");
    }
  });
  
  //reseting
  $("#reset").click(function(){
    started=false;
    $("#start").removeClass("disabled");
    actualSequence=[];
    count=0;
    $("#count").html("-");
  });

  //main game
  $("#start").click(function(){
    console.log("arrancamos");
    if (started===false){
      console.log("entremos al if");
      started=true;
      $(this).addClass("disabled");
      addNewStep();
      console.log("secuencia es:",actualSequence);
      display();
      console.log("salimo");
    }
  });
  $("[id^='cell']").click(function(){
    if (started && displaying===false){
      console.log("click habilitado");
      var thisPlay=$(this).attr("id").slice(-1);
      lightUp(thisPlay);
      console.log(actualSequence.length);
      if (actualSequence[i]==thisPlay){
        if(i<actualSequence.length-1){
          i++;
        }else{
          addNewStep();
          display();
        }
      }else if (actualSequence[i]!=thisPlay){
        loseSign();
      }
    }
  });
  
});