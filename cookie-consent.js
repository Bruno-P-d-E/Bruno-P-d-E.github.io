document.addEventListener("DOMContentLoaded", function() {
    const hasConsented = localStorage.getItem("cookieConsent");
    let bannerVisible = false;

    if (!hasConsented) {
        bannerVisible = true;
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
    }

    // Styles for WhatsApp floating button
    const waStyle = document.createElement("style");
    waStyle.innerHTML = `
        #wa-floating-btn {
            position: fixed;
            bottom: ${bannerVisible ? '120px' : '24px'};
            right: 24px;
            width: 60px;
            height: 60px;
            background-color: #25D366;
            color: #FFF;
            border-radius: 50%;
            text-align: center;
            box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: bottom 0.3s ease, transform 0.3s ease;
        }
        #wa-floating-btn:hover {
            transform: scale(1.1);
        }
        #wa-floating-btn svg {
            width: 34px;
            height: 34px;
            fill: currentColor;
        }
        @media (max-width: 768px) {
            #wa-floating-btn {
                bottom: ${bannerVisible ? '170px' : '24px'};
                right: 16px;
                width: 50px;
                height: 50px;
            }
            #wa-floating-btn svg {
                width: 28px;
                height: 28px;
            }
        }
    `;
    document.head.appendChild(waStyle);

    // HTML for WhatsApp floating button
    const waBtn = document.createElement("a");
    waBtn.id = "wa-floating-btn";
    waBtn.href = "https://wa.me/5541996203188";
    waBtn.target = "_blank";
    waBtn.rel = "noopener";
    waBtn.setAttribute("aria-label", "Falar no WhatsApp");
    waBtn.innerHTML = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937s-3.113 6.938-6.938 6.938z"/>
        </svg>
    `;
    document.body.appendChild(waBtn);

    // Event listeners for banner (if it was created)
    if (bannerVisible) {
        document.getElementById("cookie-accept").addEventListener("click", function() {
            localStorage.setItem("cookieConsent", "accepted");
            document.getElementById("cookie-banner").style.display = "none";
            document.getElementById("wa-floating-btn").style.bottom = "24px";
        });

        document.getElementById("cookie-reject").addEventListener("click", function() {
            localStorage.setItem("cookieConsent", "rejected");
            document.getElementById("cookie-banner").style.display = "none";
            document.getElementById("wa-floating-btn").style.bottom = "24px";
        });
    }
});
