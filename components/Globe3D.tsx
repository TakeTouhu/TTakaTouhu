'use client';
import { useEffect, useRef } from 'react';

// lat/lon → 3D unit sphere coordinates (Three.js convention)
function ll(lat: number, lon: number, r = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -r * Math.sin(phi) * Math.cos(theta),
    y:  r * Math.cos(phi),
    z:  r * Math.sin(phi) * Math.sin(theta),
  };
}

// Continent coastlines as [lon, lat][] — Natural Earth simplified
const CONTINENTS: [number, number][][] = [
  // North America
  [
    [-168,54],[-162,60],[-152,60],[-140,60],[-130,55],
    [-126,50],[-124,49],[-122,37],[-118,24],[-105,20],
    [-90,15],[-85,9],[-80,8],[-76,9],[-75,11],
    [-78,25],[-80,25],[-82,30],[-80,33],[-76,37],
    [-70,42],[-66,45],[-60,47],[-53,47],
    [-58,52],[-65,58],[-68,65],[-76,70],
    [-85,68],[-95,72],[-110,74],[-122,70],
    [-138,68],[-148,62],[-155,60],[-162,60],[-168,54],
  ],
  // South America
  [
    [-78,8],[-75,12],[-62,12],[-60,12],
    [-50,5],[-38,-4],[-35,-8],[-35,-12],
    [-38,-16],[-40,-20],[-42,-23],[-44,-23],
    [-48,-28],[-52,-33],[-58,-38],
    [-62,-42],[-65,-46],[-66,-50],
    [-66,-55],[-68,-55],[-70,-50],
    [-72,-42],[-74,-38],[-72,-30],
    [-72,-20],[-75,-10],[-78,-2],[-78,8],
  ],
  // Europe
  [
    [-10,36],[-8,38],[-10,42],[-8,44],[-4,44],[-2,44],
    [0,46],[5,44],[8,44],[10,54],[12,55],[15,56],
    [18,55],[22,54],[25,60],[28,62],[25,65],
    [22,68],[25,70],[28,72],[18,74],[12,72],
    [8,64],[6,62],[2,60],[0,58],[-3,54],
    [-5,50],[-8,48],[-10,44],[-10,38],[-6,36],[-10,36],
  ],
  // Africa
  [
    [-18,15],[-15,10],[-14,10],[-15,5],[-12,5],
    [-8,5],[-5,4],[0,5],[5,5],[10,5],
    [14,4],[18,4],[22,2],[27,-2],[32,-5],
    [35,-5],[38,-2],[40,-10],[42,-15],
    [40,-20],[36,-24],[32,-28],[28,-34],
    [18,-34],[14,-30],[10,-25],[8,-15],
    [5,-5],[0,5],[-5,5],[-10,5],
    [-14,8],[-16,10],[-18,15],
  ],
  // Asia (mainland)
  [
    [28,42],[30,45],[35,46],[40,44],[44,40],
    [48,38],[52,34],[56,25],[58,22],[62,22],
    [66,22],[70,22],[72,20],[76,18],[80,12],
    [80,8],[85,10],[90,12],[95,16],[100,4],
    [105,5],[108,2],[110,2],[115,5],[118,4],
    [122,0],[125,1],[128,4],[130,8],[132,10],
    [135,34],[138,36],[140,38],[142,46],
    [145,44],[140,50],[138,46],[135,42],
    [130,35],[128,32],[125,22],[120,16],
    [112,5],[108,2],[105,5],[100,5],
    [95,10],[90,20],[85,22],[80,28],
    [75,34],[70,38],[65,42],[60,45],
    [55,48],[50,50],[45,48],[40,45],
    [35,46],[28,42],
  ],
  // India
  [
    [68,22],[72,20],[76,18],[80,12],[80,8],
    [77,8],[74,14],[72,18],[68,22],
  ],
  // Japan — Honshu
  [
    [130,31],[132,33],[134,33],[136,34],
    [136,36],[138,37],[140,37],[141,38],
    [141,39],[142,40],[142,42],[141,42],
    [140,40],[139,37],[138,35],[136,34],
    [134,33],[132,33],[130,31],
  ],
  // Japan — Kyushu / Shikoku area
  [
    [130,32],[132,33],[134,33],[132,34],[130,32],
  ],
  // Australia
  [
    [114,-22],[116,-20],[118,-18],[122,-16],
    [125,-14],[128,-14],[130,-12],[132,-12],
    [136,-12],[138,-14],[140,-15],[142,-10],
    [145,-15],[148,-20],[152,-24],[152,-28],
    [152,-32],[152,-36],[148,-38],[145,-38],
    [142,-38],[140,-36],[136,-34],[132,-34],
    [130,-32],[126,-34],[122,-34],
    [118,-30],[116,-28],[114,-26],[114,-22],
  ],
  // Greenland
  [
    [-44,60],[-48,68],[-44,76],[-30,78],[-18,76],
    [-18,70],[-26,66],[-36,60],[-44,60],
  ],
];

// Japan hub & source cities [lat, lon]
const JAPAN: [number, number] = [35.7, 139.7];
const CITIES: [number, number][] = [
  [40.7, -74.0],   // New York
  [51.5, -0.1],    // London
  [25.2, 55.3],    // Dubai
  [19.1, 72.9],    // Mumbai
  [10.8, 106.7],   // Ho Chi Minh City
  [-33.9, 151.2],  // Sydney
  [-23.5, -46.6],  // São Paulo
  [37.6, 126.9],   // Seoul
];

