document.addEventListener('DOMContentLoaded', () => {
    const pacman = document.getElementById('pacman');
    const pacman1=document.getElementById('pacman_txt');
    const speed = 0.05; // Viteza cu care PacMan se apropie de cursor (0.05 pentru mișcare lină)
    const returnSpeed = 0.1; // Viteza cu care PacMan se întoarce la colțul din stânga sus
    let isFollowing = false;
    let cursorPos = { x: 0, y: 0 };
    let pacmanPos = { x: 0, y: 0 };

    // Poziționăm PacMan în colțul din stânga sus inițial și îl rotim la 180 de grade
    pacman.style.left = '0px';
    pacman.style.top = '0px';
    pacman.style.transform = 'rotate(180deg)'; // Rotire inițială de 180 de grade

    // Actualizează poziția cursorului
    document.addEventListener('mousemove', (event) => {
        if (isFollowing) {
            cursorPos.x = event.clientX;
            cursorPos.y = event.clientY;
        }
    });

    // Activează urmărirea la click pe PacMan
    pacman.addEventListener('click', () => {
        isFollowing = true;
        pacman.style.pointerEvents = 'none'; // Dezactivează click-urile pe PacMan
    });
    // Activează urmărirea la click pe PacMan
    pacman1.addEventListener('click', () => {
        isFollowing = true;
        pacman.style.pointerEvents = 'none'; // Dezactivează click-urile pe PacMan
    });
    

    // Oprește urmărirea și revine la colțul din stânga sus la apăsarea tastei Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            isFollowing = false;
            pacman.style.pointerEvents = 'auto'; // Reactivează click-urile pe PacMan
            cursorPos = { x: 0, y: 0 }; // Resetăm poziția cursorului

            // Rotire la 180 de grade și revenire în colțul din stânga sus
            pacman.style.transform = 'rotate(180deg)';
            pacman.style.left = '0px';
            pacman.style.top = '0px';
        }
    });

    function updatePacmanPosition() {
        let dx, dy, angle;

        if (isFollowing) {
            // Calculăm diferența dintre poziția actuală a cursorului și poziția PacMan-ului
            dx = cursorPos.x - pacmanPos.x;
            dy = cursorPos.y - pacmanPos.y;
        } else {
            // Calculăm diferența dintre poziția actuală a PacMan-ului și colțul din stânga sus
            dx = -pacmanPos.x;
            dy = -pacmanPos.y;
        }

        // Interpolare lină pentru mișcare fluidă
        const currentSpeed = isFollowing ? speed : returnSpeed;
        pacmanPos.x += dx * currentSpeed;
        pacmanPos.y += dy * currentSpeed;

        // Calculăm unghiul de rotație în radiani și apoi în grade
        angle = Math.atan2(dy, dx) * 180 / Math.PI;

        // Aplicăm stilurile necesare pentru a muta și roti PacMan
        pacman.style.left = `${pacmanPos.x - pacman.width / 2}px`;
        pacman.style.top = `${pacmanPos.y - pacman.height / 2}px`;
        pacman.style.transform = `rotate(${angle}deg)`;

        // Folosim requestAnimationFrame pentru a obține o mișcare mai fluidă
        requestAnimationFrame(updatePacmanPosition);
    }

    updatePacmanPosition(); // Începe actualizarea imediat
});
