var maw,roll_size,priority_1,priority_2,priority_3,set,state=0;
var rs,p1,p2,p3;
var display_count=0;
var reset;

function setup() {
  createCanvas(displayWidth,displayHeight);
  fill(0);
  textAlign(CENTER);
  maw = createInput(0,"number");
  roll_size = createInput(0,"number");
  priority_1 = createInput(0,"number");
  priority_2 = createInput(0,"number");
  priority_3 = createInput(0,"number");
  set = createButton("Calculate");
  reset = createButton("Reset");
  maw.position(160,20);
  roll_size.position(160,50);
  priority_1.position(160,80);
  priority_2.position(160,110);
  priority_3.position(160,140);
  set.position(160,170);
  reset.position(160,200);
}

function draw() {
  background(255);
  display_count=0;
  if(state==0) {
    text("Maximum Allowed Wastage",80,35);
    text("ROLL SIZE",80,65);
    text("1st Priority cut",80,95);
    text("2nd Priority cut",80,125);
    text("3rd Priority cut",80,155);
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
    maw.value(0);
    roll_size.value(0);
    priority_1.value(0);
    priority_2.value(0);
    priority_3.value(0);
  });

  if(state==1) {
  for(var i = floor(rs/p1);i>=floor(0.8*rs/p1);i--) {
    var d1 = rs-i*p1;
    for(var j = floor(d1/p2);j>=0;j--) {
      var d2 = d1-j*p2;
      if(d2%p3<=maw.value()) {
        display_count++;
        text(i+"("+p1*i+")",410+(display_count-1)*150,95);
        text(j+"("+p2*j+")",410+(display_count-1)*150,125);
        text(floor(d2/p3)+"("+p3*(floor(d2/p3))+")",410+(display_count-1)*150,155);
        var wastage = (rs-i*p1-j*p2-(floor(d2/p3)*p3));
        var tp = rs-wastage;
        text(wastage,410+(display_count-1)*150,185);
        text(tp,410+(display_count-1)*150,215);
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
    text("Wastage",310,185);
    text("Total Production",310,215);
    text("Maximum Allowed Wastage",80,35);
    text("ROLL SIZE",80,65);
    text("1st Priority cut",80,95);
    text("2nd Priority cut",80,125);
    text("3rd Priority cut",80,155);
  }
}