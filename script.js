function setSize(num) {
    const r1 = document.querySelector('.r1');
    const r2 = document.querySelector('.r2');
    const r3 = document.querySelector('.r3');
    r1.classList.remove('hidden-round');
    r2.classList.remove('hidden-round');
    r3.classList.remove('hidden-round');
    
    if (num === 8) { 
        r1.classList.add('hidden-round'); 
        r2.classList.add('hidden-round'); 
    } else if (num === 16) { 
        r1.classList.add('hidden-round'); 
    }
}

function showVictoryScreen(winnerName) {
    const screen = document.getElementById('victory-screen');
    const nameDisplay = document.getElementById('winner-name');
    nameDisplay.innerText = winnerName;
    screen.classList.remove('hidden');
}

function closeVictoryScreen() {
    document.getElementById('victory-screen').classList.add('hidden');
}

document.addEventListener('dblclick', function(e) {
    if (e.target.hasAttribute('contenteditable')) {
        const name = e.target.innerText;
        if (name === "Name" || name === "-" || name === "" || name === "CHAMPION") return;
        
        const currentMatchup = e.target.closest('.matchup');
        const currentRound = e.target.closest('.round-col');
        const allVisibleRounds = Array.from(document.querySelectorAll('.round-col:not(.hidden-round)'));
        const currentIndex = allVisibleRounds.indexOf(currentRound);
        const nextRound = allVisibleRounds[currentIndex + 1];
        
        if (nextRound) {
            const matchups = Array.from(currentRound.querySelectorAll('.matchup'));
            const matchIndex = matchups.indexOf(currentMatchup);
            const nextMatchups = nextRound.querySelectorAll('.matchup');
            const nextMatchIndex = Math.floor(matchIndex / 2);
            const isTop = matchIndex % 2 === 0;
            
            if (nextRound.classList.contains('r6')) {
                nextRound.querySelector('.winner-box').innerText = name;
                showVictoryScreen(name);
            } else {
                const box = nextMatchups[nextMatchIndex].querySelector('.bracketbox');
                const slot = isTop ? box.querySelector('.teama') : box.querySelector('.teamb');
                slot.innerText = name;
                
                e.target.style.color = "#00ff00";
                setTimeout(() => e.target.style.color = "#e0e0e0", 400);
            }
        }
    }
});

setSize(8);