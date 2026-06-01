import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get, set, update, remove, onValue, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdH2PwoUOK1TbInSPn4MeqFRsWFtg2O7k",
  authDomain: "web2026-53761.firebaseapp.com",
  projectId: "web2026-53761",
  storageBucket: "web2026-53761.firebasestorage.app",
  messagingSenderId: "860920246692",
  appId: "1:860920246692:web:680dfa6b26f30c8c095131"
};



// Evita inicializar o app duas vezes caso o firebase-auth.js já tenha inicializado na mesma página
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app);

/* -------- References ---------- */
let varId=document.getElementById("formId");
let varTitulo=document.getElementById("formTitulo");
let varArtista=document.getElementById("formArtista");
// Referência para o novo container que só guarda os cards
const musicaListContainer = document.getElementById("musicaListContainer"); 

/* --------- Buttons  ---------*/
let gravar=document.getElementById("btGravar");
let limpar=document.getElementById("limpar");
let userInfo=document.getElementById("userInfo");
let btnLogout=document.getElementById("btn-logout");
//   let mostrar=document.getElementById("btMostrar"); --- IGNORE ---

// ----------------------------------------------------------------------
// Controle de Acesso (UI)
// ----------------------------------------------------------------------
function toggleForm(isAuthenticated) {
    const elements = [varId, varTitulo, varArtista, gravar, limpar];
    elements.forEach(el => {
        if (el) el.disabled = !isAuthenticated;
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        toggleForm(true);
        if (userInfo) {
            userInfo.innerHTML = `👤 <strong>Usuário logado:</strong> ${user.displayName || user.email}`;
        }
    } else {
        // Usuário não autenticado: redireciona de volta para a página inicial (index.html)
        window.location.href = "index.html"; 
    }
});

// ----------------------------------------------------------------------
// Logout (Sair)
// ----------------------------------------------------------------------
if (btnLogout) {
    btnLogout.addEventListener("click", () => {
        signOut(auth).then(() => {
            // O redirecionamento acontecerá automaticamente pelo onAuthStateChanged acima
        }).catch((error) => console.error("Erro ao tentar sair:", error));
    });
}

// ----------------------------------------------------------------------
// Implementação do Listener em Tempo Real (onValue)
// ----------------------------------------------------------------------
const musicasRef = ref(db, 'Musicas');

onValue(musicasRef, (snapshot) => {
    // 1. Limpa apenas o container da lista (não o header)
    musicaListContainer.innerHTML = ''; 

    if (snapshot.exists()) {
        
        // 2. Itera sobre o snapshot de dados
        snapshot.forEach((data) => {
            const musicItem = {
                id: data.key, 
                title: data.val().titulo,
                artist: data.val().artista,
            };

            // 3. Cria e anexa uma linha (tr) na tabela
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${musicItem.id}</strong></td>
                <td>${musicItem.title}</td>
                <td>${musicItem.artist}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1 btn-editar" title="Editar esta música">✏️ Editar</button>
                    <button class="btn btn-sm btn-danger btn-excluir" title="Excluir esta música">🗑️ Excluir</button>
                </td>
            `;
            
            // Evento para o botão "Editar"
            const btnEditar = tr.querySelector('.btn-editar');
            btnEditar.addEventListener('click', () => {
                varId.value = musicItem.id;
                varTitulo.value = musicItem.title;
                varArtista.value = musicItem.artist;
                // Muda o texto do botão para indicar uma atualização
                gravar.textContent = "Atualizar";
            });

            // Evento para o botão "Excluir" (com tela de confirmação antes de deletar)
            const btnExcluir = tr.querySelector('.btn-excluir');
            btnExcluir.addEventListener('click', () => {
                if (!auth.currentUser) {
                    alert("Ação negada. Apenas usuários autenticados podem excluir músicas.");
                    return;
                }
                if (confirm(`Deseja realmente excluir a música "${musicItem.title}"?`)) {
                    remove(ref(db, "Musicas/" + musicItem.id))
                        .then(() => alert("Música excluída com sucesso!"))
                        .catch((error) => console.error("Erro ao excluir:", error));
                }
            });
            
            musicaListContainer.appendChild(tr);
        });
    } else {
        musicaListContainer.innerHTML = '<tr><td colspan="4" class="text-center py-3 text-muted">Nenhuma música cadastrada no momento.</td></tr>';
    }
}, (error) => {
    console.error("Erro ao configurar o listener do Realtime Database:", error);
});

/*----- functions  -----*/
//clean form
limpar.addEventListener('click',function(){
     varId.value="";
     varTitulo.value="";
     varArtista.value="";
     // Volta o texto do botão para o padrão
     gravar.textContent = "Gravar Música";
});


//save music data to the database
gravar.addEventListener('click',function(){  
     if (!auth.currentUser) {
          alert("Ação negada. Apenas usuários autenticados podem adicionar músicas.");
          return;
     }
     if (varId.value.trim() === "" || varTitulo.value.trim() === "" || varArtista.value.trim() === "") {
          alert("Por favor, preencha todos os campos (ID, Título e Artista) para gravar a música.");
          return;
     }
     set(ref(db, "Musicas/"+varId.value),{
          titulo:varTitulo.value,
          artista: varArtista.value     

     }).then(()=>{
          console.log("incluído com sucesso");
          // O onValue faz o refresh automático
          // Simula o clique no botão limpar para resetar os campos e o texto do botão
          limpar.click();
     })
     .catch((error)=>{
          console.error("Erro ao incluir dado no Realtime Database:", error);
     })
});