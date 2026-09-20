/** Lumina — private sheet receiver. Do not expose sheet rows in responses. */
const SPREADSHEET_ID = '1tGkfi1Bvt60dBVOy6Wum49mo_1__Tv8Lnk6G27nU0nU';
const SHEET_NAME = 'Idee';

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
function cellText(value) {
  const text = String(value || '').trim();
  return /^[=+@\-\t\r\n]/.test(text) ? "'" + text : text;
}
function doGet() { return jsonResponse({ok:true,service:'Lumina idea form'}); }
function doPost(e) {
  let lock;
  const nativeForm = e && e.parameter && e.parameter.nativeForm === '1';
  const reply = payload => {
    if (!nativeForm) return jsonResponse(payload);
    const title = payload.ok ? 'IDEA RICEVUTA' : 'INVIO NON CONFERMATO';
    const message = payload.ok ? 'La tua idea è stata salvata. Grazie per aver partecipato.' : payload.error;
    const safe = String(message).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
    return HtmlService.createHtmlOutput('<!doctype html><html lang="it"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lumina — '+title+'</title><body style="background:#080808;color:#fff;font:18px/1.7 sans-serif;padding:32px;max-width:480px;margin:auto"><h1 style="color:#ffcf02">'+title+'</h1><p>'+safe+'</p><p>Puoi tornare al sito con il pulsante Indietro del browser.</p></body></html>');
  };
  try {
    if (!e || !e.postData || e.postData.contents.length > 16000) return reply({ok:false,error:'Richiesta non valida.'});
    const data = nativeForm ? e.parameter : JSON.parse(e.postData.contents);
    const idea = typeof data.idea === 'string' ? data.idea.trim() : '';
    const name = typeof data.name === 'string' ? data.name.trim() : '';
    const className = typeof data.className === 'string' ? data.className.trim() : '';
    const submissionId = nativeForm ? Utilities.getUuid() : (typeof data.submissionId === 'string' ? data.submissionId : '');
    if (data.website || idea.length < 10 || idea.length > 2000 || name.length > 80 || className.length > 20 || !/^[a-f0-9-]{36}$/i.test(submissionId)) {
      return reply({ok:false,error:'Controlla i campi: l’idea deve contenere da 10 a 2.000 caratteri.'});
    }
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return reply({ok:false,error:'Ci sono molti invii in corso. Riprova tra poco.'});
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Missing sheet');
    const lastRow = sheet.getLastRow();
    // The same request can safely be retried after an interrupted connection.
    if (lastRow > 1 && sheet.getRange(2,5,lastRow-1,1).createTextFinder(submissionId).matchEntireCell(true).findNext()) {
      return reply({ok:true,submissionId});
    }
    const cache = CacheService.getScriptCache();
    const minute = Math.floor(Date.now()/60000).toString();
    const count = Number(cache.get('rate:'+minute) || 0);
    if (count >= 90) return reply({ok:false,error:'La raccolta è momentaneamente occupata. Riprova tra un minuto.'});
    const row = lastRow + 1;
    sheet.getRange(row,1,1,6).setValues([[new Date(),cellText(idea),cellText(name),cellText(className),submissionId,'Da leggere']]);
    sheet.getRange(row,1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    sheet.getRange(row,2,1,3).setWrap(true);
    SpreadsheetApp.flush();
    cache.put('rate:'+minute,String(count+1),90);
    return reply({ok:true,submissionId});
  } catch(error) {
    console.error('Submission failed: '+String(error));
    return reply({ok:false,error:'Invio non confermato. Riprova tra poco: la tua idea resta nel modulo.'});
  } finally { if(lock && lock.hasLock()) lock.releaseLock(); }
}
