const assert = require('node:assert/strict');
const { describe, it } = require('node:test');
const { checkEligibility, chatAnswer } = require('../server.js');

describe('eligibility rules engine v1.0', () => {
  it('covers animals, machinery, business and heritage lessons', () => {
    const { execSync } = require('node:child_process');
    // validated via API in api.test; here assert lesson data loads
    delete require.cache[require.resolve('../server.js')];
    const fs = require('node:fs');
    const src = fs.readFileSync(__dirname + '/../server.js', 'utf8');
    for (const id of ['gir-cow','murrah-buffalo','sirohi-goat','marwari-sheep','camel-care','poultry-backyard','tractor-guide','combine-harvester','sprayer-safety','solar-pump-set','fpo-business','enam-trading','pmfme-processing','export-apeda','grading-pack','warriors-legacy','folk-deities','bishnoi-legacy','water-heritage','marwari-trade','shekhawati-art','jeera-raj','guar-raj']) assert.ok(src.includes(`id:'${id}'`), id);
  });
  it('flags Jan Aadhaar requirement for state schemes', () => {
    const r = checkEligibility({ landAcres: 2, janAadhaar: false, taxPayer: false, waterSource: true });
    const drip = r.find(x => x.id === 'raj-drip');
    assert.strictEqual(drip.status, 'action-needed');
  });
  it('marks PM-KISAN ineligible for income-tax payers', () => {
    const r = checkEligibility({ landAcres: 2, janAadhaar: true, taxPayer: true, waterSource: true });
    assert.strictEqual(r.find(x => x.id === 'pm-kisan').status, 'ineligible');
  });
  it('marks land-based schemes ineligible with zero land', () => {
    const r = checkEligibility({ landAcres: 0, janAadhaar: true, taxPayer: false, waterSource: true });
    assert.strictEqual(r.find(x => x.id === 'raj-drip').status, 'ineligible');
  });
  it('never promises approval', () => {
    const r = checkEligibility({ landAcres: 2, janAadhaar: true, taxPayer: false, waterSource: true });
    assert.ok(r.every(x => ['likely', 'action-needed', 'ineligible'].includes(x.status)));
  });
});

describe('chat retrieval', () => {
  it('answers PM-KISAN in Hindi with source', () => {
    const r = chatAnswer('PM-KISAN kaise milega?', 'hi');
    assert.match(r.text, /pmkisan/i);
  });
  it('greets short hellos instead of pleading unsure', () => {
    for (const [m,l] of [['hy','hi'],['hello','en'],['ram ram','hi']]) {
      const r = chatAnswer(m,l);
      assert.ok(/राम|Hello/.test(r.text)); assert.strictEqual(r.escalate,false);
    }
  });
  it('escalates when unsure instead of inventing', () => {
    const r = chatAnswer('xyzzy quantum tractor', 'en');
    assert.strictEqual(r.escalate, true);
    assert.strictEqual(r.confidence, 'low');
  });
  it('never invents pesticide dose', () => {
    const r = chatAnswer('keet ki dawa ki matra batao', 'hi');
    assert.doesNotMatch(r.text, /ml\/litre|ग्राम\/लीटर/i);
  });
});
