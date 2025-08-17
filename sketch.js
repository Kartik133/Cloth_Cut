let baleno,balemeter;
let count;
let noofrolls;
let submitBtn;
let inputBoxes = [];
let paragraph00,paragraph0,paragraph1,paragraph2,paragraph3,paragraph4,paragraph5,paragraph6,paragraph7,paragraph8,paragraph9;
let printbtn,savebtn,updatebtn;
let a=0;
let results=[],sresults=[];
let prioritycheck;
var database,cutCount=-1;
let desp;

function setup() {
  createCanvas(displayWidth,displayHeight);

  database = firebase.database();
  
  database.ref("cutCount").on("value",(data)=> {
    cutCount = data.val();
  });

  baleno = createInput(0);
  baleno.position(150,60);
  balemeter = createInput(0,"number");
  balemeter.position(550,60);
  paragraph0 = createP("Bale Metre");
  paragraph0.position(420,47.5);
  paragraph00 = createP("Actual Metre:- "+a);
  paragraph00.position(800,47.5);
  paragraph1 = createP("Bale No.");
  paragraph1.position(20,47.5);
  noofrolls = createInput(0,"number");
  noofrolls.position(150,100);
  noofrolls.attribute('type', 'number');
  noofrolls.attribute('min', '1');
  paragraph2 = createP("No. of Rolls");
  paragraph2.position(20,87.5);
  paragraph3 = createP("Roll Size");
  paragraph3.style("font-weight","bold");
  paragraph3.position(205,127.5);
  paragraph4 = createP("1st Priority Cut");
  paragraph4.position(435,127.5);
  paragraph4.style("font-weight","bold");
  paragraph5 = createP("2nd Priority Cut");
  paragraph5.position(685,127.5);
  paragraph5.style("font-weight","bold");
  paragraph6 = createP("3rd Priority Cut");
  paragraph6.style("font-weight","bold");
  paragraph6.position(935,127.5);
  paragraph7 = createP("Wastage");
  paragraph7.style("font-weight","bold");
  paragraph7.position(1230,127.5);
  paragraph8 = createP("Total Production");
  paragraph8.style("font-weight","bold");
  paragraph8.position(1380,127.5);
  paragraph9 = createP("Desired No. of 2nd Priority");
  paragraph9.position(350,87.5);
  paragraph3.hide();
  paragraph4.hide();
  paragraph5.hide();
  paragraph6.hide();
  paragraph7.hide();
  paragraph8.hide();
  paragraph9.hide();

  prioritycheck = createCheckbox("Two Priorities Only");
  prioritycheck.position(1000,65);

  printbtn = createButton("Print");
  savebtn = createButton("Save");
  updatebtn = createButton("Auto-Fill");
  updatebtn.position(20,140);
  savebtn.hide();
  printbtn.hide();
  updatebtn.hide();

  desp = createInput(0,"number");
  desp.position(550,100);
  desp.hide();

  // Button to generate textboxes
  submitBtn = createButton("Submit");
  submitBtn.position(150,140);
  submitBtn.mousePressed(createTextboxes);
  updatebtn.mousePressed(update);
  savebtn.mousePressed(()=>{
    //saveFrames("Cut_slip","png");
  });
}

function createTextboxes() {
  submitBtn.hide();
  paragraph3.show();
  paragraph4.show();
  paragraph5.show();
  paragraph6.show();
  paragraph7.show();
  paragraph8.show();
  if(prioritycheck.checked()){
  paragraph9.show();
  desp.show();
  }
  prioritycheck.attribute('disabled', '');

  inputBoxes = [];

  count = int(noofrolls.value());
  
  for(let i = 0;i<15*count;i++) {
    let a = -1;
    results.push(a);
  }

  for (let i = 0; i < 4*count; i++) {
    let box = createInput(0,"number");
    inputBoxes.push(box);
    if(i%4-3==0) {
      let btn = createButton("Calculate");
      btn.mousePressed(() => {
      buttonClicked((i+1)/4);
      });
      inputBoxes.push(btn);
    }
  }

  for(let i = 0;i<count;i++) {
    let para = createP("Roll "+(i+1));
    para.position(20,167.5+i*100);
    inputBoxes[5*i].position(150,180+i*100);
    inputBoxes[5*i+1].position(400,180+i*100);
    inputBoxes[5*i+2].position(650,180+i*100);
    inputBoxes[5*i+3].position(900,180+i*100);
    inputBoxes[5*i+4].position(1150,180+i*100);
  }

  savebtn.show();
  printbtn.show();
  updatebtn.show();
  savebtn.position(200,120+count*100);
  printbtn.position(200,160+count*100);
}

