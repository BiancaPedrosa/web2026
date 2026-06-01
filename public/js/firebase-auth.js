// Importando as funções necessárias dos SDKs do Firebase via CDN (Versão Modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup,
    signOut,
    createUserWithEmailAndPassword
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

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita o recarregamento da página

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            console.log("Login efetuado com sucesso (E-mail):", user);
            alert(`Bem-vindo, ${user.email}!`);
            
            // Redireciona o usuário para o dashboard após login com sucesso
            window.location.href = "dashboard.html";
            
        } catch (error) {
            console.error("Erro ao fazer login com e-mail:", error.code, error.message);
            tratarErrosAuth(error.code);
        }
    });
}

// ==========================================
// 2. Autenticação com o Google
// ==========================================
const btnGoogle = document.getElementById("btn-google");

if (btnGoogle) {
    btnGoogle.addEventListener("click", async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // Opcional: obtém o Token de acesso do Google se precisar consumir APIs externas
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            
            const user = result.user;
            console.log("Login efetuado com sucesso (Google):", user);
            alert(`Bem-vindo, ${user.displayName}!`);
            
            // Redireciona o usuário para o dashboard após login com sucesso
            window.location.href = "dashboard.html";

        } catch (error) {
            console.error("Erro ao fazer login com o Google:", error.code, error.message);
            alert("Falha na autenticação com o Google. Tente novamente.");
        }
    });
}

// ==========================================
// 3. Logout (Sair)
// ==========================================
const btnLogout = document.getElementById("btn-logout");

if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
        try {
            await signOut(auth);
            alert("Você saiu da sua conta com sucesso!");
            // Se desejar, redirecione o usuário de volta para a tela de login aqui:
            // window.location.href = "index.html"; 
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            alert("Ocorreu um erro ao tentar sair.");
        }
    });
}

// ==========================================
// 4. Cadastro de Novo Usuário (Sign Up)
// ==========================================
const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita o recarregamento da página

        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            alert(`Conta criada com sucesso! Bem-vindo, ${user.email}!`);
            window.location.href = "dashboard.html";
        } catch (error) {
            console.error("Erro ao criar conta:", error.code, error.message);
            tratarErrosAuth(error.code);
        }
    });
}

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
        case "auth/email-already-in-use":
            alert("Este e-mail já está em uso por outra conta.");
            break;
        case "auth/weak-password":
            alert("A senha é muito fraca. Use pelo menos 6 caracteres.");
            break;
        default:
            alert("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
    }
}