// Importando as funções necessárias dos SDKs do Firebase via CDN (Versão Modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// CONFIGURAÇÃO DO SEU PROJETO FIREBASE
// Substitua as strings abaixo com as credenciais do seu console do Firebase:
// Configurações do Projeto > Geral > Seus aplicativos (Web app)
const firebaseConfig = {
  apiKey: "AIzaSyCdH2PwoUOK1TbInSPn4MeqFRsWFtg2O7k",
  authDomain: "web2026-53761.firebaseapp.com",
  projectId: "web2026-53761",
  storageBucket: "web2026-53761.firebasestorage.app",
  messagingSenderId: "860920246692",
  appId: "1:860920246692:web:680dfa6b26f30c8c095131"
};


// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inicializa o provedor de autenticação do Google
const googleProvider = new GoogleAuthProvider();

// ==========================================
// 1. Autenticação por E-mail e Senha
// ==========================================
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("Login efetuado com sucesso (E-mail):", user);
        alert(`Bem-vindo, ${user.email}!`);
        
        // Redirecione o usuário ou mude o estado da tela aqui:
        // window.location.href = "dashboard.html";
        
    } catch (error) {
        console.error("Erro ao fazer login com e-mail:", error.code, error.message);
        tratarErrosAuth(error.code);
    }
});

// ==========================================
// 2. Autenticação com o Google
// ==========================================
const btnGoogle = document.getElementById("btn-google");

btnGoogle.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        // Opcional: obtém o Token de acesso do Google se precisar consumir APIs externas
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        
        const user = result.user;
        console.log("Login efetuado com sucesso (Google):", user);
        alert(`Bem-vindo, ${user.displayName}!`);
        
        // Redirecione o usuário aqui:
        // window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Erro ao fazer login com o Google:", error.code, error.message);
        alert("Falha na autenticação com o Google. Tente novamente.");
    }
});

// ==========================================
// Função Auxiliar para Mensagens de Erro (PT-BR)
// ==========================================
function tratarErrosAuth(errorCode) {
    switch (errorCode) {
        case "auth/invalid-credential":
            alert("E-mail ou senha incorretos. Verifique suas credenciais.");
            break;
        case "auth/invalid-email":
            alert("O formato do e-mail digitado é inválido.");
            break;
        case "auth/user-disabled":
            alert("Este usuário foi desativado por um administrador.");
            break;
        case "auth/user-not-found":
            alert("Usuário não encontrado. Crie uma conta para acessar.");
            break;
        case "auth/wrong-password":
            alert("Senha incorreta. Tente novamente.");
            break;
        default:
            alert("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
    }
}