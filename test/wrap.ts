
const text = `18, Nouve1le Kemuning \nIndustrial Park, Jalan Sun 18, Nouve1le Kemuning Industrial Park, Jalan Sun 18, Nouve1le Kemuning Industrial Park, Jalan Sun`;


//console.log(wrap(text, { indent: ' ', width: 40 }));

const wrap = (text, length) => `${text}`.length > length ? `${text}`.substring(0, length) + '...' : `${text}`
console.log(wrap(text, 10))