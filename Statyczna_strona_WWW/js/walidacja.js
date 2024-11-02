function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.classList.remove('show');
        notification.style.display = 'none';
    }, 3000);
}


function validateForm() {
    const email = document.getElementById('mail').value;
    const message = document.getElementById('msg').value;

    if (!email) {
        showNotification('Proszę wpisać swój adres e-mail.', 'error');
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showNotification('Proszę wpisać prawidłowy adres e-mail.', 'error');
        return false;
    }

    if (!message) {
        showNotification('Proszę wpisać wiadomość.', 'error');
        return false;
    }

    showNotification('Wiadomości zostały wysłane:\nE-mail: ' + email + '\nWiadomość: ' + message, 'success');
    return true;
}
