let token = null;

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const result = await response.json();
        const messageElement = document.getElementById('registerMessage');
        
        if (response.ok) {
            messageElement.textContent = result.message;
            messageElement.className = 'message success';
        } else {
            messageElement.textContent = result.message || 'Регистрация не удалась';
            messageElement.className = 'message error';
        }
    } catch (error) {
        document.getElementById('registerMessage').textContent = 'Ошибка при регистрации';
        document.getElementById('registerMessage').className = 'message error';
    }
});


document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const result = await response.json();
        const messageElement = document.getElementById('loginMessage');
        
        if (response.ok) {
            token = result.token;
            messageElement.textContent = 'Успешный вход!';
            messageElement.className = 'message success';
        } else {
            messageElement.textContent = result.message || 'Вход не удался';
            token = null;
            messageElement.className = 'message error';
        }
    } catch (error) {
        document.getElementById('loginMessage').textContent = 'Ошибка при входе';
        document.getElementById('loginMessage').className = 'message error';
    }
});


document.getElementById('fetchProtectedData').addEventListener('click', async () => {
    if (!token) {
        document.getElementById('protectedData').textContent = 'Сначала нужно войти';
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/protected', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const result = await response.json();
            document.getElementById('protectedData').textContent = JSON.stringify(result, null, 2);
        } else {
            document.getElementById('protectedData').textContent = 'Доступ запрещен';
        }
    } catch (error) {
        document.getElementById('protectedData').textContent = 'Ошибка при извлечении данных';
    }
});