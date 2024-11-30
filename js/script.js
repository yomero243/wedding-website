document.addEventListener("DOMContentLoaded", () => {
    function createDebitCard(bank, accountNumber, name) {
        const card = document.createElement("div");
        card.style.cssText = `
            flex-shrink: 0;
            border-radius: 20px;
            background: #f2d4e7;
            box-shadow: 0 4px 15px rgba(203, 221, 237, 0.5);
            width: 430px;
            height: 260px;
            padding: 24px;
            background-image: linear-gradient(62deg, #f0bede 0%, #f2d4e7 45%);
            margin: 0 20px;
            text-align: center;
        `;

        card.innerHTML = `
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; color: #1f2937; font-family: sans-serif;">
                <div style="margin-bottom: 2px; font-weight: 500;">${bank}</div>
                <div style="margin-bottom: 16px; display: flex; align-items: center; justify-content: center;">
                    <div style="font-size: 1.875rem; font-weight: bold; margin-right: 8px;">${accountNumber}</div>
                    <button class="copy-btn" style="font-size: 1.125rem; padding: 2px 4px; cursor: pointer;">
                        <i class="bx bx-copy"></i>
                    </button>
                </div>
                <div style="margin-bottom: 2px; font-weight: 500;">Atas Nama</div>
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
            { bank: "BCA", accountNumber: "7401557702", name: "Rossiani Hutami" },
            { bank: "BCA", accountNumber: "1450055294", name: "Fauzi Al Aziz" }
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
  
