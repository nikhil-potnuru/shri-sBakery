document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('videoPopup');
    const closeButton = document.getElementById('closePopup');
    const dragHandle = document.getElementById('dragHandle');
    const video = popup.querySelector('video');

    // Show popup after a short delay
    setTimeout(() => {
        popup.style.display = 'block';
    }, 1000);

    // Close popup when clicking the close button
    closeButton.addEventListener('click', () => {
        popup.style.display = 'none';
        video.pause(); // Pause the video when closing
    });

    // Store popup state in localStorage
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    if (!hasSeenPopup) {
        popup.style.display = 'block';
        localStorage.setItem('hasSeenPopup', 'true');
    }

    // Draggable functionality
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    dragHandle.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === dragHandle || e.target.parentNode === dragHandle) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, popup);
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }

    // Touch events for mobile
    dragHandle.addEventListener('touchstart', dragStart, false);
    document.addEventListener('touchmove', drag, false);
    document.addEventListener('touchend', dragEnd, false);

    function dragStart(e) {
        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (e.target === dragHandle || e.target.parentNode === dragHandle) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();

            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, popup);
        }
    }
}); 