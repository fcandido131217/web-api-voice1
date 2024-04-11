const controltexto = document.getElementById('controltexto');

document.addEventListener('DOMContentLoaded', function () {
    const listeningText = document.getElementById('listeningText');
    const resultDiv = document.getElementById('result');

    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'es-ES';

    recognition.onstart = function () {
        listeningText.innerHTML = 'Escuchando...';
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.toLowerCase(); 
        const keywords = ['abrir una pestaña', 'ir a una página', 'modificar el tamaño de la ventana', 'cerrar una pestaña', 'cerrar el navegador']; // Array de palabras clave

        resultDiv.innerHTML = `<strong>Resultado:</strong> ${transcript}`;

        for (let i = 0; i < keywords.length; i++) {
            if (transcript.includes(keywords[i])) {
                switch (keywords[i]) {
                    case 'tamaño 4':
                        controltexto.classList.add("fs-1");
                        controltexto.classList.add("fs-1");
                        controltexto.style.color = "red";
                        console.log("Se encontró la palabra 'tamaño 4'.");
                        break;
                    case 'abrir una pestaña':
                        window.open(); 
                        console.log("Se detectó 'abrir una pestaña'.");
                        break;
                    case 'ir a una página':
                        window.location.href = "https://chat.openai.com/"; 
                        console.log("Se detectó 'ir a una página'.");
                        break;
                    
                    case 'cerrar una pestaña':
                        window.close(); 
                        console.log("Se detectó 'cerrar una pestaña'.");
                        break;
                
                    case 'cerrar el navegador':
                        window.close(); 
                        console.log("Se detectó 'cerrar el navegador'.");
                        break;
                }
            }
        }

        
        enviarFraseAFirebase(transcript);
    };

    recognition.onerror = function (event) {
        console.error('Error en el reconocimiento de voz:', event.error);
    };

    recognition.onend = function () {
        listeningText.innerHTML = 'Fin de la escucha';
        recognition.start(); // Reiniciar el reconocimiento después de que termine
    };

    // Iniciar la escucha directamente cuando se cargue la página
    recognition.start();

    
    function enviarFraseAFirebase(frase) {
    
        var data = {
            frase: frase
        };

    
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        
        var url = 'https://661215a995fdb62f24ee0845.mockapi.io/detector';

    
        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los datos a la API');
                }
                return response.json();
            })
            .then(data => {
                console.log('Los datos se enviaron correctamente:', data);
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
