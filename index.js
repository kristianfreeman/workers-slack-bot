import lookup from "./src/handlers/lookup"
import webhook from "./src/handlers/webhook"
import Router from "./router"

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const r = new Router()
  r.post("/lookup", lookup)
  r.post("/webhook", webhook)

  let response = await r.route(request)

  if (!response) {
    response = new Response("Not found", {status: 404})
  }

  return response
}
