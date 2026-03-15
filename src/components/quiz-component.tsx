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
    const totalDuration = startDelay > 0 ? startDelay : 432000; // 7min 12sec
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
        <p className="text-red-400 font-semibold text-sm mb-1">
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
                  stepProgress[i] >= 100
                    ? "text-green-400 scale-110"
                    : "text-gray-500"
                }`}
              >
                ✅
              </span>
              <span className="text-sm text-gray-300 leading-snug flex-1">
                {step}
              </span>
              <span className="text-xs font-bold text-red-400 min-w-[36px] text-right tabular-nums">
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
          <div className="inline-flex items-center gap-2">
            <span className="text-3xl">✅</span>
            <div>
              <p className="text-white font-extrabold text-lg">
                Protocolo Gerado!
              </p>
              <p className="text-gray-300 text-sm">Resgate agora...</p>
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
      <p className="text-sm font-medium text-gray-300 mb-1">Faltam</p>
      <div className="text-4xl font-black text-red-400 tracking-tight tabular-nums">
        {display}
      </div>
      <p className="text-sm font-medium text-gray-300 mt-1">
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
          ? "bg-red-600/20 border-red-500 text-white scale-105"
          : "bg-black/30 backdrop-blur-md border-white/20 text-gray-200 hover:bg-white/20 hover:border-white/40 hover:scale-102"
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
    <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h4 className="font-bold text-white text-lg mb-2">{title}</h4>
          <p className="text-gray-300 text-sm mb-3">{description}</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              De R$ {oldPrice}
            </span>
            <span className="text-red-400 font-bold">por GRÁTIS</span>
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
    setSalesActive(true);
    // NÃO mudar de step - o conteúdo aparece na mesma página
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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: // Hero
        return (
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl animate-fadeInUp">
            <Logo className="pb-4" />

            <div className="text-center mb-8">
              {/* Headline Principal */}
              <h1 className="text-[1.75rem] font-extrabold text-white leading-[1.15] mb-4 max-w-[480px] mx-auto">
                Ela ainda sente<br />
                sua falta — mas está<br />
                <em className="text-green-400 not-italic">prestes a esquecer você</em>
              </h1>

              {/* Subheadline - Logo após a headline */}
              <p className="text-base text-gray-300 max-w-[440px] mx-auto mb-6 leading-relaxed">
                Faça o teste gratuito e descubra a{" "}
                <strong className="text-white">mensagem psicológica</strong> que faz ela sentir
                saudade e correr de volta — mesmo que ela tenha te bloqueado,
                esteja com outro, ou você tenha errado feio.
              </p>

              <div className="w-12 h-1 bg-red-500 rounded-full mx-auto mt-4 mb-6" />

              <Image
                src="/img/testea.jpg"
                alt="Mensagem no WhatsApp"
                width={400}
                height={320}
                priority
                className="rounded-xl shadow-lg mx-auto mb-4"
              />

              {/* Sub headline abaixo da imagem */}
              <p className="text-center text-gray-300 text-sm mb-6">✅ 3 dias após aplicar o protocolo</p>
            </div>

            {/* CTA Button abaixo da imagem */}
            <button
              onClick={() => setCurrentStep(1)}
              className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 cursor-pointer mb-6"
            >
              <span className="block pt-4 pb-1 text-base uppercase tracking-wide">→ FAZER O TESTE GRATUITO AGORA</span>
              <span className="block pb-4 text-xs font-normal opacity-80">60 segundos • Sem cadastro • Resultado imediato</span>
            </button>

            {/* Info strip abaixo do primeiro botão */}
            <div className="flex flex-wrap gap-4 justify-center mb-6 text-xs text-gray-400">
              <span>🔒 100% gratuito</span>
              <span>📱 Funciona no celular</span>
              <span>⚡ Resultado na hora</span>
            </div>

            {/* Depoimentos */}
            <div className="space-y-4 mb-8">
              {/* Depoimento 1 */}
              <div className="flex gap-3 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/img/rafael.jpg"
                    alt="Rafael"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '50% 5%' }}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">Rafael M., 31 anos</div>
                  <div className="text-xs text-amber-400 mb-1">Caso: ela tinha me bloqueado em tudo</div>
                  <div className="text-xs text-gray-300 leading-relaxed">
                    "Achei que era impossível. Ela me bloqueou até no WhatsApp. Depois que mandei aquela mensagem do protocolo, ela me desbloqueou e mandou áudio chorando."
                  </div>
                  <div className="text-yellow-400 text-xs mt-1">★★★★★</div>
                </div>
              </div>

              {/* Depoimento 2 */}
              <div className="flex gap-3 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <Image
                  src="/img/marcos.jpg"
                  alt="Marcos"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">Marcos T., 38 anos — casado, 2 filhos</div>
                  <div className="text-xs text-amber-400 mb-1">Caso: separado há 8 meses, ela queria divórcio</div>
                  <div className="text-xs text-gray-300 leading-relaxed">
                    "Estava a ponto de assinar o divórcio. Hoje estamos juntos de novo. O método me mostrou exatamente o que eu estava fazendo de errado há anos."
                  </div>
                  <div className="text-yellow-400 text-xs mt-1">★★★★★</div>
                </div>
              </div>

              {/* Depoimento 3 */}
              <div className="flex gap-3 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <Image
                  src="/img/diego.webp"
                  alt="Diego"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">Diego P., 29 anos</div>
                  <div className="text-xs text-amber-400 mb-1">Caso: eu tinha traído ela</div>
                  <div className="text-xs text-gray-300 leading-relaxed">
                    "Eu traí ela. Pensei que não teria volta. Em 6 dias ela voltou a conversar comigo. Hoje estamos juntos e mais fortes que antes."
                  </div>
                  <div className="text-yellow-400 text-xs mt-1">★★★★★</div>
                </div>
              </div>
            </div>

            {/* Segundo CTA Button após depoimentos */}
            <button
              onClick={() => setCurrentStep(1)}
              className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 cursor-pointer mb-6"
            >
              <span className="block pt-4 pb-1 text-base uppercase tracking-wide">→ FAZER O TESTE GRATUITO AGORA</span>
              <span className="block pb-4 text-xs font-normal opacity-80">60 segundos • Sem cadastro • Resultado imediato</span>
            </button>

            {/* Info strip abaixo do segundo botão */}
            <div className="flex flex-wrap gap-4 justify-center mb-8 text-xs text-gray-400">
              <span>🔒 100% gratuito</span>
              <span>📱 Funciona no celular</span>
              <span>⚡ Resultado na hora</span>
            </div>

            {/* O que você vai descobrir */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white text-center mb-6">
                O que você vai descobrir no teste
              </h3>

              <div className="space-y-4">
                {/* Bullet 1 */}
                <div className="bg-black/30 backdrop-blur-sm border border-green-400/20 rounded-xl p-4 flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full border-2 border-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 font-bold text-base">✓</span>
                  </div>
                  <div className="text-sm text-gray-200 leading-relaxed">
                    <strong className="text-white">A mensagem psicológica de 3 palavras</strong> que ativa o cérebro dela e faz ela sentir sua falta — você pode mandar ainda hoje, mesmo que ela esteja te ignorando
                  </div>
                </div>

                {/* Bullet 2 */}
                <div className="bg-black/30 backdrop-blur-sm border border-green-400/20 rounded-xl p-4 flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full border-2 border-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 font-bold text-base">✓</span>
                  </div>
                  <div className="text-sm text-gray-200 leading-relaxed">
                    <strong className="text-white">O erro que 93% dos homens cometem</strong> depois do término — e que empurra a ex para longe de vez (você provavelmente já fez isso)
                  </div>
                </div>

                {/* Bullet 3 */}
                <div className="bg-black/30 backdrop-blur-sm border border-green-400/20 rounded-xl p-4 flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full border-2 border-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 font-bold text-base">✓</span>
                  </div>
                  <div className="text-sm text-gray-200 leading-relaxed">
                    <strong className="text-white">O protocolo de 48 horas</strong> que já trouxe de volta mais de 30.000 mulheres — funciona mesmo depois de traição, bloqueio ou se ela já está com outro cara
                  </div>
                </div>

                {/* Bullet 4 */}
                <div className="bg-black/30 backdrop-blur-sm border border-green-400/20 rounded-xl p-4 flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full border-2 border-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-400 font-bold text-base">✓</span>
                  </div>
                  <div className="text-sm text-gray-200 leading-relaxed">
                    <strong className="text-white">O que falar quando ela ficar fria</strong> ou distante — a maioria dos homens piora tudo nessa hora, você vai saber exatamente como agir
                  </div>
                </div>
              </div>
            </div>

            {/* Funciona no seu caso? - Quebra de objeções */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white text-center mb-6">
                Funciona no seu caso?
              </h3>

              <div className="space-y-4">
                {/* Objeção 1 - Traição */}
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 flex items-center gap-3">
                    <div className="text-2xl">💔</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Você traiu ela</div>
                      <div className="text-xs text-gray-400 italic">"Fiz a coisa mais horrível — ela nunca vai me perdoar"</div>
                    </div>
                    <div className="bg-green-500/20 border border-green-400/30 px-3 py-1 rounded-full text-xs text-green-400 font-semibold">
                      Funciona
                    </div>
                  </div>
                  <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed">
                    A traição cria uma ferida emocional — não uma decisão racional. O protocolo age exatamente nessa camada: reativa o vínculo emocional que existia antes da dor. <strong className="text-white">Mais de 4.500 alunos haviam traído a parceira.</strong> A maioria voltou em menos de 30 dias.
                  </div>
                </div>

                {/* Objeção 2 - Bloqueio */}
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 flex items-center gap-3">
                    <div className="text-2xl">🚫</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Ela te bloqueou em tudo</div>
                      <div className="text-xs text-gray-400 italic">"Não tenho como nem chegar perto dela"</div>
                    </div>
                    <div className="bg-green-500/20 border border-green-400/30 px-3 py-1 rounded-full text-xs text-green-400 font-semibold">
                      Funciona
                    </div>
                  </div>
                  <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed">
                    O bloqueio é uma reação emocional — não uma sentença. Existe uma mensagem específica desenhada para esse cenário que chega por um canal que ela não bloqueou. Depois que ela responde, o caminho se abre. <strong className="text-white">Mais de 4.800 alunos estavam bloqueados em tudo</strong> quando começaram.
                  </div>
                </div>

                {/* Objeção 3 - Outro cara */}
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 flex items-center gap-3">
                    <div className="text-2xl">👤</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Ela está com outro cara</div>
                      <div className="text-xs text-gray-400 italic">"Já é tarde demais — ela seguiu em frente"</div>
                    </div>
                    <div className="bg-green-500/20 border border-green-400/30 px-3 py-1 rounded-full text-xs text-green-400 font-semibold">
                      Funciona
                    </div>
                  </div>
                  <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed">
                    Relacionamentos novos formados logo após um término são quase sempre uma fuga emocional, não amor de verdade. O protocolo age no vínculo profundo que ela tem com você — algo que nenhum homem novo consegue apagar em semanas. <strong className="text-white">O cérebro não esquece anos de história assim tão rápido.</strong>
                  </div>
                </div>

                {/* Objeção 4 - Tempo */}
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 flex items-center gap-3">
                    <div className="text-2xl">📅</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Faz meses que vocês terminaram</div>
                      <div className="text-xs text-gray-400 italic">"Passou tempo demais — ela já me esqueceu"</div>
                    </div>
                    <div className="bg-green-500/20 border border-green-400/30 px-3 py-1 rounded-full text-xs text-green-400 font-semibold">
                      Funciona
                    </div>
                  </div>
                  <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed">
                    O tempo não apaga vínculos — ele só os adormece. Já ajudamos homens separados há mais de 2 anos a reconquistar a esposa. O protocolo acorda exatamente esse vínculo adormecido, <strong className="text-white">usando gatilhos que o cérebro dela ainda responde</strong> mesmo depois de muito tempo.
                  </div>
                </div>

                {/* Objeção 5 - Casados/Filhos */}
                <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 flex items-center gap-3">
                    <div className="text-2xl">👨‍👩‍👧</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Eram casados — têm filhos</div>
                      <div className="text-xs text-gray-400 italic">"Não é só um namoro — é uma família inteira"</div>
                    </div>
                    <div className="bg-green-500/20 border border-green-400/30 px-3 py-1 rounded-full text-xs text-green-400 font-semibold">
                      Funciona
                    </div>
                  </div>
                  <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed">
                    Casamentos têm raízes mais fundas — e isso trabalha a seu favor. O vínculo construído ao longo de anos, os filhos, a história compartilhada: tudo isso cria um caminho emocional que o protocolo usa para reacender o que ela sente. <strong className="text-white">Mais de 13.000 dos nossos alunos eram casados ou tinham filhos</strong> quando começaram.
                  </div>
                </div>
              </div>
            </div>

            {/* Segundo CTA - Urgência */}
            <div className="mb-8 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Você não pode se dar ao luxo<br/>de esperar mais um dia
              </h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                O teste é gratuito, leva 60 segundos e revela o que fazer hoje.
                Não existe momento certo — esse é o momento.
              </p>
            </div>

            <button
              onClick={() => setCurrentStep(1)}
              className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-bold rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 cursor-pointer"
            >
              <span className="block pt-4 pb-1 text-base uppercase tracking-wide">
                → FAZER O TESTE GRATUITO AGORA
              </span>
              <span className="block pb-4 text-xs font-normal opacity-80">
                60 segundos • Sem cadastro • Resultado imediato
              </span>
            </button>

            {/* Micro CTAs */}
            <div className="flex flex-wrap gap-4 justify-center mt-3 text-xs text-gray-400">
              <span>🔒 100% gratuito</span>
              <span>📱 Funciona no celular</span>
              <span>⚡ Resultado na hora</span>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-400">
              © Código da Reconquista — Lucas Krausche<br/>
              Psicanalista Clínico especializado em relacionamentos<br/><br/>
              <span className="text-[10px] opacity-50">
                Os resultados podem variar. Depoimentos reais de alunos do programa.
              </span>
            </div>
          </div>
        );

      case 1: case 2: case 3: case 4: case 5: // Questions
        const qIdx = currentStep - 1;
        const q = questions[qIdx];
        return (
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl animate-fadeInUp">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-bold text-red-400 bg-red-400/20 backdrop-blur-md border border-red-400/20 px-3 py-1 rounded-full">
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
                <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                  ✅ Resposta registrada
                </span>
              </div>
            )}
          </div>
        );

      case 6: // Result
        return (
          <div
            className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl animate-fadeInUp max-h-screen overflow-y-auto hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Percentage */}
            <div className="text-center mb-10">
              <p className="text-base font-bold text-white mb-2">
                Suas chances de voltar com sua ex
              </p>
              <p className="text-sm font-semibold text-red-400 italic mb-3">
                SÃO DE APENAS
              </p>
              <div className="text-6xl font-black text-red-400 mb-3 animate-bounceIn">
                12%
              </div>
              <p className="text-[0.95rem] text-gray-300">
                — <em className="text-red-400 font-semibold">isso é crítico</em>{" "}
                — mas ao seguir esse protocolo você pode{" "}
                <strong className="text-white">GARANTIR que ela volte</strong>
              </p>
            </div>

            <div className="w-16 h-0.5 bg-gray-600 rounded mx-auto mb-10" />

            {/* Story */}
            <div className="space-y-4 text-[0.95rem] text-gray-300 leading-relaxed">
              <p className="text-lg font-bold text-white">Fala, irmão!</p>
              <p>
                Meu nome é{" "}
                <strong className="text-white">Lucas Krausche</strong>.
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
                <strong className="text-red-400">ela terminou comigo.</strong>
              </p>
              <p>
                E naquele momento, parecia que o meu mundo tinha desabado.
              </p>
              <p>
                Foi aí que começou o meu verdadeiro inferno emocional.
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
                <strong className="text-white">
                  eu imaginava logo que estava saindo com outro.
                </strong>{" "}
                E isso me <span className="text-red-400 font-semibold">destruía por dentro</span> e me deixava em crises e ansiedade.
              </p>
              <p>
                <strong className="text-white">E o pior...</strong> Era
                quando eu estava bloqueado.
              </p>
              <p>
                Aí ía fazer perfil fake para ver o que ela estava postando, ficava
                pedindo pros meus amigos enviarem o que ela tinha postado... E adivinha?
              </p>
              <p>
                Lá estava eu, <span className="text-red-400 font-semibold">chorando, triste, sem conseguir comer, sem conseguir trabalhar direito...</span>
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
                quanto mais eu <strong className="text-red-400">corria atrás</strong>,
                mais ela <strong className="text-red-400">se afastava</strong>.
              </p>
              <p>
                Foi só então que eu percebi:{" "}
                <strong className="text-red-400">
                  O problema não era ela.
                </strong>
              </p>
              <p>
                O verdadeiro problema era{" "}
                <strong className="text-red-400">
                  eu não entender a mente feminina.
                </strong>
              </p>
              <p>
                Eu não sabia como funcionava o desejo de uma mulher...{" "}
                <strong className="text-white">e, por isso, eu fazia exatamente o oposto</strong>{" "}
                do que despertaria vontade de voltar nela.
              </p>
              <p>
                Foi nessa fase de dor que eu percebi <strong className="text-white">da pior forma possível</strong> uma verdade dura:
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
                <strong className="text-white">Quanto mais você é disponível para uma mulher,</strong>{" "}
                <span className="text-red-400 font-semibold">mais ela se afasta...</span>
              </p>
              <p>
                Porém, em apenas{" "}
                <strong className="text-green-400">3 etapas</strong>, você
                consegue fazer qualquer mulher comer nas suas mãos outra vez e{" "}
                <strong className="text-green-400">se arrepender</strong> de ter terminado contigo{" "}
                <strong className="text-white">
                  (Mesmo que você tenha feito uma besteira muito grande).
                </strong>
              </p>
              <p>
                Ao longo dos últimos anos, eu me formei em{" "}
                <strong className="text-white">Psicanálise</strong>, e hoje
                sou{" "}
                <strong className="text-white">Psicanalista Clínico</strong> especializado em relacionamentos e
                  comportamento humano.
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
                <strong className="text-white">
                  conquistei quase 2 milhões de seguidores em todas minhas redes
                  sociais.
                </strong>
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
                <strong className="text-white">
                  truque de 3 etapas
                </strong>{" "}
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
                <strong className="text-white">
                  Clube das Deusas de Alto Valor
                </strong>
                , um método exclusivo que ensina mulheres a curar traumas
                profundos para terem relacionamentos saudáveis. Hoje o Clube
                conta com mais de{" "}
                <strong className="text-white">2.800 alunas.</strong>
              </p>
              <p>
                Mas isso me deu acesso a{" "}
                <strong className="text-white">TODOS</strong> os segredos
                mais ocultos da mente feminina... Segredos que agora eu vou te
                revelar para que{" "}
                <strong className="text-white">a sua ex volte a sentir sua falta, se arrependa
                de ter te deixado e queira correr atrás de você ainda essa
                semana.</strong>
              </p>

              <Image
                src="/img/clube-deusas.webp"
                alt="Clube das Deusas de Alto Valor"
                width={600}
                height={600}
                className="rounded-xl shadow-lg w-full my-4"
              />
            </div>

            <p className="text-center text-white mb-4 mt-8">
              Toque abaixo para<br/>
              <strong>Avançar com o Plano!</strong> 👇
            </p>

            <button
              onClick={() => setCurrentStep(7)}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 cursor-pointer uppercase tracking-wide"
            >
              Continuar Plano!
            </button>
          </div>
        );

      case 7: // Engage 1
        return (
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl animate-fadeInUp">
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
                  className="p-4 rounded-2xl border-2 border-red-400/30 bg-red-500/20 hover:border-red-400/50 hover:bg-red-500/30 active:scale-[0.97] transition-all text-[0.95rem] font-semibold text-white cursor-pointer text-center backdrop-blur-md"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        );

      case 8: // Engage 2
        return (
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl animate-fadeInUp">
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
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-white/20 bg-black/30 hover:border-red-400/40 hover:bg-red-500/20 active:scale-[0.97] transition-all text-left cursor-pointer backdrop-blur-md"
                >
                  <span className="w-6 h-6 rounded-full border-2 border-gray-400 flex-shrink-0" />
                  <span className="text-[0.95rem] font-medium text-gray-200">
                    {opt}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 9: // Loading + VSL
        return (
          <>
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl animate-fadeInUp">
              {/* VSL Instruction Text */}
              <div className="text-center mb-4">
                <p className="text-white text-base">
                  Assista o vídeo abaixo enquanto criamos seu <span className="font-bold">protocolo personalizado de reconquista</span>.
                </p>
              </div>

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
                <>
                  {/* Botão ainda disponível mas não é mais necessário clicar */}
                  <button
                    className="w-full mt-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 cursor-pointer uppercase tracking-wide animate-fadeInUp"
                  >
                    Clique aqui para RECONQUISTAR sua ex!
                  </button>

                  {/* PÁGINA DE VENDAS APARECE AUTOMATICAMENTE AQUI */}
                  <div className="mt-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl animate-fadeInUp">
                    {/* Title Section */}
                    <h3 className="text-lg font-normal text-white text-center mb-6 leading-tight">
                      Ao garantir seu acesso ao <strong className="font-bold">CÓDIGO DA RECONQUISTA</strong><br/>
                      você recebe uma <strong className="font-bold">GARANTIA INQUEBRÁVEL de 90 dias</strong><br/>
                      <span className="text-green-400 font-bold">+5 PRESENTES!</span> ⬇️
                    </h3>

                    {/* Guarantee Text */}
                    <div className="mb-8 text-white">
                      <p className="mb-4">Eu sei exatamente o que está passando pela sua cabeça agora.</p>
                      <p className="mb-2">"E se eu comprar e nada acontecer?"</p>
                      <p className="mb-2">"E se ela não voltar?"</p>
                      <p className="mb-4">"E se for só mais uma promessa vazia na internet?"</p>
                      <p className="mb-4">E é por isso que eu decidi fazer algo que nenhum outro especialista em relacionamentos tem coragem de fazer: te dar <strong>uma garantia de 90 dias</strong>, sem pegadinhas e sem letra miúda.</p>
                      <p className="mb-2">Funciona assim:</p>
                      <p className="mb-2">Você entra pro <strong>Código da Reconquista</strong> hoje…</p>
                      <p className="mb-2">Aplica o que eu ensino, envia as mensagens, segue o protocolo passo a passo…</p>
                      <p className="mb-4">E se em até <strong>90 dias</strong> sua ex <strong>não voltar pra você, eu devolvo cada centavo do seu investimento.</strong></p>
                      <p className="mb-2">Sem perguntas, sem burocracia, sem letras miúdas.</p>
                      <p className="mb-4">Se não funcionar pra você, você não paga nada.</p>
                      <p className="mb-4">Simples assim.</p>
                      <p className="mb-2">Eu faço isso porque sei o que eu entrego.</p>
                      <p className="mb-4">E porque já vi esse mesmo método transformar <strong>homens destruídos:</strong></p>
                      <p className="mb-4">Em <strong>caras que reconquistaram o respeito, o desejo e o amor da mulher que mais amavam.</strong></p>
                      <p className="mb-2">Então, você não tá investindo em "mais um curso".</p>
                      <p className="mb-4">Você está investindo em <strong>uma segunda chance de reescrever a história da sua vida amorosa.</strong></p>
                      <p className="mb-4">E eu confio tanto nesse método que boto meu nome e minha reputação em jogo pra provar isso.</p>
                      <p className="mb-2">Então, agora é contigo.</p>
                      <p className="mb-4">Você pode continuar rolando a tela, fingindo que vai pensar mais um pouco…</p>
                      <p className="mb-4">Ou pode <strong>clicar no botão abaixo…</strong></p>
                      <p className="mb-2"><strong>💔 Ficar preso nos 12% e perder ela pra sempre.</strong></p>
                      <p className="mb-4"><strong>❤️ Ou agir agora e usar o mesmo protocolo que já reconectou mais de 30 mil casais.</strong></p>
                      <p className="mb-4 text-center text-xl"><strong>Código da Reconquista com 90 dias de garantia 👇🏻</strong></p>
                    </div>

                    {/* CTA Button after guarantee text */}
                    <button
                      onClick={() => window.location.href = "https://pay.hub.la/VL6XGVMjYtWfFoqme7Sx"}
                      className="w-full mt-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold text-base rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 cursor-pointer uppercase tracking-wide animate-fadeInUp mb-8"
                    >
                      Clique aqui para RECONQUISTAR sua ex!
                    </button>

                    {/* Bonuses Section */}
                    <div className="mb-8">
                      <div className="space-y-4">
                        {bonuses.map((bonus, i) => (
                          <BonusCard key={i} {...bonus} index={i} />
                        ))}
                      </div>

                      {/* Bonus Urgency Text */}
                      <div className="mt-6 text-center">
                        <p className="text-white text-sm font-semibold mb-2">
                          Esses bônus especiais ficarão disponíveis por somente <span className="text-red-400">15 minutos!</span>
                        </p>
                        <p className="text-white text-sm">
                          Clique aqui para garanti-los agora com o <span className="font-bold">Código da Reconquista!</span>
                        </p>
                      </div>
                    </div>

                    {/* Countdown Timer */}
                    {salesActive && <Countdown active={salesActive} />}

                    {/* Testimonial Text */}
                    <div className="text-center mb-6 mt-6">
                      <p className="text-white text-base">
                        Esses caras estavam no <span className="font-bold">mesmo barco que você</span>, mas olha só o que aconteceu depois que eles usaram o <span className="font-bold">CÓDIGO DA RECONQUISTA</span> 👇🏻👀
                      </p>
                    </div>

                    {/* Testimonial Images */}
                    <div className="space-y-4 mb-6">
                      <img src="/img/depoimento-1.webp" alt="Depoimento 1" className="w-full rounded-xl shadow-lg" />
                      <img src="/img/depoimento-2.webp" alt="Depoimento 2" className="w-full rounded-xl shadow-lg" />
                      <img src="/img/depoimento-3.webp" alt="Depoimento 3" className="w-full rounded-xl shadow-lg" />
                      <img src="/img/depoimento-4.webp" alt="Depoimento 4" className="w-full rounded-xl shadow-lg" />
                      <img src="/img/depoimento-5.webp" alt="Depoimento 5" className="w-full rounded-xl shadow-lg" />
                      <img src="/img/depoimento-6.webp" alt="Depoimento 6" className="w-full rounded-xl shadow-lg" />
                      <img src="/img/depoimento-7.webp" alt="Depoimento 7" className="w-full rounded-xl shadow-lg" />
                    </div>

                    {/* Bonus Acceleration Text */}
                    <div className="text-center mb-6">
                      <p className="text-white text-base mb-4">
                        E pra acelerar ainda mais os resultados da sua reconquista… você vai receber <span className="font-bold">acessos VIPs a bônus estratégicos</span>, criados pra destravar reações quase que imediatas na mente dela...
                      </p>
                      <p className="text-white text-base mb-4">
                        São técnicas tão diretas que, em média, em até 48h os alunos relatam mensagens, reações nos stories e até a ex puxando papo do nada. Como aconteceu com esse meu aluno aqui, veja só:
                      </p>
                      <p className="text-white text-base">
                        E isso é apenas o começo, <span className="font-bold">PORQUE COMO VOCÊ CHEGOU ATÉ AQUI</span>, eu resolvi conversar com minha equipe e te entregar <span className="font-bold">+2 PRESENTES AINDA MAIS EXCLUSIVOS</span> agora!
                      </p>
                    </div>

                    {/* Bonus Images */}
                    <div className="space-y-4 mb-6">
                      <img src="/img/bonus-lives.webp" alt="Bônus Lives Semanais" className="w-full rounded-xl shadow-lg" />
                      <img src="/img/bonus-comunidade.webp" alt="Bônus Comunidade Desenrolado" className="w-full rounded-xl shadow-lg" />
                    </div>

                    {/* Best Part Text */}
                    <div className="text-left mb-6">
                      <p className="text-white text-base mb-4">
                        E aqui está a melhor parte:
                      </p>
                      <p className="text-white text-base mb-3">
                        Esses caras estavam exatamente onde você está agora.
                      </p>
                      <div className="text-white text-base mb-4 space-y-1">
                        <p>➡️ Bloqueados no WhatsApp.</p>
                        <p>➡️ Ignorados.</p>
                        <p>➡️ Cheios de arrependimento, dúvidas e medo de nunca mais ter uma chance.</p>
                      </div>
                      <p className="text-white text-base mb-4">
                        Mas decidiram agir.
                      </p>
                      <p className="text-white text-base mb-4">
                        E quando aplicaram o protocolo, o jogo virou.
                      </p>
                      <p className="text-white text-base mb-3">
                        Hoje, são eles que recebem mensagem primeiro.
                      </p>
                      <p className="text-white text-base mb-3">
                        São eles que fazem a ex sentir saudade de novo.
                      </p>
                      <p className="text-white text-base mb-4">
                        São eles que escolheram se queriam voltar — ou se era tarde demais pra ela.
                      </p>
                      <p className="text-white text-base mb-3">
                        E tudo começou com uma única decisão:
                      </p>
                      <p className="text-white text-base mb-4">
                        Desbloquear o poder de reprogramar o cérebro da ex com o Código da Reconquista.
                      </p>
                      <p className="text-white text-base mb-6">
                        E você pode tomar essa mesma decisão apertando o botão abaixo:
                      </p>
                    </div>

                    {/* CTA Button */}
                    <a
                      href="https://pay.hub.la/VL6XGVMjYtWfFoqme7Sx"
                      className="block w-full py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold text-lg rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 text-center uppercase tracking-wide mb-6"
                    >
                      CLIQUE AQUI PARA RECONQUISTAR SUA EX!
                    </a>

                    {/* Not By Chance Text */}
                    <div className="text-left mb-6">
                      <p className="text-white text-base mb-4">
                        E olha… você não está aqui por acaso.
                      </p>
                      <p className="text-white text-base mb-4">
                        Você está aqui porque sabe que sua ex não te enxerga mais como antes.
                      </p>
                      <p className="text-white text-base mb-4">
                        E agora você só tem duas opções:
                      </p>
                      <div className="text-white text-base mb-4 space-y-2">
                        <p>❌ Continuar mandando mensagens aleatórias, vendo ela correr pros braços de outro.</p>
                        <p>✅ Ou aplicar mensagens cirúrgicas do protocolo, que fazem ela querer se comprometer de novo.</p>
                      </div>
                      <p className="text-white text-base mb-4">
                        O Código da Reconquista te entrega exatamente:
                      </p>
                      <p className="text-white text-base mb-4">
                        👉 O que dizer, quando dizer e como manter a mente dela viciada em você.
                      </p>
                      <p className="text-white text-base mb-3">
                        Clique no botão abaixo.
                      </p>
                      <p className="text-white text-base mb-3">
                        Desbloqueie seu acesso agora.
                      </p>
                      <p className="text-white text-base mb-6">
                        E assuma o seu lugar — no centro dos pensamentos dela.
                      </p>
                    </div>

                    {/* Another CTA Button */}
                    <a
                      href="https://pay.hub.la/VL6XGVMjYtWfFoqme7Sx"
                      className="block w-full py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold text-lg rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 text-center uppercase tracking-wide"
                    >
                      CLIQUE AQUI PARA RECONQUISTAR SUA EX!
                    </a>
                  </div>
                </>
              )}
            </div>

          </>
        );

      case 10: // Sales
        return (
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl animate-fadeInUp max-h-screen overflow-y-auto hide-scrollbar">
            {/* Header - Protocol Complete */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                SEU PROTOCOLO PERSONALIZADO FOI GERADO!
              </h2>
              <p className="text-gray-300 text-[0.95rem] leading-relaxed">
                Agora você tem acesso aos <strong className="text-white">códigos diretos</strong> para
                fazer sua ex sentir sua falta e voltar correndo pra você...
              </p>
            </div>

            {/* Investment Framing */}
            <p className="text-center text-[0.95rem] text-gray-300 leading-relaxed mb-8">
              Você está prestes a investir na <strong className="text-white">segunda chance de reescrever sua história de amor</strong>.
              O mesmo protocolo que transformou homens destruídos em caras que reconquistaram o respeito,
              o desejo e o amor de suas ex-namoradas.
            </p>

            {/* Choice Framework */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white text-center mb-6">
                AGORA VOCÊ TEM 2 OPÇÕES:
              </h3>
              <div className="space-y-4">
                <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">❌</span>
                    <div>
                      <p className="text-white font-semibold mb-2">OPÇÃO 1: Continuar com 12% de chance</p>
                      <p className="text-gray-300 text-sm">
                        Ficar travado, mandando mensagens aleatórias, sendo rejeitado e vendo ela se afastar cada vez mais...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">❤️</span>
                    <div>
                      <p className="text-white font-semibold mb-2">OPÇÃO 2: Usar o protocolo que funcionou para 30.000+ casais</p>
                      <p className="text-gray-300 text-sm">
                        Aplicar a mesma estratégia psicológica que fez ela voltar a sentir desejo, saudade e querer lutar pelo seu relacionamento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee Section */}
            <div className="text-center mb-8">
              <div className="bg-amber-500/20 border border-amber-400/30 rounded-2xl p-6">
                <h3 className="text-xl font-extrabold text-white mb-3">
                  🛡️ GARANTIA INQUEBRÁVEL DE 90 DIAS
                </h3>
                <p className="text-gray-300 text-[0.95rem] leading-relaxed">
                  Se em 90 dias você não conseguir <strong className="text-white">NENHUM resultado</strong>,
                  eu devolvo 100% do seu dinheiro. Sem perguntas, sem complicação.
                </p>
                <p className="text-amber-300 font-semibold mt-3 text-sm">
                  Ou seja, o risco é todo MEU!
                </p>
              </div>
            </div>

            {/* First CTA */}
            <a
              href="https://pay.hub.la/VL6XGVMjYtWfFoqme7Sx"
              className="block w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold text-lg rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 text-center uppercase tracking-wide mb-8"
            >
              🎯 QUERO RECONQUISTAR MINHA EX AGORA!
            </a>

            {/* Product Promise */}
            <div className="bg-red-500/10 border border-red-400/30 rounded-2xl p-6 mb-8">
              <h4 className="text-white font-bold text-center mb-3">
                O CÓDIGO DA RECONQUISTA entrega exatamente:
              </h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <p>✅ <strong className="text-white">O QUE</strong> falar para despertar saudade visceral</p>
                <p>✅ <strong className="text-white">QUANDO</strong> enviar cada mensagem para máximo impacto</p>
                <p>✅ <strong className="text-white">COMO</strong> manter a mente dela viciada em você</p>
                <p>✅ <strong className="text-white">ONDE</strong> aplicar cada gatilho psicológico</p>
              </div>
            </div>

            {/* Bonuses Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white text-center mb-6">
                🎁 + VOCÊ GANHA 5 BÔNUS EXCLUSIVOS:
              </h3>

              <div className="space-y-4">
                {bonuses.map((bonus, i) => (
                  <BonusCard key={i} {...bonus} index={i} />
                ))}
              </div>

              {/* Extra Bonuses */}
              <div className="mt-6 space-y-4">
                <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎥</span>
                    <div>
                      <h5 className="text-white font-bold">BÔNUS 6: Sessões Ao Vivo Semanais</h5>
                      <p className="text-gray-300 text-sm mt-1">
                        Acesso direto ao Lucas para tirar dúvidas e receber orientação personalizada.
                      </p>
                      <span className="text-purple-400 font-semibold text-sm">Valor: R$ 497</span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">👥</span>
                    <div>
                      <h5 className="text-white font-bold">BÔNUS 7: Comunidade VIP Desenrolado</h5>
                      <p className="text-gray-300 text-sm mt-1">
                        Grupo privado de suporte com mais de 5.000 homens que reconquistaram suas ex.
                      </p>
                      <span className="text-red-400 font-semibold text-sm">Valor: R$ 297</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Value */}
              <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 mt-6 text-center">
                <p className="text-white font-bold text-lg">
                  VALOR TOTAL DOS BÔNUS: <span className="text-red-400 line-through">R$ 2.539</span>
                </p>
                <p className="text-red-400 font-bold text-xl">
                  HOJE POR APENAS: R$ 47
                </p>
              </div>
            </div>

            {/* Social Proof Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white text-center mb-6">
                📱 VEJA OS RESULTADOS DOS NOSSOS ALUNOS:
              </h3>

              {/* Screenshot de Mensagens */}
              <div className="text-center mb-6">
                <img
                  src="/img/mensagens-dela.webp"
                  alt="Mensagens de sucesso dos alunos"
                  className="max-w-full mx-auto rounded-xl shadow-lg"
                  width="350"
                  height="600"
                />
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
                <p className="text-gray-300 text-sm italic mb-2">
                  "Em menos de 24 horas ela me desbloqueou e disse que estava sentindo minha falta..."
                </p>
                <p className="text-blue-400 font-semibold text-sm">- Rafael, 28 anos</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
                <p className="text-gray-300 text-sm italic mb-2">
                  "Funciona mesmo! Ela que terminou comigo veio atrás pedindo uma nova chance."
                </p>
                <p className="text-blue-400 font-semibold text-sm">- Carlos, 32 anos</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
                <p className="text-gray-300 text-sm italic mb-2">
                  "Ela voltou a me procurar depois de aplicar o protocolo. Funcionou mesmo!"
                </p>
                <p className="text-blue-400 font-semibold text-sm">- Bruno, 26 anos</p>
              </div>

              <div className="space-y-4">
                {[1, 2, 4, 6, 7].map((n) => (
                  <Image
                    key={n}
                    src={`/img/depoimento-${n}.webp`}
                    alt={`Depoimento de aluno ${n}`}
                    width={400}
                    height={500}
                    className="rounded-2xl shadow-lg w-full"
                  />
                ))}
              </div>
            </div>

            {/* Urgency Timer */}
            {salesActive && <Countdown active={salesActive} />}

            {/* Authority Reinforcement */}
            <div className="bg-red-600/20 border border-red-400/30 rounded-xl p-6 mb-8">
              <div className="text-center">
                <h4 className="text-white font-bold mb-3">QUEM SOU EU PARA TE ENSINAR ISSO?</h4>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>✅ <strong className="text-white">Psicanalista Clínico</strong> especializado em relacionamentos</p>
                  <p>✅ <strong className="text-white">2 milhões de seguidores</strong> em todas as redes sociais</p>
                  <p>✅ <strong className="text-white">Reconquistei minha própria ex</strong> (hoje minha noiva)</p>
                  <p>✅ <strong className="text-white">30.000+ casais</strong> já reconquistaram usando meus métodos</p>
                  <p>✅ <strong className="text-white">Fundador do Clube das Deusas</strong> com 2.800 alunas</p>
                </div>
              </div>
            </div>

            {/* Final Push */}
            <div className="bg-red-600/20 border border-red-400/30 rounded-xl p-6 mb-8">
              <h4 className="text-white font-bold text-center mb-4">
                ⚠️ VOCÊ NÃO ESTÁ AQUI POR ACASO!
              </h4>
              <p className="text-gray-300 text-center text-[0.95rem] leading-relaxed">
                Se você chegou até aqui é porque o <strong className="text-white">universo está te dando uma segunda chance</strong>.
                A pergunta é: você vai aproveitar ou vai deixar ela passar?
              </p>
              <div className="mt-4 text-center">
                <p className="text-red-400 font-semibold text-sm">
                  Tome seu lugar... no centro dos pensamentos dela.
                </p>
              </div>
            </div>

            {/* Final CTA */}
            <a
              href="https://pay.hub.la/VL6XGVMjYtWfFoqme7Sx"
              className="block w-full py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-[0.98] text-white font-bold text-lg rounded-2xl transition-all duration-150 shadow-lg shadow-green-500/20 text-center uppercase tracking-wide mb-6"
            >
              💚 SIM! QUERO RECONQUISTAR MINHA EX AGORA!
            </a>

            {/* Final Guarantee Reminder */}
            <div className="text-center">
              <p className="text-gray-400 text-xs">
                🛡️ Lembre-se: 90 dias de garantia total. Risco zero para você.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/img/testea.jpg')`,
          filter: 'blur(8px) brightness(0.2)',
          transform: 'scale(1.1)',
          zIndex: -2
        }}
      />

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/50" style={{ zIndex: -1 }} />

      {/* Progress Bar */}
      {currentStep >= 1 && currentStep <= 5 && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4">
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Pergunta {currentStep} de 5</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700/50 backdrop-blur-md rounded-full h-2 border border-white/10">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg w-full">
          {renderCurrentStep()}
        </div>
      </div>

      {/* Back Redirect Global Overlay */}
      {showBackRedirect && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl max-w-md sm:max-w-lg md:max-w-2xl w-full max-h-[95vh] overflow-y-auto animate-fadeInUp">
            {/* Header */}
            <div className="bg-red-600 text-white text-center py-6 px-4">
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
                <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-4 leading-tight">
                  Você acaba de desbloquear o <span className="text-red-600">Código da Reconquista</span> com <span className="text-green-600 text-2xl md:text-3xl font-bold">50% de desconto</span>
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
                  <span className="text-lg md:text-2xl text-gray-500 line-through">DE R$97</span>
                  <span className="text-2xl md:text-4xl font-bold text-red-600">Por apenas R$47</span>
                </div>

                <button
                  onClick={handleBackRedirectCTA}
                  className="bg-green-500 hover:bg-green-600 text-white text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 mb-4 w-full sm:w-auto"
                >
                  🎯 QUERO RECONQUISTAR MINHA EX
                </button>

                <p className="text-xs md:text-sm text-gray-600 mb-6">
                  Pagamento único • Acesso imediato • Oferta exclusiva desta página
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-red-50 rounded-lg p-4 md:p-6 mb-6">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
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
                className="bg-green-600 hover:bg-green-700 text-white text-lg md:text-xl font-bold py-3 md:py-4 px-6 md:px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto animate-pulse"
              >
                💝 QUERO RECONQUISTAR MINHA EX
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-bounceIn {
          animation: bounceIn 0.8s ease-out;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}