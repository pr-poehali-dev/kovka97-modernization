import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/89cba3df-8fa6-48bc-8c56-f4d5869edcd8/files/d2208780-8b71-4723-aa36-731521c43f74.jpg";
const GATE_IMG = "https://cdn.poehali.dev/projects/89cba3df-8fa6-48bc-8c56-f4d5869edcd8/files/80a45978-4fc1-42a6-8386-21a36a4ceb39.jpg";
const FURNITURE_IMG = "https://cdn.poehali.dev/projects/89cba3df-8fa6-48bc-8c56-f4d5869edcd8/files/c047555d-612d-4c60-823b-33c2e80c7adc.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "catalog", label: "Каталог" },
  { id: "gallery", label: "Галерея" },
  { id: "about", label: "О нас" },
  { id: "contacts", label: "Контакты" },
];

const CATALOG = [
  {
    id: 1,
    title: "Ворота и калитки",
    desc: "Распашные, откатные, с художественными элементами. Любая сложность и размер.",
    icon: "DoorOpen",
    img: GATE_IMG,
    price: "от 45 000 ₽",
    tag: "Хит продаж",
  },
  {
    id: 2,
    title: "Заборы и ограждения",
    desc: "Секционные заборы с коваными элементами, балюстрады, перила для лестниц.",
    icon: "Shield",
    img: FURNITURE_IMG,
    price: "от 3 500 ₽/м",
    tag: "Популярное",
  },
  {
    id: 3,
    title: "Мебель и предметы интерьера",
    desc: "Кованые столы, стулья, вешалки, подставки для каминов и лофт-декор.",
    icon: "Sofa",
    img: HERO_IMG,
    price: "от 12 000 ₽",
    tag: "Эксклюзив",
  },
  {
    id: 4,
    title: "Лестницы и перила",
    desc: "Маршевые и винтовые лестницы с коваными перилами любой сложности.",
    icon: "Footprints",
    img: GATE_IMG,
    price: "от 25 000 ₽",
    tag: "",
  },
  {
    id: 5,
    title: "Беседки и навесы",
    desc: "Кованые беседки, арки, перголы для сада. Надёжно и красиво.",
    icon: "Home",
    img: FURNITURE_IMG,
    price: "от 60 000 ₽",
    tag: "",
  },
  {
    id: 6,
    title: "Малые архитектурные формы",
    desc: "Фонари, скамейки, урны, вазоны — кованые элементы для благоустройства.",
    icon: "Lamp",
    img: HERO_IMG,
    price: "от 5 000 ₽",
    tag: "Новинка",
  },
];

const GALLERY_ITEMS = [
  { img: GATE_IMG, title: "Ворота с вензелями", cat: "Ворота" },
  { img: FURNITURE_IMG, title: "Садовая мебель", cat: "Мебель" },
  { img: HERO_IMG, title: "Процесс ковки", cat: "Производство" },
  { img: GATE_IMG, title: "Калитка кованая", cat: "Ворота" },
  { img: FURNITURE_IMG, title: "Кованый стол", cat: "Мебель" },
  { img: HERO_IMG, title: "Мастерская", cat: "Производство" },
];

