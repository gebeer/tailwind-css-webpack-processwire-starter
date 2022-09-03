const plugins = {
    "postcss-import": {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    // autoprefixer: {},
};

if(process.env.NODE_ENV === 'production') {
    plugins['postcss-preset-env'] = {
      features: { 'nesting-rules': false },
    };
}

module.exports = {
  plugins: plugins,
};
