export const scrollForId = (id = '') => {
  const elementoDestino = document.getElementById(id);
  if (elementoDestino) {
    elementoDestino.scrollIntoView({ behavior: 'smooth' });
  }
};
