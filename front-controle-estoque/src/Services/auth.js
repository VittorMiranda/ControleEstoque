export const login = async (email, senha) => {
  const res = await fetch("http://localhost:3000/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || "Erro ao fazer login");
  }

  return data; // ⚠️ não salva nada no localStorage aqui
};

export const getToken = () => localStorage.getItem("token");
