/* ------------------------------------------------------------------
   TSE illustration system — "ink & riso"
   One bust template (viewBox 200×240), one cast, one set of moods.
   Expressions are data-attributes + CSS custom properties, so any
   character can change mood live without re-rendering.
------------------------------------------------------------------- */

const INK = '#1A1418';
const GOLD = '#E3A21A';
const WHITE = '#FFFBF3';

// [base, shade] — a considered range of Indian skin tones
const SKIN = {
  s1: ['#F0C9A4', '#DCA980'],
  s2: ['#E2AF86', '#C99167'],
  s3: ['#CB9067', '#B0744C'],
  s4: ['#AC744E', '#8F5B3A'],
  s5: ['#8A583B', '#71452C'],
  s6: ['#6A4231', '#543325'],
};

// Clothing palette is the brand palette — keeps every scene in one universe
const C = {
  peacock: '#0E6E66',
  marigold: '#FFB21C',
  jamun: '#4B32C3',
  chilli: '#E65A36',
  inkSoft: '#2B2733',
  paper: '#EFE4D2',
  rust: '#B5532F',
  sky: '#7FB7D9',
};

export const CAST = {
  // protagonists
  tara:   { skin: 's3', hair: 'wavy', top: 'kurta', topColor: C.peacock, trim: C.marigold, lips: '#9B2F3B', bindi: true, earrings: 'jhumka', liner: true },
  kabir:  { skin: 's4', hair: 'curly', top: 'shirt', topColor: C.jamun, beard: 'stubble', brow: 5.4 },
  // the lab specimen — deliberately anyone
  you:    { skin: 's2', hair: 'tousled', top: 'tee', topColor: C.marigold },
  // the human in "human judgement"
  matchmaker: { skin: 's3', hair: 'bob', hairColor: '#2B2224', streak: '#B9B1B4', top: 'cardigan', topColor: C.peacock, inner: C.paper, glasses: true, earrings: 'stud', lips: '#8A3A3E', liner: true },
  // Kabir's family group
  papa:   { skin: 's3', hair: 'balding', hairColor: '#8C8688', top: 'kurta', topColor: C.paper, trim: '#C9B99A', mustache: true, glasses: true, brow: 5.4, browColor: '#6E6668' },
  mom:    { skin: 's3', hair: 'bun', hairColor: '#2A1E1E', streak: '#9C9496', top: 'saree', topColor: C.jamun, trim: GOLD, bindi: true, earrings: 'jhumka', lips: '#8E2E36' },
  bua:    { skin: 's2', hair: 'bob', hairColor: '#3A2B2B', top: 'saree', topColor: C.peacock, trim: C.marigold, earrings: 'hoop', bindi: true, glasses: true, lips: '#9B3A3A' },
  chachu: { skin: 's4', hair: 'short', top: 'shirt', topColor: '#D9B65A', mustache: true, brow: 5.4 },
  // the crowd
  aisha:  { skin: 's2', hair: 'hijab', hijab: C.jamun, top: 'tee', topColor: C.paper, liner: true, lips: '#A23B45' },
  rohan:  { skin: 's1', hair: 'short', glasses: true, top: 'tee', topColor: C.chilli, brow: 5 },
  meenakshi: { skin: 's5', hair: 'braid', flower: true, top: 'saree', topColor: C.marigold, trim: C.chilli, bindi: true, earrings: 'jhumka', nosepin: true, liner: true, lips: '#7E2630' },
  harpreet: { skin: 's3', hair: 'turban', turban: C.marigold, beard: 'full', top: 'shirt', topColor: '#22406A', brow: 5.4 },
  zoya:   { skin: 's1', hair: 'bob', top: 'jacket', topColor: C.inkSoft, inner: C.chilli, earrings: 'hoop', lips: '#B0424A', liner: true },
  dev:    { skin: 's5', hair: 'short', mustache: true, top: 'tee', topColor: C.peacock, brow: 5.4 },
  nikhil: { skin: 's6', hair: 'curly', beard: 'full', top: 'jacket', topColor: C.rust, inner: C.paper, brow: 5.4 },
  ira:    { skin: 's4', hair: 'bun', glasses: true, top: 'tee', topColor: C.sky, earrings: 'stud' },
  sana:   { skin: 's2', hair: 'long', top: 'shirt', topColor: C.paper, earrings: 'hoop', lips: '#A2414A', liner: true },
  arun:   { skin: 's6', hair: 'short', beard: 'stubble', top: 'kurta', topColor: C.marigold, trim: C.rust, brow: 5.4 },
  priya:  { skin: 's3', hair: 'long', top: 'jacket', topColor: C.jamun, inner: C.marigold, earrings: 'jhumka', bindi: true, lips: '#8E2E36', liner: true },
  kunal:  { skin: 's2', hair: 'curly', glasses: true, top: 'tee', topColor: C.inkSoft, brow: 5 },
};

