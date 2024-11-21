document.getElementById('generate-btn').addEventListener('click', () => {
    const numSections = parseInt(document.getElementById('num-sections').value);
  
    if (isNaN(numSections) || numSections <= 0) {
      alert('Please enter a valid number of sections!');
      return;
    }
  
    const dynamicFields = document.getElementById('dynamic-fields');
    dynamicFields.innerHTML = ''; // Clear previous fields
  
    // Generate input fields dynamically
    for (let i = 1; i <= numSections; i++) {
      const fieldset = document.createElement('div');
      fieldset.classList.add('input-group');
      fieldset.innerHTML = `
        <label for="score-${i}">Score for Section ${i}:</label>
        <div class="input-row">
          <input type="number" id="score-${i}" class="score-input" placeholder="Enter your score" required>
          <input type="number" id="total-${i}" class="total-input" placeholder="Enter total points" required>
        </div>
        <label for="weight-${i}">Weight for Section ${i} (%):</label>
        <input type="number" id="weight-${i}" class="weight-input" placeholder=" " min="0" max="100" required>
      `;
      dynamicFields.appendChild(fieldset);
    }
  
    // Show the grade form
    document.getElementById('grade-form').style.display = 'block';
  });
  
  document.getElementById('calculate-btn').addEventListener('click', () => {
    const scores = Array.from(document.querySelectorAll('.score-input')).map(input => Number(input.value));
    const totals = Array.from(document.querySelectorAll('.total-input')).map(input => Number(input.value));
    const weights = Array.from(document.querySelectorAll('.weight-input')).map(input => Number(input.value));
  
    // Validation
    if (scores.some(isNaN) || totals.some(isNaN) || weights.some(isNaN)) {
      alert('Please fill out all fields!');
      return;
    }
  
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    if (totalWeight !== 100) {
      alert('The total weight must equal 100%!');
      return;
    }
  
    // Calculate weighted grade
    let weightedGrade = 0;
    scores.forEach((score, index) => {
      const percentage = (score / totals[index]) * 100; // Convert score to percentage
      weightedGrade += (percentage * weights[index]) / 100; // Apply weight to percentage
    });
  
    // Display result
    document.getElementById('weighted-grade').textContent = weightedGrade.toFixed(2);
    document.getElementById('result').style.display = 'block';
  });
  document.getElementById('generateFields').addEventListener('click', function () {
    let numSections = document.getElementById('numSections').value;
    let sectionsContainer = document.getElementById('sectionsContainer');
    sectionsContainer.innerHTML = ''; // Clear previous sections
  
    for (let i = 1; i <= numSections; i++) {
      let sectionDiv = document.createElement('div');
      sectionDiv.classList.add('section');
      
      // Create Score, Total Points, and Weight input for each section
      sectionDiv.innerHTML = `
        <label for="score${i}">Score for Section ${i}:</label>
        <input type="number" id="score${i}" class="score" placeholder="Enter score for section ${i}" />
  
        <label for="totalPoints${i}">Total Points for Section ${i}:</label>
        <input type="number" id="totalPoints${i}" class="totalPoints" placeholder="Enter total points for section ${i}" />
  
        <label for="weight${i}">Weight for Section ${i}:</label>
        <input type="number" id="weight${i}" class="weight" placeholder="Enter weight for section ${i}" />
      `;
      
      sectionsContainer.appendChild(sectionDiv);
    }
  });
  
  