const STATS = [
  { value: "15+", label: "лет опыта" },
  { value: "2 000+", label: "выполненных заказов" },
  { value: "100%", label: "ручная работа" },
  { value: "5 лет", label: "гарантия" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

export default function Index() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [galFilter, setGalFilter] = useState("Все");
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 100) {
          setActive(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const galCategories = ["Все", "Ворота", "Мебель", "Производство"];
  const filteredGal = galFilter === "Все" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === galFilter);

  const heroAnim = useInView(0);
  const statsAnim = useInView();
  const catalogAnim = useInView();
  const galleryAnim = useInView();
  const aboutAnim = useInView();
  const contactsAnim = useInView();

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-brand shadow-lg py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-gold rounded-sm flex items-center justify-center font-display font-bold text-white text-lg">K</div>
            <span className="font-display text-xl font-bold text-white tracking-widest">KOVKA97</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`font-medium text-sm tracking-wide transition-all duration-200 relative group ${
                  active === n.id ? "text-brand-gold" : "text-white/80 hover:text-white"
                }`}
              >
                {n.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-gold transition-all duration-300 ${active === n.id ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            ))}
            <button
              onClick={() => scrollTo("contacts")}
              className="bg-brand-gold text-white font-semibold text-sm px-5 py-2 rounded-sm hover:bg-amber-600 transition-colors duration-200"
            >
              Заказать
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-brand-dark border-t border-white/10 animate-slide-down">
            {NAV_ITEMS.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="w-full text-left px-6 py-4 text-white/80 hover:text-white hover:bg-white/5 font-medium tracking-wide border-b border-white/5"
              >
                {n.label}
              </button>
            ))}
            <div className="p-4">
              <button
                onClick={() => scrollTo("contacts")}
                className="w-full bg-brand-gold text-white font-semibold py-3 rounded-sm"
              >
                Заказать
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" ref={heroAnim.ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Кузница" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className={heroAnim.inView ? "animate-fade-in" : "opacity-0"} style={{ animationDelay: "0.1s" }}>
            <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-sm mb-6">
              <Icon name="Flame" size={14} />
              Художественная ковка ручной работы
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-none mb-6 tracking-tight">
              СИЛА<br />
              <span className="text-brand-gold">МЕТАЛЛА</span><br />
              В ДЕТАЛЯХ
            </h1>
            <p className="text-white/70 text-lg mb-10 leading-relaxed max-w-md">
              Создаём уникальные изделия из металла с 2009 года. Ворота, заборы, мебель, перила — от эскиза до монтажа.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("catalog")}
                className="bg-brand-gold hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-sm transition-all duration-200 hover:scale-105 flex items-center gap-2"
              >
                <Icon name="Grid3X3" size={18} />
                Смотреть каталог
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="border-2 border-white/40 hover:border-white text-white font-bold px-8 py-4 rounded-sm transition-all duration-200 hover:bg-white/10 flex items-center gap-2"
              >
                <Icon name="Phone" size={18} />
                Связаться
              </button>
            </div>
          </div>

          <div className={`hidden md:flex flex-col gap-4 ${inView ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-gold/20 rounded-sm flex items-center justify-center">
                  <Icon name="Award" size={20} className="text-brand-gold" />
                </div>
                <span className="text-white font-semibold">Гарантия качества</span>
              </div>
              <p className="text-white/60 text-sm">5 лет на все изделия. Используем только качественный металл и антикоррозийные покрытия.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-gold/20 rounded-sm flex items-center justify-center">
                  <Icon name="Ruler" size={20} className="text-brand-gold" />
                </div>
                <span className="text-white font-semibold">Любой размер и дизайн</span>
              </div>
              <p className="text-white/60 text-sm">Работаем по готовым проектам и разрабатываем эскизы бесплатно.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-brand-gold/20 rounded-sm flex items-center justify-center">
                  <Icon name="Truck" size={20} className="text-brand-gold" />
                </div>
                <span className="text-white font-semibold">Доставка и монтаж</span>
              </div>
              <p className="text-white/60 text-sm">Доставляем по всему региону. Профессиональный монтаж в срок.</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollTo("catalog")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase">Листать</span>
          <Icon name="ChevronDown" size={20} />
        </button>
      </section>

      {/* STATS */}
      <section ref={statsAnim.ref} className="bg-brand py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`text-center ${statsAnim.inView ? "animate-fade-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-brand-gold mb-2">{s.value}</div>
                <div className="text-white/70 text-sm tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" ref={catalogAnim.ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`text-center mb-16 ${catalogAnim.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-8 h-px bg-brand-gold" />
              Наши работы
              <span className="w-8 h-px bg-brand-gold" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand mb-4">КАТАЛОГ</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Выберите категорию и получите бесплатный расчёт стоимости. Все изделия изготавливаются под заказ.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATALOG.map((item, i) => (
              <div
                key={item.id}
                className={`group bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${catalogAnim.inView ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-brand/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => scrollTo("contacts")}
                      className="bg-brand-gold text-white font-bold px-6 py-3 rounded-sm text-sm hover:bg-amber-600 transition-colors"
                    >
                      Заказать
                    </button>
                  </div>
                  {item.tag && (
                    <div className="absolute top-3 left-3 bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-sm">
                      {item.tag}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-lg font-bold text-brand group-hover:text-brand-gold transition-colors">{item.title}</h3>
                    <div className="w-9 h-9 bg-brand/5 rounded-sm flex items-center justify-center flex-shrink-0 ml-3">
                      <Icon name={item.icon} size={18} className="text-brand" fallback="Box" />
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-brand-gold text-lg">{item.price}</span>
                    <button
                      onClick={() => scrollTo("contacts")}
                      className="text-brand text-sm font-semibold hover:text-brand-gold transition-colors flex items-center gap-1"
                    >
                      Рассчитать
                      <Icon name="ArrowRight" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" ref={galleryAnim.ref} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`text-center mb-12 ${galleryAnim.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-8 h-px bg-brand-gold" />
              Портфолио
              <span className="w-8 h-px bg-brand-gold" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand mb-4">ГАЛЕРЕЯ</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-8">Реальные проекты, выполненные нашими мастерами. Каждое изделие уникально.</p>

            <div className="flex flex-wrap justify-center gap-3">
              {galCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalFilter(cat)}
                  className={`px-5 py-2 text-sm font-semibold rounded-sm transition-all duration-200 ${
                    galFilter === cat
                      ? "bg-brand text-white"
                      : "bg-white text-brand border border-brand/20 hover:border-brand hover:bg-brand/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredGal.map((item, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-sm aspect-square ${galleryAnim.inView ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <span className="text-brand-gold text-xs font-bold tracking-widest uppercase">{item.cat}</span>
                  <span className="text-white font-display font-bold text-lg text-center px-4">{item.title}</span>
                  <Icon name="ZoomIn" size={24} className="text-white/70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutAnim.ref} className="py-24 bg-brand overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`${aboutAnim.inView ? "animate-fade-in-left" : "opacity-0"}`}>
              <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-bold tracking-widest uppercase mb-6">
                <span className="w-8 h-px bg-brand-gold" />
                О компании
                <span className="w-8 h-px bg-brand-gold" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                МЫ СОЗДАЁМ<br />
                <span className="text-brand-gold">ВЕЧНЫЕ</span><br />
                ИЗДЕЛИЯ
              </h2>
              <p className="text-white/70 mb-6 leading-relaxed text-lg">
                KOVKA97 — это семейное производство с многолетней историей. Мы создаём изделия, которые переживают поколения. Каждый элемент рождается в руках опытного мастера.
              </p>
              <p className="text-white/60 mb-8 leading-relaxed">
                Используем как классические техники горячей ковки, так и современные технологии холодной ковки и лазерной резки. Это позволяет воплощать самые сложные проекты точно и красиво.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Hammer", text: "Горячая ковка" },
                  { icon: "Settings", text: "Холодная ковка" },
                  { icon: "Zap", text: "Лазерная резка" },
                  { icon: "Paintbrush", text: "Покраска и патинирование" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 rounded-sm px-4 py-3">
                    <Icon name={f.icon} size={18} className="text-brand-gold flex-shrink-0" fallback="Check" />
                    <span className="text-white/90 text-sm font-medium">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${aboutAnim.inView ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
              <div className="relative">
                <img
                  src={HERO_IMG}
                  alt="Наша кузница"
                  className="w-full rounded-sm object-cover aspect-square"
                />
                <div className="absolute -bottom-6 -right-6 bg-brand-gold p-6 rounded-sm hidden md:block">
                  <div className="font-display text-4xl font-bold text-white">15+</div>
                  <div className="text-white/80 text-sm mt-1">лет опыта</div>
                </div>
                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-sm shadow-2xl hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand rounded-sm flex items-center justify-center">
                      <Icon name="Star" size={18} className="text-brand-gold" />
                    </div>
                    <div>
                      <div className="font-bold text-brand text-sm">Топ мастерская</div>
                      <div className="text-gray-400 text-xs">по отзывам 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-brand-gold">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">ГОТОВЫ СОЗДАТЬ ЧТО-ТО ОСОБЕННОЕ?</h2>
          <p className="text-white/80 text-lg mb-8">Бесплатный выезд мастера и расчёт стоимости в течение 24 часов</p>
          <button
            onClick={() => scrollTo("contacts")}
            className="bg-white text-brand-gold font-bold px-10 py-4 rounded-sm hover:bg-gray-100 transition-colors text-lg inline-flex items-center gap-2"
          >
            <Icon name="Phone" size={20} />
            Получить расчёт бесплатно
          </button>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" ref={contactsAnim.ref} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className={`text-center mb-16 ${contactsAnim.inView ? "animate-fade-in" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-8 h-px bg-brand-gold" />
              Обратная связь
              <span className="w-8 h-px bg-brand-gold" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand mb-4">КОНТАКТЫ</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Свяжитесь с нами удобным способом или оставьте заявку — перезвоним в течение 15 минут.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className={`${contactsAnim.inView ? "animate-fade-in-left" : "opacity-0"}`}>
              <div className="space-y-6 mb-10">
                {[
                  { icon: "Phone", title: "Телефон", value: "+7 (XXX) XXX-XX-XX", sub: "Ежедневно 8:00 — 20:00" },
                  { icon: "Mail", title: "Email", value: "info@kovka97.ru", sub: "Ответим в течение часа" },
                  { icon: "MapPin", title: "Адрес", value: "г. Ставрополь, ул. Примерная, 15", sub: "Производство и шоурум" },
                  { icon: "Clock", title: "Режим работы", value: "Пн-Вс: 8:00 — 20:00", sub: "Без выходных" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-sm border border-gray-100 hover:border-brand/20 hover:shadow-md transition-all duration-200">
                    <div className="w-12 h-12 bg-brand rounded-sm flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs font-semibold tracking-wide uppercase mb-1">{c.title}</div>
                      <div className="font-bold text-brand text-base">{c.value}</div>
                      <div className="text-gray-400 text-sm">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                {[
                  { icon: "MessageCircle", label: "WhatsApp" },
                  { icon: "Send", label: "Telegram" },
                  { icon: "Phone", label: "Позвонить" },
                ].map((s, i) => (
                  <button
                    key={i}
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-brand text-brand font-semibold py-3 rounded-sm hover:bg-brand hover:text-white transition-all duration-200 text-sm"
                  >
                    <Icon name={s.icon} size={16} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={`${contactsAnim.inView ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              {sent ? (
                <div className="bg-brand/5 border-2 border-brand/20 rounded-sm p-12 text-center">
                  <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-brand-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-brand mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-500">Перезвоним вам в течение 15 минут</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-brand font-semibold text-sm hover:text-brand-gold"
                  >
                    Отправить ещё одну заявку
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="bg-brand/5 border border-brand/10 rounded-sm p-8"
                >
                  <h3 className="font-display text-2xl font-bold text-brand mb-6">Оставить заявку</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand mb-2">Ваше имя *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Иван Иванов"
                        className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand mb-2">Телефон *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+7 (000) 000-00-00"
                        className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand mb-2">Что нужно сделать?</label>
                      <textarea
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        placeholder="Опишите ваш проект или задайте вопрос..."
                        className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-4 rounded-sm transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 text-base"
                    >
                      <Icon name="Send" size={18} />
                      Отправить заявку
                    </button>
                    <p className="text-gray-400 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-gold rounded-sm flex items-center justify-center font-display font-bold text-white text-lg">K</div>
              <div>
                <div className="font-display text-xl font-bold text-white tracking-widest">KOVKA97</div>
                <div className="text-white/40 text-xs">Художественная ковка</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {NAV_ITEMS.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {n.label}
                </button>
              ))}
            </div>
            <div className="text-white/30 text-sm">© 2024 KOVKA97. Все права защищены.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}