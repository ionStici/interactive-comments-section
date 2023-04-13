import amy_png from "./../assets/avatars/image-amyrobson.png";
import amy_webp from "./../assets/avatars/image-amyrobson.webp";

import julio_png from "./../assets/avatars/image-juliusomo.png";
import julio_webp from "./../assets/avatars/image-juliusomo.webp";

import max_png from "./../assets/avatars/image-maxblagun.png";
import max_webp from "./../assets/avatars/image-maxblagun.webp";

import ram_png from "./../assets/avatars/image-ramsesmiron.png";
import ram_webp from "./../assets/avatars/image-ramsesmiron.webp";

import del from "./../assets/icon-delete.svg";
import edit from "./../assets/icon-edit.svg";
import minus from "./../assets/icon-minus.svg";
import plus from "./../assets/icon-plus.svg";
import reply from "./../assets/icon-reply.svg";

const assets = {
  amy_png,
  amy_webp,
  julio_png,
  julio_webp,
  max_png,
  max_webp,
  ram_png,
  ram_webp,
  del,
  edit,
  minus,
  plus,
  reply,
};

const imgs = Object.values(assets);
imgs.forEach((img) => (new Image().src = img));

export default assets;
