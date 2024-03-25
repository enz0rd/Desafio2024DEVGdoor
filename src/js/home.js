document.addEventListener("keyup", (e) => {
  if (e.key === "p") {
    e.preventDefault();
    window.location.href = "/produtos";
  } else if (e.key === "v") {
    e.preventDefault();
    window.location.href = "/pdv/listar";
  } else if (e.key === "u") {
    e.preventDefault();
    window.location.href = "/usuarios";
  }
});
