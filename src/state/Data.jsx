import assets from './Assets';
import data from './../data.json';

const currentUser = data.currentUser;
const comments = data.comments;

currentUser.image.png = assets.julio_png;
currentUser.image.webp = assets.julio_webp;

comments[0].user.image.png = assets.amy_png;
comments[0].user.image.webp = assets.amy_webp;

comments[1].user.image.png = assets.max_png;
comments[1].user.image.webp = assets.max_webp;

comments[1].replies[0].user.image.png = assets.ram_png;
comments[1].replies[0].user.image.webp = assets.amy_webp;

export { currentUser, comments };