export default function Globe3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    let rendererRef: import('three').WebGLRenderer | null = null;

    (async () => {
      const THREE = await import('three');
      const el = mountRef.current;
      if (!el) return;

      const W = el.clientWidth || 550;
      const H = el.clientHeight || 800;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
      camera.position.z = 2.8;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      rendererRef = renderer;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      // Ocean sphere
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.MeshPhongMaterial({
          color: 0x0f2a5e,
          emissive: 0x060e20,
          specular: 0x1e3a8a,
          shininess: 18,
        }),
      );
      scene.add(sphere);

      // Atmosphere glow (outer shell)
      scene.add(new THREE.Mesh(
        new THREE.SphereGeometry(1.07, 32, 32),
        new THREE.MeshPhongMaterial({
          color: 0x3b82f6,
          transparent: true,
          opacity: 0.08,
          side: THREE.BackSide,
        }),
      ));

      // Lights — simulate sun from upper-left-front
      scene.add(new THREE.AmbientLight(0x1a3070, 1.2));
      const sun = new THREE.DirectionalLight(0x88aaff, 1.6);
      sun.position.set(-3, 2, 4);
      scene.add(sun);
      const fill = new THREE.DirectionalLight(0x002266, 0.4);
      fill.position.set(3, -1, -4);
      scene.add(fill);

      // Continent outlines
      const landMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.80 });
      CONTINENTS.forEach(coords => {
        const pts = coords.map(([lon, lat]) => {
          const v = ll(lat, lon, 1.003);
          return new THREE.Vector3(v.x, v.y, v.z);
        });
        sphere.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), landMat.clone()));
      });

      // Lat/Lon grid (faint)
      const gridMat = new THREE.LineBasicMaterial({ color: 0x29b5e8, transparent: true, opacity: 0.09 });
      for (const lat of [-60, -30, 0, 30, 60]) {
        const pts: import('three').Vector3[] = [];
        for (let lon = -180; lon <= 180; lon += 3) {
          const v = ll(lat, lon, 1.002);
          pts.push(new THREE.Vector3(v.x, v.y, v.z));
        }
        sphere.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat.clone()));
      }
      for (let lon = -180; lon < 180; lon += 30) {
        const pts: import('three').Vector3[] = [];
        for (let lat = -90; lat <= 90; lat += 3) {
          const v = ll(lat, lon, 1.002);
          pts.push(new THREE.Vector3(v.x, v.y, v.z));
        }
        sphere.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat.clone()));
      }

      // Arc lines from world cities → Japan
      const jv = ll(JAPAN[0], JAPAN[1], 1);
      const jVec = new THREE.Vector3(jv.x, jv.y, jv.z);
      const arcColors = [0x38bdf8, 0x60a5fa, 0x7dd3fc, 0x93c5fd];
      CITIES.forEach(([lat, lon], i) => {
        const sv = ll(lat, lon, 1);
        const sVec = new THREE.Vector3(sv.x, sv.y, sv.z);
        const mid = sVec.clone().add(jVec).multiplyScalar(0.5);
        mid.normalize().multiplyScalar(1.48);
        const curve = new THREE.QuadraticBezierCurve3(sVec, mid, jVec);
        const mat = new THREE.LineBasicMaterial({
          color: arcColors[i % arcColors.length],
          transparent: true,
          opacity: 0.68,
        });
        sphere.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(80)), mat));
      });

      // Source city dots
      const cityGeo = new THREE.SphereGeometry(0.013, 8, 8);
      const cityMat = new THREE.MeshBasicMaterial({ color: 0x7dd3fc });
      CITIES.forEach(([lat, lon]) => {
        const v = ll(lat, lon, 1.008);
        const dot = new THREE.Mesh(cityGeo, cityMat.clone());
        dot.position.set(v.x, v.y, v.z);
        sphere.add(dot);
      });

      // Japan (Tokyo) hub — larger glowing dot
      const jv2 = ll(JAPAN[0], JAPAN[1], 1.012);
      const japanDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 14, 14),
        new THREE.MeshBasicMaterial({ color: 0x60a5fa }),
      );
      japanDot.position.set(jv2.x, jv2.y, jv2.z);
      sphere.add(japanDot);

      // Pulse ring around Japan (flat ring slightly above surface)
      const ringGeo = new THREE.RingGeometry(0.04, 0.052, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(jv2.x, jv2.y, jv2.z);
      ring.lookAt(0, 0, 0);
      sphere.add(ring);

      // Initial rotation to show Japan facing the viewer
      // Japan lon=140: needs sphere.rotation.y ≈ 2.27 rad
      sphere.rotation.y = 2.27;

      // Resize handler
      const onResize = () => {
        if (!el) return;
        const nW = el.clientWidth;
        const nH = el.clientHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
      };
      window.addEventListener('resize', onResize);

      // Animate — 60s per revolution
      const clock = new THREE.Clock();
      let pulseT = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        sphere.rotation.y += (2 * Math.PI / 60) * delta;

        // Pulse ring scale
        pulseT += delta;
        const s = 1 + 0.6 * Math.abs(Math.sin(pulseT * 1.5));
        ring.scale.setScalar(s);
        ringMat.opacity = 0.7 * (1 - 0.5 * Math.abs(Math.sin(pulseT * 1.5)));

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener('resize', onResize);
      };
    })();

    return () => {
      cancelAnimationFrame(animId);
      if (rendererRef) {
        rendererRef.dispose();
        rendererRef.domElement.remove();
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