export const MOODS = {
  neutral:     { brows: 'neutral',   eyes: 'open',   mouth: 'soft' },
  happy:       { brows: 'soft',      eyes: 'open',   mouth: 'smile', blush: 0.35 },
  joy:         { brows: 'raised',    eyes: 'smile',  mouth: 'open',  blush: 0.5 },
  hopeful:     { brows: 'raised',    eyes: 'open',   mouth: 'smile', look: [0.25, -0.5] },
  curious:     { brows: 'quizzical', eyes: 'open',   mouth: 'flat',  tilt: 4 },
  nervous:     { brows: 'worried',   eyes: 'open',   mouth: 'wavy',  sweat: 1, blush: 0.25 },
  deflated:    { brows: 'worried',   eyes: 'lid',    mouth: 'sad',   look: [0, 0.8], tilt: -3 },
  overwhelmed: { brows: 'worried',   eyes: 'wide',   mouth: 'o',     sweat: 1 },
  tired:       { brows: 'low',       eyes: 'lid',    mouth: 'flat' },
  eyeroll:     { brows: 'raised',    eyes: 'open',   mouth: 'side',  look: [0.6, -1] },
  thoughtful:  { brows: 'quizzical', eyes: 'open',   mouth: 'side',  look: [0.7, -0.7], tilt: 3 },
  determined:  { brows: 'angry',     eyes: 'open',   mouth: 'flat' },
  shy:         { brows: 'soft',      eyes: 'open',   mouth: 'small', look: [0.4, 0.8], blush: 0.7, tilt: -5 },
  smitten:     { brows: 'soft',      eyes: 'open',   mouth: 'small', blush: 0.6 },
  calm:        { brows: 'soft',      eyes: 'closed', mouth: 'smile' },
  talking:     { brows: 'raised',    eyes: 'open',   mouth: 'osmall' },
};

/* ---------- shared geometry ---------- */
const FACE = 'M60 96C60 62 78 44 100 44C122 44 140 62 140 96C140 122 128 142 112 149C105 152 95 152 88 149C72 142 60 122 60 96Z';
const FACE_SHADE = 'M124 60C138 74 142 100 136 122C131 138 120 148 108 151C121 137 129 116 129 94C129 80 127 69 124 60Z';
const NECK = 'M87 134L87 180L113 180L113 134Z';
const NECK_SHADE = 'M87 138C94 152 106 152 113 138L113 158C106 165 94 165 87 158Z';
const TORSO = 'M18 242C20 206 48 186 87 175Q100 183 113 175C152 186 180 206 182 242Z';
const TORSO_SHADE = 'M138 186C162 196 180 214 182 242L150 242C150 218 145 200 138 186Z';
const EYE = { l: 'M71 101Q82 92 93 101Q82 108 71 101Z', r: 'M107 101Q118 92 129 101Q118 108 107 101Z' };
const LASH = { l: 'M70 100.5Q82 90.5 94 100', r: 'M106 100Q118 90.5 130 100.5' };
const WING = { l: 'M71 100L65 96.4', r: 'M129 100L135 96.4' };
const SMILE_EYE = { l: 'M72 103Q82 94 92 103', r: 'M108 103Q118 94 128 103' };
const CLOSED_EYE = { l: 'M72 101Q82 106.5 92 101', r: 'M108 101Q118 106.5 128 101' };
const LID = { l: 'M67 86L97 86L97 100Q82 95 67 100Z', r: 'M103 86L133 86L133 100Q118 95 103 100Z' };
const LID_LINE = { l: 'M68 100Q82 95 96 100', r: 'M104 100Q118 95 132 100' };
const BROW = { l: 'M70 87Q80 81 93 85', r: 'M107 85Q120 81 130 87' };
const NOSE = 'M101 102Q97 112 98.5 117Q102 120 107 117';

