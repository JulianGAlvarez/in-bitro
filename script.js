const BACKEND = "https://in-bitro-backend.onrender.com";

async function getUserInfo() {
  try {
    const res = await fetch(BACKEND + "/userdata");
    return await res.json();
  } catch (e) {
    return { ip: null, isp: null, country: null, city: null };
  }
}

async function testLatency() {
  try {
    const t0 = performance.now();
    await fetch(BACKEND + "/userdata?ts=" + Date.now());
    const t1 = performance.now();
    return Math.round(t1 - t0);
  } catch (e) {
    return null;
  }
}

async function sendSeed(seed) {
  await fetch(BACKEND + "/sendSeed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(seed)
  });
}

document.getElementById("createBtn").addEventListener("click", async () => {
  const name = document.getElementById("nameField").value.trim();
  if (!name) { alert("Ingresá un nombre"); return; }

  document.getElementById("status").innerText = "CREANDO SEMILLA…";

  const info = await getUserInfo();
  const latency = await testLatency();

  const seed = {
    name: name,
    ip: info.ip,
    isp: info.isp,
    country: info.country,
    city: info.city,
    latency: latency,
    timestamp: Date.now()
  };

  await sendSeed(seed);

  document.getElementById("status").innerText =
    "¡Tu semilla fue enviada! Mirá la pantalla para ver crecer tu planta 🌱";
});

