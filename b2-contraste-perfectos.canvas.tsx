import {
  Callout,
  Code,
  CollapsibleSection,
  Divider,
  H1,
  H2,
  H3,
  Link,
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useState,
} from "cursor/canvas";

type FeedbackView = "debil" | "simple" | "ep5" | "marcas" | "ex2" | "ex1";

const DAYS: {
  day: number;
  title: string;
  trailing: string;
  open?: boolean;
  rows: string[][];
  tones?: Array<"success" | "danger" | "warning" | "info" | "neutral" | undefined>;
}[] = [
  {
    day: 1,
    title: "Contraste de perfectos",
    trailing: "Simple o continuous: 8/10",
    open: true,
    tones: ["warning", "danger", "success", "success", "warning", "neutral", "neutral", "neutral"],
    rows: [
      ["1.1 Marcadores", "ago, yesterday, last, in + año → past simple. Sin fecha, o today / this year → present perfect.", "Posición ok · el tiempo con ago ya falló", "https://test-english.com/grammar-points/b1/past-simple-present-perfect/", "Test-English", "Hecho · 6/10"],
      ["1.2 Experiencia", "Sin fecha, present perfect. El detalle, past simple. been = volviste. gone = sigues fuera.", "been ok · gone sigue abierto", "https://www.englishpage.com/verbpage/verbs5.htm", "EnglishPage 5", "Hecho · 8/38"],
      ["1.3 for / since", "since + momento o verbo en past simple. for + periodo.", "10/10", "https://test-english.com/grammar-points/b1/past-simple-present-perfect/", "Test-English", "Hecho · 6/10"],
      ["1.4 yet / already / just", "yet al final. already y just entre have y el participio.", "10/10", "https://test-english.com/grammar-points/b1-b2/already-still-yet-whats-the-difference/", "already / yet", "Hecho · 10/10"],
      ["1.5 Simple o continuous", "Cuántos o terminado → simple. Cuánto tiempo → continuous. Estados sin -ing.", "8/10 · aceptable", "https://test-english.com/grammar-points/b1-b2/present-perfect-simple-continuous/", "Simple o continuous", "Hecho · 8/10"],
      ["1.6 Past perfect simple", "had + participio. Un hecho anterior a otro pasado.", "Después", "https://test-english.com/grammar-points/b1/past-simple-past-continuous-past-perfect/", "Past perfect"],
      ["1.7 Past perfect continuous", "had been + -ing. La duración explica un estado pasado.", "Después", "https://www.englishpage.com/verbpage/verbs13.htm", "EnglishPage 13"],
      ["1.8 Los cuatro juntos", "Solo si 1.1–1.7 están en 75% o más.", "Después", "https://www.englishpage.com/verbpage/verbs14.htm", "EnglishPage 14"],
    ],
  },
  {
    day: 2,
    title: "Condicionales",
    trailing: "Día 2",
    rows: [
      ["2.1 Primero", "If + presente, will.", "Pendiente", "https://test-english.com/grammar-points/b1/first-conditional-future-time-clauses/", "First"],
      ["2.2 Segundo", "If + past simple, would. Nunca If I would.", "Pendiente", "https://test-english.com/grammar-points/b1/second-conditional-unreal-situations/", "Second"],
      ["2.3 Tercero", "If + past perfect, would have + participio.", "Pendiente", "https://test-english.com/grammar-points/b1/third-conditional-past-unreal-situations/", "Third"],
      ["2.4 Mixto", "If I had studied, I would be a doctor now.", "Pendiente", "https://test-english.com/grammar-points/b2/mixed-conditionals/", "Mixed"],
      ["2.5 Sustitutos de if", "unless, provided (that), as long as, in case.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/second-third-conditionals/", "unless"],
    ],
  },
  {
    day: 3,
    title: "Wish, if only, would rather",
    trailing: "Día 3",
    rows: [
      ["3.1 Presente que no te gusta", "I wish I lived closer. If only I knew.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/wishes-regrets/", "wish + past"],
      ["3.2 Arrepentimiento", "I wish I had taken the job.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/wishes-regrets/", "wish + had"],
      ["3.3 Queja de otra persona", "I wish you would listen.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/wishes-regrets/", "wish + would"],
      ["3.4 Preferencia", "I would rather you didn't tell anyone.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/wishes-regrets/", "wish"],
      ["3.5 It's time", "It's time we left.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/wishes-regrets/", "wish"],
    ],
  },
  {
    day: 4,
    title: "Modales de ahora y de pasado",
    trailing: "Día 4",
    rows: [
      ["4.1 Deducción ahora", "must be / can't be / might be.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/past-modal-verbs/", "must / can't"],
      ["4.2 Deducción del pasado", "must have left / can't have seen / might have forgotten.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/past-modal-verbs/", "must have"],
      ["4.3 Crítica", "should have told me.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/past-modal-verbs/", "should have"],
      ["4.4 No hacía falta", "didn't need to go (no fui). needn't have gone (fui, y sobraba).", "Pendiente", "https://test-english.com/grammar-points/b1-b2/past-modal-verbs/", "Past modals"],
    ],
  },
  {
    day: 5,
    title: "Pasiva, causativa y rumor",
    trailing: "Día 5",
    rows: [
      ["5.1 Pasiva en cualquier tiempo", "The match was called off. It will be announced.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/passive-reporting-verbs/", "Pasiva"],
      ["5.2 Causativa", "We are having the car repaired.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/have-something-done/", "have something done"],
      ["5.3 make", "make someone do → be made to do.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/have-something-done/", "Causativa"],
      ["5.4 Pasiva de rumor", "He is said to be rich. He is said to have left.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/passive-reporting-verbs/", "is said to"],
    ],
  },
  {
    day: 6,
    title: "Estilo indirecto",
    trailing: "Día 6",
    rows: [
      ["6.1 + to infinitivo", "promise, refuse, offer, agree.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/reporting-verbs/", "promise to"],
      ["6.2 + persona + to", "advise, remind, warn, tell.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/reporting-verbs/", "advise to"],
      ["6.3 + -ing", "admit, deny, suggest, recommend.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/reporting-verbs/", "deny doing"],
      ["6.4 + preposición + -ing", "apologise for, insist on, accuse of.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/reporting-verbs/", "apologise for"],
      ["6.5 Pregunta indirecta", "Could you tell me where the station is? Sin inversión.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/reporting-verbs/", "Reporting"],
    ],
  },
  {
    day: 7,
    title: "Comparación y grado",
    trailing: "Día 7",
    rows: [
      ["7.1 Comparativo", "not as easy as. the best.", "Pendiente", "https://test-english.com/grammar-points/b2/", "Índice B2"],
      ["7.2 so / such", "so + adjetivo + that. such a + sustantivo + that.", "Pendiente", "https://test-english.com/grammar-points/b1/so-such-such-a-so-much-so-many/", "so / such"],
      ["7.3 too / enough", "too + adjetivo + to. not + adjetivo + enough to.", "Pendiente", "https://test-english.com/grammar-points/a2/too-too-much-too-many-enough/", "too / enough"],
    ],
  },
  {
    day: 8,
    title: "Gerundio o infinitivo",
    trailing: "Día 8",
    rows: [
      ["8.1 stop", "stop smoking (dejar). stop to smoke (pararse para fumar).", "Pendiente", "https://test-english.com/grammar-points/b1-b2/gerund-or-infinitive/", "stop"],
      ["8.2 remember", "remember to lock (no olvidar). remember locking (recuerdo de haberlo hecho).", "Pendiente", "https://test-english.com/grammar-points/b1-b2/gerund-or-infinitive/", "remember"],
      ["8.3 try", "try to open (esforzarse). try opening (probar un método).", "Pendiente", "https://test-english.com/grammar-points/b1-b2/gerund-or-infinitive/", "try"],
    ],
  },
  {
    day: 9,
    title: "Oraciones de relativo",
    trailing: "Día 9",
    rows: [
      ["9.1 Especificativa", "Sin comas: The man who called is my uncle.", "Pendiente", "https://test-english.com/grammar-points/b2/relative-clauses/", "Defining"],
      ["9.2 Explicativa", "Con comas: My uncle, who lives in Sydney, called.", "Pendiente", "https://test-english.com/grammar-points/b2/relative-clauses/", "Non-defining"],
      ["9.3 whose / where / when", "Posesión, lugar y tiempo.", "Pendiente", "https://test-english.com/grammar-points/b2/relative-clauses/", "whose / where"],
      ["9.4 No repetir el objeto", "the book which I bought. Nunca which I bought it.", "Pendiente", "https://test-english.com/grammar-points/b2/relative-clauses/", "Relativas"],
    ],
  },
  {
    day: 10,
    title: "Hábito",
    trailing: "Día 10",
    rows: [
      ["10.1 Pasado", "I used to live there. I would walk to school every day.", "Pendiente", "https://test-english.com/grammar-points/b1/usually-used-to-be-used-to-get-used-to/", "used to"],
      ["10.2 would", "Solo acciones repetidas, no estados.", "Pendiente", "https://test-english.com/grammar-points/b1/usually-used-to-be-used-to-get-used-to/", "would"],
      ["10.3 be used to", "I am used to getting up early. + -ing o sustantivo.", "Pendiente", "https://test-english.com/grammar-points/b1/usually-used-to-be-used-to-get-used-to/", "be used to"],
      ["10.4 get used to", "I am getting used to the accent. El proceso.", "Pendiente", "https://test-english.com/grammar-points/b1/usually-used-to-be-used-to-get-used-to/", "get used to"],
    ],
  },
];

