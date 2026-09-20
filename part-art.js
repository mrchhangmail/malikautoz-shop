/*
 * Malik Autoz - part illustrations
 *
 * Simple drawn illustrations for common motorcycle part types, used on the shop page
 * when a part has no real photo yet. They show the KIND of part (a piston, a chain kit,
 * a brake shoe...), not the exact item. A real photo named after the SKU always wins.
 *
 * PartArt.keyFor(name, category)  -> illustration key, e.g. 'piston'
 * PartArt.dataUri(key)            -> data: URI usable as <img src>
 */
(function () {
  'use strict';
  var K = '#0F1F24', M = '#CBD5D9', M2 = '#9FB0B8', D = '#4A5A60', A = '#FFC20E', R = '#2B3438', W = '#FFFFFF', RD = '#D64545', GR = '#2F9E44';

  function pol(cx, cy, r, a) { return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
  function poly(pts, fill) {
    return '<path d="M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join('L') + 'Z" fill="' + fill + '"/>';
  }
  function gear(cx, cy, ro, ri, n, fill) {              // square teeth
    var pts = [], s = 2 * Math.PI / n, i;
    for (i = 0; i < n; i++) {
      var a = i * s;
      pts.push(pol(cx, cy, ri, a - 0.32 * s), pol(cx, cy, ro, a - 0.18 * s), pol(cx, cy, ro, a + 0.18 * s), pol(cx, cy, ri, a + 0.32 * s));
    }
    return poly(pts, fill);
  }
  function sprocket(cx, cy, ro, ri, n, fill) {          // pointed teeth
    var pts = [], s = 2 * Math.PI / n, i;
    for (i = 0; i < n; i++) {
      var a = i * s;
      pts.push(pol(cx, cy, ri, a - 0.5 * s), pol(cx, cy, ro, a - 0.08 * s), pol(cx, cy, ro, a + 0.08 * s));
    }
    return poly(pts, fill);
  }
  function thick(d, w, fill) {                          // outlined thick line
    return '<path d="' + d + '" stroke="' + K + '" stroke-width="' + (w + 6) + '"/><path d="' + d + '" stroke="' + fill + '" stroke-width="' + w + '"/>';
  }
  function ring(cx, cy, r, n, rr, fill, rot) {          // n small circles on a ring
    var s = '', i;
    for (i = 0; i < n; i++) { var p = pol(cx, cy, r, (rot || 0) + i * 2 * Math.PI / n); s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + rr + '" fill="' + fill + '"/>'; }
    return s;
  }

  var I = {};
  I.piston = function () { return '<rect x="30" y="14" width="36" height="62" rx="7" fill="' + M + '"/><path d="M30 26h36M30 33h36M30 40h36"/><circle cx="48" cy="58" r="7" fill="' + W + '"/><path d="M30 68h36"/>'; };
  I.piston_ring = function () { return '<circle cx="48" cy="48" r="32" fill="' + M + '"/><circle cx="48" cy="48" r="21" fill="' + W + '"/><path d="M63 19l10 13" stroke="' + W + '" stroke-width="8"/><path d="M60 21l9 12M67 17l9 12"/>'; };
  I.cylinder = function () {
    var s = '<rect x="32" y="16" width="32" height="64" rx="3" fill="' + M2 + '"/>';
    [28, 38, 48, 58, 68].forEach(function (y) { s += '<rect x="22" y="' + y + '" width="52" height="6" rx="2" fill="' + M + '"/>'; });
    return s + '<rect x="26" y="10" width="44" height="8" rx="2" fill="' + M + '"/><rect x="26" y="78" width="44" height="8" rx="2" fill="' + M + '"/>';
  };
  I.cylinder_head = function () {
    var s = '';
    [22, 32, 42, 52, 62, 72].forEach(function (x) { s += '<rect x="' + x + '" y="20" width="6" height="26" rx="1" fill="' + M2 + '"/>'; });
    return s + '<rect x="10" y="44" width="76" height="30" rx="6" fill="' + M + '"/><circle cx="21" cy="59" r="4" fill="' + W + '"/><circle cx="75" cy="59" r="4" fill="' + W + '"/><circle cx="48" cy="59" r="9" fill="' + W + '"/>';
  };
  I.valve = function () { return '<rect x="44" y="28" width="8" height="50" fill="' + M2 + '"/><path d="M20 22c0-6 56-6 56 0l-9 10H29z" fill="' + M + '"/><path d="M44 66h8M44 71h8"/>'; };
  I.camshaft = function () { return '<rect x="6" y="44" width="70" height="8" rx="3" fill="' + M2 + '"/><ellipse cx="26" cy="48" rx="9" ry="17" fill="' + M + '"/><ellipse cx="50" cy="48" rx="9" ry="17" fill="' + M + '" transform="rotate(55 50 48)"/>' + gear(76, 48, 15, 12, 12, M) + '<circle cx="76" cy="48" r="4" fill="' + W + '"/>'; };
  I.crankshaft = function () { return '<rect x="4" y="43" width="26" height="10" fill="' + M2 + '"/><rect x="66" y="43" width="26" height="10" fill="' + M2 + '"/><rect x="38" y="58" width="22" height="13" rx="6" fill="' + M2 + '"/><circle cx="34" cy="50" r="16" fill="' + M + '"/><circle cx="62" cy="50" r="16" fill="' + M + '"/><circle cx="34" cy="50" r="5" fill="' + W + '"/><circle cx="62" cy="50" r="5" fill="' + W + '"/>'; };
  I.gear = function () { return gear(48, 48, 36, 29, 16, M) + '<circle cx="48" cy="48" r="20" fill="none"/><circle cx="48" cy="48" r="9" fill="' + W + '"/>'; };
  I.sprocket = function () { return sprocket(48, 48, 38, 31, 15, M) + '<circle cx="48" cy="48" r="9" fill="' + W + '"/>' + ring(48, 48, 20, 5, 4, W, -1.57); };
  I.chain = function () {
    var s = '', i;
    for (i = 0; i < 6; i++) {
      var x = 6 + i * 13;
      s += i % 2 === 0 ? '<rect x="' + x + '" y="40" width="21" height="16" rx="8" fill="' + M + '"/>' : '<rect x="' + x + '" y="43" width="21" height="10" rx="5" fill="' + M2 + '"/>';
    }
    return s;
  };
  I.chain_kit = function () { return '<path d="M30 28L72 38M30 76L72 66" stroke-dasharray="4 3" stroke-width="5"/>' + sprocket(30, 52, 24, 19, 12, M) + '<circle cx="30" cy="52" r="6" fill="' + W + '"/>' + sprocket(72, 52, 13, 10, 8, M) + '<circle cx="72" cy="52" r="3" fill="' + W + '"/>'; };
  I.clutch_plate = function () { return '<circle cx="48" cy="48" r="36" fill="' + M + '"/><circle cx="48" cy="48" r="28" stroke="' + D + '" stroke-width="6" stroke-dasharray="7 5"/><circle cx="48" cy="48" r="11" fill="' + W + '"/>'; };
  I.clutch_housing = function () {
    var s = '<circle cx="48" cy="48" r="36" fill="' + M + '"/><circle cx="48" cy="48" r="27" fill="' + D + '"/>', i;
    for (i = 0; i < 8; i++) s += '<rect x="44.5" y="14" width="7" height="14" fill="' + W + '" transform="rotate(' + (i * 45) + ' 48 48)"/>';
    return s + '<circle cx="48" cy="48" r="11" fill="' + M2 + '"/><circle cx="48" cy="48" r="4" fill="' + W + '"/>';
  };
  I.spring = function () {
    var s = '', i;
    for (i = 0; i < 6; i++) s += '<ellipse cx="48" cy="' + (18 + i * 12) + '" rx="24" ry="6" transform="rotate(-6 48 ' + (18 + i * 12) + ')"/>';
    return s;
  };
  I.lever_foot = function () { return '<rect x="24" y="48" width="56" height="13" rx="6" fill="' + M + '" transform="rotate(-38 24 55)"/><rect x="60" y="10" width="26" height="11" rx="3" fill="' + R + '" transform="rotate(-38 73 16)"/><circle cx="24" cy="66" r="13" fill="' + M + '"/><circle cx="24" cy="66" r="5" fill="' + W + '"/>'; };
  I.brake_pedal = function () { return '<rect x="20" y="60" width="62" height="12" rx="6" fill="' + M + '"/><rect x="66" y="52" width="22" height="9" rx="3" fill="' + R + '"/><circle cx="22" cy="66" r="12" fill="' + M + '"/><circle cx="22" cy="66" r="4" fill="' + W + '"/><path d="M22 54V26" stroke-width="5"/><circle cx="22" cy="22" r="5" fill="' + M2 + '"/>'; };
  I.rocker = function () { return thick('M14 64Q48 10 82 64', 12, M) + '<circle cx="48" cy="36" r="7" fill="' + W + '"/><rect x="10" y="60" width="9" height="22" rx="2" fill="' + M2 + '"/>'; };
  I.oil_pump = function () { return '<rect x="14" y="34" width="68" height="42" rx="10" fill="' + M + '"/><rect x="38" y="16" width="20" height="18" fill="' + M2 + '"/>' + gear(36, 56, 13, 10, 8, M2) + gear(60, 56, 13, 10, 8, M2); };
  I.gasket = function () { return '<rect x="10" y="20" width="76" height="56" rx="12" fill="' + M + '"/><ellipse cx="48" cy="48" rx="20" ry="15" fill="' + W + '"/>' + '<circle cx="21" cy="31" r="4" fill="' + W + '"/><circle cx="75" cy="31" r="4" fill="' + W + '"/><circle cx="21" cy="65" r="4" fill="' + W + '"/><circle cx="75" cy="65" r="4" fill="' + W + '"/><circle cx="48" cy="27" r="3" fill="' + W + '"/><circle cx="48" cy="69" r="3" fill="' + W + '"/>'; };
  I.oil_seal = function () { return '<circle cx="48" cy="48" r="34" fill="' + R + '"/><circle cx="48" cy="48" r="21" fill="' + W + '"/><circle cx="48" cy="48" r="25" stroke="' + M + '" stroke-dasharray="3 3"/>'; };
  I.bearing = function () { return '<circle cx="48" cy="48" r="36" fill="' + M + '"/><circle cx="48" cy="48" r="24" fill="' + M2 + '"/>' + ring(48, 48, 24, 8, 5, W, 0.4) + '<circle cx="48" cy="48" r="13" fill="' + W + '"/>'; };
  I.carburetor = function () { return '<rect x="8" y="42" width="30" height="20" rx="10" fill="' + M2 + '"/><rect x="34" y="28" width="36" height="42" rx="6" fill="' + M + '"/><rect x="38" y="14" width="24" height="16" rx="3" fill="' + M2 + '"/><path d="M50 14V6"/><path d="M38 70h28l-4 16H42z" fill="' + M2 + '"/><circle cx="78" cy="46" r="6" fill="' + W + '"/><path d="M70 46h2"/>'; };
  I.air_filter = function () { return '<rect x="12" y="28" width="64" height="44" rx="9" fill="' + M + '"/><path d="M26 34v32M36 34v32M46 34v32M56 34v32M66 34v32" stroke="' + D + '" stroke-width="2"/><rect x="72" y="40" width="18" height="20" rx="3" fill="' + M2 + '"/>'; };
  I.spark_plug = function () { return '<rect x="44" y="4" width="8" height="9" rx="2" fill="' + M2 + '"/><rect x="38" y="13" width="20" height="33" rx="6" fill="' + W + '"/><path d="M38 22h20M38 29h20"/><path d="M33 46h30v10H33z" fill="' + M2 + '"/><rect x="40" y="56" width="16" height="22" fill="' + M + '"/><path d="M40 61h16M40 66h16M40 71h16"/><path d="M48 78v8h9"/>'; };
  I.plug_cap = function () { return '<path d="M34 62V32c0-10 28-10 28 0v30z" fill="' + R + '"/><path d="M36 62h24l-3 14H39z" fill="' + M + '"/><path d="M48 22V10q0-4 8-4"/>'; };
  I.fuel_cock = function () { return '<rect x="10" y="40" width="16" height="16" fill="' + M2 + '"/><rect x="24" y="34" width="36" height="28" rx="6" fill="' + M + '"/><rect x="58" y="42" width="26" height="12" fill="' + M2 + '"/><path d="M42 34V20h24" stroke-width="7"/><rect x="30" y="62" width="24" height="16" rx="6" fill="' + M2 + '"/>'; };
  I.muffler = function () { return thick('M32 48H16Q8 48 8 40V20', 8, M2) + '<rect x="30" y="32" width="60" height="32" rx="16" fill="' + M + '"/><path d="M46 32v32M62 32v32"/><circle cx="82" cy="48" r="5" fill="' + D + '"/>'; };
  I.cdi = function () { return '<rect x="14" y="20" width="68" height="46" rx="6" fill="' + D + '"/><rect x="24" y="28" width="48" height="16" rx="2" fill="' + W + '" stroke="none"/><path d="M30 36h22" stroke="' + K + '"/><rect x="34" y="66" width="28" height="9" fill="' + M2 + '"/><path d="M40 75v9M48 75v9M56 75v9"/>'; };
  I.ignition_coil = function () { return '<rect x="32" y="26" width="32" height="52" rx="6" fill="' + D + '"/><path d="M32 42h32M32 52h32M32 62h32" stroke="' + M + '"/><rect x="42" y="14" width="12" height="12" rx="2" fill="' + M + '"/><path d="M48 14V8h14"/>'; };
  I.magnet = function () { var s = '<circle cx="48" cy="48" r="36" fill="' + M2 + '"/><circle cx="48" cy="48" r="12" fill="' + W + '"/>', i; for (i = 0; i < 6; i++) s += '<rect x="41" y="14" width="14" height="18" rx="3" fill="' + A + '" transform="rotate(' + (i * 60) + ' 48 48)"/>'; return s; };
  I.rectifier = function () { var s = '', i; for (i = 0; i < 6; i++) s += '<rect x="' + (22 + i * 9) + '" y="18" width="5" height="18" fill="' + M2 + '"/>'; return s + '<rect x="18" y="34" width="60" height="32" rx="4" fill="' + M + '"/><path d="M34 66v14M48 66v14M62 66v14"/>'; };
  I.battery = function () { return '<rect x="12" y="32" width="72" height="44" rx="6" fill="' + M + '"/><rect x="22" y="52" width="52" height="16" rx="3" fill="' + A + '"/><rect x="22" y="24" width="14" height="8" fill="' + M2 + '"/><rect x="60" y="24" width="14" height="8" fill="' + M2 + '"/><path d="M67 12v10M62 17h10"/>'; };
  I.bulb = function () { return '<circle cx="48" cy="36" r="24" fill="' + W + '"/><rect x="36" y="56" width="24" height="18" rx="2" fill="' + M2 + '"/><path d="M36 64h24"/><path d="M40 46l4-12 4 12 4-12 4 12" stroke="' + D + '"/>'; };
  I.headlight = function () { return '<circle cx="48" cy="48" r="36" fill="' + M + '"/><circle cx="48" cy="48" r="28" fill="' + W + '"/><circle cx="48" cy="48" r="13" fill="' + A + '"/><circle cx="48" cy="48" r="5" fill="' + W + '"/>'; };
  I.taillight = function () { return '<path d="M10 40c0-14 76-14 76 0v16c0 12-76 12-76 0z" fill="' + RD + '"/><path d="M22 38c16-5 36-5 52 0" stroke="' + W + '" stroke-width="2"/><rect x="42" y="66" width="12" height="12" fill="' + M2 + '"/>'; };
  I.indicator = function () { return '<ellipse cx="48" cy="38" rx="30" ry="20" fill="' + A + '"/><path d="M34 38h26M54 30l8 8-8 8"/><rect x="42" y="56" width="12" height="24" fill="' + M2 + '"/>'; };
  I.horn = function () { return '<circle cx="42" cy="48" r="32" fill="' + M + '"/><circle cx="42" cy="48" r="22" stroke="' + D + '"/><circle cx="42" cy="48" r="9" fill="' + D + '"/><rect x="72" y="42" width="16" height="12" fill="' + M2 + '"/>'; };
  I.switch = function () { return '<rect x="16" y="26" width="64" height="38" rx="9" fill="' + D + '"/><circle cx="36" cy="45" r="8" fill="' + A + '"/><circle cx="60" cy="45" r="8" fill="' + M + '"/><path d="M48 64v8q0 10-12 10"/>'; };
  I.wiring = function () { return '<path d="M12 28C44 28 44 68 84 68" stroke="' + RD + '" stroke-width="5"/><path d="M12 48C46 48 46 48 84 48" stroke="' + A + '" stroke-width="5"/><path d="M12 68C44 68 46 28 84 28" stroke="' + GR + '" stroke-width="5"/><rect x="4" y="20" width="12" height="56" rx="3" fill="' + W + '"/><rect x="80" y="20" width="12" height="56" rx="3" fill="' + W + '"/>'; };
  I.meter = function () { return '<circle cx="48" cy="48" r="36" fill="' + M + '"/><circle cx="48" cy="48" r="28" fill="' + W + '"/><path d="M24 62A26 26 0 0 1 72 62" stroke="' + D + '" stroke-dasharray="2 6"/><path d="M48 48L66 32" stroke="' + RD + '"/><circle cx="48" cy="48" r="5" fill="' + K + '"/>'; };
  I.cable = function () { return thick('M12 76C28 26 60 92 84 22', 6, D) + '<circle cx="12" cy="78" r="6" fill="' + M + '"/><rect x="78" y="12" width="12" height="14" rx="3" fill="' + M + '"/>'; };
  I.hand_lever = function () { return '<rect x="8" y="46" width="34" height="24" rx="5" fill="' + M2 + '"/>' + thick('M38 56C58 60 74 50 88 26', 9, M) + '<circle cx="32" cy="58" r="4" fill="' + W + '"/>'; };
  I.handlebar = function () { return thick('M16 46C26 46 32 34 48 34S70 46 80 46', 8, M) + '<rect x="4" y="40" width="20" height="14" rx="6" fill="' + R + '"/><rect x="72" y="40" width="20" height="14" rx="6" fill="' + R + '"/><rect x="42" y="26" width="12" height="12" rx="2" fill="' + M2 + '"/>'; };
  I.grip = function () { return '<rect x="8" y="34" width="72" height="28" rx="13" fill="' + R + '"/><path d="M24 36v24M34 36v24M44 36v24M54 36v24" stroke="' + D + '"/><rect x="78" y="41" width="10" height="14" rx="3" fill="' + M2 + '"/>'; };
  I.mirror = function () { return thick('M48 56V68Q48 80 64 80', 7, M2) + '<circle cx="48" cy="34" r="24" fill="' + M + '"/><circle cx="48" cy="34" r="17" fill="' + W + '"/><path d="M38 28q6-7 15-4" stroke="' + M2 + '"/>'; };
  I.brake_shoe = function () { return thick('M34 16C8 30 8 66 34 80', 12, M2) + thick('M62 16C88 30 88 66 62 80', 12, M2) + '<path d="M38 26H58M38 70H58" stroke-dasharray="3 3"/><circle cx="48" cy="48" r="6" fill="' + M + '"/>'; };
  I.drum = function () { return '<circle cx="48" cy="48" r="36" fill="' + M + '"/><circle cx="48" cy="48" r="27" fill="' + M2 + '"/>' + ring(48, 48, 18, 6, 3.5, W, 0.5) + '<circle cx="48" cy="48" r="9" fill="' + W + '"/>'; };
  I.shock = function () { return '<circle cx="48" cy="10" r="6" fill="' + W + '"/><rect x="45" y="14" width="6" height="26" fill="' + M2 + '"/><rect x="38" y="36" width="20" height="42" rx="4" fill="' + M + '"/><path d="M26 32l44 7-44 7 44 7-44 7 44 7-44 7" stroke="' + D + '"/><circle cx="48" cy="86" r="6" fill="' + W + '"/>'; };
  I.fender = function () { return '<path d="M6 70C6 32 28 12 48 12s42 20 42 58H77C77 42 62 26 48 26S19 42 19 70z" fill="' + M + '"/><circle cx="48" cy="20" r="3" fill="' + W + '"/>'; };
  I.seat = function () { return '<path d="M6 58C6 44 18 38 30 38h38c16 0 26 4 26 18v8H6z" fill="' + R + '"/><path d="M22 47h52" stroke="' + D + '" stroke-dasharray="3 3"/><rect x="6" y="62" width="88" height="9" rx="3" fill="' + M2 + '"/>'; };
  I.cover = function () { return '<rect x="14" y="18" width="68" height="60" rx="20" fill="' + M + '"/><path d="M30 36c14 2 26 9 34 24M30 48c12 2 18 6 26 14"/><circle cx="26" cy="28" r="3" fill="' + W + '"/><circle cx="70" cy="68" r="3" fill="' + W + '"/>'; };
  I.stand = function () { return thick('M24 16V54Q24 72 42 72H68', 9, M) + '<rect x="62" y="64" width="26" height="12" rx="3" fill="' + R + '"/><circle cx="24" cy="20" r="6" fill="' + W + '"/>'; };
  I.footrest = function () { return '<rect x="10" y="28" width="22" height="40" rx="5" fill="' + M + '"/><circle cx="21" cy="48" r="5" fill="' + W + '"/><rect x="30" y="40" width="56" height="17" rx="8" fill="' + R + '"/><path d="M44 42v13M54 42v13M64 42v13M74 42v13" stroke="' + D + '"/>'; };
  I.wheel_rim = function () { var s = '<circle cx="48" cy="48" r="40" fill="' + M + '"/><circle cx="48" cy="48" r="30" fill="' + W + '"/>', i; for (i = 0; i < 12; i++) { var a = i * Math.PI / 6, p1 = pol(48, 48, 10, a), p2 = pol(48, 48, 30, a); s += '<path d="M' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + 'L' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) + '" stroke="' + D + '" stroke-width="2"/>'; } return s + '<circle cx="48" cy="48" r="10" fill="' + M2 + '"/>'; };
  I.spoke = function () { return '<path d="M20 74L74 22" stroke-width="4"/><path d="M20 74l-8 6" stroke-width="4"/><rect x="66" y="10" width="11" height="20" rx="3" fill="' + A + '" transform="rotate(43 72 20)"/><path d="M58 32l10 10" stroke="' + D + '" stroke-dasharray="2 3"/>'; };
  I.axle = function () { return '<rect x="6" y="42" width="84" height="12" rx="3" fill="' + M2 + '"/><path d="M10 32h11l5 16-5 16H10l-5-16z" fill="' + M + '"/><path d="M86 32H75l-5 16 5 16h11l5-16z" fill="' + M + '"/><path d="M34 42v12M40 42v12M46 42v12"/>'; };
  I.bottle = function () { return '<rect x="38" y="2" width="20" height="9" rx="2" fill="' + RD + '"/><path d="M39 11h18v10l9 9v52c0 4-3 6-7 6H37c-4 0-7-2-7-6V30l9-9z" fill="' + W + '"/><rect x="30" y="40" width="36" height="26" fill="' + A + '"/><path d="M30 72h36" stroke="' + D + '"/>'; };
  I.hardware = function () { return '<path d="M8 38l7-10h14l7 10-7 10H15z" fill="' + M + '"/><rect x="34" y="33" width="52" height="10" fill="' + M2 + '"/><path d="M50 33v10M57 33v10M64 33v10M71 33v10M78 33v10"/><path d="M34 68l9-13h18l9 13-9 13H43z" fill="' + M + '"/><circle cx="52" cy="68" r="7" fill="' + W + '"/>'; };
  I.rubber = function () { return '<circle cx="48" cy="48" r="34" fill="' + R + '"/><circle cx="48" cy="48" r="14" fill="' + W + '"/><circle cx="48" cy="48" r="24" stroke="' + D + '" stroke-dasharray="2 4"/>'; };
  I.fork = function () { return '<rect x="14" y="12" width="14" height="62" rx="5" fill="' + M + '"/><rect x="68" y="12" width="14" height="62" rx="5" fill="' + M + '"/><rect x="14" y="62" width="68" height="14" rx="5" fill="' + M2 + '"/><circle cx="21" cy="20" r="3.5" fill="' + W + '"/><circle cx="75" cy="20" r="3.5" fill="' + W + '"/>'; };
  I.key = function () { return '<rect x="40" y="43" width="48" height="11" fill="' + M2 + '"/><path d="M64 54v9h7v-9M76 54v7h6v-7" fill="' + M2 + '"/><circle cx="28" cy="48" r="18" fill="' + M + '"/><circle cx="28" cy="48" r="7" fill="' + W + '"/>'; };
  I.engine_case = function () { return '<path d="M16 30c0-12 14-16 32-16s32 4 32 16v38c0 12-14 16-32 16S16 80 16 68z" fill="' + M + '"/><circle cx="48" cy="40" r="15" fill="' + W + '"/><circle cx="48" cy="72" r="5" fill="' + W + '"/><circle cx="26" cy="54" r="3" fill="' + W + '"/><circle cx="70" cy="54" r="3" fill="' + W + '"/>'; };
  I.transmission = function () { return gear(34, 58, 28, 22, 12, M) + '<circle cx="34" cy="58" r="8" fill="' + W + '"/>' + gear(66, 34, 24, 19, 10, M2) + '<circle cx="66" cy="34" r="7" fill="' + W + '"/>'; };
  I.tyre = function () { var s = '<circle cx="48" cy="48" r="38" fill="' + R + '"/><circle cx="48" cy="48" r="22" fill="' + M + '"/><circle cx="48" cy="48" r="8" fill="' + W + '"/>', i; for (i = 0; i < 16; i++) { var a = i * Math.PI / 8, p1 = pol(48, 48, 32, a), p2 = pol(48, 48, 38, a); s += '<path d="M' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + 'L' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) + '" stroke="' + D + '" stroke-width="3"/>'; } return s; };
  I.lightning = function () { return '<path d="M56 8L22 54h22l-6 34 36-50H52z" fill="' + A + '"/>'; };

  /* ---- generic fallbacks by POS category ---- */
  var FALLBACK = { 'Engine Parts': 'engine_case', 'Electrical': 'lightning', 'Body Parts': 'cover', 'Brakes': 'drum', 'Tyres & Tubes': 'tyre', 'Oils & Lubricants': 'bottle', 'Other': 'hardware' };

  /* ---- name -> illustration. First match wins, so specific rules come first. ---- */
  var RULES = [
    [/TYRE SEALANT|ENGINE OIL/, 'bottle'],
    [/PISTON RING/, 'piston_ring'],
    [/CARBURETOR|MAIN JET|SLOW JET|FLOAT|MIXTURE SCREW|SLIDE PIN JET|CHOKE/, 'carburetor'],
    [/^PISTON/, 'piston'],
    [/AIR FILTER|AIR LOTA/, 'air_filter'],
    [/FUEL COCK|PETROL PIPE|FUEL FILTER|FUEL TANK/, 'fuel_cock'],
    [/PLUG CAP/, 'plug_cap'],
    [/^PLUG /, 'spark_plug'],
    [/MUFFLER/, 'muffler'],
    [/STARTING COIL|GUTKA COIL|IGNITION COIL|PULSAR COIL/, 'ignition_coil'],
    [/C\.D\.I|SOUND FLASHER|LIMITER/, 'cdi'],
    [/MAGNET/, 'magnet'],
    [/RECTIFIER/, 'rectifier'],
    [/BATTERY/, 'battery'],
    [/H\/L BULB/, 'bulb'],
    [/HEAD LIGHT/, 'headlight'],
    [/BACK LIGHT/, 'taillight'],
    [/SWITCH/, 'switch'],
    [/INDICATOR/, 'indicator'],
    [/HORN/, 'horn'],
    [/WIRING/, 'wiring'],
    [/CABLE|CLUTCH WIRE/, 'cable'],
    [/METER/, 'meter'],
    [/MIRROR/, 'mirror'],
    [/BRAKE SHOE/, 'brake_shoe'],
    [/INSULATOR/, 'rubber'],
    [/OIL SEAL|SHOCK SEAL|O.?RING/, 'oil_seal'],
    [/SPRING/, 'spring'],
    [/BRAKE PEDAL|BRAKE ROD|BRAKE CAM/, 'brake_pedal'],
    [/GEAR DRUM/, 'gear'],
    [/DRUM/, 'drum'],
    [/^HANDLE BAR/, 'handlebar'],
    [/^KICK SHAFT|CRANK SHAFT|CONNECTING ROD|COUNTER SHAFT|MAIN SHAFT|GEAR SHAFT|BALANCER/, 'crankshaft'],
    [/CAM SHAFT|CAM GEAR|CAM FOLLOWER|CAM PIN|TIMING GEAR|TIMING ROD/, 'camshaft'],
    [/^KICK|GEAR LEVER/, 'lever_foot'],
    [/LEVER/, 'hand_lever'],
    [/HANDLE GRIP|HANDLE CONE|HANDLE GOLI/, 'grip'],
    [/HANDLE LOCK|KEY SET/, 'key'],
    [/^HANDLE/, 'handlebar'],
    [/VALVE/, 'valve'],
    [/CYLINDER PACKING|GASKET|PACKING/, 'gasket'],
    [/^CYLINDER/, 'cylinder'],
    [/^HEAD /, 'cylinder_head'],
    [/BEARING/, 'bearing'],
    [/OIL PUMP/, 'oil_pump'],
    [/COVER|COWL/, 'cover'],
    [/ROCKER|TAPPET|PUSH ROD/, 'rocker'],
    [/TRANSMISSION/, 'transmission'],
    [/CHAIN KIT/, 'chain_kit'],
    [/TIMING CHAIN|WHEEL CHAIN|CHAIN LOCK|CHAIN SETTING/, 'chain'],
    [/SPROCKET/, 'sprocket'],
    [/CLUTCH PLATE|PRESSURE PLATE|DRIVE PLATE|CLUTCH PATTI/, 'clutch_plate'],
    [/CLUTCH BOX|CLUTCH HOUSING|CLUTCH BOSS|CLUTCH CENTER|CLUTCH GEAR|CLUTCH LIFTER|CLUTCH PUSHER|CLUTCH NUT|CLUTCH BUSH/, 'clutch_housing'],
    [/GEAR/, 'gear'],
    [/SHOCK|CUSHION SET FRONT|JUMP RIB/, 'shock'],
    [/FENDER/, 'fender'],
    [/SEAT ASSY|SEAT PIPE/, 'seat'],
    [/FOOT REST/, 'footrest'],
    [/STAND/, 'stand'],
    [/WHEEL RIM|WHEEL SLEEVE/, 'wheel_rim'],
    [/SPOKE/, 'spoke'],
    [/AXLE/, 'axle'],
    [/REAR FORK|FORK BUSH/, 'fork'],
    [/ENGINE PIECE|ENGINE FOUNDATION/, 'engine_case'],
    [/RUBBER|BUSH|CUSHION/, 'rubber'],
    [/BOLT|NUT|STUD|WASHER|DOWEL|PIN|FINGER|SCREW|KIT/, 'hardware'],
    [/TYRE|TUBE/, 'tyre']
  ];

  function keyFor(name, category) {
    var n = String(name || '').toUpperCase(), i;
    for (i = 0; i < RULES.length; i++) if (RULES[i][0].test(n)) return RULES[i][1];
    return FALLBACK[category] || 'hardware';
  }
  function svg(key) {
    var f = I[key] || I.hardware;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" rx="12" fill="#EEF2F3"/>' +
      '<g fill="none" stroke="' + K + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' + f() + '</g></svg>';
  }
  function dataUri(key) { return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg(key)); }

  window.PartArt = { keyFor: keyFor, svg: svg, dataUri: dataUri, keys: Object.keys(I), fallback: FALLBACK };
})();
