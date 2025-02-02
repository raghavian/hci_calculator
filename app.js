        function populateTasks(phase) {
            const taskSelect = document.getElementById('specific-task');
            taskSelect.innerHTML = '';

            const tasks = Object.keys(optionsHierarchy[phase] || {});
            tasks.forEach(task => {
                const option = document.createElement('option');
                option.value = task;
                option.textContent = task.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                taskSelect.appendChild(option);
            });

            taskSelect.dispatchEvent(new Event('change'));
        }

        function populateModels(phase, task) {
            const modelSelect = document.getElementById('specific-model');
            modelSelect.innerHTML = '';

            const models = Object.keys((optionsHierarchy[phase] || {})[task] || {});
            models.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });

            modelSelect.dispatchEvent(new Event('change'));
        }

        function populateParameters(phase, task, model) {
            const paramsDiv = document.getElementById('dynamic-parameters');
            paramsDiv.innerHTML = '';

            const params = optionsHierarchy[phase]?.[task]?.[model] || [];
            params.forEach(param => {
                const paramDiv = document.createElement('div');
                paramDiv.classList.add('form-group');

                const label = document.createElement('label');
                label.htmlFor = param.id;
                label.textContent = param.label;

                const input = document.createElement('input');
                input.id = param.id;
                input.type = param.type;
                input.min = param.min;
                if (param.step) input.step = param.step;
                input.value = param.default || param.min;

                paramDiv.appendChild(label);
                paramDiv.appendChild(input);
                paramsDiv.appendChild(paramDiv);
            });
        }



        document.getElementById('use-case').addEventListener('change', function () {
            const phase = this.value;
            populateTasks(phase);
        });

        document.getElementById('specific-task').addEventListener('change', function () {
            const phase = document.getElementById('use-case').value;
            const task = this.value;
            populateModels(phase, task);
        });

        document.getElementById('specific-model').addEventListener('change', function () {
            const phase = document.getElementById('use-case').value;
            const task = document.getElementById('specific-task').value;
            const model = this.value;
            populateParameters(phase, task, model);
        });

        window.onload = function() {
            const phase = document.getElementById('use-case').value;
            populateTasks(phase);
        };
        
        let useCaseCounter = 1; // Initialize counter for Use Case

    document.getElementById('add-job').addEventListener('click', function () {
        const useCase = document.getElementById('use-case').value;
        const specificTask = document.getElementById('specific-task').value;
            const specificModel = document.getElementById('specific-model').value; // Get     selected model
            const energy = optionsHierarchy[useCase]?.[specificTask]?.[specificModel][0]["_en"] || 0.00;
        const carbonIntensity = 0.481;


            // Retrieve additional parameters for the specific task
            const dynamicParamsDiv = document.getElementById('dynamic-parameters');
            const additionalParams = {};
            Array.from(dynamicParamsDiv.querySelectorAll('input')).forEach(input => {
                if (input.type === 'number' || input.type === 'range') {
                    if (input.id === 'input-param') {
                        additionalParams[input.id] = parseFloat(input.value) * 0.1; // Multiply by 0.1 for input token processing cost which is cheaper than output tokens
                    } else {
                        additionalParams[input.id] = parseFloat(input.value);
                    }
                }
            });

        // Example: Adjust carbon footprint calculation based on additional parameters
        let additionalFactor = 1; // Default factor
        Object.values(additionalParams).forEach(value => {
        additionalFactor *= value; // Example adjustment (scale as needed)
        });

        // Calculate carbon footprint with additional parameters
        const carbonFootprint = carbonIntensity * additionalFactor * energy /1000;

        const job = {
        useCase: `${useCase} #${useCaseCounter}`, // Append the counter to the use case
        specificTask,
        specificModel,
        carbonIntensity,
        carbonFootprint
        };

        jobs.push(job);

        // Display the added job in the job list
        const jobsList = document.getElementById('jobs-list');
        const jobItem = document.createElement('div');
        jobItem.classList.add('job-item');
        jobItem.innerHTML = `
    ${useCaseCounter}. ${useCase.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}; ${job.specificTask.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}; ${job.specificModel.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:
${carbonFootprint.toFixed(5)} kgCO2e`;
        jobsList.appendChild(jobItem);

        // Increment the counter
        useCaseCounter++;
    });


        document.getElementById('add-job').addEventListener('click', function () {
            let totalFootprint = 0;

            jobs.forEach(job => {
                const energyUsage = job.trainingTime * job.powerUsage;
//                const carbonFootprint = energyUsage * job.carbonIntensity;
                totalFootprint += job.carbonFootprint;
            });

            const resultDiv = document.getElementById('result');
            resultDiv.textContent = `Your carbon footprint is approximately `;
            
            // Create a <br> element for a new line
    const br = document.createElement('br');
    resultDiv.appendChild(br);

    // Add the footprint value after the line break
    resultDiv.appendChild(document.createTextNode(`${totalFootprint.toFixed(5)} kgCO2e`));

//            \n${totalFootprint.toFixed(5)} kgCO2e`;
        });


    // Function to update the dynamic equivalents
    function updateEquivalents(resultValue) {
        document.getElementById("km-driven").textContent = (resultValue * 4).toFixed(2); 
        document.getElementById("minutes-airplane").textContent = (resultValue * 0.24).toFixed(2); 
        document.getElementById("tree-seedlings").textContent = (resultValue * 0.017).toFixed(2); 
    }

    // Listen for changes to the result value
    function observeResult() {
        const resultElement = document.getElementById("result");
    
    // Example way to parse the numeric value from the result text (adjust if needed)
    const parseResultValue = () => {
        const text = resultElement.textContent || resultElement.innerText;
        const match = text.match(/([\d.]+)/); // Extract the first number from the text
        return match ? parseFloat(match[1]) : 0;
    };

    const update = () => {
        const resultValue = parseResultValue();
        updateEquivalents(resultValue);
    };

    // Example: If the result changes programmatically, use a MutationObserver
    const observer = new MutationObserver(update);
    observer.observe(resultElement, { childList: true, subtree: true });

    // Initial update in case the result is already set
    update();
    }

    // Call the observer function on load
    observeResult();

