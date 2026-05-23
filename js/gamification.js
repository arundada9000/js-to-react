document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const completeBtn = e.target.closest('.complete-btn');
        if (!completeBtn) return;

        // Wait 100ms to allow other click handlers (like app.js) to update the DOM state
        setTimeout(() => {
            const phaseCard = completeBtn.closest('.phase-card');
            if (phaseCard) {
                const exerciseCards = phaseCard.querySelectorAll('.exercise-card');
                const completedCards = phaseCard.querySelectorAll('.exercise-card.completed');
                
                // If all exercises are completed and there's at least one exercise
                if (exerciseCards.length > 0 && exerciseCards.length === completedCards.length) {
                    
                    // Prevent firing confetti multiple times if already completed
                    if (phaseCard.dataset.confettiFired === 'true') {
                        return;
                    }
                    phaseCard.dataset.confettiFired = 'true';

                    // Fire confetti if available globally
                    if (typeof window.confetti === 'function') {
                        window.confetti({ 
                            particleCount: 100, 
                            spread: 70, 
                            origin: { y: 0.6 } 
                        });
                    } else {
                        console.warn('canvas-confetti library is not loaded.');
                    }
                } else {
                    // Reset the fired state if not all cards are completed anymore
                    phaseCard.dataset.confettiFired = 'false';
                }
            }
        }, 100);
    });
});
