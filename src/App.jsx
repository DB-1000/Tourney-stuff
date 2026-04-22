import { useState } from 'react';
import './App.css';

const createRound = (size, defaultText) => 
    Array.from({ length: size }, () => ({ a: defaultText, b: defaultText }));

function App() {
    const [bracketSize, setBracketSize] = useState(8);
    const [champion, setChampion] = useState(null);

    const [bracket, setBracket] = useState([
        createRound(16, "Name"),
        createRound(8, "Name"),
        createRound(4, "Name"),
        createRound(2, "-"),
        createRound(1, "-")
    ]);

    const resetBracket = () => {
        setBracket([
            createRound(16, "Name"),
            createRound(8, "Name"),
            createRound(4, "Name"),
            createRound(2, "-"),
            createRound(1, "-")
        ]);
        setChampion(null);
    };

    const handleBlur = (rIdx, mIdx, slot, value) => {
        setBracket(prev => {
            const newBracket = [...prev];
            newBracket[rIdx] = [...newBracket[rIdx]];
            newBracket[rIdx][mIdx] = { ...newBracket[rIdx][mIdx], [slot]: value };
            return newBracket;
        });
    };

    const handleDoubleClick = (rIdx, mIdx, slot) => {
        const name = bracket[rIdx][mIdx][slot];
        if (!name || name === "Name" || name === "-") return;

        const nextRoundIdx = rIdx + 1;

        if (nextRoundIdx === 5) {
            setChampion(name);
        } else {
            const nextMatchIdx = Math.floor(mIdx / 2);
            const nextSlot = mIdx % 2 === 0 ? 'a' : 'b';
            
            setBracket(prev => {
                const newBracket = [...prev];
                newBracket[nextRoundIdx] = [...newBracket[nextRoundIdx]];
                newBracket[nextRoundIdx][nextMatchIdx] = { 
                    ...newBracket[nextRoundIdx][nextMatchIdx], 
                    [nextSlot]: name 
                };
                return newBracket;
            });
        }
    };

    const renderRound = (rIdx, colClass, isHidden) => (
        <div className={`${colClass} round-col ${isHidden ? 'hidden-round' : ''}`}>
            {bracket[rIdx].map((match, mIdx) => (
                <div className="matchup" key={`${rIdx}-${mIdx}`}>
                    <div className="bracketbox">
                        <span 
                            className="teama" 
                            contentEditable 
                            suppressContentEditableWarning
                            onBlur={(e) => handleBlur(rIdx, mIdx, 'a', e.target.innerText)}
                            onDoubleClick={() => handleDoubleClick(rIdx, mIdx, 'a')}
                        >
                            {match.a}
                        </span>
                        <span 
                            className="teamb" 
                            contentEditable 
                            suppressContentEditableWarning
                            onBlur={(e) => handleBlur(rIdx, mIdx, 'b', e.target.innerText)}
                            onDoubleClick={() => handleDoubleClick(rIdx, mIdx, 'b')}
                        >
                            {match.b}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );

   return (
        <>
            {champion && (
                <div id="victory-screen">
                    <div className="victory-content">
                        <h1>🏆 TOURNAMENT CHAMPION 🏆</h1>
                        <h2>{champion}</h2>
                        <button onClick={() => setChampion(null)}>Close</button>
                    </div>
                </div>
            )}

            <div className="controls">
                <button onClick={() => setBracketSize(8)}>8 Players</button>
                <button onClick={() => setBracketSize(16)}>16 Players</button>
                <button onClick={() => setBracketSize(32)}>32 Players</button>
                
                {/* NEW BUTTON */}
                <button 
                    onClick={resetBracket} 
                    style={{ backgroundColor: '#cc2e2e', marginLeft: '30px' }}
                >
                    Reset Bracket
                </button>
            </div>

            <div className="brackets">
                {renderRound(0, 'r1', bracketSize < 32)}
                {renderRound(1, 'r2', bracketSize < 16)}
                {renderRound(2, 'r3', false)}
                {renderRound(3, 'r4', false)}
                {renderRound(4, 'r5', false)}

                <div className="r6 round-col">
                    <div className="matchup">
                        <div className="bracketbox" style={{ border: 'none' }}>
                            <span className="winner-box">{champion || "CHAMPION"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;