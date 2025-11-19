/**
 * Contact Form Handler using Web3Forms API
 * This script handles form submission with validation and user feedback
 */

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} str - Input string to sanitize
 * @returns {string} - Sanitized string
 */
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  
  // Create a temporary div element to use browser's built-in HTML encoding
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  
  // Rate limiting: Track last submission time
  let lastSubmitTime = 0;
  const SUBMIT_COOLDOWN = 3000; // 3 seconds between submissions
  
  // Check if form exists on the page
  if (!form) {
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const formStatus = document.getElementById('form-status');

  // Get access key from config based on environment (dev or prod)
  const accessKey = siteConfig?.getWeb3FormsKey ? siteConfig.getWeb3FormsKey() : null;
  
  // Check if access key is configured
  if (!accessKey || accessKey.includes('YOUR_')) {
    // Get appropriate error message based on page language
    const lang = document.documentElement.lang || 'es';
    const errorMessages = {
      'es': 'El formulario no está configurado correctamente. Por favor, contacte al administrador del sitio.',
      'en': 'The form is not properly configured. Please contact the site administrator.',
      'zh': '表单配置不正确。请联系网站管理员。'
    };
    
    showStatus('error', errorMessages[lang] || errorMessages['es']);
    submitBtn.disabled = true;
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
      const lang = document.documentElement.lang || 'es';
      const messages = {
        'es': 'Por favor, espere unos segundos antes de enviar otro mensaje.',
        'en': 'Please wait a few seconds before submitting another message.',
        'zh': '请等待几秒钟后再提交另一条消息。'
      };
      showStatus('error', messages[lang] || messages['es']);
      return;
    }

    // Get form data
    const formData = new FormData(form);
    
    // Sanitize all text inputs before submission
    const sanitizedData = new FormData();
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        sanitizedData.append(key, sanitizeInput(value));
      } else {
        sanitizedData.append(key, value);
      }
    }
    
    // Add access key from config
    sanitizedData.append("access_key", accessKey);
    
    // Add Web3Forms spam protection
    // Honeypot field (hidden from users, catches bots)
    sanitizedData.append("botcheck", "");
    
    // Add additional metadata (sanitized)
    sanitizedData.append("from_name", "Sitio Web Basaltos & Agregados");
    sanitizedData.append("subject", sanitizeInput(`Nuevo mensaje de contacto: ${formData.get('subject')}`));

    // Store original button text
    const originalText = submitBtn.textContent;
    
    // Update last submit time
    lastSubmitTime = now;

    // Update button state
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: sanitizedData
      });

      const data = await response.json();

      // Get appropriate messages based on page language
      const lang = document.documentElement.lang || 'es';
      const messages = {
        success: {
          'es': '¡Éxito! Su mensaje ha sido enviado. Nos pondremos en contacto con usted pronto.',
          'en': 'Success! Your message has been sent. We will contact you soon.',
          'zh': '成功！您的消息已发送。我们会尽快与您联系。'
        },
        error: {
          'es': 'No se pudo enviar el mensaje. Por favor, inténtelo de nuevo.',
          'en': 'Could not send message. Please try again.',
          'zh': '无法发送消息。请重试。'
        },
        networkError: {
          'es': 'Algo salió mal. Por favor, inténtelo de nuevo o contáctenos directamente por teléfono o correo electrónico.',
          'en': 'Something went wrong. Please try again or contact us directly by phone or email.',
          'zh': '出了点问题。请重试或直接通过电话或电子邮件与我们联系。'
        }
      };

      if (response.ok && data.success) {
        showStatus('success', messages.success[lang] || messages.success['es']);
        form.reset();
      } else {
        showStatus('error', `Error: ${data.message || (messages.error[lang] || messages.error['es'])}`);
      }

    } catch (error) {
      const lang = document.documentElement.lang || 'es';
      const messages = {
        'es': 'Algo salió mal. Por favor, inténtelo de nuevo o contáctenos directamente por teléfono o correo electrónico.',
        'en': 'Something went wrong. Please try again or contact us directly by phone or email.',
        'zh': '出了点问题。请重试或直接通过电话或电子邮件与我们联系。'
      };
      showStatus('error', messages[lang] || messages['es']);
    } finally {
      // Restore button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  /**
   * Display status message to user
   * @param {string} type - 'success' or 'error'
   * @param {string} message - Message to display
   */
  function showStatus(type, message) {
    formStatus.style.display = 'block';
    formStatus.className = type === 'success' ? 'alert-success' : 'alert-error';
    formStatus.textContent = message;
    
    // Set colors based on type
    if (type === 'success') {
      formStatus.style.backgroundColor = '#d4edda';
      formStatus.style.color = '#155724';
      formStatus.style.borderLeft = '4px solid #28a745';
    } else {
      formStatus.style.backgroundColor = '#f8d7da';
      formStatus.style.color = '#721c24';
      formStatus.style.borderLeft = '4px solid #dc3545';
    }
    
    // Scroll to status message
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide success message after 10 seconds
    if (type === 'success') {
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 10000);
    }
  }
});