function buttonClicked(clickedbtn) {

  cutCount++;

  database.ref("/").update({
    cutCount:cutCount
  });  

  for(let i = 0;i<results.length;i++) {
    if(results[i]!=-1) {
      results[i].hide();
    }
  }

  let maw = 0.1;
  let rs,p1,p2,p3;
  let display_count=0;
  let display_count1=0;

  rs = inputBoxes[5*clickedbtn-5].value();
  p1 = inputBoxes[5*clickedbtn-4].value();
  p2 = inputBoxes[5*clickedbtn-3].value();
  p3 = inputBoxes[5*clickedbtn-2].value();

  for(let i = (rs/p1).toFixed();i>=0;i--) {
    let d1 = rs-i*p1;
    let d11 = d1.toFixed(2);
      for(let j = ((d11)/p2).toFixed();j>=0;j--) {
       let d2 = d1-j*p2;
       let d22 = d2.toFixed(2);
        if(((d22)%p3).toFixed(2)<=maw && ((d22)%p3).toFixed(2)>=0) {
         display_count++;
         
         fill(0);
         let p = createP(i+" ("+(p1*i).toFixed(2)+")");
         p.position(400,195+(clickedbtn-1)*100+(display_count-1)*20);
        
         p.hide();
         results[(clickedbtn-1)*15+(display_count-1)*5]=p;
         let q = createP(j+" ("+(p2*j).toFixed(2)+")");
         q.position(650,195+(clickedbtn-1)*100+(display_count-1)*20);
         q.hide();
         results[(clickedbtn-1)*15+(display_count-1)*5+1]=q;
         let r = createP(floor(d22/p3)+" ("+(p3*(floor(d22/p3))).toFixed(2)+")");
         r.position(900,195+(clickedbtn-1)*100+(display_count-1)*20);
         r.hide();
         results[(clickedbtn-1)*15+(display_count-1)*5+2]=r;
         let wastage = (rs-i*p1-j*p2-(floor(d22/p3)*p3));
         let tp = rs-wastage;
         let s = createP(wastage.toFixed(2));
         s.position(1250,195+(clickedbtn-1)*100+(display_count-1)*20);
         s.hide();
         results[(clickedbtn-1)*15+(display_count-1)*5+3]=s;
         let t = createP(tp.toFixed(2));
         t.position(1400,195+(clickedbtn-1)*100+(display_count-1)*20);
         t.hide();
         results[(clickedbtn-1)*15+(display_count-1)*5+4]=t;

         if(display_count==3) {
           i=0;  
           j=0;
         }

         if(prioritycheck.checked()) {
           j=0;
         }
        }
      } 
  }
 if(prioritycheck.checked()) {
  for(let i=-1;i<2;i++) {
    let m=(Number(desp.value())+i);
    let rsd = (Number(rs)-m*p2);
    let o = createP("Roll "+clickedbtn+" ("+rs+")");
    o.hide();
    sresults.push(o);
    let p = createP(floor(rsd/p1)+" ("+(p1*floor(rsd/p1)).toFixed(2)+")");
    p.hide();
    sresults.push(p);
    let q = createP(m+" ("+(p2*m).toFixed(2)+")");
    q.hide();
    sresults.push(q);
    let r = createP(0+" ("+0+")");
    r.hide();
    sresults.push(r);
    let wastage = rs-m*p2-(p1*floor(rsd/p1));
    let tp = rs-wastage;
    let s = createP(wastage.toFixed(2));
    s.hide();
    sresults.push(s);
    let t = createP(tp.toFixed(2));
    t.hide();
    sresults.push(t);
  } 
  }

  for(let k = -0.1 ;k<=0.2;k+=0.1) {
    if(k!=0) {
    let rsd = Number(rs)+Number(k);
    display_count1=0;

    for(let i = (rsd/p1).toFixed();i>=0;i--) {
    let d1 = rsd-i*p1;
    let d11 = d1.toFixed(2);
     for(let j = ((d11)/p2).toFixed( );j>=0;j--) {
       let d2 = d1-j*p2;
       let d22 = d2.toFixed(2);
       if(((d22)%p3).toFixed(2)<=maw && ((d22)%p3).toFixed(2)>=0 && (rsd-i*p1-j*p2-(floor(d22/p3)*p3)-k).toFixed(2)!=0) {
         display_count1++;
         fill(0);
         let o = createP("Roll "+clickedbtn+" ("+rsd+")");
         //p.position(400,195+(clickedbtn-1)*100+(display_count1-1)*20+k*6000);
         o.hide();
         sresults.push(o);
         let p = createP(i+" ("+(p1*i).toFixed(2)+")");
         //p.position(400,195+(clickedbtn-1)*100+(display_count1-1)*20+k*6000);
         p.hide();
         sresults.push(p);
         let q = createP(j+" ("+(p2*j).toFixed(2)+")");
         //q.position(650,195+(clickedbtn-1)*100+(display_count1-1)*20+k*6000);
         q.hide();
         sresults.push(q);
         let r = createP(floor(d22/p3)+" ("+(p3*(floor(d22/p3))).toFixed(2)+")");
         //r.position(900,195+(clickedbtn-1)*100+(display_count1-1)*20+k*6000);
         r.hide();
         sresults.push(r);
         let wastage = (rsd-i*p1-j*p2-(floor(d22/p3)*p3)-k);
         let tp = rs-wastage;
         let s = createP(wastage.toFixed(2));
         //s.position(1250,195+(clickedbtn-1)*100+(display_count1-1)*20+k*6000);
         s.hide();
         sresults.push(s);
         let t = createP(tp.toFixed(2));
         //t.position(1400,195+(clickedbtn-1)*100+(display_count1-1)*20+k*6000);
         t.hide();
         sresults.push(t);
         if(display_count1==1) {
           i=0;  
           j=0;
         }
       }
     } 
   }
  }
  }
}

