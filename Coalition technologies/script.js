// Username and password for basic authentication
let username = 'coalition';
let password = 'skills-test';

// Encoding the username and password for Authorization header
let auth = btoa(`${username}:${password}`);
const patientsSection = document.querySelector('.patient-info');
const diagnosticListContainer = document.querySelector('.diagnostic-body');
const labresultContainer = document.querySelector('.test');
const patientImagenName = document.querySelector('.patient');

const RespiratoryReportCards = document.querySelector('other-reports-cards');
// The API URL
const apiURL = 'https://fedskillstest.coalitiontechnologies.workers.dev';

async function fetchPatientData() {
    try {
        // Fetching the data with Basic Authorization
        const response = await fetch(apiURL, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        // Check if the response is okay
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to fetch data. Status: ' + response.status);
        }

    } catch (error) {
        // Log any error that occurs during the fetch operation
        console.error('Error fetching patient details:', error);
    }
}

function renderPatientDetails(data) {
  data.forEach(patient => {
    const name = patient.name;
    const gender = patient.gender;
    const age = patient.age;
    // Log the extracted data or update UI
    const patientDiv = document.createElement('div');
    patientDiv.classList.add('patient-info');
    patientDiv.innerHTML = 
    `
    <div class="patient-info-flex">
    <div>
      <img src="${patient.profile_picture}" alt="patient-photo">
    </div>
    <div class="DrInfo">
      <span class="DrName">${name}</span>
      <span class="DrAge">${gender}, ${age}</span>
    </div>
    <div class="setting-images">
      <img src="./Assets/more_horiz_FILL0_wght300_GRAD0_opsz24.svg" alt="">
    </div>
    </div>`;
  
    patientsSection.appendChild(patientDiv);
  });
}

function renderDiagnosticList(data) {
  const patient = data[3];

  patient.diagnostic_list.forEach(diagnostic => {
    const problem = diagnostic.name;
    const description = diagnostic.description;
    const status = diagnostic.status;
    const diagnosticUnorderedList = document.createElement('ul');
    diagnosticUnorderedList.classList.add('diagnostic-flex');
    diagnosticUnorderedList.innerHTML = `
      <li>${problem}</li>
      <li>${description}</li>
      <li>${status}</li>
    `;

    diagnosticListContainer.appendChild(diagnosticUnorderedList);
  });
}

function renderLabResults(data) {
  const patient = data[3];

  patient.lab_results.forEach(result => {
    const labresultItem = document.createElement('div');
    labresultItem.textContent = result;
    labresultItem.innerHTML = `
    <div class="block-container">
    <div class="test-name">${labresultItem.textContent}</div>
    <div class="test-download">
    <img src="./Assets/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="download-icon">
    </div>
    </div>`;

    labresultContainer.appendChild(labresultItem);
  })
}

function renderPatientDetail(data) {
  const patient = data[3];

  const patientImagenName = document.querySelector('.patient');
  patientImagenName.innerHTML = `<img src="${patient.profile_picture}" alt="patient-image">
  <h2>${patient.name}</h2>`;

  const dobElement = document.querySelector('.dob span:nth-child(2)');
  const genderElement = document.querySelector('.gender span:nth-child(2)');
  const phoneElement = document.querySelector('.phone span:nth-child(2)');
  const emergencyElement = document.querySelector('.emergency span:nth-child(2)');
  const insuranceElement = document.querySelector('.insurance span:nth-child(2)');
  
  dobElement.textContent = patient.date_of_birth;
  genderElement.textContent = patient.gender;
  phoneElement.textContent = patient.phone_number;
  emergencyElement.textContent = patient.emergency_contact;
  insuranceElement.textContent = patient.insurance_type;
}

