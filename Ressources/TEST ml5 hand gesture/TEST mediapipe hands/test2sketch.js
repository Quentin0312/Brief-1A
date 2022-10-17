const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

let resultatM1 = [];
let resultatM2 = [];
let resultatTotal = [];

let zero = [];
let un = [];
let deux = [];
let trois = [];
let quatre = [];
let cinq = [];


function onResults(results) {
    canvasCtx.save();
//   canvasCtx.scale(-1,-1);
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);
    //   console.log(results.multiHandLandmarks);

    if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                        {color: '#00FF00', lineWidth: 5});
        drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1});
    }
    }
    let chiffre1;
    let chiffre2;
    let chiffreTotal;


    //Main 1
    if (results.multiHandLandmarks[0]){
    let main1 = results.multiHandLandmarks[0];
    chiffre1 = 0;

    //Pos main
    if(main1[2].y > main1[9].y){ //Quand mains "à l'endroit"
        // console.log("actuel");

        if (main1[8].y < main1[7].y && main1[6].y < main1[5].y){
        chiffre1 += 1;
        // console.log("index");
        }

        if (main1[12].y < main1[11].y && main1[10].y < main1[9].y){
            chiffre1 += 1;
        //   console.log("majeur");
        }

        if (main1[16].y < main1[15].y && main1[14].y < main1[13].y){
            chiffre1 += 1;
        //   console.log("annulaire");
        }

        if (main1[20].y < main1[19].y && main1[18].y < main1[17].y){
            chiffre1 += 1;
        //   console.log("auriculaire");
        }
        //Pouce à gauche de la mains
        if((main1[4].x > main1[3].x) &&(main1[20].x < main1[4].x) && (main1[8].x - main1[0].x)-(main1[4].x - main1[0].x)<0){
        //   console.log("pouce1");
            chiffre1 += 1;
        }
        //Pouce à gauche de la mains
        if((main1[4].x < main1[3].x) &&(main1[20].x > main1[4].x) && (main1[8].x - main1[0].x)-(main1[4].x - main1[0].x)>0){
        //   console.log("pouce2");
            chiffre1 += 1;
        }

    }
    else if(true){ // Quand mains "allongé"
    // console.log("et ouis")

    if(main1[4].y < main1[3].y){
        // console.log("pouce bleu");
        chiffre1 += 1;
    }
    //Doigt à gauche de la mains
    if( (main1[7].x > main1[0].x) && (main1[8].x > main1[7].x)){
        // console.log("index bleu");
        chiffre1 += 1;
    }
    //Doigt à droite de la mains
    if( (main1[7].x < main1[0].x) && (main1[8].x < main1[7].x)){
        // console.log("index bleu");
        chiffre1 += 1;
    }
    //Doigt à gauche de la mains
    if( (main1[11].x > main1[0].x) && (main1[12].x > main1[11].x)){
        // console.log("majeur bleu");
        chiffre1 += 1;
    }
    //Doigt à droite de la mains
    if( (main1[11].x < main1[0].x) && (main1[12].x < main1[11].x)){
        // console.log("majeur bleu");
        chiffre1 += 1;
    }
    //Doigt à gauche de la mains
    if( (main1[15].x > main1[0].x) && (main1[16].x > main1[15].x)){
        // console.log("annulaire bleu");
        chiffre1 += 1;
    }
    //Doigt à droite de la mains
    if( (main1[15].x < main1[0].x) && (main1[16].x < main1[15].x)){
        // console.log("annulaire bleu");
        chiffre1 += 1;
    }
    //Doigt à gauche de la mains
    if( (main1[19].x > main1[0].x) && (main1[20].x > main1[19].x)){
        // console.log("auriculaire bleu");
        chiffre1 += 1;
    }
    //Doigt à droite de la mains
    if( (main1[19].x < main1[0].x) && (main1[20].x < main1[19].x)){
        // console.log("auriculaire bleu");
        chiffre1 += 1;
    }

    }

    //Affichage du resultat main 1
    console.log("chiffre 1:",chiffre1);
    let resultatAffiche1 = document.getElementById("resultatAffiche1").innerHTML = chiffre1;
    //Liste contenant les chiffres enregistré
    resultatM1.push(chiffre1);
    console.log("M1",resultatM1);
    if (resultatM1.length >= 20){
        let m120der = resultatM1.slice(-20);
        console.log("-------------",m120der);
        for (let i in m120der){
            if (i==0){
                zero.push(i);
            }
            if (i==1){
                un.push(i);
            }
            if (i==2){
                deux.push(i);
            }
            if (i==3){
                trois.push(i);
            }
            if (i==4){
                quatre.push(i);
            }
            if (i==5){
                cinq.push(i);
            }
        }
        // console.log(deux);
    }
    }

    //Main 2
    if (results.multiHandLandmarks[1]){
    let main2 = results.multiHandLandmarks[1];
    chiffre2 = 0;

    //Pos main
    if(main2[2].y > main2[9].y){ //Quand mains "à l'endroit"
        // console.log("actuel");

        if (main2[8].y < main2[7].y && main2[6].y < main2[5].y){
        chiffre2 += 1;
        // console.log("index");
        }

        if (main2[12].y < main2[11].y && main2[10].y < main2[9].y){
            chiffre2 += 1;
        //   console.log("majeur");
        }

        if (main2[16].y < main2[15].y && main2[14].y < main2[13].y){
            chiffre2 += 1;
        //   console.log("annulaire");
        }

        if (main2[20].y < main2[19].y && main2[18].y < main2[17].y){
            chiffre2 += 1;
        //   console.log("auriculaire");
        }
        //Pouce à gauche de la mains
        if((main2[4].x > main2[3].x) &&(main2[20].x < main2[4].x) && (main2[8].x - main2[0].x)-(main2[4].x - main2[0].x)<0){
        //   console.log("pouce1");
            chiffre2 += 1;
        }
        //Pouce à gauche de la mains
        if((main2[4].x < main2[3].x) &&(main2[20].x > main2[4].x) && (main2[8].x - main2[0].x)-(main2[4].x - main2[0].x)>0){
        //   console.log("pouce2");
            chiffre2 += 1;
        }

    }
    else if(true){ // Quand mains "allongé"
    // console.log("et ouis")

        if(main2[4].y < main2[3].y){
            // console.log("pouce bleu");
            chiffre2 += 1;
        }
        //Doigt à gauche de la mains
        if( (main2[7].x > main2[0].x) && (main2[8].x > main2[7].x)){
            // console.log("index bleu");
            chiffre2 += 1;
        }
        //Doigt à droite de la mains
        if( (main2[7].x < main2[0].x) && (main2[8].x < main2[7].x)){
            // console.log("index bleu");
            chiffre2 += 1;
        }
        //Doigt à gauche de la mains
        if( (main2[11].x > main2[0].x) && (main2[12].x > main2[11].x)){
            // console.log("majeur bleu");
            chiffre2 += 1;
        }
        //Doigt à droite de la mains
        if( (main2[11].x < main2[0].x) && (main2[12].x < main2[11].x)){
            // console.log("majeur bleu");
            chiffre2 += 1;
        }
        //Doigt à gauche de la mains
        if( (main2[15].x > main2[0].x) && (main2[16].x > main2[15].x)){
            // console.log("annulaire bleu");
            chiffre2 += 1;
        }
        //Doigt à droite de la mains
        if( (main2[15].x < main2[0].x) && (main2[16].x < main2[15].x)){
            // console.log("annulaire bleu");
            chiffre2 += 1;
        }
        //Doigt à gauche de la mains
        if( (main2[19].x > main2[0].x) && (main2[20].x > main2[19].x)){
            // console.log("auriculaire bleu");
            chiffre2 += 1;
        }
        //Doigt à droite de la mains
        if( (main2[19].x < main2[0].x) && (main2[20].x < main2[19].x)){
            // console.log("auriculaire bleu");
            chiffre2 += 1;
        }

    }

    //Affichage resultat main 2
    console.log("chiffre 2:", chiffre2);
    let resultatAffiche2 = document.getElementById("resultatAffiche2").innerHTML = chiffre2;

    resultatM2.push(chiffre2);
    console.log("M2",resultatM2);

    //Affichage resultat total 
    chiffreTotal = chiffre1 + chiffre2;
    let resultatAfficheTotal = document.getElementById("resultatAfficheTotal").innerHTML = chiffreTotal;

    resultatTotal.push(chiffreTotal);
    console.log("Total:",resultatTotal);
    }


    canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 0,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
    await hands.send({image: videoElement});
    },
    width: 1280,
    height: 720,
});
camera.start();