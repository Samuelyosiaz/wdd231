const navbutton = document.querySelector('#nav-button');
const navbar = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navbar.classList.toggle('show');
});

/***** Copy Right ******/
const year = new Date().getFullYear();
const copyright = document.querySelector('#currentyear');
copyright.innerHTML = year;

const lastModified = document.querySelector('#lastModified');
lastModified.innerHTML = `Last Modified: ${document.lastModified}`;

// Función para obtener parámetros de la URL
function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    firstName: params.get('firstName'),
    lastName: params.get('lastName'),
    email: params.get('email'),
    mobile: params.get('mobile'),
    organization: params.get('organization'),
    timestamp: params.get('timestamp')
  };
}

// Format timestamp for display
function formatTimestamp(timestamp) {
  if (!timestamp) return 'Not available';
  
  try {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  } catch (error) {
    return timestamp; // fallback to original if parsing fails
  }
}

// Mostrar datos en la página
const data = getParams();
const container = document.getElementById('formData');

container.innerHTML = `
  <div class="form-data-container">
    <div class="data-item">
      <span class="label">First Name:</span>
      <span class="value">${data.firstName || 'Not provided'}</span>
    </div>
    <div class="data-item">
      <span class="label">Last Name:</span>
      <span class="value">${data.lastName || 'Not provided'}</span>
    </div>
    <div class="data-item">
      <span class="label">Email:</span>
      <span class="value">${data.email || 'Not provided'}</span>
    </div>
    <div class="data-item">
      <span class="label">Mobile:</span>
      <span class="value">${data.mobile || 'Not provided'}</span>
    </div>
    <div class="data-item">
      <span class="label">Organization:</span>
      <span class="value">${data.organization || 'Not provided'}</span>
    </div>
    <div class="data-item">
      <span class="label">Submission Time:</span>
      <span class="value">${formatTimestamp(data.timestamp)}</span>
    </div>
  </div>
`;