function checkPrime(n) {
    let flag = 0;
    for (var i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            flag = 1;
            break;
        }
    }
    if (flag == 1) {
        flag=0;
        return true;
    } else {
        return false;
    }
}
function genRandomPrime() {
    do {
        var random = Math.floor(Math.random() * 90) + 10;
    } while (checkPrime(random));
    return random;
}
function genPublicKey(z) {
    for (var i = 2; i < z; i++) {
        if (z % i == 1) {
            break;
        }
    }
    return i;
}
function genPrivateKey(e, z) {
    for (var d = 2; d <= z; d++) {
        if (((e * d) % z) == 1) {
            break;
        }
    }
    return d;
}
function mul(x, y, n) {
    var k = 1;
    var j;
    for (j = 1; j <= y; j++) 
    k = (k * x) % n;
    return k;
}
function rsa() {
    const msg=document.getElementById("plainText").value;
    const p = genRandomPrime();
    const q = genRandomPrime();
    if(p==q){
        do{
            p=genRandomPrime();
        }while(p != q);
    }
    const n = p * q;
    const z = (p - 1) * (q - 1);
    const e = genPublicKey(z);
    const d = genPrivateKey(e, z);
    console.log("p = "+p);
    console.log("q = "+q);
    console.log("n = "+n);
    console.log("z = "+z);
    console.log("e = "+e);
    console.log("d = "+d);
    console.log("msg = "+msg);
    var pt=[];
    for(var i = 0; i<msg.length;i++){
        pt[i]=msg.codePointAt(i);
    }
    var ct=[];
    for(var i = 0; i<msg.length;i++){
        ct[i]=mul(pt[i],e,n);
    }
    document.getElementsByClassName("p1")[0].innerHTML = "Cipher Text : "+ct.join("");
    // pt.forEach((item)=>console.log(item));
    ct.forEach((item)=>console.log(item));
    for(var i = 0; i<msg.length;i++){
        pt[i]=mul(ct[i],d,n);
    }
    pt.forEach((item)=>console.log(item));
    let text="";
    for(var i = 0; i<msg.length;i++){
        text+=String.fromCharCode(pt[i]);
    }
    console.log(text);
    document.getElementsByClassName("p2")[0].innerHTML = "Public Key : "+e;
}