let currentStep = 1;

function generateRandomDNA() {
    const bases = ['A', 'T', 'C', 'G'];
    let sequence = '';
    for (let i = 0; i < 6; i++) {
        sequence += bases[Math.floor(Math.random() * bases.length)];
    }
    return sequence;
}

function getComplement(base) {
    switch (base) {
        case 'A': return 'T';
        case 'T': return 'A';
        case 'C': return 'G';
        case 'G': return 'C';
        default: return '';
    }
}

function chooseEnzyme(enzyme) {
    const instructions = document.getElementById('game-instructions');
    const image = document.getElementById('dna-image');
    const inputContainer = document.getElementById('input-container');
    const randomDNAContainer = document.getElementById('random-dna-container');

    switch (currentStep) {
        case 1:
            if (enzyme === 'Topoisomerase') {
                instructions.textContent = 'Great! Now your DNA strands are uncoiled.';
                setTimeout(() => {
                    image.src = 'images/uncoiledDNA.jpg';
                }, 2000);
                image.src = 'images/topo1.jpg';
                setTimeout(() => {
                    image.src = 'images/topo2.jpg';
                }, 500);
                setTimeout(() => {
                    image.src = 'images/topo3.jpg';
                }, 1000);
                setTimeout(() => {
                    image.src = 'images/topo4.jpg';
                }, 1500);
                currentStep++;
            } else {
                instructions.textContent = 'Silly you! your DNA strands are still coiled like a mess!';
            }
            break;

        case 2:
            if (enzyme === 'Helicase') {
                instructions.textContent = 'Well done!';
                image.src = 'images/helicase.jpg';
                currentStep++;
            } else {
                instructions.textContent = 'Your DNA is still double helix; you cannot proceed the replication like this!';
            }
            break;

        case 3:
            if (enzyme === 'SSB') {
                instructions.textContent = 'Nice!';
                image.src = 'images/ssb.jpg';
                currentStep++;
            } else {
                instructions.textContent = 'Your DNA strands are rejoining. Try another enzyme.';
            }
            break;

        case 4:
            if (enzyme === 'Primase') {
                instructions.textContent = 'Good job! Time to add nucleotides!';
                image.src = 'images/primase.jpg';
                currentStep++;
            } else {
                instructions.textContent = 'Seems like your enzymes do not know where to begin???';
            }
            break;

        case 5:
            if (enzyme === 'DNA Polymerase III') {
                const randomDNA = generateRandomDNA();
                randomDNAContainer.textContent = `Template Strand: ${randomDNA}`;
                instructions.textContent =
                    'Enter the complementary strand for the provided DNA template.';
                document.getElementById('user-input').value = '';
                inputContainer.classList.remove('hidden');
                currentStep++;
            } else {
                instructions.textContent =
                    'The strands are not complete yet! Please replicate them.';
            }
            break;

        case 6:
            const userInput = document.getElementById('user-input').value.toUpperCase();
            const template = randomDNAContainer.textContent.split(': ')[1];
            const correctComplement = template.split('').map(getComplement).join('');

            if (userInput === correctComplement) {
                instructions.textContent =
                    'Awesome! Complementary strand synthesized.';
                image.src = 'images/completestrand.jpg';
                inputContainer.classList.add('hidden');
                currentStep++;
            } else {
                instructions.textContent =
                    'Incorrect complementary strand. Try again!';
            }
            break;
            
        case 7:
            if (enzyme === 'DNA Polymerase I') {
                instructions.textContent = 'Great! Replacing primers with nucleotides.';
                image.src = 'images/dnapol1.jpg';
                currentStep++;
            } else {
                instructions.textContent =
                    'There is still something a little bit off on the replicated sides. Maybe replace something?';
            }
            break;

        case 8:
            if (enzyme === 'Ligase') {
                instructions.textContent =
                    'Congratulations! You have successfully completed DNA replication!';
                image.src = 'images/ligase.jpg';
                currentStep++;
            } else {
                instructions.textContent = 'The gaps have not been sealed!!';
            }
            break;

        default:
            instructions.textContent =
                'You have completed the game! Refresh the page to play again.';
    }
}
