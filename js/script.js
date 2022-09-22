function checkPrime(n) {
    let flag = 0;
    for (var i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            flag = 1;
            break;
        }
    }
    if (flag == 1) {
        flag = 0;
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
    const msg = document.getElementById("plainText").value;
    if (msg !== "") {
        const p = genRandomPrime();
        const q = genRandomPrime();
        if (p == q) {
            do {
                p = genRandomPrime();
            } while (p != q);
        }
        const n = p * q;
        const z = (p - 1) * (q - 1);
        const e = genPublicKey(z);
        const d = genPrivateKey(e, z);
        console.log("p = " + p);
        console.log("q = " + q);
        console.log("n = " + n);
        console.log("z = " + z);
        console.log("e = " + e);
        console.log("d = " + d);
        console.log("msg = " + msg);
        var pt = [];
        for (var i = 0; i < msg.length; i++) {
            pt[i] = msg.codePointAt(i);
        }
        var ct = [];
        for (var i = 0; i < msg.length; i++) {
            ct[i] = mul(pt[i], e, n);
        }
        document.getElementById("cipherText").value = ct.join("");
        // pt.forEach((item)=>console.log(item));
        console.log("Cipher : "+ct.join(","));
        document.getElementsByClassName("p2")[0].innerHTML = "Public Key : " + e;
        document.getElementById("ct").value = ct.join(",");
        document.getElementById("d").value = d;
        document.getElementById("n").value = n;
        document.getElementById("msglen").value = msg.length;
    }
}
function decrypt() {
    let msglen = document.getElementById("msglen").value;
    let ct1 = document.getElementById("ct").value;
    let d1 = document.getElementById("d").value;
    let n1 = document.getElementById("n").value;
    ct2=[];
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

    // let n1 = document.getElementById("hidden1").value;
    // let d1 = document.getElementById("hidden2").value
    // let ct1 = [];
    let pt1=[];
    for (var i = 0; i < msglen; i++) {
        pt1[i] = mul(ct2[i], d1, n1);
    }
    pt1.forEach((item) => console.log(item));
    let text = "";
    for (var i = 0; i < msglen; i++) {
        text += String.fromCharCode(pt1[i]);
    }
    console.log(text);

    document.getElementsByClassName("p2")[0].innerHTML = "Private Key : "+d1;
    document.getElementById("plainText").value = text;
}