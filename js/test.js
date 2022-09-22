let ct1="101,102,103,104,105";
let ct2=[];
j=0;
digit=0;
for(var i = 0; i < ct1.length; i++){
    if(ct1[i] != ","){
        digit=digit*10+Number(ct1[i]);
    }else{
        ct2[j++]=digit;
        digit=0;
    }
}
ct2[j++]=digit;
ct2.forEach((i)=> console.log(i))