async function obtenerDatos() {
    const res = await fetch("https://in-bitro-backend.onrender.com/userdata");
    return await res.json();
}

async function enviarSemilla(semilla) {
    await fetch("https://in-bitro-backend.onrender.com/sendSeed", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(semilla)
    });
}

document.getElementById("formulario").addEventListener("submit", async (e) => {
    e.preventDefault();

    document.getElementById("estado").innerText = "CREANDO SEMILLA...";

    const nombre = document.getElementById("nombre").value;
    const datos = await obtenerDatos();

    const semilla = {
        nombre,
        ...datos
    };

    await enviarSemilla(semilla);

    document.getElementById("estado").innerText = "SEMILLA ENVIADA ✔️";
});
