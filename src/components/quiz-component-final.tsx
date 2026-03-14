'use client';

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

// VTurb Player Component
function VTurbPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Avoid double init
    if (container.querySelector("vturb-smartplayer")) return;

    // Create the custom element in real DOM
    const player = document.createElement("vturb-smartplayer");
    player.id = "vid-68fda7c738d7cd51cf68c89a";
    player.style.display = "block";
    player.style.margin = "0 auto";
    player.style.width = "100%";
    player.style.maxWidth = "400px";
    container.appendChild(player);

    // Load the player script (only once)
    if (!document.getElementById("vturb-player-script")) {
      const s = document.createElement("script");
      s.id = "vturb-player-script";
      s.src =
        "https://scripts.converteai.net/8bd1f3e2-3951-434d-9919-f64436108dcd/players/68fda7c738d7cd51cf68c89a/v4/player.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  return <div ref={containerRef} />;
}

// Protocol Loader Component
const protocolSteps = [
  "Gerando a mensagem exata que fura qualquer bloqueio e desperta saudade mesmo no silêncio",
  "Criando o gatilho oculto que faz ela duvidar da decisão de te deixar",
  "Gerando o texto perfeito pra reverter o desprezo e fazê-la procurar sua resposta",
  "Criando o efeito dominó que destrói o novo relacionamento e traz o foco de volta pra você",
  "Gerando a sequência proibida de mensagens que reabre a conversa sem parecer carência",
  "Criando a virada psicológica que muda completamente a forma como ela te enxerga",
  "Gerando Protocolo Personalizado!",
];

