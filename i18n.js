/* Bascule FR / EN pour le portfolio.
   Le français reste dans index.html (source de vérité) ; ce fichier ne contient que l'anglais.
   Les éléments sont ciblés par sélecteur, sans attribut à ajouter dans le HTML. */
(() => {
  const $ = (s, r = document) => [...r.querySelectorAll(s)];
  const cards = $('#projects .pcard');
  const items = [];
  const put = (els, ...en) => els.forEach((el, i) => en[i] !== undefined && items.push([el, en[i]]));
   
  const card = (i, role, title, sub, descs, heads, cta) => {
    const c = cards[i];
    if (!c) return;
    put($('.prole', c), role);
    if (title) put($('.ptitle', c), title);
    put($('.psub', c), sub);
    put($('.pdesc', c), ...descs);
    put($('.pb > h3:not(.ptitle)', c), ...heads);
    if (cta) put($('.pcta a', c), cta);
  };

  /* ---------- Général ---------- */
  put($('.nl a'), 'profile', 'projects', 'contact');
  put($('.hero-desc'), 'animation programmer &amp; 3C system (character/camera/controls), gameplay programming, Unreal Engine 5 and Unity.');
  put($('.hero-cta a'), 'Projects →', 'Contact');
  put($('.st'), 'Profile', 'Projects', 'Contact');
  put($('#contact .cg > p'), 'Open to opportunities — gameplay programmer, 3C / animation developer, or both.');

  put($('#about p.r'), `I am a <strong>Gameplay Programmer</strong> specialized in <strong>Unreal Engine (C++)</strong> and <strong>Unity (C#)</strong>, with particular expertise in <strong>3C Programming</strong> and <strong>Animation Programming</strong>. I design and build responsive gameplay systems, working notably on characters, camera systems, controls, locomotion, state machines and animation integration.<br>
I also work on <strong>AI</strong>, gameplay mechanics, <strong>debugging</strong>, <strong>optimization</strong> and designing technical architectures suited to production constraints. I pay particular attention to <strong>game feel</strong> and to the technical quality of the systems I build, aiming to produce clean, maintainable and scalable code.<br>
I am currently finishing a <strong>RNCP level 6 bachelor's degree in video game development and gameplay programming</strong>. My training has let me work on projects using Unreal Engine and Unity, in areas ranging from 3C and animation systems to AI, procedural generation and real-time systems programming.<br>
Among my projects, I notably worked on <strong>Despair</strong>, a third-person stealth game, where I developed the <strong>3C, AI and animation systems</strong>. I also contributed to a <strong>VR serious game for La Poste</strong>, working notably on <strong>hand and finger IK</strong> systems, animations and locomotion systems.<br>`);

  /* ---------- Despair ---------- */
  card(0, 'Student game · Objectif 3D · 1st Year', null,
    'Third-person stealth — Cursed Constantinople',
    [`<strong>Despair</strong> is a third-person stealth game developed in <strong>Unreal Engine</strong> during my first year of training. On this project I was responsible for programming the <strong>3C (Character, Camera, Controls)</strong>, the <strong>enemy AI</strong> (the Specter and the Giant Eye), and the <strong>integration and programming of the animation systems</strong> for the player character and the enemies.<br><br>
The project was carried out in an educational setting with several technical constraints. We had to build the mechanics using only the tools and concepts covered in class. Advanced features or components that simplify development, such as <strong>Box Cast</strong>, <strong>Sphere Cast</strong> or certain prebuilt Unreal Engine components, were deliberately forbidden. This pushed us to design our own solutions, better understand the underlying systems, and build a solid problem-solving methodology.<br><br>
We also worked with <strong>Perforce (P4V)</strong> throughout production, getting familiar with good practices for <strong>version control</strong>, file synchronization and <strong>collaborative work</strong> on an Unreal Engine project. This experience brought us closer to the conditions of a professional production environment.<br>`],
    [], 'View on Steam');

  /* ---------- La Poste ---------- */
  card(1, 'Animation Developer · Serious Game · 2nd Year', null,
    'VR serious game for training and raising awareness of occupational risks.',
    [`From <strong>January to March 2026</strong>, I contributed to the development of a <strong>serious game</strong> for employee training and awareness, designed to support safety procedures and internal best practices. Developed in <strong>Unity and C#</strong>, the project was carried out within production constraints.<br><br>
I focused on <strong>animation programming</strong> and gameplay integration, notably the <strong>IK systems for the character's hands and fingers</strong>, animation-driven gameplay features, and a <strong>movement distortion</strong> system simulating impaired locomotion states, such as the effects of intoxication, to improve training scenarios and user awareness.<br><br>
I worked within a <strong>team production pipeline</strong>, contributing to debugging, feature integration and gameplay tuning under strict deadlines.<br><br>
Building on the experience gained in our previous projects, we also put into practice and passed on our <strong>version control best practices with Perforce (P4V)</strong>. As second-year programming students, we helped first-year students get started with <strong>Perforce</strong>, teaching them good practices for synchronization, file management and collaborative work on a Unity project.<br>`],
    [], 'Watch on LinkedIn');
  const tremors = $('.tag', cards[1]).find(t => t.textContent.trim() === 'Tremblements');
  if (tremors) put([tremors], 'Tremors');

  /* ---------- Procedural Finger IK ---------- */
  card(2, 'Personal project · Unity / C#', null,
    'Custom procedural IK system for finger interaction and object grasping.',
    [`Unity's native IK solutions for repositioning a character's limbs remain limited when it comes to precisely controlling finger phalanges. So, alongside my other projects, I developed a <strong>custom procedural IK system in C#</strong>, built on Unity's <strong>Animation Rigging</strong> module and its <code>IRigConstraint</code> interface.<br><br>
The principle is to replace the keyframed animation with a real-time procedural computation at the right moment. To detect contact with an object, each finger has an origin point from which several <strong>raycasts spread across a configurable fan of angles</strong> are emitted. When a ray hits an object on the targeted layer, the hit point is retrieved and dynamically assigned as the IK target of the corresponding phalanx. The thumb gets specific treatment because of its particular rotation axis, combining its three local axes to orient the detection fan correctly.<br><br>
Phalanx flexion is then driven by a generic <code>IKFinger</code> component, which evaluates a list of configurable constraints in <code>LateUpdate</code>. Each constraint can work in one of two modes, <strong>distance or angle</strong>, and feeds the resulting value to an <code>AnimationCurve</code>. That curve produces either a local rotation on the bone or a weight applied to the associated <code>RigConstraint</code>.<br><br>
Using <code>AnimationCurve</code> makes it possible to precisely control each finger's behavior and the <strong>feel of the grip</strong> straight from the Inspector, without touching the code. The system is also integrated with the <strong>Animator State Machine</strong> through <code>StateMachineBehaviour</code>s.<br><br>
When entering a grab state, the system asks the <code>IKManager</code> whether a collision is detected. If so, the regular animation layer is progressively replaced by the IK system, with the <code>RigBuilder</code> enabled after a short delay to avoid a visually abrupt transition. Otherwise, the keyframed animation stays in control.<br><br>
When leaving the state, the <code>RigBuilder</code> is disabled, layers are resynchronized through <code>SyncLayers()</code> and weights are reset to their default values.<br><br>
Designed as a <strong>modular, reusable personal tool</strong>, this system later served as the technical foundation for the <strong>hand and finger IK in the serious game developed for La Poste</strong>.<br>`],
    []);
  put($('.ptitle', cards[2]), 'Procedural Finger IK (Inverse Kinematics)');

  /* ---------- Adhafera ---------- */
  card(3, 'Student project · UE5 / C++', null,
    'Pre-production — Turn-based strategy',
    [`<strong>Adhafera</strong> is a pre-production project carried out over <strong>2 months</strong>, ahead of a planned <strong>8-month</strong> production. The initial concept was a tactical game combining a <strong>satellite view</strong> for planning with an <strong>FPS view</strong> for direct character control during action phases.<br><br>
During this phase, I was mainly in charge of <strong>3C</strong> programming, with a particular focus on camera and control systems. I developed the movement for the satellite and FPS views, as well as the transitions between the two perspectives. The satellite camera used a <strong>simulated orthographic</strong> projection, while the FPS view relied on a perspective camera with an adapted <strong>FOV</strong>.<br><br>
I also developed the system for <strong>transferring control between the playable characters and the satellite view</strong>. This architecture made it possible to switch from one control context to another while keeping a coherent transition between perspectives. A <strong>cover system</strong> was also prototyped to handle the character's positioning, orientation and movement along cover surfaces.<br>`,
    `During pre-production, however, early tests revealed several problems with the <strong>game feel of the FPS view</strong>. Combining tactical planning with FPS movement phases required finding ways to make that perspective more readable and engaging.<br><br>
Rather than immediately dropping this approach, I argued for keeping the FPS view and prepared a <strong>presentation with an analysis slideshow</strong> laying out different ways to address the readability and game-feel issues identified in testing. I studied different camera, control and game design solutions, comparing their advantages, constraints and impact on production.<br><br>
I then presented and defended these proposals <strong>in front of the project's decision-makers</strong>, to weigh the solutions against production constraints and game design goals. The aim was to provide a concrete basis for deciding whether to keep the FPS view or to change the project's direction.<br><br>
After analyzing the different solutions, we concluded that implementing them would require more <strong>time and resources</strong> than the project could devote to this feature. With only <strong>8 months of production planned after the 2 months of pre-production</strong>, the risk of spending too much of the production on these problems was judged too high.<br>`,
    `The project ultimately moved to a fully <strong>isometric</strong> approach, better suited to the tactical genre and to production constraints. The control-switching system was also reworked: instead of switching between the satellite view and the playable characters, control is now handed to the character only during <strong>aiming phases</strong>.<br><br>
This evolution let me work on an important pre-production problem: finding a balance between <strong>game design intent, technical feasibility and production constraints</strong>. Even though the initial solution was ultimately not retained, the prototyping and analysis identified its limits and contributed to a production decision better suited to the available resources and the project schedule.<br>`],
    ['Concept evolution', 'Pivot to an isometric view']);

  /* ---------- Audio engine ---------- */
  card(4, 'Personal project · C# / CSCore', 'Native audio engine with CSCore',
    'Lightweight audio engine to generate and manipulate sound directly in code',
    [`This project let me explore the fundamentals of <strong>real-time audio processing</strong>, from generating a waveform to playing it out: synthesis with a <strong>sine oscillator</strong>, sample-rate control, and an <strong>ADSR (Attack, Decay, Sustain, Release)</strong> envelope to give each note a natural volume evolution rather than a simple on/off signal.<br><br>
Technically, audio output relies on <strong class="code-library">CSCore</strong>: each note computes its own sample via <code class="code-method">NextSample()</code>, without knowing or managing the output device. A central manager, <code class="code-class">NoteReader</code>, implements <strong class="code-library">CSCore</strong>'s <code class="code-type">ISampleSource</code> interface, which exposes a stream of samples the library can read continuously.<br><br>
On each <code class="code-method">Read()</code> call, <code class="code-class">NoteReader</code> walks through all active notes, sums their samples to produce the <strong>audio mix</strong>, then writes the result into the requested buffer. That stream is then plugged into a <code class="code-class">WasapiOut</code>, the <strong class="code-library">CSCore</strong> class responsible for driving the audio output device through <strong>WASAPI</strong>.<br><br>
<code class="code-class">NoteReader</code> is exposed as a <strong>Singleton</strong> through a generic <code class="code-class">Singleton&lt;<span class="code-type">T</span>&gt;</code> class that I wrote, based on <code class="code-class">Lazy&lt;<span class="code-type">T</span>&gt;</code>. This architecture guarantees a single entry point to add or remove notes from anywhere in the code, without passing an explicit reference around. That is particularly useful for an engine meant to be driven dynamically, whether by a virtual synthesizer, an algorave-style <strong>live-coding</strong> system, or any other generation logic.<br>`,
    `This architecture also confronted me with the constraints of <strong>real-time audio multithreading</strong>. <code class="code-class">NoteReader</code>'s <code class="code-method">Read()</code> is called by <strong class="code-library">CSCore</strong>'s internal <strong>audio thread</strong>, which requests samples continuously at very short intervals so the buffer never runs dry.<br><br>
Meanwhile, the logic driving the engine — triggering notes in <strong>live-coding</strong>, sequencer, MIDI input, etc. — adds or removes notes from another thread. Both threads therefore access the same <code class="code-type">List&lt;<span class="code-type">Note</span>&gt;</code> at the same time, which exposes the engine to concurrent access that can cause collection-modified-during-iteration exceptions, or <strong>audio artifacts</strong> (clicks, dropouts) if a note is inserted or removed at the wrong moment.<br><br>
To secure this access, I protected every modification and read of the list with a <code class="code-class">Mutex</code>. <code class="code-method">Read()</code> always starts by copying the list into a local variable under the lock, then releases the lock and iterates over that copy for mixing. This avoids blocking the calling thread for the whole duration of audio processing, while guaranteeing that the audio thread works on a consistent state.<br><br>
The audio thread thus works on a <strong>consistent snapshot of the active notes</strong> without holding the lock throughout processing. This approach limits contention risks while guaranteeing the consistency of the data used by the audio thread.<br>`,
    `Each <code class="code-class">Note</code> also exposes an <code class="code-property">IsDispose</code> event, triggered automatically once its <strong>ADSR</strong> envelope reaches the end of the <strong>Release</strong> phase.<br><br>
<code class="code-class">NoteReader</code> subscribes to this event as soon as a note is added, so it can remove the note from the list itself when it ends. This avoids any build-up of dead notes in memory over a long session, with no manual cleanup needed.<br>`,
    `In the end, this project taught me as much about <strong>sound synthesis</strong> itself as about the rigor that <strong>real time</strong> demands: in an audio context, the slightest wait or badly synchronized access immediately turns into an audible flaw, which forces a different coding discipline from what you can afford elsewhere.<br><br>
The goal was above all to understand an audio system <strong>at the signal level</strong> rather than simply relying on the ready-made features of an existing audio engine.`],
    ['Multithreading and real time', 'Note lifecycle management', 'Wrap-up']);

  /* ---------- Bouton + logique ---------- */
  items.forEach(([el]) => (el.dataset.fr = el.innerHTML));

  const style = document.createElement('style');
  style.textContent = `.langs{display:flex;gap:6px;margin-left:24px}
.lang{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--muted);background:none;border:1px solid var(--rule);border-radius:4px;padding:4px 10px;cursor:pointer;transition:border-color .15s,color .15s,background .15s}
.lang:hover,.lang:focus-visible{border-color:var(--a1);color:var(--ink)}
.lang[aria-pressed="true"]{color:#fff;background:var(--a1);border-color:var(--a1)}
@media(max-width:820px){.langs{order:2;margin-left:auto;margin-right:12px}.nt{order:3}}`;
  document.head.append(style);

  const btns = {};
  const set = l => {
    items.forEach(([el, en]) => { el.innerHTML = l === 'en' ? en : el.dataset.fr; });
    document.documentElement.lang = l;
    Object.entries(btns).forEach(([code, b]) => b.setAttribute('aria-pressed', String(code === l)));
  };

  const wrap = document.createElement('div');
  wrap.className = 'langs';
  wrap.setAttribute('role', 'group');
  wrap.setAttribute('aria-label', 'Langue / Language');
  ['fr', 'en'].forEach(code => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'lang';
    b.textContent = code.toUpperCase();
    b.lang = code;
    b.addEventListener('click', () => {
      set(code);
      try { localStorage.setItem('lang', code); } catch (e) {}
    });
    btns[code] = b;
    wrap.append(b);
  });
  document.querySelector('.ni').append(wrap);

  let l = null;
  try { l = localStorage.getItem('lang'); } catch (e) {}
  if (l !== 'fr' && l !== 'en') l = (navigator.language || 'fr').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  set(l);
})();
