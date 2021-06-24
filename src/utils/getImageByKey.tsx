import artistOne from '../assets/images/icons/bowie.png';
import artistTwo from '../assets/images/icons/clash.png';
import artistThree from '../assets/images/icons/lou.png';
import albumOne from '../assets/images/icons/beyonce.png';
import albumTwo from '../assets/images/icons/lizzo.png';
import albumThree from '../assets/images/icons/metallium.png'


const images: Record<string, any> = {
  artistOne,
  artistTwo,
  artistThree,
  albumOne,
  albumTwo,
  albumThree
};

function getImageByKey(key: string) {
  return images[key]
}

export default getImageByKey