function ProtocolLoader({
  active,
  startDelay = 0,
  onComplete,
}: {
  active: boolean;
  startDelay?: number;
  onComplete: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [stepProgress, setStepProgress] = useState<number[]>(
    new Array(protocolSteps.length).fill(0)
  );
  const [done, setDone] = useState(false);
  const [delayComplete, setDelayComplete] = useState(false);

  useEffect(() => {
    if (!active) return;

    if (startDelay > 0) {
      // Iniciar carregamento imediatamente mas distribuir ao longo do delay
      setCurrentStep(0);

      // Completar após o delay total
      const delayTimer = setTimeout(() => {
        setDelayComplete(true);
      }, startDelay);

      return () => clearTimeout(delayTimer);
    } else {
      // Sem delay, iniciar imediatamente
      setDelayComplete(true);
      setCurrentStep(0);
    }
  }, [active, startDelay]);

  useEffect(() => {
    if (currentStep < 0 || currentStep >= protocolSteps.length) return;

    // Calcular duração baseada no delay total
    const totalDuration = startDelay > 0 ? startDelay : 15000; // 7min 12seg ou 15seg default
    const stepDuration = totalDuration / protocolSteps.length;
    const duration = stepDuration;
    const interval = 30;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setStepProgress((prev) => {
        const next = [...prev];
        next[currentStep] = progress;
        return next;
      });

      if (progress >= 100) {
        clearInterval(timer);
        if (currentStep < protocolSteps.length - 1) {
          setTimeout(() => setCurrentStep(currentStep + 1), 200);
        } else {
          setTimeout(() => {
            setDone(true);
            onComplete();
          }, 500);
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="animate-fadeInUp">
      <div className="text-center mb-8">
        <p className="text-red-600 font-semibold text-sm mb-1">
          Aguarde, estamos criando o seu
        </p>
        <h3 className="text-lg font-bold text-white">
          Protocolo Personalizado de Reconquista...
        </h3>
      </div>

      <div className="space-y-4">
        {protocolSteps.map((step, i) => (
          <div
            key={i}
            className={`transition-opacity duration-300 ${
              i <= currentStep ? "opacity-100" : "opacity-30"
            }`}
          >
            <div className="flex items-start gap-3 mb-2">
              <span
                className={`text-lg transition-all duration-300 ${
                  i <= currentStep
                    ? "text-green-600 scale-110"
                    : "text-gray-500"
                }`}
              >
                {i <= currentStep ? "✅" : "⬜"}
              </span>
              <span className="text-sm text-gray-600 leading-snug flex-1">
                {step}
              </span>
              <span className="text-xs font-bold text-red-600 min-w-[36px] text-right tabular-nums">
                {Math.round(stepProgress[i])}%
              </span>
            </div>
            <div className="ml-9 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100 ease-linear"
                style={{
                  width: `${stepProgress[i]}%`,
                  background:
                    stepProgress[i] >= 100
                      ? "#22c55e"
                      : "linear-gradient(90deg, #f59e0b, #ef4444)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {done && delayComplete && (
        <div className="mt-8 text-center animate-bounceIn">
          <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-md border border-red-400/30 rounded-2xl px-6 py-4">
            <span className="text-3xl">✅</span>
            <div>
              <p className="text-red-600 font-extrabold text-lg">
                Protocolo Gerado!
              </p>
              <p className="text-red-300 text-sm">Resgate agora...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Countdown Component
function Countdown({ active }: { active: boolean }) {
  const [seconds, setSeconds] = useState(15 * 60 - 1);

  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => {
      setSeconds((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [active]);

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const display = `${min.toString().padStart(2, "0")}:${sec
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="text-center py-6 my-6 bg-red-500/20 backdrop-blur-md rounded-2xl border border-red-400/20">
      <p className="text-sm font-medium text-gray-600 mb-1">Faltam</p>
      <div className="text-4xl font-black text-red-600 tracking-tight tabular-nums">
        {display}
      </div>
      <p className="text-sm font-medium text-gray-600 mt-1">
        para o acesso expirar!
      </p>
    </div>
  );
}

// Logo Component
function Logo({ className }: { className?: string }) {
  return (
    <div className={`text-center ${className || ""}`}>
      <Image
        src="/img/logo.webp"
        alt="Logo"
        width={200}
        height={80}
        className="h-12 w-auto mx-auto"
      />
    </div>
  );
}

// Quiz Option Component
function QuizOption({
  text,
  selected,
  onClick,
  index,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      onClick={onClick}
      disabled={selected}
      className={`w-full p-4 text-left rounded-xl border transition-all duration-300 ${
        selected
          ? "bg-red-50 border-red-500 text-gray-900 scale-105"
          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 hover:scale-102"
      } ${selected ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
}

// Bonus Card Component
function BonusCard({
  icon,
  title,
  oldPrice,
  description,
  index,
}: {
  icon: string;
  title: string;
  oldPrice: string;
  description: string;
  index: number;
}) {
  return (
    <div className="bg-black p-6 shadow-xl">
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h4 className="font-bold text-white text-lg mb-2">{title}</h4>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              De R$ {oldPrice}
            </span>
            <span className="text-red-600 font-bold">por GRÁTIS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const questions = [
  {
    question: "Quando foi o término entre vocês?",
    options: [
      "Faz menos de 1 semana.",
      "Entre 1 e 4 semanas.",
      "Entre 1 e 3 meses.",
      "Mais de 3 meses.",
    ],
  },
  {
    question: "Vocês ainda têm algum tipo de contato hoje em dia?",
    options: [
      "Sim, conversamos de vez em quando.",
      "Ela fala comigo, mas é fria e distante.",
      "Só responde por educação.",
      "Não, ela me bloqueou em tudo.",
    ],
  },
  {
    question: "O que mais dói em você desde o término?",
    options: [
      "Solidão forte.",
      "Culpa e remorso.",
      "Ansiedade e medo do futuro.",
      "Imaginar que ela já tá ficando com outro cara.",
    ],
  },
  {
    question:
      "Se ela realmente se apaixonar por outro cara, o que aconteceria com você?",
    options: [
      "Eu perderia completamente o chão.",
      "Ficaria mal, mas tentaria seguir em frente.",
      "Tentaria reconquistar de qualquer jeito.",
      "Fingiria que não ligo, mas morreria por dentro.",
    ],
  },
  {
    question:
      "Quanto tempo você acha que ainda tem antes dela te esquecer de vez?",
    options: [
      "Poucos dias — sinto que já estou sendo substituído.",
      "Algumas semanas — ainda dá pra agir.",
      "Uns meses — acho que ela ainda sente algo.",
      "Não sei, mas tenho medo de descobrir.",
    ],
  },
];

const bonuses = [
  {
    icon: "✅",
    title: "Checklist Anti-Rejeição",
    oldPrice: "147,00",
    description:
      "Evite esses 7 erros da reconquista e aumente suas chances de voltar com ela ainda essa semana em 8x transformando cada um deles numa vantagem.",
  },
  {
    icon: "💬",
    title: "Código do Ciúme Instantâneo",
    oldPrice: "107,00",
    description:
      "Use essa frase na sua primeira conversa com ela e faça ela sentir um ciúme visceral de você — ao ponto dela lutar pela sua atenção e correr atrás de você.",
  },
  {
    icon: "💌",
    title: "A Carta Proibida de Último Recurso",
    oldPrice: "997,00",
    description:
      "Envie essa mensagem para ela HOJE e veja ela desbloquear você nas redes sociais e parar de agir com frieza, implorando pela sua atenção.",
  },
  {
    icon: "🔍",
    title: "O Dossiê do Rival Descartável",
    oldPrice: "297,00",
    description:
      "Se ela estiver ficando com outro cara, use essa técnica e transforme isso numa vantagem desleal para fazê-la esquecê-lo e voltar com você mais rápido.",
  },
  {
    icon: "💜",
    title: "Manual da Reativação das Emoções Ocultas",
    oldPrice: "197,00",
    description:
      "Use esses 5 gatilhos invisíveis para fazer a sua ex sentir todo aquele tesão do começo do relacionamento — mesmo que ela jure que te odeia.",
  },
];

export default function QuizV2() {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(5).fill(null)
  );
  const [currentStep, setCurrentStep] = useState(0);
  // 0 = hero, 1-5 = questions, 6 = result, 7 = engage1, 8 = engage2, 9 = loading, 10 = sales
  const [protocolDone, setProtocolDone] = useState(false);
  const [salesActive, setSalesActive] = useState(false);
  const [showBackRedirect, setShowBackRedirect] = useState(false);

  function selectAnswer(questionIdx: number, optionIdx: number) {
    const newAnswers = [...answers];
    newAnswers[questionIdx] = optionIdx;
    setAnswers(newAnswers);
    setTimeout(() => setCurrentStep(questionIdx + 2), 800);
  }

  const handleProtocolComplete = useCallback(() => {
    setProtocolDone(true);
  }, []);


  // Back redirect logic (ativa após pergunta 1)
  useEffect(() => {
    if (currentStep < 1) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      setShowBackRedirect(true);
      return (e.returnValue = '');
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowBackRedirect(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (e.altKey && e.key === 'F4')) {
        setShowBackRedirect(true);
      }
    };

    const handlePopState = () => {
      setShowBackRedirect(true);
      // Adicionar uma entrada no histórico para "travar" o usuário
      window.history.pushState(null, '', window.location.href);
    };

    // Ativar eventos após 5 segundos
    const timer = setTimeout(() => {
      window.addEventListener('beforeunload', handleBeforeUnload);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('popstate', handlePopState);

      // Adicionar entrada inicial no histórico
      window.history.pushState(null, '', window.location.href);
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentStep]);

  const nextStep = () => setCurrentStep(prev => prev + 1);

  const handleBackRedirectCTA = () => {
    window.location.href = 'https://pay.hub.la/DMBiMIrnZs2LLauExd9A';
  };

  const progress = currentStep <= 5 ? (currentStep / 5) * 100 : 100;

  function renderCurrentStep() {
    switch (currentStep) {
      case 0: // Hero
        return (
          <div className="bg-black min-h-screen">
            {/* Top urgency bar */}
            <div className="bg-red-600 text-white text-center py-3 px-4 text-xs font-bold">
              ⏳ Cada dia sem agir reduz suas chances — O teste leva 60 segundos
            </div>

            <div className="max-w-lg mx-auto px-4 py-8">
              <div className="text-center mb-8">
              {/* Eyebrow */}
              <div className="inline-block text-xs font-semibold text-yellow-400 uppercase tracking-wider border border-yellow-400/30 rounded-full px-4 py-2 mb-5">
                Código da Reconquista
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4">
                Ela ainda sente<br />
                sua falta — mas está<br />
                <span className="text-red-400">prestes a esquecer você</span>
              </h1>


              <p className="text-base text-gray-300 mb-7 leading-relaxed">
                Faça o teste gratuito e descubra a <strong className="text-white">mensagem psicológica</strong>{" "}
                que faz ela sentir saudade e correr de volta —{" "}
                mesmo que ela tenha te bloqueado, esteja com outro, ou você tenha errado feio.
              </p>

              {/* Warning Box */}
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h3 className="font-bold text-white mb-2 text-sm">O maior erro é esperar o momento certo</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Cada dia que passa, ela cria mais distância — e o espaço emocional que você deixa vazio,
                      outro homem pode ocupar. O que ainda é possível hoje pode ser impossível em 2 semanas.
                      O teste revela exatamente onde você está e o que fazer agora, antes que seja tarde demais.
                    </p>
                  </div>
                </div>
              </div>

              <Image
                src="/img/whatsapp-hero.webp"
                alt="Mensagem no WhatsApp"
                width={400}
                height={320}
                priority
                className="rounded-xl shadow-lg mx-auto mb-4"
              />

              <p className="text-xs text-gray-500 text-center mb-6 italic">
                ✓ 3 dias após aplicar o protocolo
              </p>

              {/* CTA Button */}
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full py-4 bg-green-700 hover:bg-green-800 active:scale-[0.98] text-white font-extrabold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 cursor-pointer uppercase tracking-wide mb-3"
              >
                → FAZER O TESTE GRATUITO AGORA
              </button>
              <p className="text-xs text-gray-400 text-center mb-6">
                60 segundos • Sem cadastro • Resultado imediato
              </p>

              <div className="flex justify-center gap-4 mb-8 text-xs text-gray-400">
                <span>🔒 100% gratuito</span>
                <span>📱 Funciona no celular</span>
                <span>⚡ Resultado na hora</span>
              </div>
              </div>
            </div>

            {/* Bullets Section */}
            <div className="bg-gray-900/50 border-t border-gray-800 px-4 py-6">
              <h3 className="text-center text-white font-bold text-lg mb-6">
                O que você vai descobrir no teste
              </h3>

              <div className="space-y-3 mb-6">
                <div className="bg-black/50 border border-gray-700 rounded-lg p-3 flex gap-3">
                  <span className="text-green-500">✓</span>
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">A mensagem psicológica de 3 palavras</strong> que ativa o cérebro dela
                    e faz ela sentir sua falta — você pode mandar ainda hoje
                  </p>
                </div>

                <div className="bg-black/50 border border-gray-700 rounded-lg p-3 flex gap-3">
                  <span className="text-green-500">✓</span>
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">O erro que 93% dos homens cometem</strong> depois do término —
                    e que empurra a ex para longe de vez
                  </p>
                </div>

                <div className="bg-black/50 border border-gray-700 rounded-lg p-3 flex gap-3">
                  <span className="text-green-500">✓</span>
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">O protocolo de reconexão emocional</strong> que restaura o vínculo perdido —
                    mesmo em situações difíceis
                  </p>
                </div>
              </div>

              {/* Second CTA Button */}
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full py-5 bg-green-700 hover:bg-green-800 active:scale-[0.98] text-white font-extrabold text-lg rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 cursor-pointer uppercase tracking-wide mx-4"
              >
                COMEÇAR O TESTE AGORA →
              </button>
            </div>
          </div>
        );

      case 1: case 2: case 3: case 4: case 5: // Questions
        const qIdx = currentStep - 1;
        const q = questions[qIdx];
        return (
          <div className="bg-black min-h-screen">
            <div className="max-w-lg mx-auto px-4 py-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                  Pergunta {qIdx + 1} de 5
                </span>
              </div>
            <h2 className="text-[1.35rem] font-bold text-white leading-snug mb-6">
              {q.question}
            </h2>
            <div className="space-y-3">
              {q.options.map((opt, oIdx) => (
                <QuizOption
                  key={oIdx}
                  text={opt}
                  selected={answers[qIdx] === oIdx}
                  onClick={() => selectAnswer(qIdx, oIdx)}
                  index={oIdx}
                />
              ))}
            </div>
            {answers[qIdx] !== null && (
              <div className="flex justify-center mt-6 animate-fadeIn">
                <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                  ✅ Resposta registrada
                </span>
              </div>
            )}
            </div>
          </div>
        );

      case 6: // Result
        return (
          <div
            className="bg-black p-8 shadow-lg animate-fadeInUp max-h-screen overflow-y-auto hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Alert */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-center mb-8">
              <span className="text-2xl">⚠️</span>
              <p className="text-sm font-bold text-amber-700 mt-1">
                ATENÇÃO: Não saia dessa página!
              </p>
            </div>

            {/* Percentage */}
            <div className="text-center mb-10">
              <p className="text-base font-bold text-white mb-2">
                Suas chances de voltar com sua ex
              </p>
              <p className="text-sm font-semibold text-red-600 italic mb-3">
                SÃO DE APENAS
              </p>
              <div className="text-6xl font-black text-red-600 mb-3 animate-bounceIn">
                12%
              </div>
              <p className="text-[0.95rem] text-gray-600">
                — <em className="text-red-600 font-semibold">isso é crítico</em>{" "}
                — mas ao seguir esse protocolo você pode{" "}
                <strong className="text-white">GARANTIR que ela volte</strong>
              </p>
            </div>

            <div className="w-16 h-0.5 bg-gray-600 rounded mx-auto mb-10" />

            {/* Story */}
            <div className="space-y-4 text-[0.95rem] text-gray-600 leading-relaxed">
              <p className="text-lg font-bold text-white">Fala, irmão!</p>
              <p>
                Meu nome é{" "}
                <strong className="text-red-600">Lucas Krausche</strong>.
              </p>
              <p>E, eu sei exatamente o que você está passando.</p>
              <p>Te digo isso porque eu já estive do outro lado.</p>
              <p>
                Eu era apaixonado por uma mulher... mas, com o passar do tempo, o
                relacionamento foi caindo na rotina.
              </p>
              <p>
                Eu trabalhava demais, esquecia dos pequenos detalhes que faziam
                ela sorrir... e, sem perceber, fui magoando aos poucos a mulher
                que eu mais amava.
              </p>
              <p>
                Até que, um dia,{" "}
                <strong className="text-white">ela terminou comigo.</strong>
              </p>
              <p>
                Naquele momento, parecia que o meu mundo tinha desabado.
              </p>
              <p>
                Foi aí que começou o meu verdadeiro inferno emocional:
              </p>
              <p>
                Eu ligava sem parar, mandava mensagem atrás de mensagem, ficava
                online o tempo todo só pra ver se ela tinha visualizado minhas
                mensagens...
              </p>

              <Image
                src="/img/whatsapp-ligacoes.webp"
                alt="Ligações perdidas no WhatsApp"
                width={400}
                height={700}
                className="rounded-xl shadow-lg mx-auto my-4 w-full max-w-[300px]"
              />

              <p>
                O pior que quando ela postava um story,{" "}
                <span className="text-red-600 font-semibold">
                  eu imaginava logo que estava saindo com outro.
                </span>{" "}
                E isso me destruía por dentro e me deixava em crises e ansiedade.
              </p>
              <p>
                <strong className="text-white">E o pior...</strong> Era
                quando eu estava bloqueado.
              </p>
              <p>
                Eu vivia naquela angústia sem fim, me perguntando a cada minuto:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-gray-400 italic">
                <li>&quot;Será que ela ainda sente minha falta?&quot;</li>
                <li>&quot;Será que já me trocou por outro?&quot;</li>
                <li>
                  &quot;Será que eu ligo? Será que eu mando mensagem?&quot;
                </li>
              </ol>
              <p>
                E a verdade é que...{" "}
                <span className="text-red-600 font-semibold">
                  quanto mais eu corria atrás, mais ela se afastava.
                </span>
              </p>
              <p>
                Foi só então que eu percebi:{" "}
                <strong className="text-white">
                  O problema não era ela. O verdadeiro problema era eu não
                  entender a mente feminina.
                </strong>
              </p>
              <p>
                Eu não sabia como funcionava o{" "}
                <span className="text-blue-400 font-semibold">
                  desejo de uma mulher
                </span>
                ... e, por isso, eu fazia exatamente o oposto do que despertaria
                vontade de voltar nela.
              </p>
              <p>
                Mas ao invés de aceitar a derrota, eu decidi transformar essa dor
                em combustível.
              </p>
              <p>
                Eu mergulhei de cabeça nos estudos, fui atrás de respostas,
                conversei com muitos especialistas e descobri algo que mudou não
                só a minha vida, mas a de milhares de outras pessoas com quem eu
                já compartilhei esse segredo oculto...
              </p>
              <p>
                <span className="text-red-600 font-semibold">
                  Quanto mais você é disponível para uma mulher, mais ela se
                  afasta...
                </span>
              </p>
              <p>
                Porém, em apenas{" "}
                <strong className="text-white">3 etapas</strong>, você
                consegue fazer qualquer mulher comer nas suas mãos outra vez e se
                arrepender de ter terminado contigo{" "}
                <strong className="text-white">
                  (Mesmo que você tenha feito uma besteira muito grande).
                </strong>
              </p>
              <p>
                Ao longo dos últimos anos, eu me formei em{" "}
                <strong className="text-white">Psicanálise</strong>, e hoje
                sou{" "}
                <strong className="text-white">
                  Psicanalista Clínico especializado em relacionamentos e
                  comportamento humano.
                </strong>
              </p>

              <Image
                src="/img/lucas-evento.webp"
                alt="Lucas Krausche em evento"
                width={600}
                height={340}
                className="rounded-xl shadow-lg w-full my-4"
              />

              <p>
                Desde que comecei a compartilhar conteúdos sobre relacionamento,{" "}
                <span className="text-blue-400 font-semibold">
                  conquistei quase 2 milhões de seguidores em todas minhas redes
                  sociais.
                </span>
              </p>

              <Image
                src="/img/instagram.webp"
                alt="Perfil Instagram Lucas Krausche"
                width={500}
                height={120}
                className="rounded-xl shadow-lg w-full my-4"
              />

              <p>
                E aquela mulher que havia me deixado, depois que eu apliquei
                exatamente o mesmo{" "}
                <span className="text-blue-400 font-semibold">
                  truque de 3 etapas
                </span>{" "}
                que eu vou te revelar neste plano, hoje é{" "}
                <strong className="text-white">minha noiva.</strong>
              </p>

              <Image
                src="/img/lucas-noiva.webp"
                alt="Lucas Krausche e sua noiva"
                width={400}
                height={600}
                className="rounded-xl shadow-lg mx-auto my-4 w-full max-w-[320px]"
              />

              <p>
                E o melhor... Eu fundei o{" "}
                <span className="text-blue-400 font-semibold">
                  Clube das Deusas de Alto Valor
                </span>
                , um método exclusivo que ensina mulheres a curar traumas
                profundos para terem relacionamentos saudáveis. Hoje o Clube
                conta com mais de{" "}
                <strong className="text-white">2.800 alunas.</strong>
              </p>

              <Image
                src="/img/clube-deusas.webp"
                alt="Clube das Deusas de Alto Valor"
                width={600}
                height={600}
                className="rounded-xl shadow-lg w-full my-4"
              />
              <p>
                Mas isso me deu acesso a{" "}
                <strong className="text-white">TODOS</strong> os segredos
                mais ocultos da mente feminina... Segredos que agora eu vou te
                revelar para que a sua ex volte a sentir sua falta, se arrependa
                de ter te deixado e queira correr atrás de você ainda essa
                semana.
              </p>
            </div>

            <button
              onClick={() => setCurrentStep(7)}
              className="w-full mt-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 cursor-pointer uppercase tracking-wide"
            >
              Continuar Plano!
            </button>
          </div>
        );

      case 7: // Engage 1
        return (
          <div className="bg-black p-8 animate-fadeInUp min-h-screen">
            <h2 className="text-[1.35rem] font-bold text-white text-center leading-snug mb-8">
              Você gostaria que, além da mensagem de 3 palavras, eu te mostrasse
              como fazer o cérebro dela sentir saudade e voltar correndo pra
              você, mesmo que ela esteja com outro?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Sim, quero fazer ela sentir minha falta.",
                "Sim, se for direto e prático.",
              ].map((text, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(8)}
                  className="p-4 rounded-2xl border-2 border-red-400/30 bg-red-500/20 hover:border-red-400/50 hover:bg-red-500/30 active:scale-[0.97] transition-all text-[0.95rem] font-semibold text-gray-900 cursor-pointer text-center backdrop-blur-md"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        );

      case 8: // Engage 2
        return (
          <div className="bg-black p-8 animate-fadeInUp min-h-screen">
            <h2 className="text-[1.35rem] font-bold text-white text-center leading-snug mb-8">
              Se existisse um vídeo curto de 60 segundos mostrando o passo a
              passo exato para fazer sua ex voltar nas próximas 48 horas, você se
              comprometeria a assistir esse vídeo até o final?
            </h2>
            <div className="space-y-3">
              {[
                "Sim, quero assistir agora.",
                "Sim, quero assistir e aplicar hoje.",
                "Sim, mas quero entender cada detalhe.",
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(9)}
                  className="w-full p-4 rounded-2xl border-2 border-red-400/30 bg-red-500/20 hover:border-red-400/50 hover:bg-red-500/30 active:scale-[0.97] transition-all text-[0.95rem] font-semibold text-gray-900 cursor-pointer text-center"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );

      case 9: // Loading + VSL
        return (
          <>
            <div className="bg-black p-8 shadow-lg animate-fadeInUp">
              {/* Instruction Text */}
              <p className="text-center text-gray-700 font-medium text-lg mb-6">
                Assista o vídeo abaixo enquanto criamos seu protocolo personalizado de reconquista.
              </p>

              {/* VTurb Video Player */}
              <div className="mb-8">
                <VTurbPlayer />
              </div>

              {currentStep === 9 && (
                <ProtocolLoader
                  active={true}
                  startDelay={0}
                  onComplete={handleProtocolComplete}
                />
              )}

              {protocolDone && (
                <button
                  onClick={() => {
                    setSalesActive(true);
                    setCurrentStep(10);
                  }}
                  className="w-full mt-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 cursor-pointer uppercase tracking-wide animate-fadeInUp"
                >
                  Clique aqui para RECONQUISTAR sua ex!
                </button>
              )}
            </div>

          </>
        );

      case 10: // Sales
        return (
          <div className="bg-black p-8 shadow-lg animate-fadeInUp max-h-screen overflow-y-auto hide-scrollbar">
            {/* Header - Protocol Complete */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                SEU PROTOCOLO PERSONALIZADO FOI GERADO!
              </h2>
              <p className="text-gray-600 text-[0.95rem] leading-relaxed">
                Agora você tem acesso aos <strong className="text-white">códigos diretos</strong> para
                fazer sua ex sentir sua falta e voltar correndo pra você...
              </p>
            </div>

            {/* Purchase Button */}
            <a
              href="https://pay.kiwify.com.br/2yjxPKj"
              className="block w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold text-lg rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 text-center uppercase tracking-wide mb-8"
            >
              Clique para RECONQUISTAR sua ex!
            </a>

            {/* Bonus Text */}
            <div className="text-center mb-8">
              <p className="text-white text-lg font-semibold">
                E se você agir agora, eu vou te entregar +5 presentes especiais, olha só!
              </p>
            </div>

            {/* Bonus Images */}
            <div className="space-y-6 mb-8">
              <div className="text-center">
                <Image
                  src="/img/b1.png"
                  alt="Bônus 1 - Checklist Anti-Rejeição"
                  width={300}
                  height={200}
                  className="rounded-xl mx-auto shadow-lg"
                />
              </div>

              <div className="text-center">
                <Image
                  src="/img/b2.png"
                  alt="Bônus 2 - Código do Ciúme Instantâneo"
                  width={300}
                  height={200}
                  className="rounded-xl mx-auto shadow-lg"
                />
              </div>

              <div className="text-center">
                <Image
                  src="/img/b3.png"
                  alt="Bônus 3 - A Carta Proibida de Último Recurso"
                  width={300}
                  height={200}
                  className="rounded-xl mx-auto shadow-lg"
                />
              </div>

              <div className="text-center">
                <Image
                  src="/img/b4.png"
                  alt="Bônus 4 - O Dossiê do Rival Descartável"
                  width={300}
                  height={200}
                  className="rounded-xl mx-auto shadow-lg"
                />
              </div>

              <div className="text-center">
                <Image
                  src="/img/b5.png"
                  alt="Bônus 5 - Manual da Reativação das Emoções Ocultas"
                  width={300}
                  height={200}
                  className="rounded-xl mx-auto shadow-lg"
                />
              </div>
            </div>

            {/* Additional Bonus Content */}
            <div className="space-y-6 mb-8">
              <div className="text-center">
                <Image
                  src="/img/bonus-lives.webp"
                  alt="Bônus Lives Semanais"
                  width={400}
                  height={300}
                  className="rounded-xl mx-auto shadow-lg"
                />
              </div>

              <div className="text-center">
                <Image
                  src="/img/bonus-comunidade.webp"
                  alt="Bônus Comunidade VIP"
                  width={400}
                  height={300}
                  className="rounded-xl mx-auto shadow-lg"
                />
              </div>
            </div>

            {/* Countdown Timer */}
            {salesActive && <Countdown active={salesActive} />}

            {/* Guarantee Section */}
            <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-extrabold text-white text-center mb-4">
                🛡️ GARANTIA INCONDICIONAL DE 90 DIAS
              </h3>
              <p className="text-gray-300 text-center mb-4">
                Aplicou e não funcionou? <strong className="text-white">Devolvemos 100% do seu dinheiro</strong>, sem perguntas.
              </p>
              <div className="bg-red-600/30 rounded-xl p-4">
                <p className="text-center text-white font-bold text-lg">
                  Isso mesmo... Se em 90 dias você aplicar tudo que ensino e não conseguir <span className="text-red-400">NENHUM</span> resultado, eu assumo total responsabilidade e <span className="text-green-400">devolvemos cada centavo</span> que você investiu.
                </p>
                <p className="text-center text-white mt-3">
                  <strong>E sabe o que isso significa?</strong>
                </p>
                <p className="text-center text-red-400 font-bold text-lg mt-2">
                  Que todo o risco é meu!
                </p>
                <p className="text-center text-gray-300 mt-3">
                  Ou você reconquista sua ex ou <strong className="text-white">seu dinheiro volta</strong>. Simples assim.
                </p>
                <p className="text-center text-white font-bold text-lg mt-4">
                  Mas isso só é possível porque eu sei que o método funciona.
                </p>
                <p className="text-center text-red-400 font-bold text-xl mt-3">
                  E vai funcionar com você também!
                </p>
              </div>
            </div>

            {/* Final Purchase Button */}
            <a
              href="https://pay.kiwify.com.br/2yjxPKj"
              className="block w-full py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold text-lg rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 text-center uppercase tracking-wide"
            >
              💚 QUERO RECONQUISTAR MINHA EX AGORA!
            </a>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-black">

      {/* Progress Bar */}
      {currentStep >= 1 && currentStep <= 5 && (
        <div className="w-full p-4 bg-black">
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Pergunta {currentStep} de 5</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="w-full">
        {renderCurrentStep()}
      </div>

      {/* Back Redirect Global Overlay */}
      {showBackRedirect && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-black rounded-lg sm:rounded-2xl shadow-lg max-w-md sm:max-w-lg md:max-w-2xl w-full max-h-[95vh] overflow-y-auto animate-fadeInUp">
            {/* Header */}
            <div className="bg-red-600 text-black text-center py-6 px-4">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                NÃO FECHE ESSA PÁGINA AINDA!
              </h1>
              <p className="text-xl opacity-90">
                Essa condição não estará disponível novamente.
              </p>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 text-center">
              <div className="mb-6">
                <h2 className="text-lg md:text-2xl font-bold text-white mb-4 leading-tight">
                  Você acaba de desbloquear o <span className="text-red-600">Código da Reconquista</span> com <span className="text-green-600 text-2xl md:text-3xl font-bold">50% de desconto</span>
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
                  <span className="text-lg md:text-2xl text-gray-500 line-through">DE R$97</span>
                  <span className="text-2xl md:text-4xl font-bold text-red-600">Por apenas R$47</span>
                </div>

                <button
                  onClick={handleBackRedirectCTA}
                  className="bg-red-500 hover:bg-red-600 text-black text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 mb-4 w-full sm:w-auto"
                >
                  🎯 QUERO RECONQUISTAR MINHA EX
                </button>

                <p className="text-xs md:text-sm text-gray-600 mb-6">
                  Pagamento único • Acesso imediato • Oferta exclusiva desta página
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-red-50 rounded-lg p-4 md:p-6 mb-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                  Essa é sua oportunidade de…
                </h3>

                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-lg md:text-xl flex-shrink-0">✔</span>
                    <p className="text-gray-700 text-sm md:text-base">
                      Parar de se humilhar e voltar a ser o homem que ela admira, respeita e teme perder.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-lg md:text-xl flex-shrink-0">✔</span>
                    <p className="text-gray-700 text-sm md:text-base">
                      Evitar o erro invisível que impede 93% dos homens de reconquistarem a ex.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-lg md:text-xl flex-shrink-0">✔</span>
                    <p className="text-gray-700 text-sm md:text-base">
                      Acessar o SMS que faz ela te desbloquear mesmo após dias ou semanas em silêncio.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-green-500 font-bold text-lg md:text-xl flex-shrink-0">✔</span>
                    <p className="text-gray-700 text-sm md:text-base">
                      Ter em mãos o passo a passo para fazer ela repensar o término e colocar a aliança de volta em até 72 horas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Urgency */}
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 md:p-4 mb-4">
                <p className="text-red-800 font-semibold text-sm md:text-base text-center">
                  ⚠️ Assim que você sair desta página, essa condição especial será removida automaticamente.
                </p>
              </div>

              {/* Final CTA */}
              <button
                onClick={handleBackRedirectCTA}
                className="bg-red-600 hover:bg-red-700 text-black text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto animate-pulse"
              >
                💝 QUERO RECONQUISTAR MINHA EX
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}