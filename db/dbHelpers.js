const userIP = '162.245.144.188';
const defaultLatlng = { latitude: '49.27670', longitude: '-123.13000' };

module.exports = () => {

  const fetchLatlngByIP = () => {
    return defaultLatlng;
  };
  const createLocationsArray = (datajson) => {

    const latArr = [];
    const lngArr = [];
    const titleArr = [];
    const descArr = [];
    const imgArr = []; 
    for (let i = 0; i < Object.keys(datajson).length; i += 5) {
      const index = Math.floor(i / 5);
      latArr.push(Number(datajson[`lat${index}`]));
      lngArr.push(Number(datajson[`lng${index}`]));
      titleArr.push(datajson[`loc_title${index}`]);
      descArr.push(datajson[`loc_desc${index}`]);
      imgArr.push(datajson[`img_url${index}`]);
    }
    // console.log(latArr, lngArr);
    return {lat: latArr, lng: lngArr, title: titleArr
      , desc: descArr, img: imgArr};

    // let query = `
    // INSERT INTO 
    // `;
  };

  return { fetchLatlngByIP,
  createLocationsArray };
};