const st = (w = 2.5, c = INK) => `stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;

/* ---------- hair: back (behind body), mid (behind face), front ---------- */
const HAIR = {
  wavy: (h) => ({
    back: `<path d="M60 76C54 44 76 26 100 26C126 26 148 44 142 78C150 100 140 120 150 140C160 160 146 176 156 196C162 208 150 218 138 214L62 214C50 218 38 208 44 196C54 176 40 160 50 140C60 120 50 100 60 76Z" fill="${h}" ${st()}/>`,
    mid: `<path d="M61 100C53 124 63 140 55 160C49 176 61 188 57 206C67 202 75 188 72 170C70 152 76 134 67 114Z" fill="${h}" ${st()}/>`,
    front: `<path d="M100 35C77 35 57 52 58 98C64 74 80 58 100 50C120 58 136 74 142 98C143 52 123 35 100 35Z" fill="${h}" ${st()}/>
            <path d="M100 39Q86 44 74 60M100 39Q114 44 126 60" fill="none" ${st(1.4, '#4A3634')}/>`,
  }),
  long: (h) => ({
    back: `<path d="M58 80C54 44 78 28 100 28C122 28 146 44 142 80L150 204C130 214 70 214 50 204Z" fill="${h}" ${st()}/>`,
    mid: `<path d="M61 100L57 200L71 200L67 112Z" fill="${h}" ${st()}/><path d="M139 100L143 200L129 200L133 112Z" fill="${h}" ${st()}/>`,
    front: `<path d="M100 35C77 35 57 52 58 98C64 74 80 58 100 50C120 58 136 74 142 98C143 52 123 35 100 35Z" fill="${h}" ${st()}/>`,
  }),
  curly: (h) => {
    const back = [[64, 68, 20], [76, 46, 20], [100, 34, 22], [124, 46, 20], [136, 68, 20], [145, 90, 14], [55, 90, 14]];
    const front = [[68, 66, 12], [82, 55, 13], [98, 51, 13], [114, 53, 13], [128, 61, 12], [137, 74, 9]];
    const circles = (arr) => arr.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${h}" ${st(2.2)}/>`).join('');
    return { back: circles(back), mid: '', front: circles(front) };
  },
  tousled: (h) => ({
    back: `<path d="M60 92C56 56 76 34 100 34C124 34 144 56 140 92Z" fill="${h}" ${st()}/>`,
    mid: '',
    front: `<path d="M58 94C52 56 74 31 102 31C131 31 149 56 142 94L136 76L127 84L119 67L109 78L99 63L89 77L79 66L71 81L63 75Z" fill="${h}" ${st()}/>`,
  }),
  short: (h) => ({
    back: `<path d="M60 96C56 58 78 36 102 36C126 36 146 56 140 96Z" fill="${h}" ${st()}/>`,
    mid: '',
    front: `<path d="M58 95C53 56 76 31 104 31C131 31 149 52 142 93C140 80 135 70 127 64C111 70 88 68 73 58C65 67 60 81 58 95Z" fill="${h}" ${st()}/>
            <path d="M84 37Q78 48 73 58" fill="none" ${st(1.4, '#4A3634')}/>`,
  }),
  bob: (h, p) => ({
    back: `<path d="M54 96C50 54 74 32 100 32C126 32 150 54 146 96C146 118 148 134 154 146C134 153 66 153 46 146C52 134 54 118 54 96Z" fill="${h}" ${st()}/>`,
    mid: '',
    front: `<path d="M58 93C54 56 76 37 100 37C124 37 146 56 142 93C138 81 134 73 128 66C112 72 88 72 72 66C65 74 61 82 58 93Z" fill="${h}" ${st()}/>
            ${p.streak ? `<path d="M117 40C125 49 129 57 127 66" fill="none" ${st(4, p.streak)}/>` : ''}`,
  }),
  bun: (h, p) => ({
    back: `<circle cx="100" cy="30" r="17" fill="${h}" ${st()}/><path d="M60 92C56 56 78 38 100 38C122 38 144 56 140 92Z" fill="${h}" ${st()}/>`,
    mid: '',
    front: `<path d="M58 94C56 58 78 39 100 39C122 39 144 58 142 94C138 72 122 53 100 53C78 53 62 72 58 94Z" fill="${h}" ${st()}/>
            <path d="M100 41L100 53" ${st(1.4, '#4A3634')}/>
            ${p.streak ? `<path d="M64 74C70 58 82 47 96 44" fill="none" ${st(3.4, p.streak)}/>` : ''}`,
  }),
  braid: (h) => {
    let plait = '';
    for (let i = 0; i < 6; i++) plait += `<ellipse cx="${66 - i * 1.4}" cy="${132 + i * 15}" rx="${10 - i * 0.6}" ry="9.5" fill="${h}" ${st(2)}/>`;
    return {
      back: `<path d="M60 92C56 56 78 38 100 38C122 38 144 56 140 92Z" fill="${h}" ${st()}/>`,
      mid: `${plait}<rect x="52" y="214" width="12" height="6" rx="2" fill="${C.marigold}" ${st(1.6)}/>`,
      front: `<path d="M58 94C56 58 78 39 100 39C122 39 144 58 142 94C138 72 122 53 100 53C78 53 62 72 58 94Z" fill="${h}" ${st()}/><path d="M100 41L100 53" ${st(1.4, '#4A3634')}/>`,
    };
  },
  balding: (h) => ({
    back: '',
    mid: '',
    front: `<path d="M58 106C54 86 58 72 67 64C66 80 64 94 64 106Z" fill="${h}" ${st(2)}/><path d="M142 106C146 86 142 72 133 64C134 80 136 94 136 106Z" fill="${h}" ${st(2)}/><path d="M86 48Q100 43 114 48" fill="none" ${st(1.8, h)}/>`,
  }),
  hijab: (h, p) => ({
    back: '',
    mid: `<path d="M46 112C42 62 70 30 100 30C130 30 158 62 154 112C152 140 160 162 174 190C150 202 120 204 100 204C80 204 50 202 26 190C40 162 48 140 46 112Z" fill="${p.hijab}" ${st()}/>
          <path d="M60 170Q100 196 140 170" fill="none" ${st(1.6, 'rgba(0,0,0,.35)')}/>`,
    front: `<path d="M59 92C57 60 78 45 100 45C122 45 143 60 141 92C135 70 120 58 100 58C80 58 65 70 59 92Z" fill="${p.hijab}" ${st()}/>
            <path d="M60 86C58 112 65 134 82 150L72 154C56 138 52 112 54 86Z" fill="${p.hijab}" ${st(2)}/>
            <path d="M140 86C142 112 135 134 118 150L128 154C144 138 148 112 146 86Z" fill="${p.hijab}" ${st(2)}/>`,
    noEars: true,
  }),
  turban: (h, p) => ({
    back: '',
    mid: '',
    front: `<path d="M56 92C50 52 72 22 100 20C128 20 152 48 144 92C138 78 122 70 100 70C78 70 62 78 56 92Z" fill="${p.turban}" ${st()}/>
            <path d="M59 80Q100 52 141 74M63 62Q100 37 137 54M100 21Q85 44 70 72" fill="none" ${st(1.6, 'rgba(26,20,24,.55)')}/>`,
  }),
};

