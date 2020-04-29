//uniquement si notre environnement est production. Pas besoin d'avoir tes temps de chargement de minification lors du développement.
if (process.env.NODE_ENV === "production") {
  module.exports = {
    plugins: [
      require("autoprefixer"),
      require("cssnano"),
      // Tous les modules CSS que tu souhaites
    ],
  };
}
