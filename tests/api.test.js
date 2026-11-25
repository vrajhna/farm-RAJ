const { describe, it } = require('node:test');
const assert = require('node:assert');
const { spawn } = require('node:child_process');

function get(path) {
  return new Promise((resolve, reject) => {
    require('node:http').get({ port: 4123, path }, res => {
      let s = ''; res.on('data', c => s += c); res.on('end', () => resolve({ s: res.statusCode, b: s }));
    }).on('error', reject);
  });
}
function post(path, body) {
  return new Promise((resolve, reject) => {
    const d = JSON.stringify(body);
    const r = require('node:http').request({ port: 4123, path, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': d.length } }, res => {
      let s = ''; res.on('data', c => s += c); res.on('end', () => resolve({ s: res.statusCode, b: JSON.parse(s) }));
    });
    r.on('error', reject); r.write(d); r.end();
  });
}

describe('API smoke', () => {
  const srv = spawn(process.execPath, ['server.js'], { env: { ...process.env, PORT: '4123', META_API_KEY: '' }, cwd: __dirname + '/..' });
  it('health + schemes + chat + eligibility + feedback', async () => {
    await new Promise(r => setTimeout(r, 900));
    assert.strictEqual((await get('/api/health')).s, 200);
    const sch = await get('/api/schemes?type=state');
    assert.strictEqual(sch.s, 200);
    assert.ok(JSON.parse(sch.b).count >= 5);
    const chat = await post('/api/chat', { message: 'sarson me mahoo', lang: 'hi' });
    assert.strictEqual(chat.s, 200);
    assert.ok(chat.b.reply.length > 10);
    const el = await post('/api/eligibility/check', { landAcres: 2, janAadhaar: true });
    assert.strictEqual(el.s, 200);
    assert.ok(el.b.results.length >= 10);
    const fb = await post('/api/feedback', { message: 'bahut badhiya app hai', type: 'suggestion' });
    assert.strictEqual(fb.s, 200);
    const spa = await get('/schemes/eligibility');
    assert.strictEqual(spa.s, 200);
    assert.match(spa.b, /FARM\.RAJ/);
  });
  it('serves news feed', async () => {
    const r = await get('/api/news');
    assert.strictEqual(r.s, 200);
    assert.ok(JSON.parse(r.b).count >= 4);
  });
  it('filters schemes by department', async () => {
    const r = await get('/api/schemes?dept=Horticulture');
    const d = JSON.parse(r.b);
    assert.ok(d.count >= 1 && d.depts.length >= 5);
  });
  it('answers in Marwari and Bagri', async () => {
    const m = await post('/api/chat', { message: 'PM-KISAN kaise milega', lang: 'mwr' });
    assert.strictEqual(m.s, 200);
    assert.match(m.b.reply, /मिलै|खाता/);
    const b = await post('/api/chat', { message: 'mandi bhav', lang: 'bgq' });
    assert.strictEqual(b.s, 200);
    assert.match(b.b.reply, /मिलाओ/);
  });
  it('falls back to Hindi for other dialects', async () => {
    const r = await post('/api/chat', { message: 'gehu ki kheti', lang: 'hoj' });
    assert.strictEqual(r.s, 200);
    assert.ok(r.b.reply.length > 20);
  });
  it('exposes AI status without leaking keys', async () => {
    const r = await get('/api/ai/status');
    assert.strictEqual(r.s, 200);
    const d = JSON.parse(r.b);
    assert.ok(d.engine);
    assert.ok(!('key' in d) && !JSON.stringify(d).includes('META_API_KEY='));
  });
  it('runs Meta-ready scheme finder on real rules', async () => {
    const r = await post('/api/schemes/finder', { district: 'Jodhpur', landAcres: 2, crop: 'cumin', janAadhaar: true, lang: 'hi' });
    assert.strictEqual(r.s, 200);
    const d = r.b;
    assert.ok(d.top.length >= 4 && d.rulesVersion);
  });
  it('answers scheme-check intent inside chat', async () => {
    const r = await post('/api/chat', { message: 'mere liye kaun si yojana hai', lang: 'hi' });
    assert.strictEqual(r.s, 200);
    assert.match(r.b.reply, /pm-kisan|योजनाएं/);
  });
  it('SSO login returns manual steps until credentials exist', async () => {
    const r = await get('/api/sso/login');
    assert.strictEqual(r.s, 200);
    const d = JSON.parse(r.b);
    assert.strictEqual(d.configured, false);
    assert.ok(d.steps.length >= 5 && d.portal.includes('sewadwaar'));
    const me = await get('/api/sso/me');
    assert.strictEqual(JSON.parse(me.b).loggedIn, false);
  });
  it('crop doctor validates photos without guessing', async () => {
    const e1 = await post('/api/crop-doctor', { crop: 'mustard' });
    assert.strictEqual(e1.s, 400);
    const e2 = await post('/api/crop-doctor', { imageBase64: 'data:image/gif;base64,AAAA' });
    assert.strictEqual(e2.s, 400);
  });
  it('streams chat tokens (SSE) with local fallback', async () => {
    const txt = await new Promise((resolve, reject) => {
      require('node:http').get({ port: 4123, path: '/api/health' }, () => {
        const d = JSON.stringify({ message: 'gehu ki kheti', lang: 'hi' });
        const r = require('node:http').request({ port: 4123, path: '/api/chat/stream', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': d.length } }, rp => {
          let s = ''; rp.on('data', c => s += c); rp.on('end', () => resolve(s));
        });
        r.on('error', reject); r.write(d); r.end();
      }).on('error', reject);
    });
    assert.match(txt, /data: .*token/);
    assert.match(txt, /"done":true/);
  });
  it('websearch + pdf endpoints validate input', async () => {
    const w = await post('/api/websearch', { q: '' });
    assert.strictEqual(w.s, 400);
    const p = await post('/api/docs/upload-pdf', { filename: 'x.txt', dataBase64: Buffer.from('hello').toString('base64') });
    assert.strictEqual(p.s, 400);
    const a = await post('/api/docs/ask', { docId: 'nope', question: 'q?' });
    assert.strictEqual(a.s, 404);
    srv.kill();
  });
});
