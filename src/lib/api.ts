export const API_URL = "http://localhost:3000"

export const logout = async () => {
  localStorage.removeItem("token")
  localStorage.clear()
}
