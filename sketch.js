var x = 20;
var x2 = 310;
var canvas;
var slider;
var videoInput;
var sel;
var lol;
lolHide = true;
var r = 255;
var g = 255;
var b = 255;
var videoHide = true;
var music = false;
me2 = true;
var me = {
  x: 325,
  y: 200,
  w: 100,
  h: 75,
  display: function() {
    image(video, this.x, this.y, this.w, this.h);
    image(frame, this.x, this.y, this.w, this.h);
  }
}
var sqX = 5;
var sqY = 27;
var sqW = 498;
var sqH = 498;
var dropdown;
var distance = 10;


function preload() {
  background = loadImage("images/background.png");
  poster = loadImage("images/poster.png");
  frame = loadImage("images/picframe.png")
}

function setup() {
  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();

  spotify = select('#spotify');
  soundcloud = select('#soundcloud');

  //title
  printer = createElement('p2', 'Print');
  printer.position(15, 15);

  //x
  printer = createElement('p3', 'x');
  printer.position(475, 10);

  //select music player
  printer = createElement('p2', 'Printer:');
  printer.position(x, 50);

  dropdown = createSelect();
  dropdown.position((x + 50), 50);
  dropdown.option('*~*~~~~~*~*~*~*~*~*~*~*~**');
  dropdown.option('Spotify');
  dropdown.option('SoundCloud');
  dropdown.option('YouTube');

  //many or single
  pagesToPrint = createElement('p2', 'Pages to Print:');
  pagesToPrint.position(x, 90);

  allButton = createElement('button1', 'All');
  allButton.position(x, 110);

  singleButton = createElement('button2', 'Single');
  singleButton.position(x + 55, 110);

  //source code
  docURL = createElement('p2', 'Source:');
  docURL.position(x, 160);

  docInput = createInput();
  docInput.position(x + 50, 160);

  //print
  printButton = createButton('Print');
  printButton.position(x2 + 100, 450);
  printButton.mousePressed(snap);

  //help button
  help = createElement('p4', 'Help?');
  help.position(460, 40);
  help.mousePressed(lol);

  //Rando buttons
  sizePaper = createElement('p', 'Comments & Forms:');
  sizePaper.position(x2, 60);

  pref = createElement('button4', 'Preferences');
  pref.position(x2, 90);
  pref.mousePressed(videoShow);

  sizePaper = createElement('p', '8.5 x 11 inches');
  sizePaper.position(x2, 130);

  slider = createSlider(0, 200, 60);
  slider.position(x2 + 10, 365);
  slider.style('width', '130px');

  // setup camera capture
  // video = createCapture(VIDEO);
  // video.hide();

  canvas = createCanvas(498, 498);

  lol = createImg("images/lol.gif");
  lol.position(100, 100);
  lol.hide();
}

function draw() {
  var t = slider.value();
  //border
  noStroke();
  fill(245, 230);
  rect(0, 0, 498, 498, 5);

  //top white bar
  noStroke();
  fill(240, 130);
  rect(6, 0, 486, 20);

  //x box border top
  fill(100);
  rect(449, 0, 42, 5);

  //x box border
  noStroke();
  fill(100);
  rect(449, 0, 42, 20, 5);

  //x box top
  fill(0, 150, 255);
  noStroke();
  rect(450, 0, 40, 5);

  //x box
  fill(0, 150, 255);
  noStroke();
  rect(450, 0, 40, 19, 5);

  //x white bar top
  noStroke();
  fill(240, 50);
  rect(449, 0, 42, 4);

  //x white bar
  noStroke();
  fill(240, 40);
  rect(449, 0, 42, 9);

  //inner border shadow
  noStroke();
  fill(200, 200, 200);
  rect(4, 26, 490, 467);

  //main square
  fill(235, 235, 235);
  noStroke();
  rect(5, 27, 488, 465);

  if (videoHide === false) {
    //lines
    strokeWeight(0.25);
    stroke(0, 0, 255);
    for (i = 0; i <= sqW; i = i + distance) {
      line(i, 0, mouseX, mouseY);
    }

    //bottom to middle
    for (i = 0; i <= sqW; i = i + distance) {
      line(i, sqH, mouseX, mouseY);
    }

    for (i = 0; i <= sqH; i = i + distance) {
      line(0, i, sqH, mouseY);
    }

    for (i = 0; i <= sqH; i = i + distance) {
      line(sqW, i, mouseX, mouseY);
    }
  }

  //paper canvas
  if (music === false) {
    stroke(100);
    fill(255);
    rect(300, 150, 160, 200);
  }

  if (music === true) {
    var vol = mic.getLevel();
    var r = map(vol, 0, 0.35, 255, 200);
    var g = 0;
    var b = map(vol, 0, 0.35, 255, 200);
    //color paper canvas
    stroke(100);
    fill(r, g, b, t);
    rect(300, 150, 160, 200);

  }
  // if (me2 === false) {
  //   me.display();
  // }

}

//MUSIC PLAYERS
function snap() {
  //spotify
  if (dropdown.selected() === 'Spotify') {
    if (spotify.class == 'hidden') {
      spotify.show();
      spotify.class = 'unhidden';
      music = true;
    } else {
      spotify.hide();
      spotify.class = 'hidden';
      music = false;
    }
  }
  //soundcloud
  if (dropdown.selected() === 'SoundCloud') {
    if (soundcloud.class == 'hidden') {
      soundcloud.show();
      soundcloud.class = 'unhidden';
      music = true;
    } else {
      soundcloud.hide();
      soundcloud.class = 'hidden';
      music = false;
    }
  }
  if (dropdown.selected() === '*~*~~~~~*~*~*~*~*~*~*~*~**') {
    if (soundcloud.class == 'unhidden') {
      soundcloud.hide();
      soundcloud.class = 'hidden';
      music = false;
    }
    if (spotify.class == 'unhidden') {
      spotify.hide();
      spotify.class = 'hidden';
      music = false;
    }
  }
}

function lol() {
  if (lol.hide() && lolHide == true) {
    lol.show();
    lolHide = false;
  } else if (lol.show() && lolHide == false) {
    lol.hide();
    lolHide = true;
  }
}

function videoShow() {
  if (videoHide == true) {
    videoHide = false;
  } else if (videoHide == false) {
    videoHide = true;
  }
}

// function keyPressed() {
//   if (me2 == true) {
//     me2 = false;
//   } else if (me2 == false) {
//     me2 = true;
//   }
// }
