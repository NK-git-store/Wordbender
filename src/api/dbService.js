import axios from "axios"
import { useSettingsStore } from "@/stores/settings.js"
import { pinia } from "@/pinia.js"

const api = axios.create({
  baseURL: "https://db.niderman.pro/api/v2/tables/mwf7sde3lmr3skz",
  headers: { "Content-Type": "application/json" },
})

const settings = useSettingsStore(pinia)

api.interceptors.request.use((config) => {
  const token = settings.dbApiKey
  config.headers = config.headers ?? {}
  config.headers["xc-token"] = token ?? ""
  return config
})

export default {
  getAll() {
    return api.get("/records?sort=-Id")
  },
  async create(data) {
    delete data['Id']
    delete data['image']
    delete data['CreatedAt']
    delete data['UpdatedAt']
    console.log('Creating record with data:', data)
    return await api.post("/records", data)
  },
  delete(id) {
    return api.delete("/records", {
      data: { Id: Number(id) },
    })
  }
}
