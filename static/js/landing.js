// landing.js — landing page interactions (How-it-works modal)

(function () {
    "use strict";

    var openers = document.querySelectorAll("[data-open-modal]");
    var closers = document.querySelectorAll("[data-close-modal]");

    openers.forEach(function (opener) {
        opener.addEventListener("click", function (event) {
            var targetId = opener.getAttribute("data-open-modal");
            if (!targetId) return;
            var modal = document.getElementById(targetId);
            if (!modal) return;
            event.preventDefault();
            openModal(modal);
        });
    });

    closers.forEach(function (closer) {
        closer.addEventListener("click", function (event) {
            var modal = closer.closest(".modal");
            if (!modal) return;
            event.preventDefault();
            closeModal(modal);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;
        var open = document.querySelector(".modal.is-open");
        if (open) closeModal(open);
    });

    function openModal(modal) {
        var iframe = modal.querySelector("iframe[data-src]");
        if (iframe && iframe.getAttribute("src") === "about:blank") {
            iframe.setAttribute("src", iframe.getAttribute("data-src"));
        }
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    }

    function closeModal(modal) {
        var iframe = modal.querySelector("iframe[data-src]");
        if (iframe) {
            // Blanking the src fully tears down the YouTube player so
            // audio/video stops immediately and does not continue in background.
            iframe.setAttribute("src", "about:blank");
        }
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }
})();
