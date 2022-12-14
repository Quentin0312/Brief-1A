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

let iterations = 50; //itérations entré valeurs chiffre mais aussi symbole indexs contact

let mainM1;
let mainM2;
let totalTime;

let symboleIndexs = [];
let indexs = 0;
let phalangeIndexs = 0;

let operande1 = 0;
let operande2 = 0;
let produit;

let derOperande1;
let derOperande2;
let derProduit;

function onResults(results) {
    canvasCtx.save();
//   canvasCtx.scale(-1,-1);
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    // Inclue le flux video au canva---------------------------------------
    // canvasCtx.drawImage(
    //     results.image, 0, 0, canvasElement.width, canvasElement.height);

    //Trace les points et batons
    if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                        {color: '#00FF00', lineWidth: 5});
        drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 0.5});
    }
    }
    let chiffre1;
    let chiffre2;
    let chiffreTotal;

    //Détermine le symbole contact indexs
    if (results.multiHandLandmarks[0] && results.multiHandLandmarks[1]){

        let hand1 = results.multiHandLandmarks[0];
        let hand2 = results.multiHandLandmarks[1];

        indexs = (hand1[8].x) - (hand2[8].x);
        indexs = Math.abs(indexs);

        phalangeIndexs = (hand1[8].x)-(hand1[7].x);
        phalangeIndexs = Math.abs(phalangeIndexs);
    }


    //Main 1
    if (results.multiHandLandmarks[0] && indexs > phalangeIndexs || results.multiHandLandmarks[0] && !results.multiHandLandmarks[1]){
        let main1 = results.multiHandLandmarks[0];
        chiffre1 = 0;

        //Pos main et entrée dans chiffre 1, valeur live
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
        //Timing du resultat main 1
        resultatM1.push(chiffre1);
        document.getElementById("resultatAffiche1").innerHTML = "Live main 1 : "+chiffre1;
        if (!results.multiHandLandmarks[1]){
            resultatM2.push(0);
        }

        if (resultatM1.length >= iterations){
            let m120der = resultatM1.slice(-iterations);
            // console.log("-------------",m120der);
            for (let i = 0;i < iterations; i++){

                if (m120der[i]==0){
                    zero.push(0);
                }
                else{
                    zero.push(0);
                }
                if (m120der[i]==1){
                    un.push(1);
                }
                else{
                    un.push(0);
                }
                if (m120der[i]==2){
                    deux.push(2);
                }
                else{
                    deux.push(0);
                }
                if (m120der[i]==3){
                    trois.push(3);
                }
                else{
                    trois.push(0);
                }
                if (m120der[i]==4){
                    quatre.push(4);
                }
                else{
                    quatre.push(0);
                }
                if (m120der[i]==5){
                    cinq.push(5);
                }
                else{
                    cinq.push(0);
                }

            }
            zero = zero.slice(-iterations);
            un = un.slice(-iterations);
            deux = deux.slice(-iterations);
            trois = trois.slice(-iterations);
            quatre = quatre.slice(-iterations);
            cinq = cinq.slice(-iterations);
            // console.log("5=>",cinq);

            let sommeCinq = 0;
            let sommeUn = 0;
            let sommeDeux = 0;
            let sommeTrois = 0;
            let sommeQuatre = 0;

            for (let i = 0;i < iterations; i++){
                sommeCinq += cinq[i];
            }
            for (let i = 0;i < iterations; i++){
                sommeUn += un[i];
            }
            for (let i = 0;i < iterations; i++){
                sommeDeux += deux[i];
            }
            for (let i = 0;i < iterations; i++){
                sommeTrois += trois[i];
            }
            for (let i = 0;i < iterations; i++){
                sommeQuatre += quatre[i];
            }

            let pourcentage= 0.75;

            if (sommeUn > 1*iterations*pourcentage){
                mainM1 = 1;
            }
            else if (sommeDeux > 2*iterations*pourcentage){
                mainM1 = 2;
            }
            else if (sommeTrois > 3*iterations*pourcentage){
                mainM1 = 3;
            }
            else if (sommeQuatre > 4*iterations*pourcentage){
                mainM1 = 4;
            }
            else if (sommeCinq > 5*iterations*pourcentage){
                mainM1 = 5;
            }
            else{
                mainM1 = "erreurM1";
            }

        }
    }


    //Main 2 (+ total)
    if (results.multiHandLandmarks[1] && indexs > phalangeIndexs){
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
        // console.log("chiffre 2:", chiffre2);
        let resultatAffiche2 = document.getElementById("resultatAffiche2").innerHTML = "Live main 2 : " +chiffre2;

        //Timing du resultat main 2
        resultatM2.push(chiffre2);
        // console.log("M2",resultatM2);
        if (resultatM2.length >= iterations){
            let m120der = resultatM2.slice(-iterations);
            // console.log("-------------",m120der);
            for (let i = 0;i < iterations; i++){

                if (m120der[i]==0){
                    zero.push(0);
                }
                else{
                    zero.push(0);
                }
                if (m120der[i]==1){
                    un.push(1);
                }
                else{
                    un.push(0);
                }
                if (m120der[i]==2){
                    deux.push(2);
                }
                else{
                    deux.push(0);
                }
                if (m120der[i]==3){
                    trois.push(3);
                }
                else{
                    trois.push(0);
                }
                if (m120der[i]==4){
                    quatre.push(4);
                }
                else{
                    quatre.push(0);
                }
                if (m120der[i]==5){
                    cinq.push(5);
                }
                else{
                    cinq.push(0);
                }

            }
            zero = zero.slice(-iterations);
            un = un.slice(-iterations);
            deux = deux.slice(-iterations);
            trois = trois.slice(-iterations);
            quatre = quatre.slice(-iterations);
            cinq = cinq.slice(-iterations);
            // console.log("5=>",cinq);

            let sommeCinq = 0;
            let sommeUn = 0;
            let sommeDeux = 0;
            let sommeTrois = 0;
            let sommeQuatre = 0;

            for (let i = 0;i < iterations; i++){
                sommeCinq += cinq[i];
            }
            for (let i = 0;i < iterations; i++){
                sommeUn += un[i];
            }
            for (let i = 0;i < iterations; i++){
                sommeDeux += deux[i];
            }
            for (let i = 0;i < iterations; i++){
                sommeTrois += trois[i];
            }
            for (let i = 0;i < iterations; i++){
                sommeQuatre += quatre[i];
            }

            let pourcentage= 0.75;

            if (sommeUn > 1*iterations*pourcentage){
                mainM2 = 1;
            }
            else if (sommeDeux > 2*iterations*pourcentage){
                mainM2 = 2;
            }
            else if (sommeTrois > 3*iterations*pourcentage){
                mainM2 = 3;
            }
            else if (sommeQuatre > 4*iterations*pourcentage){
                mainM2 = 4;
            }
            else if (sommeCinq > 5*iterations*pourcentage){
                mainM2 = 5;
            }
            else{
                mainM2 = "erreur";
            }

        }

        //Affichage resultat total 
        chiffreTotal = chiffre1 + chiffre2;
        let resultatAfficheTotal = document.getElementById("resultatAfficheTotal").innerHTML = "Live total : " +chiffreTotal;

    }

    //Total
    //Timing du resultat total main
    if (mainM2 > 0 && mainM2 <=10 && mainM1 > 0 && mainM1 <=10 && results.multiHandLandmarks[1]){
        totalTime = mainM1 + mainM2;
    }
    else if (mainM1 > 0 && mainM1 <=10){
        totalTime = mainM1;
    }

    //Fonctionnalite Multiplication - Detecion du contact index et time
    if (results.multiHandLandmarks[0] && results.multiHandLandmarks[1]){

        if (indexs < phalangeIndexs){
            symboleIndexs.push("1"); //1 Correspond à contact
            console.log("Contact!!!!!!!!!!");
        }
        else if(indexs > phalangeIndexs){
            symboleIndexs.push("0"); //0 Correspond à pas de contact
            console.log("Pas contact");
        }

        if (symboleIndexs.length >= iterations){

            let derSymboleIndexs = symboleIndexs.slice(-iterations);
            let derSymboleIndexsVerdict = 0;
            for (let i = 0; i < iterations; i++){
                derSymboleIndexsVerdict += Number(derSymboleIndexs[i]);
            }
            if (derSymboleIndexsVerdict > 0.90*iterations){



                // => ici enregistrer la valeur precedente de main 1 ou total et entre dans variable lien autre fonctionnalité, universelle => permet d'entrer une valeur
                if (operande1 == 0){
                    operande1 = totalTime;
                    derOperande1 = totalTime;
                    symboleIndexs = [];
                }else{
                    operande2 = totalTime;
                    derOperande2 = totalTime;
                    symboleIndexs = [];
                }
                console.log("Operande1 : "+operande1);
                console.log("Operande2 : "+operande2);
            }
        }

    }

    //Fonctionnalite Multiplication - Coeur
    if (operande1>0 && operande2>0){
        produit = operande1 * operande2;
        derProduit = derOperande1 * derOperande2;
        console.log(produit);
        operande1 = 0;
        operande2 = 0;
    }

    //Affichage à l'écran
    document.getElementById("resultatTotalTime").innerHTML = "Total => " +totalTime;
    if (mainM1>0 && mainM1 <= 5){
        document.getElementById("resultatM1Time").innerHTML = "Main 1 : "+mainM1 ;
    }
    if (mainM2>0 && mainM2 <= 5){
        document.getElementById("resultatM2Time").innerHTML = "Main 2 : "+mainM2;
    }
    document.getElementById("multiplication").innerHTML = derOperande1 + " X " + derOperande2 + " = " + derProduit; 
    

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
    width: 640,
    height: 360,
});
camera.start();