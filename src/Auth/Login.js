import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess, setAuthToken }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  // Use the hook useNavigate to get the navigation function
  const navigate = useNavigate();

  const [rememberLogin, setRememberLogin] = useState(false);

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://www.sea7api.com.br/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: login,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login bem-sucedido');
        console.log('Authkey:', data.token); // Assuming the authkey is returned as "authkey" in the response
        setAuthToken(data.token);

        // Save token to Local Storage
        localStorage.setItem('token', data.token);

         // Salvar o estado de "Manter login" no localStorage
         localStorage.setItem('rememberLogin', rememberLogin);

        onLoginSuccess();
        // Redirect to the Dashboard page after successful login
        navigate('/dashboard');
      } else {
        console.log('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
  };

  return (
    <div className='flex items-center justify-center w-full h-screen'>
        <main className='flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center'>
          <div className='bg-white rounded-2xl shadow-2xl flex justify-center items-center flex-col-reverse md:flex-row w-full ss:w-2/3 max-w-4xl'>
            <div className='md:w-3/5 p-5 flex flex-col items-center justify-center'>
                <div className='text-center font-bold flex items-center justify-center px-2 rounded-20 w-[110px]'>
                        
                    </div>
                    <div className='py-10'>
                        <h2 className='text-3xl font-bold text-gray-800 mb-2'>Faça login na sua conta</h2>
                    <div className='flex flex-col items-center'>
                    <div className='border-2 w-10 border-gray-800 inline-block mb-2 rounded-full'></div>
                        {/* Inputs do usuário EMAIL e SENHA */}
                    <div className='bg-gray-100 w-80 p-2 flex items-center mb-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="text-gray-400 mr-2" viewBox="0 0 16 16"> <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/> </svg>
                        <input
                        value={login}
                        type="name"
                        name='name'
                        placeholder='Email'
                        className='bg-gray-100 outline-none text-sm flex-1'
                        onChange={handleLoginChange} // Adiciona o manipulador de evento onChange
                        />
                    </div>
                    <div className='bg-gray-100 w-80 p-2 flex items-center mb-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"  width="20" height="20"  fill="currentColor" className="text-gray-400 mr-2"> <path d="M6 8V7a6 6 0 1 1 12 0v1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2zm13 2H5v10h14V10zm-8 5.732a2 2 0 1 1 2 0V18h-2v-2.268zM8 8h8V7a4 4 0 1 0-8 0v1z"/> </svg>
                        <input
                        value={password}
                        type="password"
                        name='password'
                        placeholder='Senha'
                        className='bg-gray-100 outline-none text-sm flex-1'
                        onChange={handlePasswordChange} // Adiciona o manipulador de evento onChange
                        />
                    </div>
                    <div className='flex justify-between w-80 mb-5'>
                        <label className='flex items-center text-xs'><input type="checkbox" name='remember' onChange={(e) => setRememberLogin(e.target.checked)}
                        className='mr-1'/> Manter login</label>
                        <a href="https://api.whatsapp.com/send/?phone=5548984737009&text=Ol%C3%A1,+n%C3%A3o+lembro+a+senha+de+administrador+do+meu+site&type=phone_number&app_absent=0" className='text-xs'>Esqueceu a senha?</a>
                    </div>
                    <button
                    onClick={handleLogin}
                    className='border-2 border-black rounded-full px-8 py-2 mt-4 md:mt-0 inline-block font-semibold hover:bg-white hover:text-gray-700'
                    >
                    Iniciar sessão
                    </button>
                    </div>
                    </div>
                </div>
            {/* Sessão do Login */}
            <div className='w-full md:w-2/5 bg-[#159687] text-white rounded-tr-2xl rounded-tl-2xl md:rounded-tr-2xl md:rounded-br-2xl py-10 md:py-36 px-6 md:px-12'>
                <h2 className='text-2xl md:text-3xl font-bold mb-2'>Bem Vindo(a)</h2>
                <div className='border-2 w-8 h-1 md:w-10 md:h-2 bg-white inline-block mb-2 rounded-full'></div>
                <p className='text-sm md:text-base mb-6'>
                    Faça login como administrador para gerenciar as embarações e dados do seu site.
                </p>
            
            </div>
        </div>
    </main>
</div>
)
}

export default Login;
