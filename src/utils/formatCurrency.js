const formatCurrency = (val) => {
  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "AOA",
  }).format(val);

  // Remove o símbolo da moeda do resultado
  return formatter.replace(/[^\d.-]+$/, "");
};

export { formatCurrency };
