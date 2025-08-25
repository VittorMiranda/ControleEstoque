export const login = async (email, senha) => {
    const res = await fetch("http://localhost:3000/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.erro || "Erro ao fazer login");
    }
  
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify({ nome: data.nome })); // ⚠ importante
    }
  
    return data;
  };
  
  export const getToken = () => localStorage.getItem("token");
  
  export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario"); // ⚠ remove também o nome
  };
  