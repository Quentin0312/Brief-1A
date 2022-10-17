const videoElement = document.getElementsByClassName('input_video')[0];
        const canvasElement = document.getElementsByClassName('output_canvas')[0];
        const canvasCtx = canvasElement.getContext('2d');
        
        function onResults(results) {
          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
          canvasCtx.drawImage(
              results.image, 0, 0, canvasElement.width, canvasElement.height);
          if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
              drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                             {color: '#00FF00', lineWidth: 5});
              drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1});
              let chiffre = 0;

              if(landmarks[2].y > landmarks[9].y){ //Quand mains "à l'endroit"
                console.log("actuel");

                if (landmarks[8].y < landmarks[7].y && landmarks[6].y < landmarks[5].y){
                chiffre += 1;
                console.log("index");
                }

                if (landmarks[12].y < landmarks[11].y && landmarks[10].y < landmarks[9].y){
                  chiffre += 1;
                  console.log("majeur");
                }

                if (landmarks[16].y < landmarks[15].y && landmarks[14].y < landmarks[13].y){
                  chiffre += 1;
                  console.log("annulaire");
                }

                if (landmarks[20].y < landmarks[19].y && landmarks[18].y < landmarks[17].y){
                  chiffre += 1;
                  console.log("auriculaire");
                }
                //Pouce à gauche de la mains
                if((landmarks[4].x > landmarks[3].x) &&(landmarks[20].x < landmarks[4].x) && (landmarks[8].x - landmarks[0].x)-(landmarks[4].x - landmarks[0].x)<0){
                  console.log("pouce1");
                  chiffre += 1;
                }
                //Pouce à gauche de la mains
                if((landmarks[4].x < landmarks[3].x) &&(landmarks[20].x > landmarks[4].x) && (landmarks[8].x - landmarks[0].x)-(landmarks[4].x - landmarks[0].x)>0){
                  console.log("pouce2");
                  chiffre += 1;
                }

              }
              else if(true){ // Quand mains "allongé"
                console.log("et ouis")

                if(landmarks[4].y < landmarks[3].y){
                    console.log("pouce bleu");
                    chiffre += 1;
                }
                //Doigt à gauche de la mains
                if( (landmarks[7].x > landmarks[0].x) && (landmarks[8].x > landmarks[7].x)){
                    console.log("index bleu");
                    chiffre += 1;
                }
                //Doigt à droite de la mains
                if( (landmarks[7].x < landmarks[0].x) && (landmarks[8].x < landmarks[7].x)){
                    console.log("index bleu");
                    chiffre += 1;
                }
                //Doigt à gauche de la mains
                if( (landmarks[11].x > landmarks[0].x) && (landmarks[12].x > landmarks[11].x)){
                    console.log("majeur bleu");
                    chiffre += 1;
                }
                //Doigt à droite de la mains
                if( (landmarks[11].x < landmarks[0].x) && (landmarks[12].x < landmarks[11].x)){
                    console.log("majeur bleu");
                    chiffre += 1;
                }
                //Doigt à gauche de la mains
                if( (landmarks[15].x > landmarks[0].x) && (landmarks[16].x > landmarks[15].x)){
                    console.log("annulaire bleu");
                    chiffre += 1;
                }
                //Doigt à droite de la mains
                if( (landmarks[15].x < landmarks[0].x) && (landmarks[16].x < landmarks[15].x)){
                    console.log("annulaire bleu");
                    chiffre += 1;
                }
                //Doigt à gauche de la mains
                if( (landmarks[19].x > landmarks[0].x) && (landmarks[20].x > landmarks[19].x)){
                    console.log("auriculaire bleu");
                    chiffre += 1;
                }
                //Doigt à droite de la mains
                if( (landmarks[19].x < landmarks[0].x) && (landmarks[20].x < landmarks[19].x)){
                    console.log("auriculaire bleu");
                    chiffre += 1;
                }

              }

              


              console.log(chiffre);
              let resultatAffiche = document.getElementById("resultatAffiche").innerHTML = chiffre;
              
            }

          }
          canvasCtx.restore();
        }
        
        const hands = new Hands({locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }});
        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
        hands.onResults(onResults);
        
        const camera = new Camera(videoElement, {
          onFrame: async () => {
            await hands.send({image: videoElement});
          },
          width: 1280,
          height: 720
        });
        camera.start();