export default function B2ContrastePerfectos() {
  const [feedback, setFeedback] = useState<FeedbackView>("debil");

  return (
    <Stack gap={20}>
      <Stack gap={4}>
        <H1>Gramática B2 por días</H1>
        <Text tone="secondary">
          Un tema por día. 75% deja el subtema aceptable. 90% lo cierra. Hoy
          es el día 1.
        </Text>
      </Stack>

      <Row gap={24} align="end">
        <Stat value="8/10" label="Simple o continuous" tone="warning" />
        <Stat value="8/38" label="EnglishPage 5, escribir el verbo" tone="danger" />
        <Stat value="6/10" label="Elegir entre dos formas" tone="warning" />
        <Stat value="10/10" label="Posición de marcadores" tone="success" />
      </Row>

      <H2>Temas y subopciones</H2>
      <Stack gap={2}>
        {DAYS.map((day) => (
          <CollapsibleSection
            key={day.day}
            title={`Día ${day.day}. ${day.title}`}
            count={day.rows.length}
            defaultOpen={day.open}
            trailing={
              <Text size="small" tone="tertiary">
                {day.trailing}
              </Text>
            }
          >
            <Table
              headers={["Subtema", "Qué tiene que salir", "Estado", "Práctica"]}
              rows={day.rows.map((row) => {
                const sent = row[5] ?? "Sin enviar";
                return [
                  row[0],
                  row[1],
                  row[2],
                  <Row gap={8} align="center">
                    <Link href={row[3]}>{row[4]}</Link>
                    <Pill size="sm" active={sent.startsWith("Hecho")}>
                      {sent}
                    </Pill>
                  </Row>,
                ];
              })}
              rowTone={day.tones}
              framed={false}
            />
          </CollapsibleSection>
        ))}
      </Stack>

      <H2>Escritura</H2>
      <Text tone="secondary">
        No es un día de test. Con tres o cuatro de estas por texto, bien
        hechas, sube la banda de Language. Muchas y mal hechas, la baja.
      </Text>
      <Table
        headers={["Estructura", "Forma"]}
        framed={false}
        rows={[
          ["Concesión", "although / even though + oración. despite / in spite of + sustantivo o -ing."],
          ["Finalidad", "in order to, so as not to, so that + can / could."],
          ["Participio", "Having finished the report, she left. Built in 1920, the building is still in use."],
          ["Pasiva formal", "It is often argued that… en ensayo o informe."],
          ["Condicional de argumento", "If governments invested more, this would change."],
        ]}
      />
      <Text size="small" tone="tertiary">
        however, therefore y whereas cuentan como organización, no como
        gramática difícil.
      </Text>

      <H2>Páginas para el día 1</H2>
      <Text>
        Hecho: [Test-English](https://test-english.com/grammar-points/b1/past-simple-present-perfect/) 6/10, marcadores 10/10, [EnglishPage 5](https://www.englishpage.com/verbpage/verbs5.htm) 8/38, y [simple o continuous](https://test-english.com/grammar-points/b1-b2/present-perfect-simple-continuous/) 8/10. El resto de esta lista está sin enviar.
      </Text>
      <Text>
        Siguiente del mismo contraste: [EnglishPage 7](https://www.englishpage.com/verbpage/verbs7.htm), sin enviar. Repetir solo los dos fallos del 8/10: cuántas veces en simple, all day en continuous.
      </Text>
      <Text>
        Past perfect: [Test-English, tres pasados](https://test-english.com/grammar-points/b1/past-simple-past-continuous-past-perfect/), [EnglishPage 11](https://www.englishpage.com/verbpage/verbs11.htm), [EnglishPage 13](https://www.englishpage.com/verbpage/verbs13.htm). Los cuatro juntos, solo al final: [EnglishPage 14](https://www.englishpage.com/verbpage/verbs14.htm).
      </Text>
      <Text tone="secondary">
        Repaso si un test baja de 75%: [British Council, present perfect](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/present-perfect-simple-continuous), [British Council, past perfect](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/past-perfect), [Perfect English Grammar, ejercicio 1](https://www.perfect-english-grammar.com/past-simple-present-perfect-1.html).
      </Text>

      <Divider />

      <H2>Retroalimentación</H2>
      <Text tone="secondary">
        Simple o continuous: 8/10. Fallaron “zero times” (simple) y “all day”
        (continuous). En EnglishPage 5 escribiste 8 past simple y dejaste
        vacíos los 30 de present perfect. Elegir entre dos formas sigue en
        6/10. La posición de los marcadores sigue en 10/10.
      </Text>

      <Row gap={8} wrap>
        <Pill active={feedback === "debil"} onClick={() => setFeedback("debil")}>
          Qué falla ahora
        </Pill>
        <Pill active={feedback === "simple"} onClick={() => setFeedback("simple")}>
          Simple o continuous · 8/10
        </Pill>
        <Pill active={feedback === "ep5"} onClick={() => setFeedback("ep5")}>
          EnglishPage 5 · 8/38
        </Pill>
        <Pill active={feedback === "marcas"} onClick={() => setFeedback("marcas")}>
          Marcadores · 10/10
        </Pill>
        <Pill active={feedback === "ex2"} onClick={() => setFeedback("ex2")}>
          Ejercicio 2 · 6/10
        </Pill>
        <Pill active={feedback === "ex1"} onClick={() => setFeedback("ex1")}>
          Ejercicio 1 · 6/10
        </Pill>
      </Row>

      {feedback === "debil" ? <Debil /> : null}
      {feedback === "simple" ? <SimpleContinuous /> : null}
      {feedback === "ep5" ? <EnglishPage5 /> : null}
      {feedback === "marcas" ? <Marcadores /> : null}
      {feedback === "ex2" ? <Ejercicio2 /> : null}
      {feedback === "ex1" ? <Ejercicio1 /> : null}
    </Stack>
  );
}

function Debil() {
  return (
    <Stack gap={16}>
      <Callout tone="warning" title="Cuántas veces es simple. Cuánto tiempo es continuous">
        En el diálogo del perro, 8/10. “zero times” pide have walked, no have
        been walking. “all day” con un verbo de acción pide 've been doing, no
        've done. been con how long, en el perro, sí salió bien.
      </Callout>
      <Callout tone="warning" title="Si hay que escribir el verbo, solo sale el past simple">
        En EnglishPage 5 los 8 que escribiste están bien: arrived, was,
        wandered, was bitten, missed, saw, went, hiked. Son momentos ya
        cerrados. Los 30 huecos de present perfect quedaron vacíos.
      </Callout>
      <Callout tone="warning" title="ago cierra el tiempo">
        Si aparece ago, yesterday, last o in + año, el verbo es past simple
        aunque el resultado siga siendo cierto. I have stopped smoking vale
        solo si no dices cuándo.
      </Callout>
      <Miss
        n="10. Dejé de fumar"
        chose="I have stoped smoking two years ago."
        right="I stopped smoking two years ago. I smoked for 22 years."
        why="two years ago es un momento cerrado, así que no puede ir con have. Además stopped lleva doble p: stoped el computador lo marca mal aunque el tiempo fuera correcto. El segundo hueco sí está bien: smoked for 22 years, porque ya no fumas. for con un periodo ya terminado es past simple."
      />
      <Text>
        Repetir ese contraste: [Test-English, past simple o present perfect](https://test-english.com/grammar-points/b1/past-simple-present-perfect/).
      </Text>
      <Stack gap={6}>
        <H3>Primero la noticia, después el detalle</H3>
        <Text>
          Sin fecha, abres en present perfect. En cuanto dices cómo, cuándo o
          dónde, pasas a past simple. Lo invertiste en el brazo y en las
          llaves.
        </Text>
        <Text tone="secondary">
          <Code>I've broken my arm. I broke it playing with my cousin.</Code>
        </Text>
      </Stack>
      <Stack gap={6}>
        <H3>been y gone</H3>
        <Text>
          Mary sigue en Egipto: <Code>has gone</Code>. Tú hablas de un viaje
          del que ya volviste: <Code>have never been</Code>. Elegiste{" "}
          <Code>went</Code> y <Code>have never gone</Code>.
        </Text>
      </Stack>
      <Text size="small" tone="tertiary">
        La posición de just ya salió bien: I've just had one. El fallo viejo
        de just have cleaned no se repitió en el 10/10.
      </Text>
    </Stack>
  );
}

function SimpleContinuous() {
  return (
    <Stack gap={18}>
      <Text tone="secondary">
        8/10. yet, just, haven't finished y el perro con been salieron bien.
        El fallo es elegir simple o continuous cuando la frase dice cuántas
        veces o cuánto tiempo.
      </Text>
      <Miss
        n="6. zero times"
        chose="You have been walking the dog zero times since last weekend."
        right="You have walked the dog zero times since last weekend."
        why="zero times, one time, three times cuentan cuántas veces, no cuánto duró. Eso es present perfect simple: have walked. have been walking diría que la caminata sigue o acaba de terminar, y aquí no hubo ninguna."
      />
      <Miss
        n="7. all day"
        chose="I 've done things all day too."
        right="I 've been doing things all day too."
        why="all day dice cuánto tiempo, y do es un verbo de acción. Eso es present perfect continuous: 've been doing. En la frase 2, 've been working all day, la misma regla sí salió bien. 've done cierra la acción como si ya estuviera terminada y contada."
      />
      <H3>Lo que sí salió</H3>
      <Table
        headers={["Tu forma", "Por qué está bien"]}
        framed={false}
        rowTone={["success", "success", "success", "success", "success", "success", "success", "success"]}
        rows={[
          ["Have you taken the dog for a walk yet?", "yet, acción terminada, sin decir cuándo. Simple."],
          ["I 've been working all day.", "all day y working es acción. Continuous, para la duración."],
          ["I 've just come home from work.", "just, acción ya terminada. Simple, entre have y el participio."],
          ["I haven't had the time yet.", "yet, en negativa. Simple."],
          ["How long has the dog been home alone?", "how long + be. be es estado: simple, no been being."],
          ["I haven't finished my presentation yet.", "yet, acción terminada o no. Simple."],
          ["Have you seen the collar and the leash?", "Sin decir cuándo. Simple."],
          ["have you eaten anything yet?", "yet, sin fecha. Simple."],
        ]}
      />
      <Callout tone="info" title="Tip para EnglishPage 7">
        Si ves times, once, twice o how many, escribe have + participio. Si
        ves all day, for hours o how long con un verbo de acción, escribe have
        been + -ing. Si el verbo es be, know o have, el continuous no entra.
      </Callout>
      <Text size="small" tone="tertiary">
        Test-English, present perfect simple o continuous. 27 sep 2026. 8 de 10.
      </Text>
    </Stack>
  );
}

function EnglishPage5() {
  return (
    <Stack gap={14}>
      <Text tone="secondary">
        8 escritos, 8 correctos, 30 en blanco. No hay una forma mal elegida:
        falta producir have o has cuando el periodo sigue abierto.
      </Text>
      <H3>Los 8 que escribiste</H3>
      <Table
        headers={["Tu forma", "Por qué está bien"]}
        framed={false}
        rowTone={["success", "success", "success", "success", "success", "success", "success", "success"]}
        rows={[
          ["arrived, a week ago", "ago cierra el tiempo."],
          ["was a kid", "since + el momento de inicio, en past simple."],
          ["wandered / was bitten", "La historia ya pasó: while he was hiking."],
          ["missed the bus this morning", "Esta mañana ya terminó."],
          ["saw you", "the last time es un momento cerrado."],
          ["went / hiked", "Ese viaje concreto ya terminó. El detalle va en past simple."],
        ]}
      />
      <H3>Los que quedaron vacíos</H3>
      <Table
        headers={["Hueco", "Forma", "Por qué"]}
        rows={[
          ["1, 9 Star Wars y el océano de Sam", "have never seen / has never seen", "Sigue vivo y never no trae fecha."],
          ["3 quince años", "have known", "for + seguís viéndoos. know no va en continuous."],
          ["4 in the last year", "has written", "in the last year sigue abierto."],
          ["5 since I was a kid", "haven't had", "El primero llega hasta ahora. was, el segundo, ya lo tenías."],
          ["6 Coltech", "have changed / started / had / have expanded", "ago y first van en past simple. Since then, en present perfect."],
          ["7 told", "told", "Misma historia pasada que wandered. Faltó el primero."],
          ["8 too many times", "have been", "missed es un hecho de esta mañana. Las veces, hasta hoy, son present perfect."],
          ["10 George murió", "dreamed / never saw", "Ya murió: esa experiencia está cerrada. No es has never seen."],
          ["11 last hundred years", "has become / have changed", "in the last… llega hasta ahora. In the 19th century es took / was."],
          ["12 since I saw you", "have changed / have grown", "saw ya está. El cambio desde entonces es present perfect."],
          ["13 hace 400 años", "was planted / founded", "ago. found aquí es fundar: founded, no found."],
          ["14 la montaña", "has never been climbed / have tried / has ever succeeded / have died", "Sigue sin escalarse. never y ever, hasta hoy."],
          ["15 África y Sudamérica", "have never visited / have traveled", "Sin fecha. En cuanto dices the last time I went, el resto de ese viaje es visited, spent, flew."],
        ]}
      />
      <Text size="small" tone="tertiary">
        Clave de EnglishPage, ejercicio 5. 27 sep 2026. 8 escritos de 38.
      </Text>
    </Stack>
  );
}

function Marcadores() {
  return (
    <Stack gap={12}>
      <Callout tone="success" title="10/10 en la posición">
        since, for, before, ago, yet, already, just, ever y never quedaron en
        el sitio. Este test no te hizo elegir entre have stopped y stopped.
      </Callout>
      <Table
        headers={["Frase", "Por qué está bien"]}
        rows={[
          ["It's been a month since we last had a meal together.", "since + el momento. Si después va un verbo, va en past simple: had."],
          ["We haven't seen each other for years.", "for + periodo: years, two hours, 20 years."],
          ["I think I've been here before.", "before con present perfect, al final, para experiencia."],
          ["The accident happened 10 years ago.", "periodo + ago, con past simple, al final."],
          ["Have you tidied your room yet?", "yet en preguntas y negativas, al final."],
          ["I have already tidied my room.", "already entre have y el participio. Antes de lo esperado."],
          ["I've just had one.", "just entre have y el participio. Muy reciente."],
          ["We haven't found a solution yet.", "yet al final, en negativa."],
          ["Have you ever imagined…?", "ever en preguntas, delante del verbo principal."],
          ["I've never been to Prague.", "never entre have y el participio. been porque es experiencia y ya volviste."],
        ]}
        rowTone={["success", "success", "success", "success", "success", "success", "success", "success", "success", "success"]}
      />
      <Text size="small" tone="tertiary">
        Source: test de posición pegado el 27 sep 2026. 10 de 10.
      </Text>
    </Stack>
  );
}

function Ejercicio2() {
  return (
    <Stack gap={18}>
      <Text tone="secondary">
        Bien: ever, before, this year, how long y since. Mal: been/gone, el
        orden noticia-detalle, y la posición de just.
      </Text>
      <Miss
        n="1. Egipto"
        chose="went / have never gone"
        right="has gone / have never been"
        why="Mary no está: sigue de viaje y no hay fecha, así que es has gone, no went. Tú hablas de experiencia y ya estás aquí, así que es have never been. gone = todavía fuera. been = fuiste y volviste."
      />
      <Miss
        n="2. El brazo"
        chose="broke / 've broken"
        right="'ve broken / broke"
        why="Primero la noticia, sin decir cuándo: I've broken my arm, porque sigue roto ahora. Después el detalle: I broke it playing with my cousin."
      />
      <Miss
        n="8. Las llaves"
        chose="found / have you found"
        right="have found / did you find"
        why="La misma inversión. I have found the keys es el resultado de ahora. Where did you find them? ya pide el detalle, y el detalle va en past simple."
      />
      <Miss
        n="9. Los zapatos"
        chose="just have cleaned"
        right="'ve just cleaned"
        why="just se coloca entre el auxiliar y el participio. just have cleaned cambia ese orden. En el test de marcadores, I've just had one ya salió bien."
      />
      <H3>Lo que sí salió en el ejercicio 2</H3>
      <Table
        headers={["Frase", "Regla"]}
        framed={false}
        rows={[
          ["Have you ever seen a ghost?", "ever, experiencia, present perfect."],
          ["I have been to China this year. When did you go?", "this year sigue abierto. When pregunta el momento cerrado."],
          ["I'm sure I've seen this man before.", "before sin fecha, al final."],
          ["How long have you been a teacher? I started a long time ago.", "how long + present perfect. ago cierra y pide past simple."],
          ["Have you seen Titanic?", "experiencia, sin decir cuándo."],
          ["She has wanted to be a singer since she was a kid.", "since + verbo en past simple."],
        ]}
      />
      <Callout tone="info" title="Tip para EnglishPage 5">
        Dos huecos: el primero es la noticia en present perfect. El segundo,
        si pregunta cómo, cuándo o dónde, es past simple. Si la persona ya
        volvió, been. Si sigue fuera, gone.
      </Callout>
    </Stack>
  );
}

function Ejercicio1() {
  return (
    <Stack gap={18}>
      <Text tone="secondary">
        Bien: yet, last year contra this year, last week contra for, y grew
        up. El hueco era la señal suave de “hasta ahora”, sin una fecha
        cerrada. En el ejercicio 2 ese hueco ya se cerró.
      </Text>
      <Miss
        n="3. recently"
        chose="Did you have a holiday recently?"
        right="Have you had a holiday recently?"
        why="recently no cierra el tiempo. Es un pasado cercano visto desde hoy, sin fecha. Did you have pide un momento ya situado: yesterday, last summer, in July."
      />
      <Miss
        n="6. all his life"
        chose="He was a gardener all his life."
        right="He has been a gardener all his life."
        why="La frase dice He loves gardening: sigue vivo y sigue siendo cierto. all his life va desde el pasado hasta ahora. was diría que ya no lo es."
      />
      <Miss
        n="7. before"
        chose="Did you see anything like this before?"
        right="Have you seen anything like this before?"
        why="before, sin fecha, mira toda la experiencia hasta este momento. En la frase 9, con never … before, sí elegiste present perfect."
      />
      <Miss
        n="8. ever + superlativo"
        chose="the most delicious dish I ever ate"
        right="the most delicious dish I have ever eaten"
        why="Un superlativo con ever compara con toda la vida hasta hoy. ever ate necesitaría un marco cerrado, por ejemplo the most delicious dish I ate in Rome."
      />
      <H3>Lo que sí salió en el ejercicio 1</H3>
      <Table
        headers={["Frase", "Regla"]}
        framed={false}
        rows={[
          ["Have you finished painting the bedroom yet?", "yet, al final, present perfect."],
          ["I didn't earn much last year, but I've earned a lot this year.", "last year cierra. this year sigue abierto."],
          ["We arrived last week. We have been here for 5 days.", "last week cierra. for, si sigues aquí, es present perfect."],
          ["He has worked here for 30 years.", "for, y el trabajo sigue."],
          ["I've never seen him behave like this before.", "never … before, experiencia."],
          ["My mother grew up in Scotland.", "La infancia es un pasado que los dos dan por cerrado."],
        ]}
      />
      <Text size="small" tone="tertiary">
        Participios que una letra mal puesta anula: been, gone, written, taken, seen, done, eaten, driven, spoken, broken, forgotten, chosen, bought, brought, taught, caught, thought. stopped lleva doble p.
      </Text>
    </Stack>
  );
}

function Miss({
  n,
  chose,
  right,
  why,
}: {
  n: string;
  chose: string;
  right: string;
  why: string;
}) {
  return (
    <Stack gap={6}>
      <H3>{n}</H3>
      <Text>
        Elegiste <Code>{chose}</Code>
      </Text>
      <Text>
        Tiene que ser <Code>{right}</Code>
      </Text>
      <Text tone="secondary">{why}</Text>
    </Stack>
  );
}
