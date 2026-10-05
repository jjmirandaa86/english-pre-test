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
  Swatch,
  Table,
  Text,
  useState,
} from "cursor/canvas";

type FeedbackView = "debil" | "ep7" | "ep14" | "ep13" | "ep11" | "pasados" | "simple" | "ep5" | "marcas" | "ex2" | "ex1";

const DAYS: {
  day: number;
  title: string;
  trailing: string;
  open?: boolean;
  rows: string[][];
  scores?: string[];
  tones?: Array<"success" | "danger" | "warning" | "info" | "neutral" | undefined>;
}[] = [
  {
    day: 1,
    title: "Contraste de perfectos",
    trailing: "Día 1",
    scores: ["6/10", "6/10", "8/38", "10/10", "8/10", "5/11", "25/50", "6/12", "8/10", "4/13"],
    open: true,
    tones: ["danger", "danger", "danger", "success", "danger", "danger", "warning", "danger"],
    rows: [
      ["1.1 Marcadores", "ago, yesterday, last, in + año → past simple. Sin fecha, o today / this year → present perfect.", "Posición ok · el tiempo con ago ya falló", "https://test-english.com/grammar-points/b1/past-simple-present-perfect/", "Test-English", "Hecho · 6/10"],
      ["1.2 Experiencia", "Sin fecha, present perfect. El detalle, past simple. been = volviste. gone = sigues fuera.", "been ok · gone sigue abierto", "https://www.englishpage.com/verbpage/verbs5.htm", "EnglishPage 5", "Hecho · 8/38"],
      ["1.3 for / since", "since + momento o verbo en past simple. for + periodo.", "10/10", "https://test-english.com/grammar-points/b1/past-simple-present-perfect/", "Test-English", "Hecho · 6/10"],
      ["1.4 yet / already / just", "yet al final. already y just entre have y el participio.", "10/10", "https://test-english.com/grammar-points/b1-b2/already-still-yet-whats-the-difference/", "already / yet", "Hecho · 10/10"],
      ["1.5 Simple o continuous", "Cuántos o terminado → simple. Cuánto tiempo → continuous. Estados sin -ing.", "8/10 · EnglishPage 7: 5/11", "https://test-english.com/grammar-points/b1-b2/present-perfect-simple-continuous/", "Simple o continuous", "Hecho · 8/10"],
      ["1.6 Past perfect simple", "had + participio. Un hecho anterior a otro pasado.", "25/50 · EnglishPage 11: 6/12", "https://test-english.com/grammar-points/b1/past-simple-past-continuous-past-perfect/", "Past perfect", "Hecho · 25/50"],
      ["1.7 Past perfect continuous", "had been + -ing. La duración explica un estado pasado.", "8/10 · aceptable", "https://www.englishpage.com/verbpage/verbs13.htm", "EnglishPage 13", "Hecho · 8/10"],
      ["1.8 Los cuatro juntos", "Solo si 1.1–1.7 están en 75% o más.", "4/13 · punto débil", "https://www.englishpage.com/verbpage/verbs14.htm", "EnglishPage 14", "Hecho · 4/13"],
    ],
  },
  {
    day: 2,
    title: "Condicionales",
    trailing: "Día 2",
    scores: ["7/10", "9/10", "11/15", "10/10", "10/10", "18/20", "10/10", "10/10", "15/20", "8/10", "10/10", "8/10", "9/10", "8/10"],
    open: true,
    tones: ["warning", "success", "warning", "warning", "warning"],
    rows: [
      ["2.1 Primero", "If + presente, will. When, before, after, as soon as, until, once + presente, y la otra parte will, should o might.", "7/10 · ejercicio 2: 9/10 · ejercicio 3: 11/15", "https://test-english.com/grammar-points/b1/first-conditional-future-time-clauses/", "First", "Hecho · 27/35"],
      ["2.2 Segundo", "If + past simple, would, could o might. Nunca If I would.", "10/10 · ejercicio 2: 10/10 · ejercicio 3: 18/20", "https://test-english.com/grammar-points/b1/second-conditional-unreal-situations/", "Second", "Hecho · 38/40"],
      ["2.3 Tercero", "If + past perfect, would have, could have o might have + participio.", "10/10 · ejercicio 2: 10/10 · ejercicio 3: 15/20", "https://test-english.com/grammar-points/b1/third-conditional-past-unreal-situations/", "Third", "Hecho · 35/40"],
      ["2.4 Mixto", "Pasado con resultado de ahora: if + past perfect, would + infinitivo. Ahora con resultado pasado: if + past simple, would have + participio.", "8/10 · ejercicio 2: 10/10 · ejercicio 3: 8/10", "https://test-english.com/grammar-points/b2/mixed-conditionals/", "Mixed", "Hecho · 26/30"],
      ["2.5 Sustitutos de if", "unless ya significa if not. No le pongas otro not. Segundo: if + pasado, would. Tercero: if + past perfect, would have.", "9/10 · ejercicio 2: 8/10", "https://test-english.com/grammar-points/b1-b2/second-third-conditionals/", "unless", "Hecho · 17/20"],
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
      ["7.1 Comparativo", "not as easy as. the best. Los ejercicios están en el día 11.", "Día 11", "https://test-english.com/grammar-points/b1/comparative-superlative-adjectives-adverbs/", "Día 11"],
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
  {
    day: 11,
    title: "Comparativo y superlativo",
    trailing: "Día 11",
    rows: [
      ["11.1 -er y more", "-er o more + than. Nunca more taller. better, worse, further.", "Pendiente", "https://test-english.com/grammar-points/b1/comparative-superlative-adjectives-adverbs/", "B1, 1"],
      ["11.2 as ... as", "not as easy as. less ... than. much, a lot o a bit delante del comparativo.", "Pendiente", "https://test-english.com/grammar-points/b1/comparative-superlative-adjectives-adverbs/2/", "B1, 2"],
      ["11.3 Superlativo", "the -est / the most. in + lugar. of + periodo o grupo. the most I have ever.", "Pendiente", "https://test-english.com/grammar-points/b1/comparative-superlative-adjectives-adverbs/3/", "B1, 3"],
      ["11.4 the … the …", "The harder you work, the better you feel. the + comparativo, dos veces.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/the-the-comparatives/", "the … the …, 1"],
      ["11.5 the … the …, 2", "The more you read, the wiser you get. The sooner, the better.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/the-the-comparatives/2/", "the … the …, 2"],
      ["11.6 the … the …, 3", "the + comparativo + sujeto + verbo. be se puede omitir.", "Pendiente", "https://test-english.com/grammar-points/b1-b2/the-the-comparatives/3/", "the … the …, 3"],
      ["11.7 Grado", "Diferencia grande: far, much, way. Pequeña: a bit, slightly. by far + superlativo.", "Pendiente", "https://test-english.com/grammar-points/b2/comparative-structures-modifying-comparatives/", "far / a bit"],
    ],
  },
  {
    day: 12,
    title: "Escritura",
    trailing: "Día 12",
    rows: [
      ["12.1 Discuss both views", "Intro, view 1, view 2, tu opinión, conclusión.", "Para memorizar", "", ""],
      ["12.2 Opinion", "Intro, razón 1, razón 2, conclusión.", "Para memorizar", "", ""],
      ["12.3 Advantages / disadvantages", "Intro, ventajas, desventajas, opinión.", "Para memorizar", "", ""],
      ["12.4 Problem / solution", "Opinión, dos razones, la otra postura, conclusión.", "Para memorizar", "", ""],
      ["12.5 Bloques", "Empezar, agregar, explicar, contrastar, concluir.", "Para memorizar", "", ""],
    ],
  },
];

function tally(scores: string[]) {
  let correct = 0;
  let total = 0;
  for (const score of scores) {
    const match = score.match(/(\d+)\/(\d+)/);
    if (!match) continue;
    correct += Number(match[1]);
    total += Number(match[2]);
  }
  const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, total, pct };
}

function toneFor(pct: number): "success" | "warning" | "danger" {
  if (pct >= 90) return "success";
  if (pct >= 75) return "warning";
  return "danger";
}

function fractions(text: string): string[] {
  return text.match(/\d+\/\d+/g) ?? [];
}

function lamp(score: string): "red" | "yellow" | "green" {
  const match = score.match(/(\d+)\/(\d+)/);
  const pct = match ? (Number(match[1]) / Number(match[2])) * 100 : 0;
  if (pct >= 90) return "green";
  if (pct >= 75) return "yellow";
  return "red";
}

function Semaforo({ score }: { score: string }) {
  const on = lamp(score);
  return (
    <Row gap={2} align="center">
      <Swatch color="red" style={{ width: 8, height: 8, opacity: on === "red" ? 1 : 0.22 }} />
      <Swatch color="yellow" style={{ width: 8, height: 8, opacity: on === "yellow" ? 1 : 0.22 }} />
      <Swatch color="green" style={{ width: 8, height: 8, opacity: on === "green" ? 1 : 0.22 }} />
    </Row>
  );
}

function ScoreBits({ text }: { text: string }) {
  const bits = text.split(/(\d+\/\d+)/);
  return (
    <Row gap={6} align="center" wrap>
      {bits.map((bit, index) => {
        if (/^\d+\/\d+$/.test(bit)) {
          return (
            <Row key={index} gap={4} align="center">
              <Semaforo score={bit} />
              <Text size="small" weight="semibold">{bit}</Text>
            </Row>
          );
        }
        if (!bit.trim()) return null;
        return (
          <Text key={index} size="small">{bit}</Text>
        );
      })}
    </Row>
  );
}

function DayTopics({ day }: { day: (typeof DAYS)[number] }) {
  return (
    <Stack gap={8}>
      {day.scores?.length ? (
        <Text size="small" tone="tertiary">
          Rojo, bajo 75%. Amarillo, de 75% a 89%. Verde, 90% o más.
        </Text>
      ) : null}
      <Table
        headers={["Subtema", "Qué tiene que salir", "Estado", "Práctica"]}
        rows={day.rows.map((row) => {
          const sent = row[5] ?? "Sin enviar";
          const shown = fractions(row[2]);
          const extra = fractions(sent).filter((score) => !shown.includes(score));
          return [
            row[0],
            row[1],
            <ScoreBits text={row[2]} />,
            <Row gap={8} align="center">
              <Link href={row[3]}>{row[4]}</Link>
              {extra.map((score) => (
                <Semaforo key={score} score={score} />
              ))}
              <Pill size="sm" active={sent.startsWith("Hecho")}>
                {sent}
              </Pill>
            </Row>,
          ];
        })}
        rowTone={day.tones}
        framed={false}
      />
    </Stack>
  );
}

function TipsDia2() {
  return (
    <CollapsibleSection title="Qué mejorar" count={5}>
      <Stack gap={8}>
      <Table
        headers={["Si ves", "Escribe"]}
        framed={false}
        rowTone={["neutral", "success", "success", "neutral", "neutral"]}
        rows={[
          ["when, if, before, as soon as, until, once", "Presente. La otra parte: will, should o might. Pregunta: Will you…?"],
          ["Imaginario, ahora", "if + pasado (were). La otra: would + infinitivo."],
          ["Imaginario, pasado", "if + had + participio. La otra: would have + participio. not en medio: would not have."],
          ["Una mitad dice now", "Esa mitad es would o were. La mitad pasada es had o would have."],
          ["unless", "unless = if not. Un solo not."],
        ]}
      />
      <Text size="small" tone="tertiary">
        Participios que fallaron: eaten, tidied, met, caught, worn. spoke, no spoak.
      </Text>
      </Stack>
    </CollapsibleSection>
  );
}

function FallosDia2() {
  return (
    <CollapsibleSection
      title="Qué fallé"
      count={22}
      leading={<Swatch color="red" />}
    >
      <Stack gap={12}>
        <Callout tone="warning" title="Segundo y tercero, ejercicio 2: 8/10. El día queda en 143/165, 87%">
          would be es ahora: if + were. wouldn't have complained es pasado:
          if + hadn't been. had been y wasn't están cruzados.
        </Callout>
        <Table
          headers={["Elegiste", "Tiene que ser", "Por qué"]}
          framed={false}
          rowTone={["danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger", "danger"]}
          rows={[
            ["If she had been more experienced, she would be more likely to get the job.", "If she were more experienced", "2.5, ejercicio 2, ítem 1. would be es ahora. El if del segundo condicional es were, no had been."],
            ["If the food wasn't so bad, we wouldn't have complained.", "If the food hadn't been so bad", "2.5, ejercicio 2, ítem 2. wouldn't have complained es pasado. El if del tercero es hadn't been, no wasn't."],
            ["unless she hadn't helped me", "unless she had helped me", "2.5, ítem 7. unless = if not. unless she had helped = if she hadn't helped. hadn't helped mete un not de más."],
            ["If you had not eatten so much", "If you had not eaten so much", "Mixto, ejercicio 3, ítem 1. wouldn't be feeling sick now está bien. El participio de eat es eaten."],
            ["We would have been top of the league", "We would be top of the league", "Mixto, ejercicio 3, ítem 4. We are second now. El resultado es ahora: would be. hadn't lost se queda."],
            ["If you took a map, we wouldn't be lost now.", "If you had taken a map, we wouldn't be lost now.", "Mixto, ítem 4. wouldn't be lost now es el presente. El mapa es una acción pasada: had taken."],
            ["If I hadn't been afraid of flying, we'd have travelled by plane.", "If I wasn't afraid of flying, we'd have travelled by plane.", "Mixto, ítem 8. El miedo sigue ahora: wasn't. El viaje ya no se hizo: we'd have travelled."],
            ["would have tidy up", "would have tidied up", "Tercero, ejercicio 3, ítem 2. had known está bien. Después de would have va el participio: tidied."],
            ["had not meet", "had not met", "Tercero, ejercicio 3, ítem 4. El participio de meet es met."],
            ["would have not been born", "would not have been born", "Tercero, ejercicio 3, ítem 4. not va entre would y have: would not have been born."],
            ["would not have catched", "would not have caught", "Tercero, ejercicio 3, ítem 8. had not made está bien. catch no lleva -ed: caught."],
            ["would have wore", "would have worn", "Tercero, ejercicio 3, ítem 9. had known está bien. wore es past simple. El participio es worn."],
            ["if I spoak English better", "if I spoke English better", "Segundo, ejercicio 3, ítem 4. would have está bien. El pasado de speak es spoke."],
            ["If she does not criticise people", "If she didn't criticise people", "Segundo, ejercicio 3, ítem 8. would have está bien. if + presente es el primer condicional. Aquí es didn't criticise."],
            ["we have to spend the night here", "we will have to spend the night here", "Ejercicio 3, ítem 3. does not arrive se queda en presente. El resultado es will have to, no have to."],
            ["as soon as we will check in", "as soon as we check in", "Ejercicio 3, ítem 6. as soon as + presente. will no entra ahí."],
            ["she look for a surf instructor", "she will look for a surf instructor", "Ejercicio 3, ítem 7. La otra parte de as soon as es will look for."],
            ["you will water the plants", "will you water the plants", "Ejercicio 3, ítem 14. Es una pregunta. will va delante de you. if I promise se queda."],
            ["before you will leave", "before you leave", "Ejercicio 2, ítem 7. before + presente. La petición ya está: can you close. will leave mete el futuro en el sitio del presente."],
            ["I give you an answer when I have one.", "I will give you an answer when I have one.", "Ejercicio 1. when I have one se queda. El resultado es will give."],
            ["If you don't find him, you call.", "If you don't find him, you should call.", "Ejercicio 1. don't find se queda. El resultado es un consejo: should call."],
            ["If he knows that you are here, he tries to contact you.", "If he knows that you are here, he might try to contact you.", "Ejercicio 1. knows se queda. El resultado es una posibilidad: might try."],
          ]}
        />
        <Text size="small" tone="tertiary">
          Test-English, 5 oct 2026. Primero: 7/10, 9/10, 11/15. Segundo, ejercicio 3: 18/20. Tercero, ejercicio 3: 15/20. Mixto: 8/10, 10/10 y 8/10. Unless: 9/10 y 8/10.
        </Text>
      </Stack>
    </CollapsibleSection>
  );
}

function EscrituraDia12() {
  return (
    <Stack gap={2}>
      <CollapsibleSection title="Discuss both views" count={5}>
        <Stack gap={8}>
          <Text size="small">Some people believe X, while others believe Y. Discuss both views and give your opinion.</Text>
          <Text size="small" weight="semibold">Intro → view 1 → view 2 → tu opinión → conclusión</Text>
          <Text size="small">There are different opinions about whether [X] or [Y] is more important. Both views have some advantages, and I believe that the best option depends on the situation.</Text>
          <Text size="small">On the one hand, some people believe that [X]. One reason for this is that...</Text>
          <Text size="small">On the other hand, other people believe that [Y]. This is because...</Text>
          <Text size="small">Personally, I believe that [your opinion]. In my case, ...</Text>
          <Text size="small">In conclusion, both views have advantages, but I believe that...</Text>
        </Stack>
      </CollapsibleSection>
      <CollapsibleSection title="Opinion / Agree–Disagree" count={4}>
        <Stack gap={8}>
          <Text size="small">Do you agree or disagree? What is your opinion? Do you think this is a good idea?</Text>
          <Text size="small" weight="semibold">Intro → razón 1 → razón 2 → conclusión</Text>
          <Text size="small">In my opinion, I believe that [topic]. There are several reasons for this.</Text>
          <Text size="small">First of all, [reason]. This is because [explanation]. For example, [example].</Text>
          <Text size="small">Another important reason is that [reason]. For example, [example].</Text>
          <Text size="small">In conclusion, I believe that [your opinion] because [reason 1] and [reason 2].</Text>
        </Stack>
      </CollapsibleSection>
      <CollapsibleSection title="Advantages / Disadvantages" count={4}>
        <Stack gap={8}>
          <Text size="small">What are the advantages and disadvantages of studying online?</Text>
          <Text size="small" weight="semibold">Intro → ventajas → desventajas → opinión</Text>
          <Text size="small">There are several advantages to...</Text>
          <Text size="small">One major advantage is that...</Text>
          <Text size="small">Another benefit is that...</Text>
          <Text size="small">However, there are also some disadvantages.</Text>
          <Text size="small">One possible disadvantage is that...</Text>
          <Text size="small">For example,...</Text>
          <Text size="small">Overall, I believe that the advantages outweigh the disadvantages because...</Text>
        </Stack>
      </CollapsibleSection>
      <CollapsibleSection title="Problem / Solution" count={4}>
        <Stack gap={8}>
          <Text size="small">There are different opinions about [TOPIC]. In my opinion, [YOUR OPINION].</Text>
          <Text size="small">First of all, [REASON 1]. This is because [EXPLANATION]. For example, [EXAMPLE].</Text>
          <Text size="small">Another important point is that [REASON 2]. This can help [EXPLANATION]. For instance, [EXAMPLE].</Text>
          <Text size="small">On the other hand, some people believe that [OTHER VIEW]. This may be true because [REASON].</Text>
          <Text size="small">In conclusion, I believe that [YOUR OPINION] because [REASON 1] and [REASON 2].</Text>
        </Stack>
      </CollapsibleSection>
      <CollapsibleSection title="Bloques para memorizar" count={5}>
        <Stack gap={8}>
          <Text size="small" weight="semibold">Para comenzar</Text>
          <Text size="small">In my opinion,... There are different opinions about... There are several reasons why... I believe that...</Text>
          <Text size="small" weight="semibold">Para agregar una idea</Text>
          <Text size="small">First of all,... Another important point is that... In addition,... Furthermore,...</Text>
          <Text size="small" weight="semibold">Para explicar</Text>
          <Text size="small">This is because... The main reason is that... For example,... For instance,...</Text>
          <Text size="small" weight="semibold">Para contrastar</Text>
          <Text size="small">However,... On the other hand,... Although... While some people believe..., others argue that...</Text>
          <Text size="small" weight="semibold">Para concluir</Text>
          <Text size="small">In conclusion,... Overall,... For these reasons, I believe that...</Text>
        </Stack>
      </CollapsibleSection>
    </Stack>
  );
}

function TipsDia1() {
  return (
    <CollapsibleSection title="Qué mejorar" count={5}>
      <Stack gap={8}>
        <Table
          headers={["Si ves", "Escribe"]}
          framed={false}
          rowTone={["success", "neutral", "neutral", "neutral", "neutral"]}
          rows={[
            ["since, for, yet, already, just, ever, never", "La posición ya sale. just, already, ever y never van entre have y el participio."],
            ["ago, yesterday, last, in + año", "Past simple. Sin fecha, y el periodo sigue: have o has. El hueco vacío cuenta mal."],
            ["he, she, it, nobody", "has. I, you, we, they: have."],
            ["Cuántas veces, o all day / for months", "Veces: have + participio. Duración: have been -ing. been = volviste. gone = sigue fuera."],
            ["Ya pasó antes de la escena", "had + participio. El hecho siguiente: past simple. En marcha: was -ing."],
          ]}
        />
      </Stack>
    </CollapsibleSection>
  );
}

function FallosDia1() {
  return (
    <CollapsibleSection
      title="Qué fallé"
      count={10}
      leading={<Swatch color="red" />}
    >
      <Stack gap={12}>
        <Callout tone="danger" title="Lo que se repite">
          Si hay que escribir el verbo, sale el past simple o el hueco queda
          vacío. he y nobody piden has, y no salen. had falta cuando el hecho
          ya terminó antes de la escena, y sobra cuando es el siguiente hecho.
        </Callout>
        <Table
          headers={["Nota", "Qué falló", "Tiene que salir"]}
          framed={false}
          rowTone={["danger", "danger", "danger", "danger", "warning", "danger", "danger", "danger", "warning", "danger"]}
          rows={[
            ["6/10 elegir, ejercicio 1", "recently, all his life, before, ever ate", "Have you had. has been, porque sigue vivo. Have you seen. have ever eaten."],
            ["6/10 elegir, ejercicio 2", "been y gone al revés. Primero el detalle y después la noticia.", "Mary has gone. Tú have never been. Primero I've broken, después I broke it."],
            ["ago, ítem 10", "I have stoped smoking two years ago.", "I stopped. ago cierra el tiempo aunque ya no fumes. stopped, doble p."],
            ["8/38 EnglishPage 5", "30 huecos de present perfect vacíos. Los 8 escritos eran past simple y estaban bien.", "have o has si el periodo sigue abierto. Si la persona murió, past simple."],
            ["8/10 simple o continuous", "zero times en continuous. all day en simple.", "have walked, porque cuenta veces. 've been doing, porque all day es duración."],
            ["5/11 EnglishPage 7", "Los 6 del camarero vacíos. Los 5 de we están bien.", "has forgotten, has taken, has walked, has even noticed, has been running, hasn't looked."],
            ["25/50 tres pasados", "ran y gave donde ya había pasado. had gone y was opening donde era el siguiente hecho. drank donde estaba en marcha.", "had run. opened y went. was drinking when I heard. El mono was eating."],
            ["6/12 EnglishPage 11", "6 vacíos. Ninguno de los escritos está mal. went lo acepta la página.", "submitted, showed, had arrived, ended, decided, looked. before me es el que pide had."],
            ["8/10 EnglishPage 13", "Dos vacíos. El resto de had y had been está bien.", "had been trying, por for months. gone, que la página también acepta como had gone."],
            ["4/13 EnglishPage 14", "9 vacíos. sailed con by the time está bien: la página lo acepta.", "have been waiting ahora. had been waiting ayer. had worked, cuántos departamentos. has climbed. had been crying."],
          ]}
        />
        <Text size="small" tone="tertiary">
          Verde y fuera de esta lista: la posición de since, for, yet, already, just, ever y never, 10/10. just ya no se repite mal.
        </Text>
      </Stack>
    </CollapsibleSection>
  );
}

export default function B2ContrastePerfectos() {
  const [feedback, setFeedback] = useState<FeedbackView>("debil");

  return (
    <Stack gap={20}>
      <Stack gap={4}>
        <H1>Gramática B2 por días</H1>
        <Text tone="secondary">
          Un tema por día. 75% deja el subtema aceptable. 90% lo cierra. Hoy
          es el día 2.
        </Text>
      </Stack>

      <Row gap={24} align="end">
        {DAYS.flatMap((day) => {
          if (!day.scores?.length) return [];
          const { correct, total, pct } = tally(day.scores);
          return [
            <Row key={day.day} gap={8} align="center">
              <Semaforo score={`${pct}/100`} />
              <Stat value={`${pct}%`} label={`Día ${day.day}. ${correct} de ${total}`} tone={toneFor(pct)} />
            </Row>,
          ];
        })}
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
              day.scores?.length ? (
                <Row gap={6} align="center">
                  <Semaforo score={`${tally(day.scores).pct}/100`} />
                  <Text size="small" weight="semibold">{tally(day.scores).pct}%</Text>
                </Row>
              ) : (
                <Text size="small" tone="tertiary">{day.trailing}</Text>
              )
            }
          >
            {day.day === 12 ? (
              <EscrituraDia12 />
            ) : day.day === 1 || day.day === 2 ? (
              <Stack gap={2}>
                <CollapsibleSection title="Subtemas" count={day.rows.length}>
                  <DayTopics day={day} />
                </CollapsibleSection>
                {day.day === 1 ? <TipsDia1 /> : <TipsDia2 />}
                {day.day === 1 ? <FallosDia1 /> : <FallosDia2 />}
              </Stack>
            ) : (
              <DayTopics day={day} />
            )}
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
        Hecho: [Test-English](https://test-english.com/grammar-points/b1/past-simple-present-perfect/) 6/10, marcadores 10/10, [EnglishPage 5](https://www.englishpage.com/verbpage/verbs5.htm) 8/38, [simple o continuous](https://test-english.com/grammar-points/b1-b2/present-perfect-simple-continuous/) 8/10, y [tres pasados](https://test-english.com/grammar-points/b1/past-simple-past-continuous-past-perfect/) 25/50.
      </Text>
      <Text>
        [EnglishPage 7](https://www.englishpage.com/verbpage/verbs7.htm), hecho, 5/11. Tres pasados, hecho, 25/50. [EnglishPage 11](https://www.englishpage.com/verbpage/verbs11.htm), hecho, 6/12. [EnglishPage 13](https://www.englishpage.com/verbpage/verbs13.htm), hecho, 8/10. [EnglishPage 14](https://www.englishpage.com/verbpage/verbs14.htm), hecho, 4/13. Los 8 tests del día 1 ya están enviados.
      </Text>
      <Text tone="secondary">
        Repaso si un test baja de 75%: [British Council, present perfect](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/present-perfect-simple-continuous), [British Council, past perfect](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/past-perfect), [Perfect English Grammar, ejercicio 1](https://www.perfect-english-grammar.com/past-simple-present-perfect-1.html).
      </Text>

      <Divider />

      <H2>Retroalimentación</H2>
      <Text tone="secondary">
        EnglishPage 7: 5/11. Los 5 con we / have están bien. Los 6 del
        camarero, que piden has, quedaron vacíos. Los 8 tests del día 1 ya
        están enviados.
      </Text>

      <Row gap={8} wrap>
        <Pill active={feedback === "debil"} onClick={() => setFeedback("debil")}>
          Qué falla ahora
        </Pill>
        <Pill active={feedback === "ep7"} onClick={() => setFeedback("ep7")}>
          EnglishPage 7 · 5/11
        </Pill>
        <Pill active={feedback === "ep14"} onClick={() => setFeedback("ep14")}>
          EnglishPage 14 · 4/13
        </Pill>
        <Pill active={feedback === "ep13"} onClick={() => setFeedback("ep13")}>
          EnglishPage 13 · 8/10
        </Pill>
        <Pill active={feedback === "ep11"} onClick={() => setFeedback("ep11")}>
          EnglishPage 11 · 6/12
        </Pill>
        <Pill active={feedback === "pasados"} onClick={() => setFeedback("pasados")}>
          Tres pasados · 25/50
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
      {feedback === "ep7" ? <EnglishPage7 /> : null}
      {feedback === "ep14" ? <EnglishPage14 /> : null}
      {feedback === "ep13" ? <EnglishPage13 /> : null}
      {feedback === "ep11" ? <EnglishPage11 /> : null}
      {feedback === "pasados" ? <TresPasados /> : null}
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
      <Callout tone="danger" title="we sale con have. he, con has, no sale">
        EnglishPage 7, 5/11. have been waiting, have already ordered, have
        only been, have not ordered y have been sitting están bien. has
        forgotten, has taken, has walked, has even noticed, has been
        running y hasn't looked quedaron vacíos.
      </Callout>
      <Callout tone="warning" title="had been en la carta ya sale. En los cuatro, no">
        EnglishPage 13, 8/10. Escribiste had been waiting, had had, had
        arranged, had already picked, had almost given, had been y had
        missed. Quedaron vacíos had been trying y had gone. EnglishPage 14,
        4/13. had been working, had seen, sailed y had experienced están
        bien. sailed lo acepta la página. has climbed no salió.
      </Callout>
      <Callout tone="danger" title="Si hay que escribirlo, la mitad se queda en blanco">
        En EnglishPage 11 escribiste 6 verbos y los 6 están bien: got, had
        already filled, tried, wanted, had had, went. Los otros 6 quedaron
        vacíos. before me pedía had arrived, y no salió.
      </Callout>
      <Callout tone="danger" title="had solo si ya había terminado antes">
        En los tres pasados, 25/50. Si el hecho es anterior a la escena, es
        had + participio: had run, no ran. Si es el siguiente hecho de la
        historia, es past simple: went, no had gone. Si estaba en marcha
        cuando pasó otra cosa, es was + -ing: was drinking when I heard.
      </Callout>
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

function EnglishPage7() {
  return (
    <Stack gap={14}>
      <Text tone="secondary">
        5 escritos, 5 correctos, 6 en blanco. 5/11. Todos los de we están
        bien. Todos los del camarero, en tercera persona, quedaron vacíos.
      </Text>
      <H3>Los 5 que escribiste</H3>
      <Table
        headers={["Tu forma", "Por qué está bien"]}
        framed={false}
        rowTone={["success", "success", "success", "success", "success"]}
        rows={[
          ["have been waiting for over half an hour", "Seguís ahí. for + duración hasta ahora es have been + -ing."],
          ["have already ordered", "already, acción terminada. Simple, no continuous."],
          ["have only been here for five or ten minutes", "be es estado. only va entre have y been. No lleva -ing."],
          ["have not ordered yet", "yet, y todavía no ha pasado. Simple."],
          ["have been sitting here for over half an hour", "Otra duración hasta ahora. have been + -ing."],
        ]}
      />
      <H3>Los del camarero, vacíos</H3>
      <Table
        headers={["Hueco", "Forma", "Por qué"]}
        rows={[
          ["the waiter forget", "has forgotten", "El resultado es de ahora y no hay fecha. Tercera persona: has, no have."],
          ["nobody take our order yet", "has taken", "yet, acción que no ha ocurrido. Simple. nobody es tercera persona."],
          ["he walk by us twenty times", "has walked", "twenty times cuenta cuántas. Simple, no has been walking."],
          ["he notice even", "has even noticed", "even va entre has y el participio. No os ha visto ni una vez."],
          ["he run from table to table", "has been running", "La actividad sigue ahora, de mesa en mesa. has been + -ing."],
          ["he look not once", "has not looked", "once cuenta una acción terminada que no ocurrió. Simple: hasn't looked."],
        ]}
      />
      <Callout tone="info" title="La persona del verbo">
        we, you, they y I van con have. he, she, it y nobody van con has.
        Después eliges simple o continuous: times o yet, simple; for half an
        hour o una actividad que sigue, have been o has been + -ing.
      </Callout>
      <Text size="small" tone="tertiary">
        EnglishPage, ejercicio 7. 30 sep 2026. 5 de 11. Clave de la página.
      </Text>
    </Stack>
  );
}

function EnglishPage14() {
  return (
    <Stack gap={14}>
      <Text tone="secondary">
        4 escritos, 4 correctos, 9 en blanco. 4/13. Ninguno de los que
        escribiste está mal. sailed, con by the time, la página lo acepta.
      </Text>
      <H3>Los 4 que están bien</H3>
      <Table
        headers={["Tu forma", "Por qué está bien"]}
        framed={false}
        rowTone={["success", "success", "success", "success"]}
        rows={[
          ["had been working for more than ten years", "Lo despidieron el mes pasado. for + duración hasta ese momento es had been + -ing."],
          ["had seen many pictures before I went", "before I went: las fotos son anteriores al viaje. had + participio."],
          ["had experienced more by that age", "by the time she turned twenty-five cierra en el pasado. had + participio."],
          ["sailed around the world", "En esa frase la página acepta sailed y también had sailed. by the time ya ordena los hechos."],
        ]}
      />
      <H3>Los que quedaron vacíos</H3>
      <Table
        headers={["Hueco", "Forma", "Por qué"]}
        rows={[
          ["1. ahora, for over an hour", "have been waiting", "It is 9:30 y sigues ahí. Desde el pasado hasta ahora, con duración: have been + -ing."],
          ["2. ayer, by the time", "had been waiting", "El mismo for over an hour, pero ayer, antes de que él llegara. had been + -ing."],
          ["3. almost every department", "had worked", "Cuántos departamentos, no cuánto tiempo. Eso es had + participio, no had been working."],
          ["5. She is adventurous", "has climbed. sailed o has sailed. gone o has gone", "Climb solo acepta has climbed. Sail y go también aceptan el pasado simple."],
          ["6. climb y go", "had climbed. gone o had gone", "sail ya está bien. climb solo acepta had climbed."],
          ["7. ojos rojos", "had been crying", "Llegó ayer con los ojos rojos. La acción larga acaba de terminar: had been + -ing."],
        ]}
      />
      <Text size="small" tone="tertiary">
        EnglishPage, ejercicio 14. 30 sep 2026. 4 de 13. Clave de la página, no solo la forma más completa.
      </Text>
    </Stack>
  );
}

function EnglishPage13() {
  return (
    <Stack gap={14}>
      <Text tone="secondary">
        8 escritos, 8 correctos, 2 en blanco. 8/10. En esta carta el had y
        el had been ya salen cuando el hueco está en medio de la frase.
      </Text>
      <H3>Los 8 que escribiste</H3>
      <Table
        headers={["Tu forma", "Por qué está bien"]}
        framed={false}
        rowTone={["success", "success", "success", "success", "success", "success", "success", "success"]}
        rows={[
          ["had had five cups", "Cinco tazas cuentan cuántas. had + participio, no continuous."],
          ["had been waiting over an hour", "over an hour es duración, antes de irte. had been + -ing."],
          ["had arranged to meet Kathy", "El plan ya estaba hecho antes de salir del café."],
          ["had already picked up the tickets", "already: Kathy ya las tenía cuando llegaste."],
          ["had been waiting for more than half an hour", "Otra duración hasta un momento pasado."],
          ["had almost given up", "almost entre had y el participio. La acción ya casi había terminado."],
          ["had been late several times", "several times cuenta cuántas veces, antes de esta noche. had been, no had been being."],
          ["had missed several movies", "Esas películas ya se habían perdido antes de esta conversación."],
        ]}
      />
      <H3>Los dos vacíos</H3>
      <Table
        headers={["Hueco", "Forma", "Por qué"]}
        rows={[
          ["try, for months", "had been trying", "for months es duración hasta anoche. La misma forma que had been waiting, que sí escribiste."],
          ["go, after had almost given up", "had gone", "Iba a entrar sin vosotros. Es anterior a lo que te cuenta, así que had + gone."],
        ]}
      />
      <Text size="small" tone="tertiary">
        EnglishPage, ejercicio 13. 30 sep 2026. 8 de 10.
      </Text>
    </Stack>
  );
}

function EnglishPage11() {
  return (
    <Stack gap={14}>
      <Text tone="secondary">
        6 escritos, 6 correctos, 6 en blanco. No hay una forma mal elegida.
        Falta producir el verbo cuando la historia sigue, y el had cuando
        alguien llegó antes que tú.
      </Text>
      <H3>Los 6 que escribiste</H3>
      <Table
        headers={["Tu forma", "Por qué está bien"]}
        framed={false}
        rowTone={["success", "success", "success", "success", "success", "success"]}
        rows={[
          ["got that apartment", "El hecho del que hablas ahora. Past simple."],
          ["had already filled", "already marca que ya habían terminado el formulario antes de que llegaras."],
          ["tried to fill out the form", "El siguiente hecho, después de que el casero te deja aplicar."],
          ["wanted me to include references", "Lo que pedía el formulario en ese momento. Past simple."],
          ["had had some problems", "Los problemas con el casero anterior son anteriores a rellenar este formulario. had + had."],
          ["went to high school together", "Un periodo ya cerrado. No hace falta had: el instituto no es “antes de decidir”."],
        ]}
      />
      <H3>Los que quedaron vacíos</H3>
      <Table
        headers={["Hueco", "Forma", "Por qué"]}
        rows={[
          ["submit, last week", "submitted", "last week cierra el tiempo. Es el siguiente dato, en past simple."],
          ["show up", "showed", "When I showed up es el momento de la escena. Past simple."],
          ["arrive, before me", "had arrived", "Esas veinte personas ya estaban allí antes de que tú llegaras. before me pide had."],
          ["end up", "ended", "El resultado de ese momento: acabaste poniendo a tu padre. Past simple."],
          ["decide", "decided", "La decisión es el hecho de la historia, no uno anterior. Past simple."],
          ["look, before he looked", "looked", "before ya dice el orden. El informe es lo que vino después, en past simple."],
        ]}
      />
      <Callout tone="info" title="Tip para el siguiente">
        Si ves already o before me, escribe had + participio. Si ves last week,
        o el verbo es el siguiente paso de la historia, escribe past simple.
        Un hueco vacío cuenta igual que uno mal.
      </Callout>
      <Text size="small" tone="tertiary">
        EnglishPage, ejercicio 11. 30 sep 2026. 6 escritos de 12.
      </Text>
    </Stack>
  );
}

function TresPasados() {
  return (
    <Stack gap={18}>
      <Text tone="secondary">
        Misma página, tres ejercicios. Galletas 12/20, elección 5/10, Titanic
        8/20. Total 25/50. La escena con was watching y was walking salió.
        El had entra y sale en el momento que no toca.
      </Text>
      <H3>Galletas, 12/20</H3>
      <Table
        headers={["Elegiste", "Tiene que ser", "Por qué"]}
        rows={[
          ["I ran a race in the morning", "I had run", "La carrera fue por la mañana, antes de esta tarde. Ya había terminado."],
          ["My mother gave me a jar", "My mother had given", "Las galletas ya estaban en casa antes de que entraras a la cocina."],
          ["I was opening the fridge", "I opened", "Es el siguiente hecho, en orden: went, opened, poured. No estaba en marcha."],
          ["I ate only one cookie", "I had eaten", "Esa galleta fue antes de encontrar el tarro vacío."],
          ["I drank my glass of milk", "I was drinking", "Estabas bebiendo cuando oíste el ruido. La acción larga es continuous."],
          ["I had gone there quickly", "I went", "Después del ruido vas al comedor. Es el siguiente hecho, no uno anterior."],
          ["I was opening the door", "I opened", "Abrir la puerta es el hecho corto. El mono es el que estaba comiendo."],
          ["A monkey had eaten the biscuits", "A monkey was eating", "Al abrir, el mono seguía comiendo en la silla. Estaba en marcha."],
        ]}
      />
      <H3>Elección, 5/10</H3>
      <Table
        headers={["Elegiste", "Tiene que ser", "Por qué"]}
        rows={[
          ["he had hiden under the bed", "he hid", "Primero oyó a la policía y después se escondió. Es el siguiente hecho. El participio, además, es hidden."],
          ["he had carried a gun", "he was carrying", "Llevaba el arma en ese momento, cuando lo arrestaron."],
          ["he had lied", "he was lying", "Mentir estaba en marcha en el momento en que dijo que te quería."],
          ["everybody had run away", "everybody ran", "Sacó el arma y entonces corrieron. Orden de la historia."],
          ["I hadn't paid attention", "I wasn't paying attention", "No estabas atento cuando chocasteis. La acción larga es continuous."],
        ]}
      />
      <Text size="small" tone="secondary">
        Bien en esta parte: had already started, hadn't done, had been in a
        fight, never went, y had been in the company for 50 years.
      </Text>
      <H3>Titanic, 8/20</H3>
      <Table
        headers={["Elegiste", "Tiene que ser", "Por qué"]}
        rows={[
          ["he had carried the tickets", "he was carrying", "Caminaba y llevaba los billetes en la mano. Las dos ponen la escena."],
          ["he saved all the money", "he had saved", "Cuánto había ahorrado antes de esa tarde. had saved, no was saving."],
          ["he Bought the tickets", "he had bought", "Earlier that afternoon: ya los había comprado antes de ir a casa."],
          ["he had hold the tickets", "he was holding", "En ese momento los tenía en la mano. hold en continuous es holding. El pasado es held."],
          ["it had sounded", "it sounded", "sound es un verbo de sentido. No va en continuous ni hace falta had."],
          ["his son played / a dog had bitten him", "was playing / bit", "Jugaba cuando el perro lo mordió. La larga es continuous. La corta, past simple."],
          ["the doctor had treated the wound", "treated", "El médico llegó y entonces curó. Siguiente hecho."],
          ["he hang a yellow sheet", "he hung", "Mismo orden. El pasado de hang, aquí, es hung."],
          ["they just were quarantined", "they had just been", "La cuarentena ya había ocurrido. just va entre had y el participio."],
          ["he had stand up", "he stood up", "El barco desapareció y entonces se levantó. stood up, no had stand."],
          ["the Titanic x", "had sunk", "El naufragio es anterior a la noticia. El hueco vacío cuenta como fallo. Participio: sunk."],
        ]}
      />
      <Callout tone="info" title="Tres preguntas antes del hueco">
        ¿Ya había terminado antes de esta escena? had + participio. ¿Es el
        siguiente hecho, uno detrás de otro? past simple. ¿Estaba en marcha
        cuando pasó otra cosa más corta? was o were + -ing.
      </Callout>
      <Text size="small" tone="tertiary">
        Test-English, past simple, past continuous y past perfect. 30 sep 2026. 25 de 50.
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
