export const slugify = (str) =>
  (str || "")
    .normalize("NFD") // loại bỏ dấu
    .replace(/[\u0300-\u036f]/g, "") // loại bỏ ký tự tổ hợp (accents)
    .replace(/[^a-zA-Z0-9]+/g, "-") // thay mọi ký tự không phải chữ/số bằng "-"
    .replace(/^-+|-+$/g, "") // loại bỏ dấu "-" ở đầu/cuối
    .replace(/-{2,}/g, "-") // thay 2 hoặc nhiều dấu "-" liên tiếp thành 1
    .toLowerCase();

export const deslugify = (slug) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