/* ---------- clothing ---------- */
function clothes(p) {
  const fill = p.topColor;
  const base = `<path d="${TORSO}" fill="${fill}" ${st()}/><path d="${TORSO_SHADE}" fill="url(#ht)"/>`;
  switch (p.top) {
    case 'kurta':
      return base + `<path d="M86 173Q100 181 114 173L114 182Q100 190 86 182Z" fill="${p.trim}" ${st(2)}/>
        <path d="M100 188L100 228" ${st(2)}/><circle cx="100" cy="198" r="1.8" fill="${p.trim}"/><circle cx="100" cy="210" r="1.8" fill="${p.trim}"/><circle cx="100" cy="222" r="1.8" fill="${p.trim}"/>`;
    case 'shirt':
      return base + `<path d="M86 172L93 199L100 186Z" fill="${WHITE}" ${st(2)}/><path d="M114 172L107 199L100 186Z" fill="${WHITE}" ${st(2)}/>
        <path d="M100 188L100 242" ${st(2)}/><circle cx="104" cy="208" r="1.6" fill="${INK}"/><circle cx="104" cy="226" r="1.6" fill="${INK}"/>`;
    case 'saree':
      return base.replace(`fill="${fill}"`, `fill="${p.trim}"`) + `<path d="M118 174C146 182 166 202 174 242L76 242C94 214 106 192 118 174Z" fill="${fill}" ${st()}/>
        <path d="M112 186C100 206 90 224 82 242" fill="none" ${st(4, p.trim)}/><path d="M124 178C150 188 164 206 170 238" fill="none" stroke="${p.trim}" stroke-width="2" stroke-dasharray="2 5" stroke-linecap="round"/>`;
    case 'jacket':
    case 'cardigan':
      return base + `<path d="M87 175L100 214L113 175Q100 183 87 175Z" fill="${p.inner || C.paper}" ${st(2)}/>
        <path d="M87 175L100 214L113 175" fill="none" ${st(2.5)}/>${p.top === 'cardigan' ? `<circle cx="96" cy="226" r="2" fill="${INK}"/>` : `<path d="M70 196L80 214" ${st(2)}/>`}`;
    default: // tee
      return base + `<path d="M86 175Q100 193 114 175" fill="none" ${st(2.5)}/>`;
  }
}

