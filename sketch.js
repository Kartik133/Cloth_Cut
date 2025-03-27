var roll_size,priority_1,priority_2,priority_3,set,state=0;
var rs,p1,p2,p3;
var display_count=0;
var reset;

function setup() {
  createCanvas(displayWidth,displayHeight);
  fill(0);
  textAlign(CENTER);
  roll_size = createInput(0,"number");
  priority_1 = createInput(0,"number");
  priority_2 = createInput(0,"number");
  priority_3 = createInput(0,"number");
  set = createButton("Calculate");
  reset = createButton("Reset");
  roll_size.position(150,50);
  priority_1.position(150,80);
  priority_2.position(150,110);
  priority_3.position(150,140);
  set.position(150,170);
  reset.position(150,200);
}

function draw() {
  background(255);
  display_count=0;
  if(state==0) {
    text("ROLL SIZE",70,65);
    text("1st Priority cut",70,95);
    text("2nd Priority cut",70,125);
    text("3rd Priority cut",70,155);
  }
  set.mousePressed(()=>{
    state = 1;
    rs = roll_size.value();
    p1 = priority_1.value();
    p2 = priority_2.value();
    p3 = priority_3.value();
  });
  reset.mousePressed(()=>{
    state = 0;
    roll_size.value(0);
    priority_1.value(0);
    priority_2.value(0);
    priority_3.value(0);
  });
  if(state==1) {
  for(var i = floor(rs/p1);i>0;i--) {
    var d1 = rs-i*p1;
    for(var j = floor(d1/p2);j>=0;j--) {
      var d2 = d1-j*p2;
      if(d2%p3<0.1) {
        display_count++;
        text(i+"("+p1*i+")",400+(display_count-1)*150,95);
        text(j+"("+p2*j+")",400+(display_count-1)*150,125);
        text(floor(d2/p3)+"("+p3*(floor(d2/p3))+")",400+(display_count-1)*150,155);
        text((rs-i*p1-j*p2-(floor(d2/p3)*p3)),400+(display_count-1)*150,185);
        if(display_count==3) {
          i=0;
          j=0;
        }
      }
    }
  }
  }
  if(state==1){
    /*push();
    textSize(50);
    text("press F5 for new input",displayWidth/2,displayHeight/2);
    pop();
    text("ROLL SIZE  "+rs,400,65);
    text("No. of 1st Priority cut  "+p1,400,95);
    text("No. of 2nd Priority cut  "+p2,400,125);
    text("No. of 3rd Priority cut  "+p3,400,155);*/
    text("Wastage",300,185);
    text("ROLL SIZE",70,65);
    text("1st Priority cut",70,95);
    text("2nd Priority cut",70,125);
    text("3rd Priority cut",70,155);
  }
}