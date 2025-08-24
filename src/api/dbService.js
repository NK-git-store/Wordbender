import axios from "axios"

const api = axios.create({
  baseURL: "https://db.niderman.pro/api/v2/tables/mwf7sde3lmr3skz",
  headers: {
    "Content-Type": "application/json",
  },
})

const getConfig = (dbApiKey) => ({
  headers: {
    "xc-token": dbApiKey,
  },
})

export default {
  getAll(dbApiKey) {
    return api.get("/records?sort=-Id", getConfig(dbApiKey))
  },
  create(dbApiKey, data) {
    return api.post("/records", data, getConfig(dbApiKey))
  },
}
