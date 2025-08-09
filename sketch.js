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
  frameRate(5);
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
  for(var i = (rs/p1).toFixed();i>=0;i--) {
    var d1 = rs-i*p1;
    var d11 = d1.toFixed(2);
    for(var j = ((d11)/p2).toFixed( );j>=0;j--) {
      var d2 = d1-j*p2;
      var d22 = d2.toFixed(2);
      if(((d22)%p3).toFixed(2)<=maw.value() && ((d22)%p3).toFixed(2)>=0) {
        display_count++;
        text(i+"("+(p1*i).toFixed(2)+")",410+(display_count-1)*150,95);
        text(j+"("+(p2*j).toFixed(2)+")",410+(display_count-1)*150,125);
        text(floor(d22/p3)+"("+(p3*(floor(d22/p3))).toFixed(2)+")",410+(display_count-1)*150,155);
        var wastage = (rs-i*p1-j*p2-(floor(d22/p3)*p3));
        var tp = rs-wastage;
        text(wastage.toFixed(2),410+(display_count-1)*150,185);
        text(tp.toFixed(2),410+(display_count-1)*150,215);
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