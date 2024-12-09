document.addEventListener("DOMContentLoaded", () => {
    function createDebitCard(bank, accountNumber, name) {
        const card = document.createElement("div");
        card.style.cssText = `
            flex-shrink: 0;
            border-radius: 20px;
            background: rgba(74, 144, 226, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(74, 144, 226, 0.1);
            border: 1px solid rgba(74, 144, 226, 0.2);
            width: 430px;
            height: 260px;
            padding: 24px;
            background-image: linear-gradient(
                62deg,
                rgba(74, 144, 226, 0.15) 0%,
                rgba(74, 144, 226, 0.05) 45%
            );
            margin: 0 20px;
            text-align: center;
        `;

        card.innerHTML = `
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #1f2937; font-family: sans-serif;">
                <div style="margin-bottom: 2px; font-weight: 500;">${bank}</div>
                <div style="margin-bottom: 16px; display: flex; align-items: center; justify-content: center;">
                    <div style="font-size: 1.875rem; font-weight: bold; margin-right: 8px;">${accountNumber}</div>
                    <button class="copy-btn" style="
                        font-size: 1.125rem; 
                        padding: 2px 4px; 
                        cursor: pointer; 
                        background: rgba(74, 144, 226, 0.2); 
                        border: 1px solid rgba(74, 144, 226, 0.3);
                        border-radius: 5px;
                        backdrop-filter: blur(5px);
                        -webkit-backdrop-filter: blur(5px);
                    ">
                        <i class="bx bx-copy"></i>
                    </button>
                </div>
                <div style="margin-bottom: 2px; font-weight: 500;">A nombre de</div>
                <div style="font-size: 1.25rem; font-weight: 600;">${name}</div>
            </div>
        `;

        const copyBtn = card.querySelector(".copy-btn");
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(accountNumber).then(() => {
                copyBtn.innerHTML = '<i class="bx bxs-copy"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="bx bx-copy"></i>';
                }, 2000);
            });
        });

        return card;
    }

    function renderDigitalEnvelope() {
        const envelopeContainer = document.getElementById("digital-envelope");
        
        const cardData = [
            { bank: "BBVA", accountNumber: "012180015325671790", name: "Jose Gabriel Cerdio Oyarzabal" },
            { bank: "Banamex", accountNumber: "1450055294", name: "Ana Alicia Perez Garcia" }
        ];

        const cardsContainer = document.createElement("div");
        cardsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            padding: 20px;
        `;

        cardData.forEach(data => {
            const card = createDebitCard(data.bank, data.accountNumber, data.name);
            cardsContainer.appendChild(card);
        });

        envelopeContainer.appendChild(cardsContainer);
    }

    renderDigitalEnvelope();

    // Configuración del mapa
    const VENUE = { lat: 19.0414, lng: -98.1959 };
    const API_KEY = 'AIzaSyDKBx2fw3vEx3Nt_beltv8lHHsPSS_MpcI';

    // Función para cargar el script de Google Maps
    function loadGoogleMaps() {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDKBx2fw3vEx3Nt_beltv8lHHsPSS_MpcI&callback=initMap&v=weekly&libraries=marker`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }

    // Cargar el mapa cuando el DOM esté listo
    if (document.readyState !== 'loading') {
        loadGoogleMaps();
    } else {
        document.addEventListener('DOMContentLoaded', loadGoogleMaps);
    }
});

let map;

async function initMap() {
    // Verificar si el elemento existe
    const mapElement = document.getElementById("map-canvas");
    
    if (!mapElement) {
        console.error("Elemento del mapa no encontrado. Asegúrate de que existe un div con id 'map-canvas'");
        return;
    }

    // La ubicación del Salon Jardín
    const position = { lat: 19.0414, lng: -98.1959 };

    // Solicitar las bibliotecas necesarias
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Crear el mapa, centrado en la ubicación
    map = new Map(mapElement, {
        zoom: 17, // Nivel de zoom ajustado para ver de cerca la ubicación
        center: position,
        mapId: "SALON_JARDIN_MAP", // Map ID personalizado
    });

    // Crear el marcador, posicionado en la ubicación
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Salon Jardín Ex Hacienda San Bartolo"
    });

    // Agregar un InfoWindow con información adicional
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="font-family: Arial, sans-serif; max-width: 250px;">
                <h3 style="margin-bottom: 10px; color: #333;">Salon Jardín Ex Hacienda San Bartolo</h3>
                <p style="color: #666;">
                    Av. 3 Sur 12105 -A<br>
                    Ampliación Guadalupe Hidalgo<br>
                    72490 Puebla, Pue.
                </p>
                <a href="https://maps.google.com/maps?q=19.0414,-98.1959" target="_blank">Abrir en Google Maps</a>
            </div>
        `
    });

    // Agregar evento de clic al marcador para mostrar el InfoWindow
    marker.addListener('click', () => {
        infoWindow.open({
            anchor: marker,
            map: map
        });
    });
}

// Inicializar el mapa cuando la página esté completamente cargada
window.addEventListener('load', initMap);