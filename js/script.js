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
            { bank: "BBVA", accountNumber: "7401557702", name: "Jose Gabriel Cerdio Oyarzabal" },
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
});