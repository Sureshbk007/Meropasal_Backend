function generateSlug(name) {
  const slugBase = name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `${slugBase}-${randomNumber}`;
}

export default generateSlug;