/* ---------- accessories ---------- */
function earrings(kind) {
  if (!kind) return '';
  return [61, 139].map((x) => {
    if (kind === 'stud') return `<circle cx="${x}" cy="114" r="2.6" fill="${GOLD}" ${st(1)}/>`;
    if (kind === 'hoop') return `<circle cx="${x}" cy="121" r="6.5" fill="none" stroke="${GOLD}" stroke-width="2.4"/>`;
    return `<circle cx="${x}" cy="114" r="2.4" fill="${GOLD}" ${st(1)}/><path d="M${x} 116L${x} 120" ${st(1.4, GOLD)}/>
      <path d="M${x - 6} 128Q${x} 115 ${x + 6} 128Z" fill="${GOLD}" ${st(1.2)}/>
      <circle cx="${x - 4}" cy="130.5" r="1.4" fill="${GOLD}"/><circle cx="${x}" cy="131.5" r="1.4" fill="${GOLD}"/><circle cx="${x + 4}" cy="130.5" r="1.4" fill="${GOLD}"/>`;
  }).join('');
}

const glasses = () => `<g fill="rgba(255,251,243,.14)" ${st(2.6)}>
  <rect x="67" y="91" width="29" height="20" rx="8"/><rect x="104" y="91" width="29" height="20" rx="8"/>
  <path d="M96 99Q100 95.5 104 99M67 98L60 95M133 98L140 95" fill="none"/></g>`;

