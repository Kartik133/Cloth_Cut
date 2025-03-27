var roll_size,priority_1,priority_2,priority_3,set,state=0;
var rs,p1,p2,p3;
var display_count=0;

function setup() {
  createCanvas(displayWidth,displayHeight);
  fill(255);
  textAlign(CENTER);
  roll_size = createInput(0,"number");
  priority_1 = createInput(0,"number");
  priority_2 = createInput(0,"number");
  priority_3 = createInput(0,"number");
  set = createButton("Set");
  roll_size.position(150,50);
  priority_1.position(150,80);
  priority_2.position(150,110);
  priority_3.position(150,140);
  set.position(150,170);
}

function draw() {
  if(state!=2) {
    background(0);
  }
  if(state==0) {
    text("ROLL SIZE",70,65);
    text("1st Priority cut",70,95);
    text("2nd Priority cut",70,125);
    text("3rd Priority cut",70,155);
  }
  set.mousePressed(()=>{
    state = 1;
    roll_size.hide();
    priority_1.hide();
    priority_2.hide();
    priority_3.hide();
    set.hide();
    rs = roll_size.value();
    p1 = priority_1.value();
    p2 = priority_2.value();
    p3 = priority_3.value();
  });
  if(state==1 && display_count!=3) {
  for(var i = floor(rs/p1);i>0;i--) {
    var d1 = rs-i*p1;
    for(var j = floor(d1/p2);j>=0;j--) {
      var d2 = d1-j*p2;
      if(d2%p3<0.1) {
        display_count++;
        text(i,70+display_count*150,95);
        text(j,70+display_count*150,125);
        text(floor(d2/p3),70+display_count*150,155);
        text(rs-i*p1-j*p2-(floor(d2/p3)*p3),70+display_count*150,185);
        if(display_count==3) {
          i=0;
          j=0;
          state=2;
        }
      }
    }
  }
  }
}