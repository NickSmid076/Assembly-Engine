// svgo for the blog art: keep viewBox (responsive) and ids (per-file marker ids, inlined diagrams) and classes (fonts).
export default {
  multipass: true,
  plugins: [{ name: "preset-default", params: { overrides: { removeViewBox: false, cleanupIds: false } } }],
};
