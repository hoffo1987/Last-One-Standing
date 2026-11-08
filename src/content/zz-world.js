/* Repertorio modulare del mondo. Compilazione pura e deterministica, una volta
 * per arena; nessuna casualità nascosta, nessuna modifica ai cataloghi storici. */
(function(G){
  'use strict';
  const D=G.LOS_DATA,cache=new Map();
  const traits={
    leale:['2 ally:AB fid:B>A+8 promise:A>B=protezione','{A} controlla {x} insieme a {B} e promette di proteggerl[B:o/a] quando servirà.'],
    traditore:['2 ally:AB con:B=valore steal:A<B=valore @secret','{A} propone a {B} di controllare {x}, poi approfitta della distrazione per sottrarre {valore:B}.'],
    codardo:['1 en:A+6 mo:A-3','{A} resta lontan[A:o/a] da {x} e riprende fiato. Evitare il rischio costa un po’ di fiducia in sé.'],
    spietato:['2 enemy:AB hit:A>B @agg','{A} usa {x} come punto di riferimento per sorprendere {B} e colpir[B:lo/la] senza esitare.'],
    pacifista:['2 enemy:AB rel:AB+8 pau:B>A-6','{A} propone a {B} di non contendersi {x}. La tensione scende e il confronto diventa meno minaccioso.'],
    stratega:['1 con:A=mappa en:A+5','{A} confronta {x} con {mappa:A} e rinuncia a una deviazione inutile, risparmiando energie.'],
    impulsivo:['1 en:A-7 mo:A+3','{A} affronta i preparativi presso {x} senza aspettare. Si sente meglio, ma spende più energie del necessario.'],
    cacciatore:['1 +cibo:A @food','{A} esamina le tracce di rifornimenti accanto a {x} e recupera {cibo}.'],
    guaritore:['2 con:A=med need:B=ferito -med:A cure:B @heal','{A} usa {med:A} per aiutare {B}, tenendosi al riparo presso {x}.'],
    sopravvissuto:['1 stat:A<en45 en:A+10','{A} riconosce la propria stanchezza e si concede una pausa presso {x}, prima che diventi un errore.'],
    carismatico:['2 fid:B>A+8 ris:B>A+4 @soc','{A} spiega a {B} come orientarsi rispetto a {x}. La spiegazione convince più di uno slogan.'],
    paranoico:['1 con:A=mappa en:A-3 mo:A+5','{A} ricontrolla {x} sulla propria mappa. Il controllo richiede tempo, ma calma i sospetti.'],
    fortunato:['1 +attrezzo:A @luck','{A} nota {attrezzo} accanto a {x}: un ritrovamento fortunato, senza proprietario in vista.'],
    sfortunato:['1 en:A-5 mo:A-3','{A} deve ricominciare i preparativi presso {x} dopo un piccolo contrattempo. La pazienza finisce prima del lavoro.'],
    furtivo:['2 con:B=cibo steal:A<B=cibo @secret @stl','{A} distrae {B} indicando {x} e sottrae {cibo:B} dallo zaino.'],
    bruto:['1 en:A-6 +attrezzo:A','{A} apre a forza una cassetta abbandonata presso {x} e recupera {attrezzo}. Le braccia si fanno sentire.'],
    ingegnoso:['1 con:A=attrezzo +trap:A @int','{A} usa {attrezzo:A} per assemblare {trap} vicino a {x}. Controlla il congegno e lo ripone nello zaino per usarlo al momento giusto.'],
    folle:['1 mo:A+5 en:A-4','{A} prova tre modi assurdi di descrivere {x}, poi sceglie il meno utile. Almeno si diverte.'],
    romantico:['2 couple:AB amo:A>B+6 mo:A+4 mo:B+4','{A} racconta a {B} come ricorderà questo momento presso {x}, se la coppia arriverà alla fine.'],
    vendicativo:['2 grudge:A>B pau:B>A+8 ris:A>B-5','{A} incontra {B} presso {x} e ricorda il rancore ancora aperto. Non attacca, ma non lascia dubbi.'],
    clemente:['2 grudge:A>B forgive:A>B @soc','{A} ascolta {B} presso {x} e decide di rinunciare al rancore. Il passato rimane, la caccia finisce.'],
    generoso:['2 con:A=cibo give:A>B=cibo @give','{A} consegna {cibo:A} a {B} presso {x}. Non chiede niente in cambio.'],
    avido:['2 con:B=valore steal:A<B=valore @secret','{A} usa la discussione su {x} per avvicinarsi a {B} e sottrarre {valore:B}.'],
    esibizionista:['1 star:A en:A-3 @show','{A} presenta {x} come se fosse una grande scoperta. La spiegazione è così teatrale da attirare attenzione.'],
    ubriacone:['1 con:A=alcol alcol:A','{A} si ferma presso {x} e beve {alcol:A}, rinunciando a mantenere la testa del tutto lucida.'],
    superstizioso:['1 con:A=amuleto mo:A+6','{A} osserva {amuleto:A}, poi {x}. Cerca un legame fra i segni e ritrova coraggio.'],
    goloso:['1 con:A=cibo cibo:A','{A} sceglie una pausa presso {x} e mangia {cibo:A}, senza aspettare il prossimo pasto.'],
    sonnambulo:['1 en:A+5 mo:A-3','{A} si appisola presso {x} e si sveglia nello stesso punto. Il riposo aiuta, la confusione un po’ meno.'],
    leader:['3 al:ABC @soc','{A} usa {x} come riferimento comune e propone a {B} e {C} un’alleanza. Entrambi accettano.'],
    solitario:['1 en:A+7 mo:A-2','{A} si concentra su {x} senza cercare compagnia. La pausa restituisce energie, ma pesa sul morale.'],
  };
  const eventActions=[
    ['1 +cibo:A @food','{A} controlla il materiale rimasto presso {x} e trova {cibo}.','d'],
    ['1 +med:A @heal','{A} ispeziona una custodia abbandonata presso {x}: contiene {med}.','d'],
    ['1 +mappa:A @int','{A} raccoglie {mappa} tra i fogli rimasti accanto a {x}. Ora ha un riferimento per orientarsi.','d'],
    ['2 con:A=cibo give:A>B=cibo @give','{A} raggiunge il punto occupato da {B}, presso {x}, e consegna {cibo:A}.','d'],
    ['2 con:A=med need:B=ferito -med:A cure:B @heal','{A} usa {med:A} per rimettere in sesto {B}, al riparo presso {x}.','d'],
    ['2 owe:A>B con:A=valore give:A>B=valore repay:A>B','{A} incontra {B} presso {x}, consegna {valore:A} e salda il debito.','d'],
    ['2 grudge:A>B forgive:A>B','{A} e {B} si fermano presso {x}. Dopo una spiegazione, {A} rinuncia al rancore.','n'],
    ['2 ally:AB fid:A>B+6 en:A+4 en:B+4','{A} e {B} riparlano dell’imprevisto vissuto presso {x}. La pausa comune restituisce energie e rafforza la fiducia di {A}.','n'],
    ['2 couple:AB mo:A+6 mo:B+6','{A} e {B} si concedono una pausa presso {x}. Per un momento, la gara sembra più lontana.','n'],
    ['2 con:B=attrezzo steal:A<B=attrezzo @secret @stl','{A} finge interesse per {x} e sottrae {attrezzo:B} a {B}.','d'],
  ];
  const trials={
    for:['1','+attrezzo:A','en:A-9',
      ['{A} libera una cassetta incastrata presso {x} e recupera {attrezzo}.','{A} prova a liberare una cassetta presso {x}, ma deve fermarsi a riprendere fiato.'],
      ['{A} solleva il materiale che copriva una custodia presso {x}: dentro trova {attrezzo}.','{A} solleva il materiale presso {x}, ma non riesce a raggiungere la custodia e si affatica.'],
      ['{A} sposta un contenitore pesante presso {x} e ne recupera {attrezzo}.','{A} tenta di spostare un contenitore presso {x}, consuma energie e deve rinunciare.']],
    agi:['1','+valore:A','en:A-8',
      ['{A} recupera {valore} da uno spazio stretto presso {x}, senza perdere l’equilibrio.','{A} si piega per recuperare qualcosa presso {x}, ma deve rinunciare dopo diversi tentativi.'],
      ['{A} mantiene in equilibrio una scatola presso {x} e ne estrae {valore}.','{A} tenta di tenere ferma una scatola presso {x}; non trova niente e si affatica.'],
      ['{A} raggiunge una custodia tra gli ingombri presso {x} e trova {valore}.','{A} cerca una custodia tra gli ingombri presso {x}, ma deve tornare alla posizione iniziale.']],
    int:['1','+mappa:A','mo:A-5',
      ['{A} ricostruisce i riferimenti di {x} e completa {mappa}.','{A} tenta di ricostruire i riferimenti di {x}, ma scarta il disegno perché contraddittorio.'],
      ['{A} confronta due indicazioni presso {x} e ne ricava {mappa}.','{A} confronta due indicazioni presso {x}, ma non riesce a risolvere il dubbio.'],
      ['{A} ordina le annotazioni trovate presso {x} e compone {mappa}.','{A} ordina le annotazioni presso {x}, poi riconosce che manca un passaggio e rinuncia.']],
    car:['2','al:AB','fid:B>A-7',
      ['{A} propone a {B} un piano presso {x}; {B} accetta di formare un’alleanza.','{A} propone un piano presso {x}, ma {B} trova la spiegazione poco credibile.'],
      ['{A} chiarisce a {B} il vantaggio di collaborare presso {x}. Nasce un’alleanza.','{A} cerca di convincere {B} presso {x}, ma le parole suonano troppo opportuniste.'],
      ['{A} lascia parlare {B}, poi formula un accordo presso {x}. I due si alleano.','{A} cerca un accordo presso {x}, ma interrompe {B} nel momento sbagliato.']],
    fort:['1','+amuleto:A','mo:A-4',
      ['{A} apre una tasca abbandonata presso {x} e trova {amuleto}.','{A} apre una tasca abbandonata presso {x}: è vuota. La delusione pesa.'],
      ['{A} nota {amuleto} sotto un involto presso {x}: una coincidenza fortunata.','{A} controlla un involto presso {x}, ma trova soltanto un vecchio nodo.'],
      ['{A} sceglie una scatola fra quelle rimaste presso {x} e trova {amuleto}.','{A} sceglie una scatola presso {x}. È già stata svuotata.']],
    res:['1','en:A+8','en:A-8',
      ['{A} dosa lo sforzo durante i preparativi presso {x} e riesce a recuperare energie.','{A} insiste troppo nei preparativi presso {x} e finisce per stancarsi ancora.'],
      ['{A} alterna lavoro e pause presso {x}; alla fine si sente più in forze.','{A} salta le pause presso {x} e deve fermarsi per la stanchezza.'],
      ['{A} conclude con calma i controlli presso {x}, conservando abbastanza energie per riprendersi.','{A} prolunga i controlli presso {x} oltre il necessario e si affatica.']],
    furt:['1','+med:A','en:A-6',
      ['{A} cerca senza farsi notare fra gli oggetti abbandonati presso {x} e recupera {med}.','{A} cerca presso {x}, ma produce troppo rumore e interrompe il tentativo senza trovare nulla.'],
      ['{A} apre in silenzio una custodia incustodita presso {x}: contiene {med}.','{A} prova ad aprire una custodia presso {x}, ma rinuncia quando il fermo fa rumore.'],
      ['{A} individua una tasca dimenticata presso {x} e ne recupera {med} senza richiamare attenzione.','{A} controlla una tasca presso {x}; il materiale fruscia e deve rinunciare.']],
    cor:['1','mo:A+9','mo:A-7',
      ['{A} esamina {x} senza farsi dominare dall’incertezza e ritrova fiducia.','{A} tenta di esaminare {x}, ma l’incertezza ha la meglio e deve fermarsi.'],
      ['{A} affronta i dubbi su {x} un passo alla volta e si sente più sicur[A:o/a].','{A} lascia che i dubbi su {x} si accumulino e perde fiducia.'],
      ['{A} mantiene la calma durante i controlli presso {x}; aver resistito alla pressione aiuta.','{A} interrompe i controlli presso {x}, sopraffatt[A:o/a] dalla pressione.']],
    emp:['2','mo:B+10 fid:B>A+6','mo:A-4',
      ['{A} ascolta le preoccupazioni di {B} presso {x}. {B} si sente meglio e si fida di più.','{A} prova a rassicurare {B} presso {x}, ma sceglie parole poco utili e si scoraggia.'],
      ['{A} aiuta {B} a mettere in ordine i pensieri presso {x}. Il morale di {B} risale.','{A} cerca di capire {B} presso {x}, ma insiste su una domanda fuori luogo.'],
      ['{A} riconosce la tensione di {B} presso {x} e lascia spazio a uno sfogo. {B} ritrova fiducia.','{A} scambia il silenzio di {B} per ostilità presso {x} e ne rimane delus[A:o/a].']],
    sop:['1','+cibo:A','en:A-6',
      ['{A} controlla la conservazione di una scorta presso {x} e recupera {cibo}.','{A} controlla una scorta presso {x}, ma deve scartarla dopo una lunga verifica.'],
      ['{A} riconosce una confezione ancora utilizzabile presso {x} e trova {cibo}.','{A} esamina una confezione presso {x}, ma non si fida abbastanza da conservarla.'],
      ['{A} distingue le scorte protette da quelle rovinate presso {x} e recupera {cibo}.','{A} cerca scorte protette presso {x}, ma la ricerca costa energie senza risultati.']],
  };
  const developments=[
    ['Segnale coperto','Il rumore copre il primo avvertimento.','non distingue il segnale e','reagisce in ritardo e','si concentra sul movimento e'],
    ['Passaggio ingombro','Gli ingombri riducono lo spazio per reagire.','si incastra tra gli ingombri e','urta un ostacolo e','evita gli ingombri e'],
    ['Controllo interrotto','Il controllo di sicurezza viene interrotto a metà.','si affida al controllo incompleto e','esita sul controllo e','riprende il controllo dall’inizio e'],
    ['Avviso tardivo','Il pericolo diventa evidente soltanto all’ultimo momento.','reagisce troppo tardi e','si accorge tardi del rischio e','riconosce l’ultimo segnale e'],
    ['Ritmo irregolare','Le pause tra due scatti hanno una durata irregolare.','scambia una pausa per la fine del pericolo e','sbaglia il tempo della reazione e','aspetta il momento più stabile e'],
    ['Visuale coperta','Un telo caduto copre parte della visuale.','si fida della visuale incompleta e','scosta il telo troppo tardi e','controlla il lato scoperto e'],
    ['Eco ingannevole','Un’eco rende difficile capire da dove arrivi il segnale.','segue l’eco sbagliata e','si gira dalla parte sbagliata e','cerca il riferimento visibile e'],
    ['Appoggio incerto','Il punto scelto come appoggio non è stabile.','carica tutto il peso sull’appoggio e','perde l’appoggio e','rinuncia all’appoggio incerto e'],
    ['Secondo scatto','Un secondo scatto arriva dopo una pausa apparentemente sicura.','abbassa la guardia prima del secondo scatto e','viene sorpres[A:o/a] dal secondo scatto e','aspetta anche il secondo scatto e'],
    ['Spazio ridotto','Il materiale accumulato lascia poco margine di manovra.','tenta una manovra troppo ampia e','sbaglia la misura della manovra e','riduce i movimenti al necessario e'],
  ];
  const softDevelopments=[
    ['Versioni in conflitto','Circolano due versioni incompatibili della consegna.','non verifica la versione e','si confonde fra le versioni e','ricostruisce le versioni e'],
    ['Scadenza ridotta','La risposta va preparata con meno tempo del previsto.','risponde senza controllare e','si lascia mettere fretta e','dichiara ciò che ha verificato e'],
    ['Domanda pubblica','La richiesta di chiarimenti viene fatta davanti agli altri.','improvvisa una certezza falsa e','si contraddice davanti agli altri e','risponde senza fingere certezze e'],
    ['Controllo incrociato','Le informazioni vengono confrontate con un secondo registro.','ignora il confronto e','confonde i due registri e','confronta i riferimenti e'],
    ['Fonte mancante','Una delle fonti citate non è disponibile.','inventa la fonte mancante e','si affida a una fonte non controllata e','distingue i fatti dalle ipotesi e'],
    ['Allegato tardivo','Un allegato arriva quando la discussione è già iniziata.','ignora l’allegato e','interpreta male l’allegato e','legge l’allegato prima di rispondere e'],
    ['Correzione pubblica','Un errore viene segnalato davanti a chi segue il confronto.','nega un errore verificabile e','si irrigidisce sulla correzione e','accetta di ricontrollare e'],
    ['Conferma contestata','La conferma citata non coincide con quella registrata.','si attribuisce una conferma inesistente e','cita la conferma sbagliata e','verifica i riferimenti della conferma e'],
    ['Ordine invertito','Le informazioni vengono presentate in ordine inverso.','confonde l’effetto con la causa e','perde il filo dei passaggi e','ricostruisce l’ordine dei fatti e'],
    ['Rettifica urgente','Viene chiesta una rettifica prima del prossimo verdetto.','rifiuta ogni rettifica e','corregge senza rileggere e','limita la rettifica ai fatti verificati e'],
  ];
  function compile(theme){
    if(cache.has(theme.id))return cache.get(theme.id);
    const source=D.worldScenes?.[theme.id];if(!source)return null;
    const scenes=source.trim().split('\n').map((line,i)=>{const p=line.trim().split('|');if(p.length!==7)throw Error('Situazione incompleta: '+theme.id+'/'+i);return {zone:+p[0],title:p[1],anchor:p[2],warning:p[3],fatal:p[4],hurt:p[5],safe:p[6]};});
    const out={version:1,scenes,events:[],traits:[],trials:[],deaths:[],disasters:[],dialogues:[],quotes:[],items:[]};
    const add=(category,scene,index,head,text,phase)=>out[category].push({id:'mondo-'+theme.id+'-'+category+'-'+index,phase:phase||'d',raw:head+' at:'+scene.zone+' | '+text.replaceAll('{x}',scene.anchor),zone:scene.zone,...(category==='events'&&index%10===7?{afterScene:Math.floor(index/10)}:{})});
    scenes.forEach((s,i)=>{
      eventActions.forEach(([head,text,phase],j)=>add('events',s,i*10+j,head,text,phase));
      Object.entries(trials).forEach(([attr,def],j)=>{
        const [n,ok,ko,...texts]=def,[yes,no]=texts[i%texts.length],dc=10+i%4;
        const req=attr==='emp'?' stat:B<mo75':attr==='car'?'':attr==='res'?' stat:A<en65':'';
        add('trials',s,i*10+j,n+req+' *0.3 test:A='+attr+dc+' ok:'+ok.split(' ').join(' ok:')+' ko:'+ko.split(' ').join(' ko:'),yes+' || '+no,i%3===0?'n':'d');
      });
      const ds=theme.soft?softDevelopments:developments;
      ds.forEach(([name,intro,dead,hurt,safe],j)=>{
        const id='mondo-'+theme.id+'-disasters-'+(i*10+j),prefix='1 at:'+s.zone+' ';
        out.disasters.push({id,n:s.title+' — '+name,zone:s.zone,scene:i,intro:'Imprevisto locale presso '+s.anchor+'. '+s.warning+' '+intro,
          out:[prefix+'d:A | Presso '+s.anchor+', {A} '+dead+' '+s.fatal+'.',prefix+'s:A=ferito | Presso '+s.anchor+', {A} '+hurt+' '+s.hurt+'.',prefix+'en:A-5 | Presso '+s.anchor+', {A} '+safe+' '+s.safe+'. Lo sforzo costa energie.'].join('\n')});
      });
      const deathActions=[
        ['1 d:A','{A} ignora il segnale presso {x}: '+s.warning+' {A} '+s.fatal+'.'],
        ['2 k:A>B',theme.soft?'{A} mette {B} sotto pressione sul problema di {x}. {B} '+s.fatal.replaceAll('[A:','[B:')+'.':'{A} spinge {B} verso {x} proprio quando il pericolo si manifesta. {B} '+s.fatal.replaceAll('[A:','[B:')+'.'],
        ['2 tr:A>B','{A} tradisce {B} presso {x}, sfruttando il momento peggiore. {B} '+s.fatal.replaceAll('[A:','[B:')+'.'],
        ['2 grudge:A>B k:A>B','{A} affronta {B} presso {x} per il rancore ancora aperto. Nel confronto, {B} '+s.fatal.replaceAll('[A:','[B:')+'.'],
        ['1 stat:A<en25 d:A','{A} arriva al limite delle energie presso {x}. Non riesce a reagire e '+s.fatal+'.'],
        ['1 stat:A<hp40 d:A','{A} non è in condizioni di affrontare il problema presso {x}. Nel momento decisivo, '+s.fatal+'.'],
        ['1 need:A=ferito d:A','{A} insiste presso {x} nonostante le difficoltà già presenti. Perde il momento utile e '+s.fatal+'.'],
        ['2 enemy:AB k:A>B','{A} costringe {B} a occuparsi del problema presso {x}. {B} non riesce a sottrarsi e '+s.fatal.replaceAll('[A:','[B:')+'.'],
        ['1 d:A','{A} scambia una pausa per la fine del rischio presso {x}. Il problema riparte: {A} '+s.fatal+'.'],
        ['1 d:A','{A} prova a risolvere da sol[A:o/a] il problema presso {x}, senza controllare l’ultimo passaggio. {A} '+s.fatal+'.'],
      ];
      if(theme.soft){
        const ending=s.fatal.replaceAll('[A:','[B:');
        deathActions[0][1]='{A} affronta il problema di {x} senza controllare i riferimenti. {A} '+s.fatal+'.';
        deathActions[1][1]='{A} chiede pubblicamente a {B} di spiegare il problema di {x}. {B} '+ending+'.';
        deathActions[2][1]='{A} tradisce la fiducia di {B} e porta il problema di {x} davanti a chi decide. {B} '+ending+'.';
        deathActions[3][1]='{A} sfrutta il rancore verso {B} per contestare il problema di {x}. {B} '+ending+'.';
        deathActions[4][1]='{A} affronta la discussione su {x} senza più energie per ricontrollare. {A} '+s.fatal+'.';
        deathActions[5][1]='{A} ha già poca credibilità quando arriva il confronto su {x}. {A} '+s.fatal+'.';
        deathActions[6][1]='{A} cerca di riscattare le difficoltà precedenti nel confronto su {x}, ma peggiora la situazione: '+s.fatal+'.';
        deathActions[7][1]='{A} mette {B} alle strette sul problema di {x}. {B} '+ending+'.';
        deathActions[8][1]='{A} considera chiuso il problema di {x}, ma manca ancora il confronto finale. {A} '+s.fatal+'.';
        deathActions[9][1]='{A} si presenta al confronto su {x} senza ricontrollare l’ultimo passaggio. {A} '+s.fatal+'.';
      }
      deathActions.forEach(([head,text],j)=>add('deaths',s,i*10+j,head+' *0.7',text,i%4===0?'n':'d'));
      const dialogueActions=[
        ['alleati','Riparliamo dell’imprevisto che abbiamo vissuto presso '+s.anchor+'?','Sì. Riprendere fiato non significa aver dimenticato.','aftermath'],
        ['alleati','Se ci separiamo, prendiamo '+s.anchor+' come riferimento?','Come riferimento, sì. Non prometto che il passaggio sarà libero.'],
        ['coppia','Ti va una pausa vicino a '+s.anchor+'?','Una pausa insieme. Il resto del piano lo discutiamo dopo.'],
        ['coppia','Quando racconteremo di '+s.anchor+', quale parte salteremo?','Quella in cui fingiamo entrambi di sapere cosa fare.'],
        ['rivali','Non scambiare il mio silenzio vicino a '+s.anchor+' per fiducia.','Non avevo intenzione di farlo.'],
        ['rivali','Su '+s.anchor+' abbiamo almeno la stessa prudenza?','La prudenza sì. Il resto resta da vedere.'],
        ['sconosciuti','Hai capito cosa succede presso '+s.anchor+'?','Non abbastanza da inventare una risposta.'],
        ['sconosciuti','Posso controllare '+s.anchor+' senza intralciarti?','Finché non metti le mani sulle mie cose.'],
        ['alleati','Ti devo ancora qualcosa. Ne parliamo dopo '+s.anchor+'?','Sì. Un debito non si cancella soltanto perché ne parliamo.','debt'],
        ['sconosciuti','Prima controlliamo '+s.anchor+' o le tue condizioni?','Le mie condizioni. Non facciamo finta che non contino.','hurt'],
      ];
      dialogueActions.forEach(([kind,a,b,need],j)=>out.dialogues.push({id:'mondo-'+theme.id+'-dialogues-'+(i*10+j),zone:s.zone,kind,need,...(need==='aftermath'?{afterScene:i}:{}),lines:[a,b]}));
      const quoteActions=[
        ['kill','Il conto si chiude qui, presso '+s.anchor+'.'],['betray','Il nostro patto non ha superato '+s.anchor+'.'],
        ['ally','Decidiamo insieme cosa fare con '+s.anchor+'.'],['love','Anche qui, vicino a '+s.anchor+', ti riconoscerei.'],
        ['saved','Ti devo il fatto di essere ancora qui, vicino a '+s.anchor+'.'],['taunt','Ricordati questo incontro presso '+s.anchor+'.'],
        ['disaster','La prossima volta controllerò prima '+s.anchor+'.'],['feast','Prima il rifornimento. Poi penserò a '+s.anchor+'.'],
        ['revenge','Il rancore mi ha portato fin qui, vicino a '+s.anchor+'.'],['spare','Fermiamoci qui, presso '+s.anchor+'.'],
      ];
      quoteActions.forEach(([kind,text],j)=>out.quotes.push({id:'mondo-'+theme.id+'-quotes-'+(i*10+j),zone:s.zone,kind,text}));
    });
    Object.entries(traits).forEach(([trait,[head,text]],i)=>{
      for(let j=0;j<10;j++){
        const s=scenes[(i*7+j*3+j%3)%scenes.length];
        const body=theme.soft&&trait==='spietato'?'{A} mette {B} sotto pressione su {x} e ne indebolisce la reputazione senza concedere una pausa.':text;
        add('traits',s,i*10+j,head+' trait:A='+trait+' *0.6',body,(trait==='sonnambulo'||trait==='romantico'||j%4===0)?'n':'d');
      }
    });
    const data=D.worldItemData,own=data.roots[theme.id],soft=!!theme.soft;
    Object.entries(own).forEach(([type,roots])=>data.split(roots).forEach((name,i)=>{
      const endings=soft&&['arma','armatura','trap','med'].includes(type)?data.paper:data.tails[type];
      endings.forEach((tail,j)=>out.items.push({id:'mondo-'+theme.id+'-item-'+type+'-'+i+'-'+j,type,name:name+' '+tail}));
    }));
    out.counts=Object.fromEntries(['events','traits','trials','deaths','disasters','dialogues','quotes','items'].map(k=>[k,out[k].length]));
    out.counts.scenes=scenes.length;cache.set(theme.id,out);return out;
  }
  function follows(scene,zone,people,history){
    return (history||[]).some(p=>p.worldIncident?.scene===scene&&p.affectedZones?.includes(zone)&&people.every(t=>t.zone===zone&&p.worldIncident.exposed.includes(t.id)));
  }
  function dialogues(catalog,zone,kind,a,b,history){
    return (catalog?.dialogues||[]).filter(x=>x.zone===zone&&x.kind===kind&&(!x.need||x.need==='debt'&&a.owes?.[b.id]||x.need==='hurt'&&(b.hp<55||Object.keys(b.st||{}).some(k=>['ferito','malato','avvelenato'].includes(k)))||x.need==='aftermath'&&follows(x.afterScene,zone,[a,b],history)));
  }
  function itemNames(catalog){const result={};for(const item of catalog?.items||[])(result[item.type]||=[]).push(item.name);return result;}
  D.world={version:1,compile,dialogues,itemNames,follows};
})(typeof window!=='undefined'?window:globalThis);
