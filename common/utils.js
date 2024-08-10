const utils = {};

utils.flagedUser = [
  1663855398913, 1663856289505, 1663857420766, 1663857965969, 1663858221250,
  1663859847700, 1663860172117, 1663860275179, 1663860413416, 1663860523187,
  1663860827761, 1663860887755, 1663860887755, 1663860941163, 1663861108313,
  1663861295079, 1663861487181, 1663862290705, 1663864583532, 1663865062757,
  1663866111229, 1663866553884, 1663882102141, 1663884766543, 1663887128481,
  1663890315980, 1663914386004, 1663914606815, 1663916880551, 1663920964274,
  1663920270321, 1663927006938, 1663930813754, 1663935015509, 1663938678628,
  1663944210711, 1663946416612, 1663949940679, 1663950160682, 1663955839692,
  1663959723890, 1663959787784, 1663961253145, 1663961253145, 1663963863766,
  1663968488419, 1663971195546, 1663990872471, 1663998669646, 1664000294175,
  1664003542649, 1664012766983, 1664019777674, 1664023001703, 1664030556516,
  1664032325240, 1664042183409, 1664042454725, 1664048574826, 1664050297044,
  1664081698954, 1664129724088, 1664141324320, 1664142893259, 1664146709261,
  1664161812004, 1664165262010, 1664166734783, 1664172425451, 1664179695008,
  1664187808815, 1664211977462, 1664212352303, 1664214639149, 1664215549945,
  1664216767013, 1664231276788, 1664235320853, 1664262073066, 1664277363924,
  1664360547795, 1664370996109, 1664377293974, 1664385947819, 1664391109089,
  1664421992971, 1664439818917, 1664448020019, 1664454993896, 1664485938220,
  1664494838355, 1664549054048, 1664655546388, 1664675007993, 1664678079969,
  1664686541509, 1664700429227, 1664711941441, 1664849674411, 1664911427549,
  1664977216110, 1664989040423, 1664999518365, 1665057821209, 1665157929194,
  1665165648489, 1665205949030, 1665256712904, 1665325691745, 1665325691745,
  1665355670256, 1665884896717, 1666010556334, 1666201514415, 1666219729767,
  1666301102942, 1666546586001, 1666997859230, 1666998028989, 1667014801913,
  1667045067226, 1667245754100, 1668202187292, 1669117001630, 1669140782124,
  1669513364578, 1669632107039, 1669974945742, 1670180427993, 1670210022068,
  1670545140487, 1670824629511, 1670853804934, 1670948679953, 1671743972795,
  1671787398347, 1671878163748, 1671882775412, 1672762548572, 1673102030908,
  1673108841193, 1673350321605,
];

utils.styles = {
  car: { color: "gray", text: "🚗" },
  fish: { color: "red", text: "🐠" },
  house: { color: "yellow", text: "🏠" },
  tree: { color: "green", text: "🌳" },
  bicycle: { color: "cyan", text: "🚲" },
  guitar: { color: "blue", text: "🎸" },
  pencil: { color: "magenta", text: "✏️" },
  clock: { color: "lightgray", text: "🕒" },
};
utils.styles["?"] = { color: "red", text: "❓" };

utils.formatPercent = (n) => {
  return (n * 100).toFixed(2) + "%";
};

utils.printProgress = (count, max) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  const percent = utils.formatPercent(count / max);
  process.stdout.write(count + "/" + max + " (" + percent + ")");
};

utils.groupBy = (objArray, key) => {
  const groups = {};
  for (let obj of objArray) {
     const val = obj[key];
     if (groups[val] == null) {
        groups[val] = [];
     }
     groups[val].push(obj);
  }
  return groups;
};

utils.distance = (p1, p2) => {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
};

utils.getNearest = (loc, points, k = 1) => {
  const obj = points.map((val, ind) => {
     return { ind, val };
  });
  const sorted = obj.sort((a, b) => {
     return utils.distance(loc, a.val) - utils.distance(loc, b.val);
  });
  const indices = sorted.map((obj) => obj.ind);
  return indices.slice(0, k);
};

utils.invLerp = (a, b, v) => {
  return (v - a) / (b - a);
};

utils.normalizePoints = (points, minMax) => {
  let min, max;
  const dimensions = points[0].length;
  if (minMax) {
     min = minMax.min;
     max = minMax.max;
  } else {
     min = [...points[0]];
     max = [...points[0]];
     for (let i = 1; i < points.length; i++) {
        for (let j = 0; j < dimensions; j++) {
           min[j] = Math.min(min[j], points[i][j]);
           max[j] = Math.max(max[j], points[i][j]);
        }
     }
  }
  for (let i = 0; i < points.length; i++) {
     for (let j = 0; j < dimensions; j++) {
        points[i][j] = utils.invLerp(min[j], max[j], points[i][j]);
     }
  }
  return { min, max };
};

utils.toCSV = (headers, samples) => {
  let str = headers.join(",") + "\n";
  for (const sample of samples) {
     str += sample.join(",") + "\n";
  }
  return str;
};

if (typeof module !== "undefined") {
  module.exports = utils;
}