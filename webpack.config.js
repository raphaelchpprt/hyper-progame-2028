// Webpack utilise ce module pour travailler avec les dossiers.
const path = require("path");

const Dotenv = require("dotenv-webpack");

//Importer notre plugin dans notre fichier de configuration Webpack.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Ceci est la configuration principale de ton projet
// Ici, tu peux écrire les différentes options que tu souhaites et dire à Webpack que faire.
module.exports = (env) => {
  console.log("NODE_ENV: ", env.NODE_ENV);
  return {
    // Ceci est le chemin de ton point d'entrée. C'est depuis ce fichier que Webpack commencera à travailler.
    entry: "./src/js/index.js",

    // Ceci sera le chemin et le nom du fichier qui résultera de ton bundle
    // Webpack va compresser tout ton Javascript dans un seul fichier
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },

    module: {
      rules: [
        {
          //Le test est une Regex qui récupère uniquement les fichiers que l'on souhaite. Ici, les fichiers Javascript.
          test: /\.js$/,
          //Excludes contiendra lui aussi une Regex. Dans celle-ci, on indique les chemins qui ne doivent pas être pris en compte dans notre règle. Ici, on ne met donc pas nos node modules.
          exclude: /(node_modules)/,
          use: {
            //Dans notre objet use, nous allons indiquer quel loader on souhaite utiliser, dans notre cas Babel. Dans les options, nous indiquons les options par défaut ajoutées à Babel.
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          // On applique notre règle pour tous les fichiers .sass, .scss et .cs
          test: /\.(sa|sc|c)ss$/,

          // Attention, les loaders sont ajoutés en sens inverse, effectivement, c'est le dernier loader qui est exécuté en premier.
          use: [
            {
              // On le met en premier afin qu'il soit executé en dernier, une fois que tous nos changements souhaités soient appliqués à notre CSS.
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: function () {
                  return [require("autoprefixer")];
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts",
              },
            },
          ],
        },
      ],
    },

    //Ici, on indique donc à MiniCssExtractPlugin que tous nos fichiers CSS seront bundlés dans le fichier bundle.css.
    plugins: [
      new MiniCssExtractPlugin({
        filename: "bundle.css",
      }),
      new Dotenv(),
    ],

    watch: true,

    // Par défaut, le mode de Webpack est "production". En fonction de ce qui est écrit ici, tu pourras appliquer différentes méthodes dans ton bundle final.
    // Pour le moment, nous avons besoin de paramètres de développement. Nous n'avons, par exemple, pas besoin de minifier notre code, nous allons donc le mettre en "développement"
    mode: "development",
  };
};