function update() {
  a=0;
  if(inputBoxes[1].value()>0 && inputBoxes[2].value()>0 && inputBoxes[3].value()>0) {
   for(let i=1;i<count;i++) {
     inputBoxes[5*i+1].value(inputBoxes[1].value());
     inputBoxes[5*i+2].value(inputBoxes[2].value());
     inputBoxes[5*i+3].value(inputBoxes[3].value());
   } 
  }

  for(let i=0;i<count;i++) {
    a=a+Number(inputBoxes[5*i].value());
  }
  paragraph00.hide();
  paragraph00 = createP("Actual Metre:- "+a);
  paragraph00.position(800,47.5);
  paragraph00.show();
}

function draw() {
  background(255);
  
  for(let i = 0;i<results.length;i++) {
    if(results[i]!=-1) {
      results[i].show();
    }
  }
  for(let i = 0;i<sresults.length/6;i++) {
      sresults[6*i].position(150,200+count*100+30*i);      
      sresults[6*i+1].position(400,200+count*100+30*i);      
      sresults[6*i+2].position(650,200+count*100+30*i);      
      sresults[6*i+3].position(900,200+count*100+30*i);      
      sresults[6*i+4].position(1250,200+count*100+30*i);      
      sresults[6*i+5].position(1400,200+count*100+30*i);      
  }

  for(let i = 0;i<sresults.length;i++) {
    sresults[i].show();
  }
}