const flower = (x, y) => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map((a) => `<circle cx="${(Math.cos((a * Math.PI) / 180) * 4.4).toFixed(2)}" cy="${(Math.sin((a * Math.PI) / 180) * 4.4).toFixed(2)}" r="3.4" fill="${WHITE}" ${st(1)}/>`).join('')}<circle r="1.8" fill="${C.marigold}"/></g>`;

function beard(kind, h) {
  if (kind === 'stubble') return `<path d="M62 108C62 136 80 154 100 154C120 154 138 136 138 108C134 126 124 140 112 142Q100 136 88 142C76 140 66 126 62 108Z" fill="${h}" opacity=".32"/>`;
  if (kind === 'full') return `<path d="M60 102C57 146 80 168 100 168C120 168 143 146 140 102C136 128 124 141 114 141Q100 134 86 141C76 141 64 128 60 102Z" fill="${h}" ${st(2.2)}/>`;
  return '';
}
const mustache = (h) => `<path d="M86 123C92 117 98 119 100 121C102 119 108 117 114 123C108 122 104 124.5 100 124.5C96 124.5 92 122 86 123Z" fill="${h}" ${st(1.2)}/>`;

/* ---------- mouths (cross-faded by data-mouth) ---------- */
function mouths(lip) {
  const lf = lip || 'rgba(120,50,45,.28)';
  return `
  <path class="m m-soft" d="M89 129Q95 126.5 100 128Q105 126.5 111 129Q100 136.5 89 129Z" fill="${lf}" ${st(1.6)}/>
  <path class="m m-smile" d="M86 126.5Q100 139 114 126.5Q100 133.5 86 126.5Z" fill="${lip || '#7A2A2A'}" ${st(1.8)}/>
  <g class="m m-open"><path d="M86 125Q100 128.5 114 125Q112 143 100 144Q88 143 86 125Z" fill="#4A1A1A" ${st(2)}/>
    <path d="M88.5 126.5Q100 129.5 111.5 126.5L110.5 131Q100 133 89.5 131Z" fill="${WHITE}"/><path d="M93 140Q100 135 107 140Q100 143.5 93 140Z" fill="#D45A4F"/></g>
  <path class="m m-wavy" d="M87 130Q91 126.5 95 130Q99 133.5 103 130Q107 126.5 111 130Q113 132 114.5 130.5" fill="none" ${st(2.2)}/>
  <path class="m m-sad" d="M89 134Q100 125 111 134" fill="none" ${st(2.4)}/>
  <ellipse class="m m-o" cx="100" cy="131" rx="5" ry="6" fill="#4A1A1A" ${st(1.8)}/>
  <ellipse class="m m-osmall" cx="100" cy="130.5" rx="3.4" ry="3.8" fill="#4A1A1A" ${st(1.6)}/>
  <path class="m m-flat" d="M90 130.5Q100 132 110 130.5" fill="none" ${st(2.4)}/>
  <path class="m m-small" d="M92 129Q100 134.5 108 129" fill="none" ${st(2.4)}/>
  <path class="m m-side" d="M90 131.5Q102 133.5 111 126.5" fill="none" ${st(2.4)}/>`;
}

function eye(side, uid, p, skin) {
  const s = side;
  return `
  <g class="eye eye-${s}">
    <g class="eye-open">
      <path d="${EYE[s]}" fill="${WHITE}"/>
      <g clip-path="url(#${uid}-${s})"><g class="iris">
        <circle cx="${s === 'l' ? 82 : 118}" cy="101" r="5.4" fill="#3A2116"/>
        <circle cx="${s === 'l' ? 82 : 118}" cy="101" r="2.7" fill="#0D0806"/>
        <circle cx="${s === 'l' ? 84 : 120}" cy="99" r="1.5" fill="${WHITE}"/>
      </g></g>
      <path d="${LASH[s]}" fill="none" ${st(p.liner ? 3.4 : 2.8)}/>
      ${p.liner ? `<path d="${WING[s]}" ${st(2.6)}/>` : ''}
    </g>
    <path class="eye-smile" d="${SMILE_EYE[s]}" fill="none" ${st(3)}/>
    <path class="eye-closed" d="${CLOSED_EYE[s]}" fill="none" ${st(2.8)}/>
    <g class="eye-lid"><path d="${LID[s]}" fill="${skin}"/><path d="${LID_LINE[s]}" fill="none" ${st(2.8)}/></g>
  </g>`;
}

let counter = 0;

/** Render a person as an SVG string. */
export function personSVG(key, { prop, flip } = {}) {
  const p = CAST[key];
  if (!p) return '';
  const uid = `p${++counter}`;
  const [skin, shade] = SKIN[p.skin];
  const h = p.hairColor || '#1B1214';
  const hair = HAIR[p.hair](h, p);
  const browW = p.brow || 4.6;
  const browC = p.browColor || h;

  const chin = prop === 'chin'
    ? `<g class="prop-chin"><path d="M128 242L132 180Q141 171 153 173L168 242Z" fill="${p.topColor}" ${st()}/>
       <path d="M112 150C112 140 122 134 134 136L148 140C156 143 156 156 148 160L126 165C117 166 112 159 112 150Z" fill="${skin}" ${st(2.2)}/>
       <path d="M124 137L123 149M134 137L134 151M144 140L143 153" fill="none" ${st(1.6)}/></g>`
    : '';

  return `<svg class="person" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-key="${key}">
  <defs>
    <clipPath id="${uid}-l"><path d="${EYE.l}"/></clipPath>
    <clipPath id="${uid}-r"><path d="${EYE.r}"/></clipPath>
  </defs>
  <g ${flip ? 'transform="translate(200 0) scale(-1 1)"' : ''}>
  <g class="hb">${hair.back}</g>
  <path d="${NECK}" fill="${skin}" ${st()}/>
  <path d="${NECK_SHADE}" fill="${shade}"/>
  ${clothes(p)}
  <g class="head">
    ${hair.mid}
    ${hair.noEars ? '' : `<ellipse cx="61" cy="103" rx="7.5" ry="11.5" fill="${skin}" ${st(2.2)}/><ellipse cx="139" cy="103" rx="7.5" ry="11.5" fill="${skin}" ${st(2.2)}/>`}
    <path d="${FACE}" fill="${skin}" ${st()}/>
    <path d="${FACE_SHADE}" fill="${shade}"/>
    <ellipse class="blush" cx="75" cy="119" rx="8.5" ry="4.6" fill="#E8664A"/>
    <ellipse class="blush" cx="125" cy="119" rx="8.5" ry="4.6" fill="#E8664A"/>
    ${beard(p.beard, h)}
    ${eye('l', uid, p, skin)}${eye('r', uid, p, skin)}
    <path class="brow brow-l" d="${BROW.l}" fill="none" ${st(browW, browC)}/>
    <path class="brow brow-r" d="${BROW.r}" fill="none" ${st(browW, browC)}/>
    <path d="${NOSE}" fill="none" ${st(2.2)}/>
    ${p.mustache ? mustache(h) : ''}
    ${mouths(p.lips)}
    ${hair.front}
    ${p.bindi ? `<circle cx="100" cy="87" r="2.7" fill="#A3182B"/>` : ''}
    ${p.nosepin ? `<circle cx="106.5" cy="115.5" r="1.7" fill="${GOLD}"/>` : ''}
    ${p.glasses ? glasses() : ''}
    ${hair.noEars ? '' : earrings(p.earrings)}
    ${p.flower ? flower(136, 58) + flower(146, 70) : ''}
    <path class="sweat" d="M146 66Q152 76 149 81Q144 84 142 79Q141 73 146 66Z" fill="#A8DAF2" ${st(1.6)}/>
  </g>
  ${chin}
  </g>