function renderDiagnosisHistory(data) {
  const ctx = document.getElementById('myChart');

  const patient = data[3];
  const latestDiagnosis = patient.diagnosis_history[0];
  const bloodPressure = patient.diagnosis_history[0].blood_pressure;

  //for respiration card
  const respiratoryRate = latestDiagnosis.respiratory_rate.value;
  const respiratoryLevels = latestDiagnosis.respiratory_rate.levels;
  //for temperature
  const temperature = latestDiagnosis.temperature.value;
  const temperatureLevels = latestDiagnosis.temperature.levels;
  //for heart rate
  const heartRate = latestDiagnosis.heart_rate.value;
  const heartLevels = latestDiagnosis.heart_rate.levels;

  const respiratoryRateCardBody = document.querySelector('.other-reports-cards:nth-child(1) .other-reports-cards-body');
  const respiratoryRateCardState = document.querySelector('.other-reports-cards:nth-child(1) .other-reports-cards-state');
  
  const temperatureCardBody = document.querySelector('.other-reports-cards:nth-child(2) .other-reports-cards-body');
  const temperatureCardState = document.querySelector('.other-reports-cards:nth-child(2) .other-reports-cards-state');
  
  const heartRateCardBody = document.querySelector('.other-reports-cards:nth-child(3) .other-reports-cards-body');
  const heartRateCardState = document.querySelector('.other-reports-cards:nth-child(3) .other-reports-cards-state');

  respiratoryRateCardBody.textContent = respiratoryRate ? `${respiratoryRate} bpm` : 'N/A';
  respiratoryRateCardState.textContent = respiratoryLevels ? `${respiratoryLevels}` : 'N/A';
  
  temperatureCardBody.textContent = temperature ? `${temperature} °F` : 'N/A';
  temperatureCardState.textContent = temperatureLevels ? `${temperatureLevels}` : 'N/A';
  
  heartRateCardBody.textContent = heartRate ? `${heartRate} bpm` : 'N/A';
  heartRateCardState.textContent = heartLevels ? `${heartLevels}` : 'N/A';

  const systolicReading = document.querySelectorAll('.blood-pressure-types-reading')[0];
  const systolicAverage = document.querySelectorAll('.blood-pressure-types-average .average')[0];

  const diastolicReading = document.querySelectorAll('.blood-pressure-types-reading')[1];
  const diastolicAverage = document.querySelectorAll('.blood-pressure-types-average .average')[1];
  
  // Update systolic values
  systolicReading.textContent = `${bloodPressure.systolic.value}`;
  systolicAverage.textContent = bloodPressure.systolic.levels;

  // Update diastolic values
  diastolicReading.textContent = `${bloodPressure.diastolic.value}`;
  diastolicAverage.textContent = bloodPressure.diastolic.levels;

  const patientBloodPressure = patient.diagnosis_history.slice(0, 6);
  let yearMonthArray = [];
  let systolicArray = [];
  let diastolicArray = [];
  patientBloodPressure.forEach(bprate => {
    const month = bprate.month.slice(0, 3);
    const yearMonth = `${month}, ${bprate.year}`;
    const systolicValue = bprate.blood_pressure.systolic.value;
    const diastolicValue = bprate.blood_pressure.diastolic.value;

    yearMonthArray.unshift(yearMonth);
    systolicArray.unshift(systolicValue);
    diastolicArray.unshift(diastolicValue);
  })


  new Chart(ctx, {
    type: 'line',
    data: {
      labels: yearMonthArray,
      datasets: [
        {
          tension: 0.4,
          data: systolicArray,
          borderWidth: 1,
          borderColor: '#E66FD2',
          backgroundColor: '#E66FD2',
        },
        {
          tension: 0.4,
          data: diastolicArray,  // New data points for the second line
          borderWidth: 1,
          borderColor: '#8c6fe6',
          backgroundColor: '#8c6fe6',
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          min: 60,
          max: 180,
          ticks: {
            stepSize: 20,
            suggestedMin: 60,
            beginAtZero: false
          }
      }
      },
      plugins: {
        legend: {
          display: false
        }
      },
      elements: {
        point: {
          radius: 6
        }
      },
    }
  });
}

async function fetchAndRenderPatientDetails(apiURL, auth) {
  try {
      const data = await fetchPatientData(apiURL, auth); 
      renderPatientDetails(data);
  } catch (error) {
      console.error('Error in fetching and rendering patient details:', error);
  }
}

async function fetchAndRenderDiagnosticList(apiURL, auth) {
  try {
      const data = await fetchPatientData(apiURL, auth); 
      renderDiagnosticList(data);
  } catch (error) {
      console.error('Error in fetching and rendering patient details:', error);
  }
}

async function fetchAndRenderLabResults(apiURL, auth) {
  try {
      const data = await fetchPatientData(apiURL, auth); 
      renderLabResults(data);
  } catch (error) {
      console.error('Error in fetching and rendering patient details:', error);
  }
}

async function fetchAndRenderPatientDetail(apiURL, auth) {
  try {
      const data = await fetchPatientData(apiURL, auth); 
      renderPatientDetail(data);
  } catch (error) {
      console.error('Error in fetching and rendering patient details:', error);
  }
}

async function fetchAndRenderDiagnosisHistory(apiURL, auth) {
  try {
      const data = await fetchPatientData(apiURL, auth); 
      renderDiagnosisHistory(data);
  } catch (error) {
      console.error('Error in fetching and rendering patient details:', error);
  }
}

fetchAndRenderPatientDetails(apiURL, auth);
fetchAndRenderDiagnosticList(apiURL, auth);
fetchAndRenderLabResults(apiURL, auth);
fetchAndRenderPatientDetail(apiURL, auth);
fetchAndRenderDiagnosisHistory(apiURL, auth);
