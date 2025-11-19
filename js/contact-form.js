/**
 * Contact Form Handler using Web3Forms API
 * This script handles form submission with validation and user feedback
 */

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  
  // Check if form exists on the page
  if (!form) {
    console.log('Contact form not found on this page');
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const formStatus = document.getElementById('form-status');

  // Get access key from config based on environment (dev or prod)
  const accessKey = siteConfig?.getWeb3FormsKey ? siteConfig.getWeb3FormsKey() : null;
  
  // Check if access key is configured
  if (!accessKey || accessKey.includes('YOUR_')) {
    const env = siteConfig?.getEnvironment ? siteConfig.getEnvironment() : 'unknown';
    console.error(`Web3Forms access key not configured for ${env} environment. Please update js/config.js`);
    
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

    // Get form data
    const formData = new FormData(form);
    
    // Add access key from config
    formData.append("access_key", accessKey);
    
    // Add additional metadata
    formData.append("from_name", "Sitio Web Basaltos & Agregados");
    formData.append("subject", `Nuevo mensaje de contacto: ${formData.get('subject')}`);

    // Store original button text
    const originalText = submitBtn.textContent;

    // Update button state
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
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
      console.error('Form submission error:', error);
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
