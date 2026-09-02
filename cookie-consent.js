document.addEventListener("DOMContentLoaded", function() {
    // Check if the user has already consented
    if (localStorage.getItem("cookieConsent")) {
        return;
    }

    // Styles for the cookie banner
    const style = document.createElement("style");
    style.innerHTML = `
        #cookie-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: var(--ink, #0C0D10);
            color: var(--text-on-ink, #F2F0EA);
            padding: 24px 32px;
            box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            display: flex;
            justify-content: center;
            font-family: var(--body, "IBM Plex Sans", sans-serif);
        }
        .cookie-content {
            max-width: 1180px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            flex-wrap: wrap;
        }
        .cookie-text {
            flex: 1;
            font-size: 14px;
            line-height: 1.5;
            color: var(--text-on-ink-muted, #9A9DA6);
            margin: 0;
        }
        .cookie-text a {
            color: var(--signal, #FF4B2B);
            text-decoration: underline;
        }
        .cookie-text a:hover {
            opacity: 0.8;
        }
        .cookie-buttons {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }
        .cookie-btn {
            cursor: pointer;
            font-family: inherit;
            font-size: 14px;
            font-weight: 600;
            padding: 10px 20px;
            border-radius: 2px;
            border: none;
            transition: all 0.2s ease;
        }
        .cookie-btn-accept {
            background-color: var(--signal, #FF4B2B);
            color: var(--ink, #0C0D10);
        }
        .cookie-btn-accept:hover {
            opacity: 0.88;
        }
        .cookie-btn-reject {
            background-color: transparent;
            color: var(--text-on-ink, #F2F0EA);
            border: 1px solid #35373f;
        }
        .cookie-btn-reject:hover {
            border-color: var(--text-on-ink, #F2F0EA);
        }

        @media (max-width: 768px) {
            .cookie-content {
                flex-direction: column;
                align-items: flex-start;
            }
            .cookie-buttons {
                width: 100%;
                justify-content: flex-end;
            }
        }
    `;
    document.head.appendChild(style);

    // HTML for the cookie banner
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.innerHTML = `
        <div class="cookie-content">
            <p class="cookie-text">
                Utilizamos cookies para melhorar sua experiência, personalizar anúncios e analisar nosso tráfego. 
                Ao continuar navegando, você concorda com a nossa <a href="privacidade.html">Política de Privacidade</a>.
            </p>
            <div class="cookie-buttons">
                <button id="cookie-reject" class="cookie-btn cookie-btn-reject">Recusar</button>
                <button id="cookie-accept" class="cookie-btn cookie-btn-accept">Aceitar</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    // Event listeners
    document.getElementById("cookie-accept").addEventListener("click", function() {
        localStorage.setItem("cookieConsent", "accepted");
        banner.style.display = "none";
        // Here you would typically load analytics scripts, e.g., Meta Pixel, Google Analytics
    });

    document.getElementById("cookie-reject").addEventListener("click", function() {
        localStorage.setItem("cookieConsent", "rejected");
        banner.style.display = "none";
        // Optionally disable tracking cookies/scripts
    });
});
