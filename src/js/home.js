document.addEventListener("keyup", (e) => {
  if (e.key === "p") {
    e.preventDefault();
    window.location.href = "/produtos";
  } else if (e.key === "v") {
    e.preventDefault();
    window.location.href = "/vendas";
  } else if (e.key === "u") {
    e.preventDefault();
    window.location.href = "/usuarios";
  } else if (e.key === "n") {
    e.preventDefault();
    window.location.href = "/pdv";
  }
});