</svg>`;
}

/** Apply a mood (and optional look override) to a rendered person. */
export function setMood(target, mood, look) {
  const svg = target.matches?.('svg.person') ? target : target.querySelector('svg.person');
  if (!svg) return;
  const m = MOODS[mood] || MOODS.neutral;
  svg.dataset.mood = mood;
  svg.dataset.brows = m.brows;
  svg.dataset.eyes = m.eyes;
  svg.dataset.mouth = m.mouth;
  const [lx, ly] = look || m.look || [0, 0];
  svg.style.setProperty('--lx', lx);
  svg.style.setProperty('--ly', ly);
  svg.style.setProperty('--tilt', m.tilt || 0);
  svg.style.setProperty('--blush', m.blush || 0);
  svg.style.setProperty('--sweat', m.sweat || 0);
}

/** Point a person's gaze without changing mood. x,y in -1..1 */
export function setLook(target, x, y) {
  const svg = target.matches?.('svg.person') ? target : target.querySelector('svg.person');
  if (!svg) return;
  svg.style.setProperty('--lx', x.toFixed(2));
  svg.style.setProperty('--ly', y.toFixed(2));
}

const parseLook = (v) => (v ? v.split(',').map(Number) : undefined);

/** Hydrate every [data-person] placeholder in root. */
export function mountPeople(root = document) {
  root.querySelectorAll('[data-person]').forEach((el) => {
    if (el.querySelector('svg.person')) return;
    el.insertAdjacentHTML('beforeend', personSVG(el.dataset.person, { prop: el.dataset.prop, flip: 'flip' in el.dataset }));
    const svg = el.querySelector('svg.person');
    svg.style.setProperty('--blink-delay', `${(Math.random() * 5).toFixed(2)}s`);
    setMood(el, el.dataset.mood || 'neutral', parseLook(el.dataset.look));
  });
}
