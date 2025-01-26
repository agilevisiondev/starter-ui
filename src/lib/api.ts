export const API_URL = "https://acme-server.vercel.app"

export const logout = async () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  window.location.href = "/auth/login"
}
