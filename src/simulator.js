/* Esegue lo stesso motore in background, anche nella versione HTML portatile. */
(function (G) {
  'use strict';
  let worker = null, workerUrl = null, disabled = false, serial = 0;
  const jobs = new Map();
  const abortError = () => Object.assign(new Error('Calcolo annullato.'), { name: 'AbortError' });
  function dispose() {
    if (worker) worker.terminate(); worker = null;
    if (workerUrl) G.URL.revokeObjectURL(workerUrl); workerUrl = null;
  }
  function fallback(id, job) {
    G.setTimeout(() => {
      if (!jobs.has(id)) return;
      jobs.delete(id);
      try { job.resolve(G.LOS.simulate(job.cfg)); } catch (e) { job.reject(e); }
    }, 0);
  }
  function failWorker() {
    disabled = true; dispose(); jobs.forEach((job, id) => fallback(id, job));
  }
  function getWorker() {
    if (worker || disabled) return worker;
    const script = G.document && G.document.getElementById('simulation-source');
    if (!script || !script.textContent || !G.Worker || !G.Blob || !G.URL || !G.URL.createObjectURL) { disabled = true; return null; }
    const handler = '\n;self.onmessage = function (event) { const job = event.data; try { self.postMessage({id:job.id, result:self.LOS.simulate(job.cfg)}); } catch (error) { self.postMessage({id:job.id, error:String(error.message || error)}); } };';
    try {
      workerUrl = G.URL.createObjectURL(new G.Blob([script.textContent, handler], { type: 'text/javascript' }));
      worker = new G.Worker(workerUrl);
      worker.onmessage = ({ data }) => {
        const job = jobs.get(data.id); if (!job) return;
        jobs.delete(data.id);
        if (data.error) job.reject(new Error(data.error)); else job.resolve(data.result);
      };
      worker.onerror = failWorker;
      worker.onmessageerror = failWorker;
      return worker;
    } catch (e) { disabled = true; dispose(); return null; }
  }
  function simulate(cfg) {
    let input;
    try { input = G.structuredClone(cfg); } catch (e) { return Promise.reject(e); }
    return new Promise((resolve, reject) => {
      const id = ++serial, job = { cfg: input, resolve, reject }; jobs.set(id, job);
      const target = getWorker();
      if (!target) return fallback(id, job);
      try { target.postMessage({ id, cfg: input }); } catch (e) { jobs.delete(id); reject(e); }
    });
  }
  function cancel() { dispose(); jobs.forEach((job) => job.reject(abortError())); jobs.clear(); }
  G.LOS_SIMULATOR = { simulate, cancel };
})(typeof window === 'object' ? window : globalThis);
