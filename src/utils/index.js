const MIN_RADIUS = 7.5;
const MAX_RADIUS = 15;
const DEPTH = 2;
const LEFT_COLOR = "6300ed";
const RIGHT_COLOR = "d500ed";
const NUM_POINTS = 2000;

const getGradientStop = (ratio) => {
  ratio = ratio > 1 ? 1 : ratio < 0 ? 0 : ratio;

  const c0 = LEFT_COLOR.match(/.{1,2}/g).map(
    (oct) => parseInt(oct, 16) * (1 - ratio)
  );

  const c1 = RIGHT_COLOR.match(/.{1,2}/g).map(
    (oct) => parseInt(oct, 16) * ratio
  );

  const ci = [0, 1, 2].map((i) => Math.min(Math.round(c0[i] + c1[i]), 255));
  const color = ci
    .reduce((a, v) => (a << 8) + v, 0)
    .toString(16)
    .padStart(6, "0");

  return `#${color}`;
};

const calculateColor = (x) => {
  const maxDiff = MAX_RADIUS * 2;
  const distance = x + MAX_RADIUS;
  const ratio = distance / maxDiff;
  const stop = getGradientStop(ratio);

  return stop;
};

const randomFromInterval = (min, max) => {
  return Math.random() * (max - min) + min;
};

const generatePoints = (length, isInner) => {
  return Array.from({ length }, (v, k) => k + 1).map((num) => {
    const radiusMultiplier = isInner ? 1 : 0.5;
    const randomRadius = randomFromInterval(
      MIN_RADIUS * radiusMultiplier,
      MAX_RADIUS * (isInner ? 1 : 2)
    );
    const randomAngle = Math.random() * Math.PI * 2;

    const x = Math.cos(randomAngle) * randomRadius;
    const y = Math.sin(randomAngle) * randomRadius;
    const z = randomFromInterval(
      -DEPTH * (isInner ? 1 : 10),
      DEPTH * (isInner ? 1 : 10)
    );

    const color = calculateColor(x);

    return {
      idx: num,
      position: [x, y, z],
      color,
    };
  });
};

export const pointsInner = generatePoints(NUM_POINTS, true);
export const pointsOuter = generatePoints(NUM_POINTS / 4, false);

export const transformAnimationName = (animationName) => {
  const result = animationName.replace(/_(skeletal\.3)\b/, "").trim();

  const words = result
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  const transformedAnimationName = words.join(" ");

  return transformedAnimationName;
};
