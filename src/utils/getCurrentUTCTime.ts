// The simple function i've created to calculate time depending on the UTC
export const getCurrentUTCTime = (utc: string) => {
  function formatAMPM(time: string) {
    let hours = Number(time.split(':')[0]);
    let minutes = Number(time.split(':')[1]);
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  let formatedUTC = utc.replace(/UTC/, '');

  let UTChours = formatedUTC.split(':')[0];

  const today = new Date(Date.now());

  const UTCtime = `${
    today.getUTCHours() + Number(UTChours)
  }:${today.getUTCMinutes()}`;

  return formatAMPM(UTCtime);
};
